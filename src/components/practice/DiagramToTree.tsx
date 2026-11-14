"use client";

/**
 * /practice — 1단계 프로토타입 v2 (Three.js 파티클)
 * "기획 청사진(로직 트리)이 3D로 뒤집히며 빛나는 나무가 된다"
 *
 * 핵심 원리
 *  - 같은 트리 데이터에서 모든 파티클이 두 개의 자리를 가진다.
 *      A = 청사진 다이어그램의 자리 (선·박스 테두리)
 *      B = 나무의 자리 (줄기·가지·잎)
 *  - 박스 테두리를 이루던 파티클이 그대로 그 노드의 잎이 된다. (같은 재료)
 *  - 그룹을 X축으로 180° 실제 회전시키면서 A → B로 이동 → 진짜 "뒤집힘"
 *  - 추가 의존성 없음 (package.json에 이미 있는 three만 사용)
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ────────────────────────────────────────────────
 * 1. 데이터 — 롯데 스마트픽 운영 개선 로직 트리 (예시)
 *    ⚠️ 실제 기획 문서의 로직 트리로 교체하세요. 구조가 곧 나무 모양입니다.
 *    끝 노드 라벨은 7자 안팎을 권장합니다.
 * ──────────────────────────────────────────────── */
type TreeData = { label: string; children?: TreeData[] };

const SMARTPICK_TREE: TreeData = {
  label: "픽업 가능 상품이 적다",
  children: [
    {
      label: "상품 설정 구조",
      children: [
        { label: "상품 단위 수동 설정", children: [{ label: "카테고리 단위" }, { label: "기본값 자동화" }] },
        { label: "대상 기준 불명확", children: [{ label: "정책 재정의" }] },
      ],
    },
    {
      label: "점포 운영",
      children: [
        { label: "교육 접근성 낮음", children: [{ label: "온라인 교육" }, { label: "교육영상" }] },
        { label: "점포별 운영 편차", children: [{ label: "가이드 표준화" }] },
      ],
    },
    {
      label: "고객 커뮤니케이션",
      children: [{ label: "알림 비용·누락", children: [{ label: "카카오 알림" }, { label: "시점 재설계" }] }],
    },
  ],
};

/* ────────────────────────────────────────────────
 * 2. 레이아웃 (월드 좌표: x 오른쪽, y 위쪽, 원점 = 화면 중앙)
 * ──────────────────────────────────────────────── */
const GROUND_Y = -330;
const FORK_Y = -160; // 줄기가 처음 갈라지는 높이
const TREE_Y = [FORK_Y, -30, 115, 245]; // 깊이별 나무 높이
const SPREAD = [0, 0.27, 0.6, 0.92]; // 깊이별 가지 퍼짐
const DIAGRAM_TOP = 300;
const DIAGRAM_GAP = 165;
const CHAR_W = 13; // 박스 폭 계산용 (월드 단위 / 글자)

type LNode = {
  id: number;
  label: string;
  depth: number;
  parent: number | null;
  children: number[];
  isLeaf: boolean;
  ax: number; ay: number; // 다이어그램
  bx: number; by: number; bz: number; // 나무
  w: number; // 박스 폭
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function layout(data: TreeData, rand: () => number) {
  const nodes: LNode[] = [];
  let cursor = 0;
  const walk = (d: TreeData, depth: number, parent: number | null) => {
    const id = nodes.length;
    const n: LNode = {
      id, label: d.label, depth, parent, children: [], isLeaf: !d.children?.length,
      ax: 0, ay: 0, bx: 0, by: 0, bz: 0, w: d.label.length * CHAR_W + 28,
    };
    nodes.push(n);
    if (parent !== null) nodes[parent].children.push(id);
    if (n.isLeaf) n.ax = cursor++;
    else {
      d.children!.forEach((c) => walk(c, depth + 1, id));
      const xs = n.children.map((c) => nodes[c].ax);
      n.ax = (Math.min(...xs) + Math.max(...xs)) / 2;
    }
  };
  walk(data, 0, null);
  nodes.forEach((n) => {
    n.ax = -440 + (n.ax / Math.max(cursor - 1, 1)) * 880;
    n.ay = DIAGRAM_TOP - n.depth * DIAGRAM_GAP;
    const d = Math.min(n.depth, 3);
    n.bx = n.ax * SPREAD[d] + (d ? (rand() - 0.5) * 60 : 0);
    n.by = TREE_Y[d] + (d ? (rand() - 0.5) * 46 : 0);
    n.bz = d ? (rand() - 0.5) * 140 * (d / 3) : 0;
  });
  return nodes;
}

/* ────────────────────────────────────────────────
 * 3. 파티클 생성
 * ──────────────────────────────────────────────── */
type V3 = [number, number, number];
const cubic = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
};

const C = {
  blueprintLine: [0.6, 0.82, 0.92] as V3,
  blueprintBox: [0.88, 0.95, 1.0] as V3,
  bark: [0.62, 0.42, 0.26] as V3,
  leaves: [
    [0.42, 0.78, 0.46],
    [0.58, 0.86, 0.42],
    [0.3, 0.62, 0.42],
    [0.72, 0.9, 0.5],
  ] as V3[],
  sun: [1.0, 0.84, 0.52] as V3,
  ground: [0.4, 0.62, 0.38] as V3,
};

function buildParticles(isMobile: boolean) {
  const rand = mulberry32(20261110);
  const nodes = layout(SMARTPICK_TREE, rand);
  const density = isMobile ? 0.55 : 1;

  const A: number[] = [], B: number[] = [], R: number[] = [];
  const CA: number[] = [], CB: number[] = [], META: number[] = [], DELAY: number[] = [], SIZEB: number[] = [];

  // B 좌표는 "X축 180° 회전한 그룹" 기준의 로컬 좌표로 저장: (x, -y, -z)
  const push = (
    a: V3, b: V3, ca: V3, cb: V3,
    size: number, alphaA: number, alphaB: number, drawKey: number, delay: number, swirl = 1, sizeB = size * 2.4,
  ) => {
    A.push(a[0], a[1], a[2]);
    B.push(b[0], -b[1], -b[2]);
    const th = rand() * Math.PI * 2, ph = Math.acos(2 * rand() - 1);
    R.push(Math.sin(ph) * Math.cos(th) * swirl, Math.sin(ph) * Math.sin(th) * swirl, Math.cos(ph) * swirl);
    CA.push(...ca); CB.push(...cb);
    META.push(size, alphaA, alphaB, drawKey);
    DELAY.push(delay);
    SIZEB.push(sizeB);
  };
  const jitterColor = (c: V3, k = 0.08): V3 => [c[0] + (rand() - 0.5) * k, c[1] + (rand() - 0.5) * k, c[2] + (rand() - 0.5) * k];
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;

  // 가지 굵기 (부모 깊이 → 자식 깊이)
  const thick = [11, 6.5, 3.2, 1.3];

  // ── (1) 가지: 다이어그램 연결선 → 나뭇가지
  nodes.forEach((child) => {
    if (child.parent === null) return;
    const p = nodes[child.parent];
    const aMid = (p.ay + child.ay) / 2;
    const Ax = [p.ax, p.ax, child.ax, child.ax];
    const Ay = [p.ay - 17, aMid, aMid, child.ay + 17];
    const dy = child.by - p.by;
    const Bx = [p.bx, p.bx, child.bx - (child.bx - p.bx) * 0.15, child.bx];
    const By = [p.by, p.by + dy * 0.6, child.by - dy * 0.25, child.by];
    const Bz = [p.bz, p.bz, child.bz * 0.85, child.bz];
    const len = Math.hypot(child.bx - p.bx, dy) + 40;
    const perUnit = [0, 13, 7, 3.2][child.depth] * density;
    const count = Math.round(len * perUnit);
    for (let i = 0; i < count; i++) {
      const t = rand();
      const ax = cubic(Ax[0], Ax[1], Ax[2], Ax[3], t);
      const ay = cubic(Ay[0], Ay[1], Ay[2], Ay[3], t);
      const bx = cubic(Bx[0], Bx[1], Bx[2], Bx[3], t);
      const by = cubic(By[0], By[1], By[2], By[3], t);
      const bz = cubic(Bz[0], Bz[1], Bz[2], Bz[3], t);
      // 접선의 법선 방향 + z 방향으로 굵기만큼 퍼뜨려 입체적인 가지
      const t2 = Math.min(t + 0.01, 1);
      let tx = cubic(Bx[0], Bx[1], Bx[2], Bx[3], t2) - bx;
      let ty = cubic(By[0], By[1], By[2], By[3], t2) - by;
      const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
      const r = (thick[p.depth] + (thick[child.depth] - thick[p.depth]) * t) * Math.sqrt(rand());
      const ang = rand() * Math.PI * 2;
      const u = Math.cos(ang) * r, v = Math.sin(ang) * r;
      push(
        [ax + (rand() - 0.5) * 1.2, ay + (rand() - 0.5) * 1.2, (rand() - 0.5) * 3],
        [bx - ty * u, by + tx * u, bz + v],
        jitterColor(C.blueprintLine, 0.06),
        jitterColor(C.bark, 0.12),
        1.5 + rand() * 0.6,
        0.5,
        child.depth === 1 ? 0.34 : child.depth === 2 ? 0.42 : 0.5,
        (child.depth - 1) * 0.24 + t * 0.4,
        rand() * 0.25 + child.depth * 0.08,
        1,
        3.2 + rand() * 1.4,
      );
    }
  });

  // ── (2) 노드 박스 테두리 → 잎 덩어리 (뿌리 박스는 → 줄기)
  nodes.forEach((n) => {
    const w = n.w, h = 34;
    const perimeter = 2 * (w + h);
    const drawKey = n.depth * 0.2 + 0.12;
    if (n.depth === 0) {
      // 뿌리: 박스(채움+테두리) → 땅에서 갈림점까지의 줄기
      const count = Math.round(3600 * density);
      for (let i = 0; i < count; i++) {
        const onEdge = rand() < 0.45;
        let ax: number, ay: number;
        if (onEdge) {
          const s = rand() * perimeter;
          if (s < w) { ax = -w / 2 + s; ay = h / 2; }
          else if (s < w + h) { ax = w / 2; ay = h / 2 - (s - w); }
          else if (s < 2 * w + h) { ax = w / 2 - (s - w - h); ay = -h / 2; }
          else { ax = -w / 2; ay = -h / 2 + (s - 2 * w - h); }
        } else { ax = (rand() - 0.5) * w; ay = (rand() - 0.5) * h; }
        const t = rand();
        const r = (16 - t * 5) * Math.sqrt(rand()) * (1 + (1 - t) * (1 - t) * 0.8);
        const ang = rand() * Math.PI * 2;
        const curve = Math.sin(t * Math.PI) * 6;
        push(
          [n.ax + ax, n.ay + ay, (rand() - 0.5) * 2],
          [Math.cos(ang) * r + curve, GROUND_Y + t * (FORK_Y - GROUND_Y + 8), Math.sin(ang) * r],
          onEdge ? C.blueprintBox : jitterColor(C.blueprintLine, 0.05),
          jitterColor(C.bark, 0.12),
          1.7, onEdge ? 0.75 : 0.22, 0.3, 0.05 + rand() * 0.1, rand() * 0.2, 1, 3.6 + rand() * 1.6,
        );
      }
      return;
    }
    const big = n.isLeaf ? 1 : n.depth === 2 ? 0.55 : 0.3;
    const count = Math.round((n.isLeaf ? 2600 : n.depth === 2 ? 1300 : 600) * density);
    const radius = n.isLeaf ? 78 : n.depth === 2 ? 58 : 40;
    for (let i = 0; i < count; i++) {
      const s = rand() * perimeter;
      let ax: number, ay: number;
      if (s < w) { ax = -w / 2 + s; ay = h / 2; }
      else if (s < w + h) { ax = w / 2; ay = h / 2 - (s - w); }
      else if (s < 2 * w + h) { ax = w / 2 - (s - w - h); ay = -h / 2; }
      else { ax = -w / 2; ay = -h / 2 + (s - 2 * w - h); }
      const sun = rand() < 0.1;
      push(
        [n.ax + ax + (rand() - 0.5) * 0.8, n.ay + ay + (rand() - 0.5) * 0.8, (rand() - 0.5) * 2],
        [
          n.bx + gauss() * radius,
          n.by + radius * 0.25 + gauss() * radius * 0.72,
          n.bz + gauss() * radius,
        ],
        C.blueprintBox,
        sun ? C.sun : jitterColor(C.leaves[Math.floor(rand() * C.leaves.length)], 0.1),
        1.6 + rand() * 0.5,
        0.6,
        sun ? 0.7 : 0.3,
        drawKey + rand() * 0.12,
        0.35 + rand() * 0.45 + n.depth * 0.05,
        1.4,
        (sun ? 7 : 5) + rand() * 3.5 * big,
      );
    }
  });

  // ── (3) 수관(나무 윗부분) 채움: 잎 덩어리 사이를 메워 하나의 숲처럼
  const crownCount = Math.round(5000 * density);
  for (let i = 0; i < crownCount; i++) {
    const b: V3 = [gauss() * 400, 160 + gauss() * 120, gauss() * 190];
    const sun = rand() < 0.08;
    push(
      [b[0], -b[1], -b[2]], b, C.blueprintBox,
      sun ? C.sun : jitterColor(C.leaves[Math.floor(rand() * C.leaves.length)], 0.12),
      1.5, 0, sun ? 0.5 : 0.16, 0, 0.55 + rand() * 0.35, 0.6, (sun ? 6 : 4.5) + rand() * 3,
    );
  }

  // ── (4) 땅의 안개 (다이어그램에는 없음 → 나무가 되며 서서히 나타남)
  const groundCount = Math.round(2200 * density);
  for (let i = 0; i < groundCount; i++) {
    const x = gauss() * 380, z = gauss() * 160;
    const b: V3 = [x, GROUND_Y + Math.abs(gauss()) * 10, z];
    push([b[0], -b[1], -b[2]], b, C.ground, jitterColor(C.ground, 0.1), 1.6, 0, 0.22, 0, 0.5 + rand() * 0.3, 0, 3.5 + rand() * 2);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(A, 3));
  geo.setAttribute("aB", new THREE.Float32BufferAttribute(B, 3));
  geo.setAttribute("aRand", new THREE.Float32BufferAttribute(R, 3));
  geo.setAttribute("aColorA", new THREE.Float32BufferAttribute(CA, 3));
  geo.setAttribute("aColorB", new THREE.Float32BufferAttribute(CB, 3));
  geo.setAttribute("aMeta", new THREE.Float32BufferAttribute(META, 4));
  geo.setAttribute("aDelay", new THREE.Float32BufferAttribute(DELAY, 1));
  geo.setAttribute("aSizeB", new THREE.Float32BufferAttribute(SIZEB, 1));
  return { geo, nodes };
}

/* ────────────────────────────────────────────────
 * 4. 셰이더
 * ──────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
  uniform float uDraw;
  uniform float uMorph;
  uniform float uTime;
  uniform float uProj;
  attribute vec3 aB;
  attribute vec3 aRand;
  attribute vec3 aColorA;
  attribute vec3 aColorB;
  attribute vec4 aMeta;   // size, alphaA, alphaB, drawKey
  attribute float aDelay;
  attribute float aSizeB;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // 파티클마다 조금씩 늦게 출발 → 흩날리듯 흐르는 변신
    float t = clamp((uMorph - aDelay * 0.35) / 0.65, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);

    vec3 pos = mix(position, aB, t);
    pos += aRand * sin(3.14159 * t) * 26.0;        // 변신 중간에 흩어졌다 모임

    vec4 world = modelMatrix * vec4(pos, 1.0);
    float h = clamp((world.y + 330.0) / 600.0, 0.0, 1.0);
    world.x += sin(uTime * 0.8 + world.y * 0.012 + aRand.x * 2.0) * h * h * 6.0 * t;   // 바람
    world.z += cos(uTime * 0.6 + world.x * 0.01) * h * h * 3.0 * t;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(mix(aMeta.x, aSizeB, t) * uProj / -mv.z, 1.0, 22.0);

    float visA = smoothstep(aMeta.w, aMeta.w + 0.06, uDraw * 1.06);
    float twinkle = 0.78 + 0.22 * sin(uTime * 2.2 + aRand.y * 40.0);
    vAlpha = mix(aMeta.y * visA, aMeta.z * twinkle, t);
    vColor = mix(aColorA, aColorB, t);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

// 반딧불·먼지
const ambientVertex = /* glsl */ `
  uniform float uTime;
  uniform float uProj;
  uniform float uMix;
  attribute float aSeed;
  varying float vAlpha;
  varying float vMix;
  void main() {
    vec3 p = position;
    p.y += mod(uTime * (6.0 + aSeed * 10.0) + aSeed * 900.0, 900.0) - 450.0;
    p.x += sin(uTime * 0.4 + aSeed * 20.0) * 18.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp((1.4 + aSeed * 2.2 * uMix) * uProj / -mv.z, 1.0, 9.0);
    float blink = 0.5 + 0.5 * sin(uTime * (1.0 + aSeed * 2.0) + aSeed * 50.0);
    vAlpha = mix(0.12, 0.25 + 0.6 * blink * step(0.55, aSeed), uMix);
    vMix = uMix;
  }
`;
const ambientFragment = /* glsl */ `
  varying float vAlpha;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    vec3 c = mix(vec3(0.6, 0.82, 0.92), vec3(1.0, 0.86, 0.5), vMix);
    gl_FragColor = vec4(c, a * a * vAlpha);
  }
`;

/* ────────────────────────────────────────────────
 * 5. 유틸
 * ──────────────────────────────────────────────── */
const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const range = (p: number, s: number, e: number) => clamp((p - s) / (e - s));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* 스크롤 타임라인 (0 ~ 1)
 * 0.00–0.20  청사진이 그려짐
 * 0.28–0.66  3D로 뒤집히며 나무가 됨
 * 0.80–1.00  마지막 문장 */
const T = { drawEnd: 0.2, morphStart: 0.28, morphEnd: 0.66 };
const FOV = 35;

/* ────────────────────────────────────────────────
 * 6. 컴포넌트
 * ──────────────────────────────────────────────── */
export default function DiagramToTree() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const bgBlueprintRef = useRef<HTMLDivElement>(null);
  const bgForestRef = useRef<HTMLDivElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [labels, setLabels] = useState<{ id: number; label: string; root: boolean }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const stage = stageRef.current!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 6000);

    const { geo, nodes } = buildParticles(isMobile);
    const uniforms = {
      uDraw: { value: 0 },
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uProj: { value: 1 },
    };
    const material = new THREE.ShaderMaterial({
      uniforms, vertexShader, fragmentShader,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const group = new THREE.Group();
    group.add(new THREE.Points(geo, material));
    scene.add(group);

    // 반딧불·먼지
    const ambCount = isMobile ? 260 : 520;
    const ambPos = new Float32Array(ambCount * 3);
    const ambSeed = new Float32Array(ambCount);
    const r = mulberry32(7);
    for (let i = 0; i < ambCount; i++) {
      ambPos[i * 3] = (r() - 0.5) * 1500;
      ambPos[i * 3 + 1] = (r() - 0.5) * 900;
      ambPos[i * 3 + 2] = (r() - 0.5) * 700;
      ambSeed[i] = r();
    }
    const ambGeo = new THREE.BufferGeometry();
    ambGeo.setAttribute("position", new THREE.BufferAttribute(ambPos, 3));
    ambGeo.setAttribute("aSeed", new THREE.BufferAttribute(ambSeed, 1));
    const ambUniforms = { uTime: uniforms.uTime, uProj: uniforms.uProj, uMix: { value: 0 } };
    const ambMat = new THREE.ShaderMaterial({
      uniforms: ambUniforms, vertexShader: ambientVertex, fragmentShader: ambientFragment,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(ambGeo, ambMat));

    // 라벨 (HTML, 화면 좌표로 투영)
    const labelNodes = nodes.map((n) => ({ id: n.id, label: n.label, root: n.depth === 0 }));
    requestAnimationFrame(() => setLabels(labelNodes));

    // 크기
    let camDist = 1800, lookY = 0, pxPerUnit = 1;
    const resize = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const halfTan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      // 내용(폭 1000 × 높이 760)이 아래쪽 78% 영역에 들어오도록
      const needH = Math.max(820, 1060 / camera.aspect) / 0.78;
      camDist = needH / 2 / halfTan;
      lookY = needH * 0.085;
      camera.updateProjectionMatrix();
      uniforms.uProj.value = (h * renderer.getPixelRatio()) / 2 / halfTan;
      pxPerUnit = h / 2 / halfTan / camDist;
    };
    resize();
    window.addEventListener("resize", resize);

    // 마우스 패럴랙스
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);

    // 루프
    let raf = 0;
    let current = reduceMotion ? 1 : 0;
    const clock = new THREE.Clock();
    const v = new THREE.Vector3();

    if (reduceMotion) requestAnimationFrame(() => setReduced(true));

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const time = clock.getElapsedTime();

      // 스크롤 목표값을 부드럽게 따라감 (Lenis 없이도 매끄럽게)
      let target = 1;
      if (!reduceMotion && trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        target = clamp(-rect.top / (rect.height - window.innerHeight));
      }
      current += (target - current) * 0.08;
      const p = current;

      const draw = range(p, 0.02, T.drawEnd);
      const m = easeInOutCubic(range(p, T.morphStart, T.morphEnd));
      uniforms.uDraw.value = draw;
      uniforms.uMorph.value = m;
      uniforms.uTime.value = time;
      ambUniforms.uMix.value = m;

      // 진짜 3D 뒤집기 + 살짝 비튼 회전, 완성 후엔 천천히 숨쉬듯
      group.rotation.x = Math.PI * m;
      group.rotation.y = Math.sin(Math.PI * m) * 0.45 + Math.sin(time * 0.18) * 0.1 * m;

      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;
      const dolly = 1 - 0.08 * range(p, 0.7, 1); // 마지막에 살짝 다가감
      camera.position.set(mouse.sx * 120, lookY - mouse.sy * 70 + m * 20, camDist * dolly);
      camera.lookAt(0, lookY + m * 20, 0);

      // 배경
      if (bgBlueprintRef.current) bgBlueprintRef.current.style.opacity = String(1 - m);
      if (bgForestRef.current) bgForestRef.current.style.opacity = String(m);

      // 문장
      const caps = [
        1 - range(p, 0.21, 0.28),
        range(p, 0.32, 0.38) * (1 - range(p, 0.6, 0.66)),
        range(p, 0.76, 0.86),
      ];
      capRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = caps[i];
        el.style.opacity = String(o);
        el.style.filter = `blur(${((1 - o) * 10).toFixed(1)}px)`;
        el.style.transform = `translateY(${((1 - o) * 14).toFixed(1)}px)`;
      });
      if (cueRef.current) cueRef.current.style.opacity = String(reduceMotion ? 0 : 1 - range(p, 0, 0.04));

      // 라벨: 그려진 뒤 나타나고, 뒤집히기 시작하면 사라짐
      const labelBox = labelsRef.current;
      if (labelBox) {
        const show = m < 0.3 && pxPerUnit * 13 >= 7;
        labelBox.style.display = show ? "block" : "none";
        if (show) {
          const w = stage.clientWidth, h = stage.clientHeight;
          const fade = 1 - range(m, 0, 0.18);
          for (const child of Array.from(labelBox.children) as HTMLElement[]) {
            const n = nodes[Number(child.dataset.id)];
            v.set(n.ax, n.ay, 0).applyMatrix4(group.matrixWorld).project(camera);
            const appear = range(draw, n.depth * 0.2 + 0.2, n.depth * 0.2 + 0.32);
            child.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, -50%)`;
            child.style.fontSize = `${(pxPerUnit * 13).toFixed(2)}px`;
            child.style.opacity = String(appear * fade);
          }
        }
      }

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      geo.dispose(); material.dispose(); ambGeo.dispose(); ambMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={trackRef} className="relative" style={{ height: reduced ? "100vh" : "560vh" }}>
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-[#0B1620]">
        {/* 배경 ① 청사진 */}
        <div
          ref={bgBlueprintRef}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 55%, #12283A 0%, #0B1620 75%), #0B1620",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(150,205,230,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(150,205,230,0.07) 1px, transparent 1px), linear-gradient(rgba(150,205,230,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(150,205,230,0.035) 1px, transparent 1px)",
              backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
              maskImage: "radial-gradient(ellipse 75% 70% at 50% 55%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 55%, black 40%, transparent 100%)",
            }}
          />
        </div>
        {/* 배경 ② 새벽 숲 */}
        <div
          ref={bgForestRef}
          className="absolute inset-0"
          style={{
            opacity: 0,
            background:
              "radial-gradient(ellipse 70% 38% at 50% 100%, rgba(242,190,120,0.42) 0%, rgba(242,190,120,0.08) 55%, transparent 75%), radial-gradient(ellipse 50% 40% at 50% 40%, rgba(120,190,130,0.12), transparent 70%), linear-gradient(180deg, #050C0A 0%, #0A1A14 45%, #16291D 80%, #2A3520 100%)",
          }}
        />

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* 다이어그램 라벨 */}
        <div ref={labelsRef} className="pointer-events-none absolute inset-0" aria-hidden>
          {labels.map((l) => (
            <span
              key={l.id}
              data-id={l.id}
              className="absolute left-0 top-0 whitespace-nowrap leading-none"
              style={{
                opacity: 0,
                color: l.root ? "#FFFFFF" : "rgba(214,236,246,0.92)",
                fontWeight: l.root ? 700 : 500,
                letterSpacing: "-0.01em",
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              {l.label}
            </span>
          ))}
        </div>

        {/* 필름 그레인 */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* 문장 */}
        <div className="pointer-events-none absolute inset-x-0 top-[13vh] z-10 px-6 text-center">
          {[
            { t: "기획자는 매일 나무를 그립니다.", s: "로직 트리, 사이트맵, 의사결정 트리…" },
            { t: "모든 기획 다이어그램은 거꾸로 선 나무입니다.", s: "그래서, 뒤집어 세워 보았습니다." },
            { t: "10년 동안 그린 나무가 모여 숲이 되었습니다.", s: "여기는 기획의 숲입니다." },
          ].map((c, i) => (
            <div
              key={i}
              ref={(el) => { capRefs.current[i] = el; }}
              className="absolute inset-x-6"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="mx-auto max-w-[16em] break-keep font-[family-name:var(--font-gowun)] text-[1.6rem] font-bold leading-snug text-[#F3F0E6] md:max-w-none md:text-[2.6rem]">
                {c.t}
              </p>
              <p className="mt-3 text-sm tracking-wide text-[#F3F0E6]/55 md:text-base">{c.s}</p>
            </div>
          ))}
        </div>

        {/* 스크롤 안내 */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center text-[11px] tracking-[0.3em] text-[#CFE6F0]/60"
        >
          SCROLL
          <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-[#CFE6F0]/15">
            <div className="h-1/2 w-full animate-[practiceCue_1.8s_ease-in-out_infinite] bg-[#CFE6F0]/70" />
          </div>
        </div>
        <style>{`@keyframes practiceCue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
      </div>
    </div>
  );
}
