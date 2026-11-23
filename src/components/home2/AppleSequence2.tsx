'use client'

/* 히어로(THINK; PLAN; BUILD.) → 사과나무 → 황금 사과 낙하 → 금빛 확대 → 황금 숲의 도시(엔딩).
   매거진 칼럼 안에서 sticky로 고정되고, 스크롤한 만큼 장면이 진행된다.
   가만히 있어도 살아 있도록: 나무는 천천히 좌우로 돌고(드래그하면 손이 우선), 도시는 프레임이 계속 흐르며,
   두 장면 모두 숨 쉬듯 미세하게 확대되고 마우스를 따라 살짝 기울어지며 빛 입자가 떠다닌다.
   프레임: public/practice3/{o,f,c}/NNN.webp (o=나무 회전, f=사과 낙하, c=도시) */
/* /home2 — 위 홈 시퀀스의 복제본. 나무·낙하 장면만 새 영상 세 개로 바꿨다.
   l = 01 사과에 불이 켜짐(한 번), s = 02 빛나는 채로 대기(반복), f = 03 낙하(스크롤), c = Turn on the light(스크롤).
   새 영상은 서로 구름이 이어지지 않아서, 영상 사이를 XFADE초 겹쳐 섞는다. 나무 드래그 회전은 없다(연도 주석은 고정 좌표).
   원본은 사과가 왼쪽이라 왼쪽 제목에 가려져서, 프레임을 좌우로 뒤집어 사과를 오른쪽(기존 홈과 같은 자리)에 둔다. */

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { heroP2 } from '@/components/practice2/extra'
import p2 from '@/components/practice2/practice2.module.css'
import { useHairlineIntro } from '@/components/practice3/useHairlineIntro'
import s from '@/components/practice3/apple.module.css'

/* practice3 전용 히어로 문구 — 공용 heroP2는 건드리지 않고 lines·subtitle만 덮어쓴다 */
const heroP3 = {
  ...heroP2,
  lines: ['THINK;', 'PLAN;', 'BUILD.'],
  meta: 'PLANNING PRAXIS EST. 2021',
  subtitle: '생각이 아이디어로 열리고, 기획으로 익어, 하나의 숲이 됩니다.',
}

const COPYRIGHT = '© 기획의 숲' /* 공용 coda.copyright(수식어 포함)는 두고 홈에서만 짧게 */

/* 빛나는 사과의 중심과 반지름 (1280×720 기준, 뒤집은 프레임) — 01 후반·02 내내 거의 같은 자리 */
const GLOW = { x: 802, y: 432, r: 32 }
/* 도면 주석(2021 → 2026): 2021은 빛나는 사과, 2022~2026은 뒤쪽 풍경 (1280×720, 뒤집은 프레임).
   사과 오른쪽의 트인 풍경(산·숲·언덕)을 이어, 제목에 가리지 않게 오른쪽 위로 올라간다. 카메라가 고정이라 좌표도 고정 */
const HUD2 = [
  { year: 2022, x: 650, y: 372 }, /* 사과 뒤 큰 설산 능선 */
  { year: 2023, x: 705, y: 565 }, /* 앞쪽 단풍숲 */
  { year: 2024, x: 860, y: 545 }, /* 침엽수 숲 */
  { year: 2025, x: 1045, y: 503 }, /* 초록 언덕 */
  { year: 2026, x: 990, y: 447 }, /* 멀리 보이는 푸른 산 — 데스크톱 화면 오른쪽 끝(약 x 1120) 안쪽 */
]

/* 황금 사과 카드 — 뉴턴의 사과. 생각 → 번뜩임(아이디어) → 다듬기(기획) → 세상의 구조(사업)라는
   기획의 숲의 흐름을 실제 이야기 하나로 보여 준다. */
/* 뉴턴의 사과 카드 — 역사 설명이 아니라 "당연한 것에 던진 '왜?'"가 발견(기획)의 시작이라는 이야기 */
const NEWTON = {
  eyebrow: "NEWTON'S APPLE · 1666",
  title: '뉴턴의 사과',
  paras: [
    ['뉴턴은 떨어지는 사과에서 하나의 질문을 발견했고, 그 질문을 세상을 설명하는 법칙으로 발전시켰습니다.'],
  ],
  last: '기획도 이와 닮아 있습니다. 작은 아이디어에서 가능성을 발견하고, 그 가능성에 논리와 구조를 더해 현실에서 작동하는 사업으로 발전시키는 일입니다.',
}

/* 우하단 장면 번호 — sv(화면 높이 단위)가 이 값을 넘으면 다음 장면 */
const SCENES = [
  /* 기획의 숲의 흐름: 생각 → 아이디어 → 기획 → 사업 */
  { name: 'Thought', until: 1.65 }, /* 사과나무 — 수많은 생각, SCENE 01 카피가 떠 있는 동안 */
  { name: 'Idea', until: 2.75 }, /* 빛나는 사과가 떨어짐 — 번뜩인 아이디어 */
  { name: 'Plan', until: 3.75 }, /* 금빛이 차오름 — 아이디어를 다듬어 기획으로 */
  { name: 'Business', until: Infinity }, /* 황금 숲의 도시 — 사업이 됨 */
]
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/—·+'

const BASE = '/home2'
const N_L = 79 /* 01 불 켜짐 · 10fps */
const N_S = 63 /* 02 대기 · 8fps */
const N_F = 61 /* 03 낙하 · 12fps */
const N_C = 95 /* Turn on the light · 12fps — 밤의 사과나무 너머로 불이 차례로 켜진다 */
const L_FPS = 10, S_FPS = 8
const L_DUR = N_L / L_FPS, S_DUR = N_S / S_FPS
const XFADE = 0.8 /* 영상 사이를 겹쳐 섞는 시간(초) */
const L_GLOW_FROM = 0.55 /* 01 진행 55%쯤부터 사과가 빛난다 — 그 전엔 카드 힌트를 띄우지 않는다 */
/* 낙하 영상 마지막 프레임에서 사과가 놓인 위치 (1280×720 기준 비율, 뒤집은 프레임) */
const APPLE = { x: 790 / 1280, y: 552 / 720 }
/* 타임라인 — 단위: 화면 높이(vh).
   0 ~ 0.6   히어로 (사과나무 위의 SEED; TREE; FOREST.) → 스크롤하면 어두운 막이 걷힘
   0.9 ~ 3.4 사과 낙하 → 금빛 확대
   3.4 ~ 6.3 황금 도시
   6.3 ~ 7.2 엔딩 홀드 — 마지막 장면에 머물며 천천히 다가가고, 카피·서명이 내려앉는다
   7.2 ~ END 브랜드 — 「기획의 숲」이 스르륵 떠오른다 */
const T = {
  hero0: 0.1, hero1: 0.55,
  fall0: 0.9, fall1: 2.3, zoom0: 2.3, zoom1: 3.4,
  rev0: 3.4, rev1: 4.1, city0: 3.9, city1: 6.3,
  end0: 6.3, brand0: 7.2,
}
const END = 8.7
/* 섹션 높이 = (END + 1) × 100vh — 고정 100vh + 스크롤 END×100vh. CSS의 .seq 높이와 맞춘다 */

type Frame = { src: string; img: HTMLImageElement | null; ok: boolean }

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const seg = (v: number, a: number, b: number) => clamp((v - a) / (b - a), 0, 1)
const ease = (t: number) => t * t * (3 - 2 * t)
const easeIn = (t: number) => t * t * t
const easeOut = (t: number) => 1 - (1 - t) * (1 - t) * (1 - t)
/* 프레임레이트와 무관한 지수 감쇠 계수: rate가 클수록 빨리 따라간다 */
const damp = (rate: number, dt: number) => 1 - Math.exp(-rate * dt)

export default function AppleSequence2() {
  const seqRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroShadeRef = useRef<HTMLDivElement>(null)
  const bloomRef = useRef<HTMLDivElement>(null)
  const floodRef = useRef<HTMLDivElement>(null)
  const copy1Ref = useRef<HTMLDivElement>(null)
  const copy2Ref = useRef<HTMLDivElement>(null)
  const endShadeRef = useRef<HTMLDivElement>(null)
  const sigRef = useRef<HTMLDivElement>(null)
  const momentRef = useRef<HTMLParagraphElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  /* 황금 사과 호버 */
  const popRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const linkRef = useRef<SVGPathElement>(null)
  const hudRef = useRef<SVGSVGElement>(null)
  const hudPathRef = useRef<SVGPathElement>(null)
  const cardPosRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  /* 모서리 마이크로타이포 · 도면 주석 */
  const chromeRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<HTMLDivElement>(null)
  const blRef = useRef<HTMLDivElement>(null)
  const brRef = useRef<HTMLDivElement>(null)
  const sceneNoRef = useRef<HTMLSpanElement>(null)
  const sceneNameRef = useRef<HTMLSpanElement>(null)
  const progRef = useRef<HTMLElement>(null)
  const loadBarRef = useRef<HTMLElement>(null)
  const loadTxtRef = useRef<HTMLSpanElement>(null)

  /* 헤드라인 선 그리기가 끝난 뒤부터 힌트 링을 시작한다 */
  const onIntroDone = useCallback(() => {
    popRef.current?.classList.add(s.popReady)
    chromeRef.current?.classList.add(s.chromeIn)
  }, [])
  /* 암전: 검은 화면 위에서 글자가 그려지고, 채워지기 시작할 때 장면이 서서히 드러난다 */
  const blackoutRef = useRef<HTMLDivElement>(null)
  /* 암전이 걷히는 순간부터 01(불 켜짐)이 흐른다 */
  const revealAtRef = useRef(0)
  const onReveal = useCallback(() => {
    blackoutRef.current?.classList.add(s.blackoutOff)
    if (!revealAtRef.current) revealAtRef.current = performance.now()
  }, [])
  useHairlineIntro(heroRef, p2.hairline, onIntroDone, onReveal)

  useEffect(() => {
    const seq = seqRef.current, stage = stageRef.current, cv = cvRef.current
    const hero = heroRef.current, heroShade = heroShadeRef.current
    const bloom = bloomRef.current, flood = floodRef.current
    const copy1 = copy1Ref.current, copy2 = copy2Ref.current
    const endShade = endShadeRef.current, sig = sigRef.current, moment = momentRef.current
    const pop = popRef.current, anchor = anchorRef.current, btn = btnRef.current
    const link = linkRef.current, cardPos = cardPosRef.current, card = cardRef.current
    if (!seq || !stage || !cv || !hero || !heroShade || !bloom || !flood || !copy1 || !copy2 || !endShade || !sig || !moment) return
    if (!pop || !anchor || !btn || !link || !cardPos || !card) return
    const chrome = chromeRef.current, tl = tlRef.current, bl = blRef.current, br = brRef.current
    const sceneNo = sceneNoRef.current, sceneName = sceneNameRef.current, prog = progRef.current
    const hud = hudRef.current, hudPath = hudPathRef.current
    const brand = brandRef.current
    const loadBar = loadBarRef.current, loadTxt = loadTxtRef.current
    if (!chrome || !tl || !bl || !br || !sceneNo || !sceneName || !prog || !hud || !hudPath || !loadBar || !loadTxt || !brand) return
    const hudNodes = Array.from(hud.querySelectorAll<SVGGElement>('[data-node]'))
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const pad = (n: number) => String(n).padStart(3, '0')
    const mk = (dir: string, n: number, base = BASE): Frame[] =>
      Array.from({ length: n }, (_, i) => ({ src: `${base}/${dir}/${pad(i + 1)}.webp`, img: null, ok: false }))
    const L = mk('l', N_L), SB = mk('s', N_S), F = mk('f', N_F), C = mk('c', N_C)

    let alive = true
    const TOTAL = N_L + N_S + N_F + N_C
    let settled = 0
    /* 디코딩까지 끝난 프레임만 ok로 표시한다 — 그리는 순간에 메인 스레드에서 디코딩하며 버벅이지 않도록 */
    const load = (fr: Frame) =>
      new Promise<void>((res) => {
        if (fr.img) return res()
        const im = new Image()
        im.decoding = 'async'
        im.src = fr.src
        fr.img = im
        im.decode()
          .then(() => { fr.ok = true })
          .catch(() => {})
          .finally(() => { settled++; res() })
      })
    /* 로딩 순서: 세 시퀀스 모두 성기게(8장 간격) 먼저 받고 → 4 → 2 → 1장 간격으로 촘촘하게 채운다.
       같은 간격 안에서는 지금 보고 있는 장면의 시퀀스가 먼저다 — 빠르게 스크롤해도 근처 프레임이 이미 있다 */
    const order = () => (sv < T.fall0 ? [L, SB, F, C] : sv < T.rev0 ? [F, C, SB, L] : [C, F, SB, L])
    const pick = (): Frame | null => {
      for (const step of [8, 4, 2, 1]) {
        for (const list of order()) {
          for (let i = 0; i < list.length; i += step) if (!list[i].img) return list[i]
        }
      }
      return null
    }
    const worker = async () => {
      while (alive) {
        const fr = pick()
        if (!fr) return
        await load(fr)
      }
    }
    /* 두 프레임 사이를 섞어 그린다 — 프레임 수가 적어도 움직임이 끊기지 않게 */
    const blendDraw = (list: Frame[], idx: number, scale: number, ox: number, oy: number, alpha = 1) => {
      const i = clamp(idx, 0, list.length - 1)
      const a = Math.floor(i), b = Math.min(list.length - 1, a + 1), f = i - a
      const ia = list[a]?.ok ? list[a].img : nearest(list, i)
      draw(ia, scale, ox, oy, alpha)
      if (f > 0.02 && list[b]?.ok) draw(list[b].img, scale, ox, oy, f * alpha)
    }
    const nearest = (list: Frame[], idx: number) => {
      const k = clamp(Math.round(idx), 0, list.length - 1)
      for (let d = 0; d < list.length; d++) {
        if (list[k - d]?.ok) return list[k - d].img
        if (list[k + d]?.ok) return list[k + d].img
      }
      return null
    }

    let W = 0, H = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      W = stage.clientWidth; H = stage.clientHeight
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(stage)
    resize()

    /* 세로 화면에선 가운데만 잘려 사과가 오른쪽 끝에 걸리므로, 보이는 영역을 사과 쪽(오른쪽)으로 옮긴다.
       가로 화면(W/H ≥ 1)은 그대로 가운데. */
    const cover = () => {
      const k = Math.max(W / 1280, H / 720)
      const w = 1280 * k, h = 720 * k
      const fx = 0.5 + 0.1 * clamp((1 - W / H) / 0.5, 0, 1)
      return { w, h, x: clamp(W / 2 - w * fx, W - w, 0), y: (H - h) / 2 }
    }
    const draw = (img: HTMLImageElement | null, scale: number, ox: number, oy: number, alpha = 1) => {
      if (!img) return
      const c = cover(), k = cv.width / W
      ctx.globalAlpha = alpha
      ctx.drawImage(img, (ox + (c.x - ox) * scale) * k, (oy + (c.y - oy) * scale) * k, c.w * scale * k, c.h * scale * k)
      ctx.globalAlpha = 1
    }

    /* 스크롤 진행도 (vh 단위) */
    let svT = 0, sv = 0
    const onScroll = () => {
      const top = seq.getBoundingClientRect().top
      svT = -top / window.innerHeight
      /* 무대가 화면 위에 붙기 전(잡지 페이지 상단 여백 구간)엔 하단 모서리를 그만큼 올려 첫 화면에서도 보이게 */
      chrome.style.setProperty('--lift', `${Math.max(0, top).toFixed(0)}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    sv = svT

    /* 히어로 구간(시퀀스 시작 지점) — 황금 사과 카드가 뜨는 구간 */
    const canDrag = () => svT < 0.12
    cv.classList.add(s.canvasLocked) /* 드래그 회전이 없으니 손 모양 커서도 없다 */

    /* 나무 장면: 01을 한 번 → 02를 반복. 02의 끝과 다음 반복의 처음은 XFADE초 겹쳐 섞는다.
       lt = 암전이 걷힌 뒤 흐른 시간(초), alpha = 이 장면 전체의 불투명도(낙하로 넘어갈 때 섞기용) */
    const drawTree = (lt: number, alpha = 1) => {
      if (reduce) { blendDraw(SB, 0, 1, 0, 0, alpha); return }
      const lEnd = L_DUR - XFADE
      if (lt < lEnd) { blendDraw(L, lt * L_FPS, 1, 0, 0, alpha); return }
      const st = lt - lEnd /* 02가 시작된 뒤 흐른 시간 */
      const P = S_DUR - XFADE
      const k = Math.floor(st / P), a = st - k * P
      if (a < XFADE) {
        /* 겹치는 구간: 앞 영상(처음엔 01의 끝, 그다음부턴 02의 끝) 위에 새 02가 서서히 */
        if (k === 0) blendDraw(L, Math.min(lt * L_FPS, N_L - 1), 1, 0, 0, alpha)
        else blendDraw(SB, (a + P) * S_FPS, 1, 0, 0, alpha)
        blendDraw(SB, a * S_FPS, 1, 0, 0, alpha * ease(a / XFADE))
      } else blendDraw(SB, a * S_FPS, 1, 0, 0, alpha)
    }


    /* 마우스를 따라 장면이 살짝 기운다 */
    let mx = 0, my = 0, smx = 0, smy = 0
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      mx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1)
      my = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1)
    }
    window.addEventListener('pointermove', onMove)

    /* 빛 입자 — 미리 그린 스프라이트를 가산 합성으로 */
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    {
      const g = sprite.getContext('2d')!
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32)
      gr.addColorStop(0, 'rgba(255,248,220,1)')
      gr.addColorStop(0.18, 'rgba(255,222,150,0.85)')
      gr.addColorStop(0.45, 'rgba(255,180,80,0.25)')
      gr.addColorStop(1, 'rgba(255,160,60,0)')
      g.fillStyle = gr
      g.fillRect(0, 0, 64, 64)
    }
    type Mote = { x: number; y: number; z: number; vx: number; vy: number; ph: number; sp: number }
    const motes: Mote[] = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random(), z: 0.35 + Math.random() * 0.65,
      vx: (Math.random() - 0.5) * 0.006, vy: -(0.004 + Math.random() * 0.012),
      ph: Math.random() * Math.PI * 2, sp: 0.6 + Math.random() * 1.6,
    }))
    const drawMotes = (t: number, dt: number, amount: number, k: number) => {
      if (amount <= 0.01) return
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const n = Math.round(motes.length * Math.min(1, amount))
      for (let i = 0; i < n; i++) {
        const m = motes[i]
        m.x += (m.vx + Math.sin(t * 0.4 + m.ph) * 0.004) * dt * m.z
        m.y += m.vy * dt * m.z
        if (m.y < -0.05) { m.y = 1.05; m.x = Math.random() }
        if (m.x < -0.05) m.x = 1.05
        if (m.x > 1.05) m.x = -0.05
        const tw = 0.45 + 0.55 * Math.sin(t * m.sp + m.ph)
        const r = (4 + 10 * m.z) * k
        const px = (m.x * W + smx * 18 * m.z) * k, py = (m.y * H + smy * 10 * m.z) * k
        ctx.globalAlpha = Math.max(0, tw) * 0.75 * amount * m.z
        ctx.drawImage(sprite, px - r, py - r, r * 2, r * 2)
      }
      ctx.restore()
    }

    /* ---------- 황금 사과 호버 카드 ----------
       열림/닫힘은 클래스 하나(popOpen)로 전환하고, 순서(빛 → 선 → 카드)는 CSS transition-delay가 맡는다.
       위치는 매 프레임 사과를 따라 ref로 직접 갱신한다. */
    let popOpen = false, popActive = false
    let closeTimer = 0
    let downAt: { x: number; y: number; type: string; onBtn: boolean; onCard?: boolean } | null = null
    const setOpen = (v: boolean) => {
      window.clearTimeout(closeTimer)
      scrambles.forEach((v) => window.clearInterval(v))
      if (v === popOpen) return
      popOpen = v
      pop.classList.toggle(s.popOpen, v)
      btn.setAttribute('aria-expanded', String(v))
    }
    const scheduleClose = () => { window.clearTimeout(closeTimer); closeTimer = window.setTimeout(() => setOpen(false), 250) }
    const cancelClose = () => window.clearTimeout(closeTimer)

    const onBtnEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse' && popActive) setOpen(true) }
    const onBtnLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') scheduleClose() }
    const onCardEnter = () => cancelClose()
    const onCardLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') scheduleClose() }
    const onBtnDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY, type: e.pointerType, onBtn: true } }
    const onCvDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY, type: e.pointerType, onBtn: false } }
    const onCardDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY, type: e.pointerType, onBtn: false, onCard: true } }
    const onUp = (e: PointerEvent) => {
      const d = downAt
      downAt = null
      if (!d || d.type === 'mouse') return
      const tap = Math.hypot(e.clientX - d.x, e.clientY - d.y) < 8
      /* 터치: 이동 8px 미만이면 탭 → 사과는 열고 닫기, 카드(좁은 화면에선 사과 가까이 뜬다)는 닫기 */
      if (tap && d.onBtn && popActive) setOpen(!popOpen)
      else if (tap && d.onCard) setOpen(false)
    }
    /* 카드 밖이나 사과 밖을 누르면 닫힌다 */
    const onDocDown = (e: PointerEvent) => {
      const tgt = e.target as Node
      if (popOpen && !card.contains(tgt) && !btn.contains(tgt)) setOpen(false)
    }
    /* 키보드: 포커스 = 호버, Enter/Space = 토글 */
    /* 마우스로 눌러 생긴 포커스는 무시하고, 키보드 포커스(:focus-visible)일 때만 연다 */
    const onFocus = () => { if (popActive && btn.matches(':focus-visible')) setOpen(true) }
    const onBlur = () => scheduleClose()
    const onClick = (e: MouseEvent) => { if (e.detail === 0 && popActive) setOpen(!popOpen) }
    btn.addEventListener('pointerenter', onBtnEnter)
    btn.addEventListener('pointerleave', onBtnLeave)
    btn.addEventListener('pointerdown', onBtnDown)
    btn.addEventListener('focus', onFocus)
    btn.addEventListener('blur', onBlur)
    btn.addEventListener('click', onClick)
    card.addEventListener('pointerenter', onCardEnter)
    card.addEventListener('pointerleave', onCardLeave)
    card.addEventListener('pointerdown', onCardDown)
    cv.addEventListener('pointerdown', onCvDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerdown', onDocDown, true)

    /* ---------- 장면 번호: 글자가 해독되듯 바뀐다 ---------- */
    const scrambles = new Map<HTMLElement, number>()
    const scrambleTo = (el: HTMLElement, text: string) => {
      window.clearInterval(scrambles.get(el))
      if (reduce) { el.textContent = text; return }
      let step = 0
      const total = 14
      const id = window.setInterval(() => {
        step++
        const done = Math.floor((step / total) * text.length)
        el.textContent = text.split('').map((ch, i) => (i < done || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('')
        if (step >= total) { window.clearInterval(id); el.textContent = text }
      }, 32)
      scrambles.set(el, id)
    }
    let scene = -1
    let shownSettled = -1
    /* 장면 카피의 아이브로도 처음 나타날 때 한 번 해독된다 */
    const copyEyebrows = [copy1, copy2].map((el) => el.querySelector<HTMLElement>('[data-scramble]'))
    const copyShown = [false, false]


    let raf = 0
    let last = performance.now()
    const frame = () => {
      raf = requestAnimationFrame(frame)
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const t = now / 1000
      if (svT < -1.2 || svT > END + 0.4) return /* 화면 밖이면 쉬기 */
      /* 시간 기반 감쇠 — 60Hz든 120Hz든 같은 무게감 (60fps에서 프레임당 0.16과 같은 값) */
      sv += (svT - sv) * damp(10.5, dt)
      if (Math.abs(svT - sv) < 0.0005) sv = svT
      /* 글자가 그려지는 중에 먼저 스크롤해 암전이 걷혔다면 그때부터 흐른다 */
      if (!revealAtRef.current && sv > T.hero0) revealAtRef.current = now
      const lt = revealAtRef.current ? (now - revealAtRef.current) / 1000 : 0

      smx += (mx - smx) * damp(2.2, dt)
      smy += (my - smy) * damp(2.2, dt)

      const c = cover()
      const ax = c.x + APPLE.x * c.w, ay = c.y + APPLE.y * c.h
      const fallP = seg(sv, T.fall0, T.fall1)
      const zoomP = seg(sv, T.zoom0, T.zoom1)
      const revP = seg(sv, T.rev0, T.rev1)
      const cityP = seg(sv, T.city0, T.city1)
      const endP = seg(sv, T.end0, T.brand0)
      const brandP = seg(sv, T.brand0, END)
      /* 장면 전체 변형: 숨 쉬는 확대 + 마우스 기울기 (가장자리가 비지 않도록 기본 3.5% 확대) */
      const live = reduce ? 0 : 1
      const breathe = 1.035 + live * 0.012 * Math.sin(t * 0.35)
      const pxOff = live * -smx * 16, pyOff = live * -smy * 9
      const kk = cv.width / W
      const tx = (x: number) => W / 2 + (x - W / 2) * breathe + pxOff
      const ty = (y: number) => H / 2 + (y - H / 2) * breathe + pyOff

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = '#0d1220'
      ctx.fillRect(0, 0, cv.width, cv.height)
      ctx.setTransform(breathe, 0, 0, breathe, (W / 2 * (1 - breathe) + pxOff) * kk, (H / 2 * (1 - breathe) + pyOff) * kk)
      let motesAmt = 0
      if (revP > 0) {
        /* 밤 장면: 금빛 속에서 1.12 → 1.0으로 내려앉고, 엔딩 홀드에서는 다시 아주 천천히 다가간다.
           불이 켜지는 영상이라 앞뒤로 흐르면 꺼졌다 켜졌다 하므로, 스크롤만큼 켜지고 끝에선 다 켜진 채로 머문다. */
        const settle = 1.12 - 0.12 * ease(revP)
        const push = 1 + 0.045 * easeOut(seg(sv, T.city1 - 1.2, END))
        const idx = cityP * (N_C - 1)
        blendDraw(C, idx, settle * push, W / 2, H * 0.46)
        motesAmt = ease(revP)
      } else if (sv <= T.fall0) {
        drawTree(lt)
        motesAmt = 0.45
      } else {
        blendDraw(F, fallP * (N_F - 1), 1 + easeIn(zoomP) * 13, ax, ay)
        /* 대기 장면 → 낙하 첫 장면: 구름이 이어지지 않아 낙하 초반에 겹쳐 섞는다 */
        const mix = 1 - ease(seg(fallP, 0, 0.12))
        if (mix > 0.01) drawTree(lt, mix)
        motesAmt = 0.45 * (1 - zoomP)
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      if (!reduce) drawMotes(t, dt, motesAmt, kk)

      /* 히어로: 스크롤하면 위로 살짝 떠오르며 사라지고, 왼쪽의 어두운 막이 걷힌다 */
      const heroOut = ease(seg(sv, T.hero0, T.hero1))
      hero.style.opacity = String(1 - heroOut)
      hero.style.transform = `translateY(${-48 * heroOut}px)`
      hero.style.visibility = heroOut >= 1 ? 'hidden' : 'visible'
      heroShade.style.opacity = String(1 - ease(seg(sv, T.hero0, T.hero1 + 0.25)))
      /* 글자가 그려지는 중에 먼저 스크롤하면 기다리지 않고 암전을 걷는다 */
      if (sv > T.hero0 && blackoutRef.current) blackoutRef.current.classList.add(s.blackoutOff)

      /* 황금 사과 위치: 원본 좌표(프레임 보간) → cover() → 장면 변형 tx/ty */
      const glowOn = reduce || lt > L_DUR * L_GLOW_FROM
      const active = canDrag() && heroOut < 0.5 && L[0].ok && glowOn
      if (active !== popActive) {
        popActive = active
        pop.classList.toggle(s.popActive, active)
        btn.tabIndex = active ? 0 : -1
        if (!active) { setOpen(false); if (document.activeElement === btn) btn.blur() }
      }
      if (active) {
        const kc = c.w / 1280
        const px = tx(c.x + GLOW.x * kc), py = ty(c.y + GLOW.y * kc)
        const pr = GLOW.r * kc * breathe
        anchor.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`
        anchor.style.setProperty('--r', `${pr.toFixed(1)}px`)

        /* 카드: 사과 오른쪽 위 (중심 +60, −40)에 왼쪽 아래 모서리. 오른쪽이 넘치면 왼쪽 위로 뒤집는다 */
        if (window.innerWidth > 760) {
          const cw = card.offsetWidth, ch = card.offsetHeight
          const dir = px + 60 + cw > W - 16 ? -1 : 1
          const cornerX = px + dir * 60, cornerY = py - 40
          const left = dir === 1 ? cornerX : cornerX - cw
          const top = clamp(cornerY - ch, 16, H - ch - 16)
          cardPos.style.transform = `translate(${left.toFixed(1)}px,${top.toFixed(1)}px)`
          /* 헤어라인: 사과 가장자리 → 살짝 꺾여 → 카드 모서리 */
          const sx = px + dir * pr * 0.78, sy = py - pr * 0.78
          /* 화면 높이가 모자라 카드가 아래로 밀려도, 선은 카드의 실제 아래 모서리에 닿는다 */
          const ey = top + ch
          const elbowX = sx + dir * Math.min(18, Math.abs(cornerX - sx) * 0.5)
          link.setAttribute('d', `M${sx.toFixed(1)} ${sy.toFixed(1)} L${elbowX.toFixed(1)} ${ey.toFixed(1)} L${cornerX.toFixed(1)} ${ey.toFixed(1)}`)
        } else {
          cardPos.style.transform = ''
        }
      }

      /* 도면 주석: 빛나는 사과(2021)에서 시작해 해마다 늘어난 열매를 얇은 선으로 잇는다 (홈과 같은 방식) */
      if (active) {
        const kc = c.w / 1280
        const pts = [GLOW, ...HUD2].map((n) => [tx(c.x + n.x * kc), ty(c.y + n.y * kc)])
        hudPath.setAttribute('d', pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '))
        hudNodes.forEach((n, i) => n.setAttribute('transform', `translate(${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)})`))
      }

      /* 모서리: 매니페스토·스크롤 안내는 히어로와 함께 사라지고, 로고와 장면 번호는 끝까지 남는다.
         금빛이 화면을 채울 땐 글자색이 금빛 위에서 읽히는 짙은 갈색으로 바뀐다 */
      const floodO = revP > 0 ? 1 - ease(revP) : ease(seg(zoomP, 0.55, 1))
      chrome.classList.toggle(s.chromeOnGold, floodO > 0.5)
      bl.style.opacity = String(1 - heroOut)
      br.style.opacity = String(1 - ease(seg(endP, 0.2, 0.5)))
      tl.style.opacity = String(1 - 0.35 * ease(seg(endP, 0.2, 0.6)))
      const sc = SCENES.findIndex((x) => sv < x.until)
      if (sc !== scene) {
        scene = sc
        scrambleTo(sceneNo, String(sc + 1).padStart(2, '0'))
        scrambleTo(sceneName, SCENES[sc].name)
      }
      prog.style.transform = `scaleX(${clamp(sv / END, 0, 1).toFixed(4)})`
      /* 로딩 진행: 받은 만큼 진행선 뒤에 옅게 깔리고, 다 받으면 Ready로 해독된 뒤 사라진다 */
      if (settled !== shownSettled) {
        shownSettled = settled
        const pct = Math.round((settled / TOTAL) * 100)
        loadBar.style.transform = `scaleX(${(settled / TOTAL).toFixed(3)})`
        if (settled >= TOTAL) {
          scrambleTo(loadTxt, 'Ready')
          window.setTimeout(() => loadTxt.classList.add(s.loadDone), 1400)
        } else {
          loadTxt.textContent = `Loading ${String(pct).padStart(3, '0')}`
        }
      }

      /* 떨어진 사과의 빛이 화면 전체로 커진다 */
      const diag = Math.hypot(W, H)
      const bs = 0.5 + easeIn(zoomP) * ((diag * 3.4) / 200)
      const bx = tx(ax) + (W / 2 - tx(ax)) * ease(zoomP), by = ty(ay) + (H / 2 - ty(ay)) * ease(zoomP)
      bloom.style.transform = `translate(${bx}px,${by}px) scale(${bs})`
      bloom.style.opacity = String(revP > 0 ? 0 : seg(zoomP, 0, 0.18))
      flood.style.opacity = String(revP > 0 ? 1 - ease(revP) : ease(seg(zoomP, 0.55, 1)))
      /* 금빛이 화면을 채우는 순간의 한 줄 — 금빛이 걷힐 때 함께 사라진다 */
      moment.style.opacity = String(revP > 0 ? 1 - ease(seg(revP, 0, 0.5)) : ease(seg(zoomP, 0.6, 0.95)))

      /* SCENE 01 카피 — 히어로가 걷힌 뒤 잠깐 */
      const o1 = ease(seg(sv, 0.45, 0.8)) * (1 - ease(seg(sv, 1.25, 1.65)))
      copy1.style.opacity = String(o1)
      if (o1 > 0.05 && !copyShown[0] && copyEyebrows[0]) { copyShown[0] = true; scrambleTo(copyEyebrows[0], copyEyebrows[0].dataset.scramble || '') }
      if (o1 < 0.01) copyShown[0] = false
      copy1.style.transform = `translateY(${18 * (1 - ease(seg(sv, 0.45, 0.8))) - 28 * seg(sv, 1.25, 1.65)}px)`

      /* SCENE 02 카피 — 도시가 다 펼쳐질 즈음 떠오르고, 엔딩에서 살짝 위로 자리를 내준다 */
      const t2 = ease(seg(sv, T.city1 - 1.1, T.city1 - 0.3))
      const out2 = ease(seg(brandP, 0, 0.2))
      copy2.style.opacity = String(t2 * (1 - out2))
      if (t2 > 0.05 && !copyShown[1] && copyEyebrows[1]) { copyShown[1] = true; scrambleTo(copyEyebrows[1], copyEyebrows[1].dataset.scramble || '') }
      if (t2 < 0.01) copyShown[1] = false
      copy2.style.transform = `translateY(${24 * (1 - t2) - 36 * ease(seg(endP, 0.15, 0.7)) - 48 * out2}px)`

      /* 엔딩: 가장자리부터 밤이 내려앉고, 서명이 마지막으로 남는다 */
      endShade.style.opacity = String(ease(endP))
      const so = ease(seg(endP, 0.35, 0.85))
      sig.style.opacity = String(so)
      sig.style.transform = `translateY(${16 * (1 - so)}px)`
      sig.style.pointerEvents = so > 0.6 ? 'auto' : 'none'

      /* 브랜드: 앞 문구가 빠지자마자 흐림 → 선명 페이드인 (딤 없이 도시 위에 바로) */
      brand.classList.toggle(s.brandIn, brandP > 0.16)
    }

    /* 첫 프레임 먼저(그동안은 <img> 포스터가 같은 장면을 보여 준다), 나머지는 우선순위대로 백그라운드 로드 */
    Promise.all([load(L[0]), load(SB[0]), load(F[0])]).then(() => {
      if (!alive) return
      raf = requestAnimationFrame(frame)
      Promise.all(Array.from({ length: 6 }, worker))
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onMove)
      window.clearTimeout(closeTimer)
      btn.removeEventListener('pointerenter', onBtnEnter)
      btn.removeEventListener('pointerleave', onBtnLeave)
      btn.removeEventListener('pointerdown', onBtnDown)
      btn.removeEventListener('focus', onFocus)
      btn.removeEventListener('blur', onBlur)
      btn.removeEventListener('click', onClick)
      card.removeEventListener('pointerenter', onCardEnter)
      card.removeEventListener('pointerleave', onCardLeave)
      card.removeEventListener('pointerdown', onCardDown)
      cv.removeEventListener('pointerdown', onCvDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerdown', onDocDown, true)
    }
  }, [])

  return (
    <section ref={seqRef} aria-label="사과나무에서 황금 숲의 도시로" className={s.seq}>
      <div ref={stageRef} className={s.stage}>
        {/* 첫 프레임 포스터 — JS가 프레임을 받아 캔버스에 그리기 전까지 빈 화면 대신 같은 장면을 보여 준다 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/l/001.webp`} alt="" aria-hidden="true" className={s.poster} fetchPriority="high" decoding="async" />
        <canvas ref={cvRef} className={s.canvas} aria-hidden="true" />
        <div className={s.shade} />
        <div ref={heroShadeRef} className={s.heroShade} />
        <div ref={blackoutRef} className={s.blackout} aria-hidden="true" />
        <div ref={bloomRef} className={s.bloom} />
        <div ref={floodRef} className={s.flood} />
        <p ref={momentRef} className={s.moment} style={{ opacity: 0 }} aria-hidden="true">아이디어가 기획이 되는 순간.</p>

        {/* 히어로 — 사과나무를 배경으로 */}
        <div ref={heroRef} className={s.hero}>
          <div className={s.heroInner}>
            <div data-hero style={{ opacity: 0 }}>
              <h1 className={`${p2.h1} ${s.heroH1}`}>
                {heroP3.lines.map((l) => <span key={l} className={p2.hLine}>{l}</span>)}
              </h1>
            </div>
            <p data-after className={`${p2.subtitle} ${s.heroSub}`} style={{ opacity: 0 }}>{heroP3.subtitle}</p>
          </div>
        </div>

        {/* 황금 사과 — 힌트 링 · 빛 · 히트 영역 · 헤어라인 · 카드 */}
        <div ref={popRef} className={s.pop}>
          <svg ref={hudRef} className={s.hud} aria-hidden="true">
            <path ref={hudPathRef} pathLength={1} />
            {[2021, ...HUD2.map((n) => n.year)].map((y, i) => (
              <g key={y} data-node className={i === 0 ? s.hudGold : undefined} style={{ '--i': i } as React.CSSProperties}>
                <path d="M-4 0H4M0 -4V4" />
                <text x="9" y="-7">{y}</text>
              </g>
            ))}
          </svg>
          <svg className={s.popLine} aria-hidden="true"><path ref={linkRef} pathLength={1} /></svg>
          <div ref={anchorRef} className={s.anchor}>
            <span className={s.glow} aria-hidden="true" />
            <span className={s.ring} aria-hidden="true" />
            <button ref={btnRef} type="button" className={s.appleBtn} tabIndex={-1}
              aria-label="뉴턴의 사과 이야기 보기" aria-expanded="false" aria-controls="newton-card" />
          </div>
          <div ref={cardPosRef} className={s.cardPos}>
            <div ref={cardRef} id="newton-card" role="note" aria-label={NEWTON.title} className={s.card}>
              <p className={`${s.eyebrow} ${s.cardEyebrow}`} style={{ '--i': 0 } as React.CSSProperties}>{NEWTON.eyebrow}</p>
              <p className={s.cardTitle} style={{ '--i': 1 } as React.CSSProperties}>{NEWTON.title}</p>
              {NEWTON.paras.map((lines, pi) => (
                <p key={pi} className={s.cardBody} style={{ '--i': pi + 2 } as React.CSSProperties}>
                  {lines.map((l, li) => <span key={li}>{l}{li < lines.length - 1 && <br />}</span>)}
                </p>
              ))}
              <p className={s.cardLast} style={{ '--i': NEWTON.paras.length + 2 } as React.CSSProperties}>{NEWTON.last}</p>
            </div>
          </div>
        </div>

        {/* 네 모서리 마이크로타이포 */}
        <div ref={chromeRef} className={s.chrome}>
          <div ref={tlRef} className={`${s.corner} ${s.tl}`}>
            <span className={s.cStrong}>{'// '}{heroP3.eyebrow.split(' · ')[0]}</span>
            <span>{heroP3.meta}</span>
          </div>
          <div ref={blRef} className={`${s.corner} ${s.bl}`}>
            <div className={s.cue}>
              <span className={s.cueTrack} aria-hidden="true"><i /></span>
              <span>Scroll down.</span>
              <span className={s.cueDim}>Gravity does the rest.</span>
            </div>
          </div>
          <div ref={brRef} className={`${s.corner} ${s.br}`} aria-live="off">
            <span ref={loadTxtRef} className={`${s.cDim} ${s.loadTxt}`}>Loading 000</span>
            <span className={s.sceneRow}>
              <span ref={sceneNoRef} className={s.cStrong}>01</span>
              <span className={s.cDim}>/ {String(SCENES.length).padStart(2, '0')}</span>
              <span ref={sceneNameRef}>{SCENES[0].name}</span>
            </span>
            <span className={s.prog} aria-hidden="true"><i ref={loadBarRef} className={s.progLoad} /><i ref={progRef} /></span>
          </div>
        </div>

        <div ref={copy1Ref} className={s.copy} style={{ opacity: 0 }}>
          <p className={s.eyebrow} data-scramble="[ 01 ] — Thought">[ 01 ] — Thought</p>
          <p className={s.line}>수많은 생각 중 하나에,<br />어느 날 <span className={s.gold}>불이 켜집니다.</span></p>
        </div>

        <div ref={endShadeRef} className={s.endShade} style={{ opacity: 0 }} />
        <div ref={copy2Ref} className={`${s.copy} ${s.copyCenter}`}>
          <p className={s.eyebrow} data-scramble="[ 04 ] — Business">[ 04 ] — Business</p>
          <p className={`${s.line} ${s.lineBig}`}>생각은 숲이 되고,<br /><span className={s.gold}>눈부신 발전을 이룹니다.</span></p>
        </div>
        <div ref={brandRef} className={s.brand}>
          <span className={s.brandGlow} aria-hidden="true" />
          <p className={s.brandEyebrow}>{'// Forest of Thought'}</p>
          <h2 className={s.brandWord}>기획의 숲</h2>
          <div className={s.brandFoot}>
            <span className={s.brandRule} aria-hidden="true" />
            <p className={s.brandTag}>Think; Plan; Build.</p>
          </div>
        </div>
        <div ref={sigRef} className={s.sig} style={{ opacity: 0 }}>
          <span><Link href="/blog" className={s.sigLink}>기획자의 생각 읽어보기 →</Link></span>
          <button type="button" className={s.toTop} aria-label="맨 위로" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className={s.toTopFill} aria-hidden="true" />
            {/* 마우스를 올리면 금색 화살표가 위로 빠지고, 어두운 화살표가 아래에서 올라온다 (transform만) */}
            <span className={s.toTopIcon} aria-hidden="true">
              {[s.toTopA, s.toTopB].map((c) => (
                <svg key={c} className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 16.5V3.75" />
                  <path d="M4.75 9 10 3.75 15.25 9" />
                </svg>
              ))}
            </span>
          </button>
          <span>{COPYRIGHT}</span>
        </div>
      </div>
    </section>
  )
}
