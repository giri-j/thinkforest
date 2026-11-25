'use client'

/* 히어로(THINK; PLAN; BUILD.) → 사과나무 → 황금 사과 낙하 → 금빛 확대 → 밤의 사과나무에 불이 켜짐(엔딩).
   매거진 칼럼 안에서 sticky로 고정되고, 스크롤한 만큼 장면이 진행된다.
   가만히 있어도 살아 있도록: 나무는 천천히 좌우로 돌고(드래그하면 손이 우선), 엔딩은 불 켜진 밤 영상이 반복되며,
   두 장면 모두 숨 쉬듯 미세하게 확대되고 마우스를 따라 살짝 기울어지며 빛 입자가 떠다닌다.
   프레임: public/practice3/{o,f,t,n}/NNN.webp (o=나무 회전, f=사과 낙하, t=Turn on the light(스크롤로 불이 켜짐), n=hero-loop(다 켜진 뒤 반복, 영상 재생이 막힐 때의 대체 프레임)) */

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { heroP2 } from '@/components/practice2/extra'
import p2 from '@/components/practice2/practice2.module.css'
import { useHairlineIntro } from './useHairlineIntro'
import { HUD_NODES } from './appleNodes'
import s from './apple.module.css'

/* practice3 전용 히어로 문구 — 공용 heroP2는 건드리지 않고 lines·subtitle만 덮어쓴다 */
const heroP3 = {
  ...heroP2,
  lines: ['THINK', 'PLAN', 'BUILD'],
  subtitle: '아이디어가 기획을 만나, 사업으로 자라납니다.',
}

const COPYRIGHT = '© 기획의 숲' /* 공용 coda.copyright(수식어 포함)는 두고 홈에서만 짧게 */

/* 회전 프레임별 황금 사과 중심 (1280×720 원본 좌표). index = orb 프레임 */
const APPLE_TRACK: [number, number][] = [[753,360],[753,360],[754,359],[754,360],[753,359],[753,359],[753,359],[753,359],[754,358],[754,358],[753,358],[754,358],[752,357],[753,357],[752,356],[752,356],[752,356],[752,356],[753,356],[751,355],[752,354],[752,355],[751,354],[750,354],[751,354],[752,354],[750,353],[750,352],[750,352],[749,352],[749,352],[749,351],[748,351],[748,351],[747,350],[746,350],[746,349],[746,349],[745,349],[744,349],[744,348],[744,348],[743,348],[742,347],[742,347],[742,346],[741,346],[741,346],[743,346],[743,345],[741,345],[741,345],[741,344],[740,344],[738,344],[738,344],[736,344],[736,343],[735,343],[734,342],[734,342],[734,341],[734,341],[734,340],[733,339],[733,339],[732,339],[731,339],[729,338],[728,338],[727,337],[726,337],[725,336],[724,336],[723,335],[722,335],[721,334],[720,334],[719,334],[717,333],[717,333],[715,332],[712,332],[711,332],[710,331],[708,330],[706,330],[705,330],[702,329],[701,328],[700,328],[698,328],[696,328],[695,327],[694,327]]

/* 황금 사과 카드 — 뉴턴의 사과. 생각 → 번뜩임(아이디어) → 다듬기(기획) → 세상의 구조(사업)라는
   기획의 숲의 흐름을 실제 이야기 하나로 보여 준다. */
/* 뉴턴의 사과 카드 — 사과에서 찾은 질문이 법칙이 되듯, 작은 아이디어가 논리와 구조를 얻어 사업이 된다는 이야기 */
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

const BASE = '/practice3'
const N_O = 95
const N_F = 85 /* 원본 24fps 43장 + 사이사이 모션 보간 42장 — 낙하가 뚝뚝 끊기지 않게 */
const N_TL = 95 /* Turn on the light · 12fps — 스크롤한 만큼 불이 켜진다 */
const N_ON = 56 /* hero-loop · 8fps — 스크롤을 다 내린 뒤 배경(영상이 막힐 때 대체용) */
const ON_FPS = 8
const ON_DUR = N_ON / ON_FPS
const XFADE = 0.8 /* 대체 프레임으로 반복할 때 이음새를 겹쳐 섞는 시간(초) */
/* 낙하 영상 마지막 프레임에서 빛나는 사과가 놓인 위치 (1280×720 기준 비율) */
const APPLE = { x: 805 / 1280, y: 627 / 720 }
/* 엔딩 배경에서 왼쪽 두 번째 큰 슈퍼트리 — hero-loop 원본 프레임(16:9) 기준 비율(0~1).
   숫자만 바꾸면 위치가 맞춰진다. 주소에 ?debug=1을 붙이면 호버 영역이 테두리로 보인다.
   (이전 값 — 가운데 가장 큰 슈퍼트리: cx 0.57, cy 0.53, x 0.47~0.67, y 0.47~0.85, r 0.043) */
const SUPERTREE = {
  cx: 0.2875, cy: 0.6, /* 갓 중심 — 링과 빛이 여기서 퍼진다 */
  x0: 0.2125, x1: 0.3625, /* 호버 영역 가로 (갓 + 기둥) */
  y0: 0.56, y1: 0.84, /* 호버 영역 세로 */
  r: 0.032, /* 링 반지름 (프레임 너비 대비) */
}
/* 세로 화면(휴대폰 등)에선 위 나무가 잘려 보이지 않는다 — 그때는 화면에 보이는 왼쪽 큰 슈퍼트리(가운데 큰 나무 바로 왼쪽)로 */
const SUPERTREE_PORTRAIT = {
  cx: 0.422, cy: 0.65,
  x0: 0.365, x1: 0.475,
  y0: 0.615, y1: 0.8,
  r: 0.024,
}
const SUPERTREE_CARD = {
  eyebrow: 'SUPERTREE · SINGAPORE',
  title: 'Gardens by the Bay',
  paras: [
    '싱가포르 마리나 베이의 랜드마크, 슈퍼트리입니다.',
    "싱가포르의 국가 비전인 '정원 속 도시'를 하나의 풍경으로 보여준 사례이자, 그 풍경만으로 싱가포르에 오고 싶게 만드는 관광 랜드마크입니다. 매일 밤 열리는 라이트쇼는 시즌마다 새로운 테마로 바뀌어, 한 번 보고 끝나지 않고 다시 찾을 이유를 만듭니다.",
  ],
  last: '비전을 보여주고, 사람을 부르고, 다시 오게 만드는 잘 설계된 기획 구조물입니다.',
}
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
/* 머무는 구간 — 스크롤은 계속되지만 장면은 그 자리에 멈춰, 빨리 내려도 핵심 장면을 놓치지 않게 한다.
   at: 멈출 지점(장면 시간, vh), len: 그 지점에 머무는 스크롤 길이(vh). 스크롤을 멈춘 곳이 구간 바로 앞뒤면 구간 안으로 살짝 끌어당긴다 */
const HOLDS = [
  { at: T.zoom1, len: 0.9 }, /* 금빛이 다 차서 '아이디어가 기획이 되는 순간.'이 온전히 보이는 때 */
]
const HOLD_TOTAL = HOLDS.reduce((a, h) => a + h.len, 0)
/* 실제 스크롤 길이(vh) = 장면 길이 + 머무는 구간 */
const SCROLL_END = END + HOLD_TOTAL
/* 실제 스크롤 위치 → 장면 시간. 머무는 구간 안에서는 장면 시간이 멈춘다 */
const toStory = (raw: number) => {
  let off = 0
  for (const h of HOLDS) {
    const start = h.at + off
    if (raw < start) return raw - off
    if (raw < start + h.len) return h.at
    off += h.len
  }
  return raw - off
}
/* 각 머무는 구간의 실제 스크롤 시작 위치 */
const HOLD_RAW = HOLDS.map((h, i) => ({ start: h.at + HOLDS.slice(0, i).reduce((a, x) => a + x.len, 0), len: h.len }))
const SNAP_BEFORE = 0.45 /* 구간 앞 이만큼 안에서 멈추면 구간 안으로 (글자가 떠오르는 중) */
const SNAP_AFTER = 0.35 /* 구간 뒤 이만큼 안에서 멈추면 구간 끝으로 (글자가 사라지는 중) */
/* 금빛이 화면을 채우는 순간의 한 줄 */
const MOMENT = '아이디어가 기획이 되는 순간.'
/* 섹션 높이 = (SCROLL_END + 1) × 100vh — 고정 100vh + 스크롤 SCROLL_END×100vh. (.seq를 /home2와 같이 쓰므로 높이는 인라인으로) */

type Frame = { src: string; img: HTMLImageElement | null; ok: boolean }

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const seg = (v: number, a: number, b: number) => clamp((v - a) / (b - a), 0, 1)
const ease = (t: number) => t * t * (3 - 2 * t)
const easeIn = (t: number) => t * t * t
const easeOut = (t: number) => 1 - (1 - t) * (1 - t) * (1 - t)
/* 프레임레이트와 무관한 지수 감쇠 계수: rate가 클수록 빨리 따라간다 */
const damp = (rate: number, dt: number) => 1 - Math.exp(-rate * dt)

export default function AppleSequence() {
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
  const cardPosRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  /* 엔딩 슈퍼트리 호버 — 사과와 같은 구조(링 · 빛 · 히트 영역 · 헤어라인 · 카드) */
  const treePopRef = useRef<HTMLDivElement>(null)
  const treeAnchorRef = useRef<HTMLDivElement>(null)
  const treeBtnRef = useRef<HTMLButtonElement>(null)
  const treeLinkRef = useRef<SVGPathElement>(null)
  const treeCardPosRef = useRef<HTMLDivElement>(null)
  const treeCardRef = useRef<HTMLDivElement>(null)
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
  const hudRef = useRef<SVGSVGElement>(null)
  const hudPathRef = useRef<SVGPathElement>(null)

  /* 헤드라인 선 그리기가 끝난 뒤부터 힌트 링을 시작한다 */
  const onIntroDone = useCallback(() => {
    popRef.current?.classList.add(s.popReady)
    chromeRef.current?.classList.add(s.chromeIn)
  }, [])
  /* 암전: 검은 화면 위에서 글자가 그려지고, 채워지기 시작할 때 장면이 서서히 드러난다 */
  const blackoutRef = useRef<HTMLDivElement>(null)
  const onReveal = useCallback(() => blackoutRef.current?.classList.add(s.blackoutOff), [])
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
    const tPop = treePopRef.current, tAnchor = treeAnchorRef.current, tBtn = treeBtnRef.current
    const tLink = treeLinkRef.current, tCardPos = treeCardPosRef.current, tCard = treeCardRef.current
    if (!tPop || !tAnchor || !tBtn || !tLink || !tCardPos || !tCard) return
    tPop.classList.toggle(s.treeDebug, new URLSearchParams(window.location.search).get('debug') === '1')
    const chrome = chromeRef.current, tl = tlRef.current, bl = blRef.current, br = brRef.current
    const sceneNo = sceneNoRef.current, sceneName = sceneNameRef.current, prog = progRef.current
    const hud = hudRef.current, hudPath = hudPathRef.current
    const brand = brandRef.current
    const loadBar = loadBarRef.current, loadTxt = loadTxtRef.current
    if (!chrome || !tl || !bl || !br || !sceneNo || !sceneName || !prog || !hud || !hudPath || !loadBar || !loadTxt || !brand) return
    const hudNodes = Array.from(hud.querySelectorAll<SVGGElement>('[data-node]'))
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const pad = (n: number) => String(n).padStart(3, '0')
    const mk = (dir: string, n: number): Frame[] =>
      Array.from({ length: n }, (_, i) => ({ src: `${BASE}/${dir}/${pad(i + 1)}.webp`, img: null, ok: false }))
    const O = mk('o', N_O), F = mk('f', N_F), TL = mk('t', N_TL), ON = mk('n', N_ON)

    let alive = true
    const TOTAL = N_O + N_F + N_TL + N_ON
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
    const order = () => (sv < T.fall0 ? [O, F, TL, ON] : sv < T.rev0 ? [F, TL, ON, O] : [TL, ON, F, O])
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

    const cover = () => {
      const k = Math.max(W / 1280, H / 720)
      const w = 1280 * k, h = 720 * k
      return { w, h, x: (W - w) / 2, y: (H - h) / 2 }
    }
    const draw = (img: CanvasImageSource | null, scale: number, ox: number, oy: number, alpha = 1) => {
      if (!img) return
      const c = cover(), k = cv.width / W
      ctx.globalAlpha = alpha
      ctx.drawImage(img, (ox + (c.x - ox) * scale) * k, (oy + (c.y - oy) * scale) * k, c.w * scale * k, c.h * scale * k)
      ctx.globalAlpha = 1
    }

    /* 스크롤 진행도 (vh 단위) */
    let svT = 0, sv = 0, rawT = 0
    /* 스크롤을 멈춘 곳이 머무는 구간 바로 앞뒤면 구간 안으로 부드럽게 끌어당긴다.
       스크롤하는 동안·손가락을 대고 있는 동안·끌어당기는 중에는 개입하지 않는다 */
    let idleTimer = 0, touching = false, magnetUntil = 0
    const magnet = () => {
      if (reduce || touching || performance.now() < magnetUntil) return
      for (const h of HOLD_RAW) {
        let target: number | null = null
        if (rawT >= h.start - SNAP_BEFORE && rawT < h.start) target = h.start + 0.12
        else if (rawT > h.start + h.len && rawT <= h.start + h.len + SNAP_AFTER) target = h.start + h.len - 0.12
        if (target !== null) {
          magnetUntil = performance.now() + 900
          window.scrollTo({ top: window.scrollY + (target - rawT) * window.innerHeight, behavior: 'smooth' })
          return
        }
      }
    }
    const onTouchStart = () => { touching = true; window.clearTimeout(idleTimer) }
    const onTouchEnd = () => { touching = false; window.clearTimeout(idleTimer); idleTimer = window.setTimeout(magnet, 220) }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    const onScroll = () => {
      const top = seq.getBoundingClientRect().top
      rawT = -top / window.innerHeight
      svT = toStory(rawT)
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(magnet, 220)
      /* 무대가 화면 위에 붙기 전(잡지 페이지 상단 여백 구간)엔 하단 모서리를 그만큼 올려 첫 화면에서도 보이게 */
      chrome.style.setProperty('--lift', `${Math.max(0, top).toFixed(0)}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    sv = svT

    /* 드래그로 나무 돌리기 — 히어로 구간(시퀀스 시작 지점)에서만 */
    let orbT = 0, orb = 0, dragging = false, lastX = 0
    const IDLE_AMP = 26, IDLE_PERIOD = 16
    let idleBase = 0, idlePhase = 0, idleW = 0, lastInput = -10
    const canDrag = () => svT < 0.12
    const down = (e: PointerEvent) => { if (!canDrag()) return; dragging = true; orbT = orb; idleW = 0; lastX = e.clientX; cv.classList.add(s.canvasDrag) }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      orbT = clamp(orbT + (e.clientX - lastX) * (N_O / Math.max(600, W)) * 1.1, 0, N_O - 1)
      lastX = e.clientX
    }
    const up = () => { dragging = false; cv.classList.remove(s.canvasDrag) }
    cv.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
    let popOpen = false, popActive = false, frozen = false, prevOrb = 0
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

    const onBtnEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse' && popActive && !dragging) setOpen(true) }
    const onBtnLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') scheduleClose() }
    const onCardEnter = () => cancelClose()
    const onCardLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') scheduleClose() }
    /* 버튼 위에서 시작한 pointerdown도 나무 드래그로 넘긴다 */
    const onBtnDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY, type: e.pointerType, onBtn: true }; down(e) }
    const onCvDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY, type: e.pointerType, onBtn: false } }
    const onCardDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY, type: e.pointerType, onBtn: false, onCard: true } }
    const onDragMove = (e: PointerEvent) => {
      /* 실제로 끌기 시작하면(8px 이상) 카드를 닫아 나무 돌리기에 자리를 내준다 */
      if (downAt && dragging && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) >= 8) setOpen(false)
    }
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
    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerdown', onDocDown, true)

    /* ---------- 엔딩 슈퍼트리 호버 카드 ----------
       사과와 같은 규칙: 마우스는 호버로 열고(250ms 여유를 두고 닫힘), 터치는 탭으로 열고 닫고,
       키보드는 포커스로 열고 Enter/Space로 토글. 불이 다 켜진 뒤(hero-loop로 넘어간 뒤)에만 활성화된다 */
    let treeOpen = false, treeActive = false, treeCloseTimer = 0, treeDim = 0
    let tBtnType = 'mouse', tCardType = 'mouse'
    let tBox = { x: 0, y: 0, w: 0, h: 0 }
    const setTreeOpen = (v: boolean) => {
      window.clearTimeout(treeCloseTimer)
      if (v === treeOpen) return
      treeOpen = v
      tPop.classList.toggle(s.popOpen, v)
      tBtn.setAttribute('aria-expanded', String(v))
    }
    const scheduleTreeClose = () => { window.clearTimeout(treeCloseTimer); treeCloseTimer = window.setTimeout(() => setTreeOpen(false), 250) }
    const onTBtnEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse' && treeActive) setTreeOpen(true) }
    const onTLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') scheduleTreeClose() }
    const onTCardEnter = () => window.clearTimeout(treeCloseTimer)
    const onTBtnDown = (e: PointerEvent) => { tBtnType = e.pointerType }
    const onTCardDown = (e: PointerEvent) => { tCardType = e.pointerType }
    /* 마우스 클릭은 호버가 맡으니 무시하고, 터치 탭과 키보드(Enter/Space, detail 0)만 토글한다 */
    const onTClick = (e: MouseEvent) => { if (treeActive && (e.detail === 0 || tBtnType !== 'mouse')) setTreeOpen(!treeOpen) }
    const onTCardClick = () => { if (tCardType !== 'mouse') setTreeOpen(false) }
    const onTFocus = () => { if (treeActive && tBtn.matches(':focus-visible')) setTreeOpen(true) }
    const onTBlur = () => scheduleTreeClose()
    const onTDocDown = (e: PointerEvent) => {
      const tgt = e.target as Node
      if (treeOpen && !tCard.contains(tgt) && !tBtn.contains(tgt)) setTreeOpen(false)
    }
    /* Esc — 사과 카드와 슈퍼트리 카드 모두 닫는다 */
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (popOpen) setOpen(false)
      if (treeOpen) setTreeOpen(false)
    }
    tBtn.addEventListener('pointerenter', onTBtnEnter)
    tBtn.addEventListener('pointerleave', onTLeave)
    tBtn.addEventListener('pointerdown', onTBtnDown)
    tBtn.addEventListener('focus', onTFocus)
    tBtn.addEventListener('blur', onTBlur)
    tBtn.addEventListener('click', onTClick)
    tCard.addEventListener('pointerenter', onTCardEnter)
    tCard.addEventListener('pointerleave', onTLeave)
    tCard.addEventListener('pointerdown', onTCardDown)
    tCard.addEventListener('click', onTCardClick)
    document.addEventListener('pointerdown', onTDocDown, true)
    document.addEventListener('keydown', onKey)

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

    /* 나무 자동 회전 — 정면(0)에서 IDLE_AMP 프레임까지 천천히 오가는 카메라 흔들림.
       드래그하면 멈추고, 손을 뗀 뒤 잠시 후 그 자리에서 이어서 다시 흔들린다. */
    /* 엔딩 배경(hero-loop) — Turn on the light와 같은 구도에서 불이 다 켜진 채 은은하게 움직이는 영상.
       8fps 프레임으론 끊겨 보여서 24fps 반복용 mp4(끝이 처음으로 섞여 들어가게 미리 만든 영상)를 캔버스에 그리고,
       자동재생이 막힌 환경(저전력 모드 등)이나 움직임 줄이기 설정에선 아래 프레임(drawOn)으로 대신한다 */
    const onVid = document.createElement('video')
    let onVidSrc = false /* 금빛 장면에 들어설 때 받기 시작한다 — 끝까지 내리지 않는 방문자는 받지 않는다 */
    onVid.muted = true
    onVid.loop = true
    onVid.playsInline = true
    onVid.preload = 'auto'
    onVid.setAttribute('playsinline', '')
    let onVidWanted = false
    /* 프레임 대체용: 시간으로 흐르며 반복, 처음과 끝은 XFADE초 겹쳐 섞는다 */
    let onT = 0
    const drawOn = (t: number, scale: number, ox: number, oy: number, alpha: number) => {
      if (reduce) { blendDraw(ON, 0, scale, ox, oy, alpha); return }
      const P = ON_DUR - XFADE
      const k = Math.floor(t / P), a = t - k * P
      if (k > 0 && a < XFADE) {
        blendDraw(ON, (a + P) * ON_FPS, scale, ox, oy, alpha)
        blendDraw(ON, a * ON_FPS, scale, ox, oy, alpha * ease(a / XFADE))
      } else blendDraw(ON, a * ON_FPS, scale, ox, oy, alpha)
    }

    let raf = 0
    let endS = 1 /* 엔딩 배경을 그린 배율 (settle × push) */
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
      const locked = !canDrag()
      if (locked) { orbT = 0; dragging = false; idleW = 0; idlePhase = 0; idleBase = 0 }
      if (dragging) { lastInput = t; idleW = 0 }
      /* 카드가 열려 있는 동안엔 나무를 부드럽게 멈춘다 — 지금 속도로 조금 더 미끄러진 자리에서 정지.
         닫히면 기존 idle 재시작 로직(lastInput + 1.6초)이 그대로 이어받는다 */
      if (popOpen) {
        if (!frozen) { orbT = clamp(orb + (orb - prevOrb) * 10, 0, N_O - 1); idleW = 0; frozen = true }
        lastInput = t
      } else frozen = false
      prevOrb = orb
      let target = orbT
      if (!locked && !dragging && !reduce && t - lastInput > 1.6) {
        if (idleW === 0) { idleBase = Math.min(orbT, N_O - 1 - IDLE_AMP); idlePhase = 0 }
        idleW = Math.min(1, idleW + dt / 1.5)
        idlePhase += (dt / IDLE_PERIOD) * Math.PI * 2
        target = idleBase + (orbT - idleBase) * (1 - idleW) + idleW * IDLE_AMP * (1 - Math.cos(idlePhase)) / 2
      }
      orb += (target - orb) * damp(locked ? 7.7 : 13.4, dt) /* 60fps에서 0.12 / 0.2 */
      if (Math.abs(target - orb) < 0.005) orb = target
      cv.classList.toggle(s.canvasLocked, locked)

      smx += (mx - smx) * damp(2.2, dt)
      smy += (my - smy) * damp(2.2, dt)

      const c = cover()
      const ax = c.x + APPLE.x * c.w, ay = c.y + APPLE.y * c.h
      const fallP = orb > 0.6 ? 0 : seg(sv, T.fall0, T.fall1)
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
      if (!onVidSrc && !reduce && sv > T.zoom0) { onVidSrc = true; onVid.src = `${BASE}/hero-loop.mp4` }
      if (revP > 0) {
        /* 밤 장면: 금빛 속에서 1.12 → 1.0으로 내려앉고, 엔딩 홀드에서는 다시 아주 천천히 다가간다.
           스크롤하는 동안은 Turn on the light가 스크롤만큼 진행되며 불이 켜지고(앞뒤로 흐르면 꺼졌다 켜지므로 스크롤에만 묶는다),
           다 내리면 같은 구도의 hero-loop로 넘어가 배경으로 반복된다 */
        const settle = 1.12 - 0.12 * ease(revP)
        const push = 1 + 0.045 * easeOut(seg(sv, T.city1 - 1.2, END))
        endS = settle * push /* 슈퍼트리 호버 영역이 같은 배율을 따른다 */
        const onMix = ease(seg(sv, T.city1 - 0.35, T.city1 + 0.25))
        if (sv > T.city1 - 0.4) onT += dt
        else if (sv < T.city1 - 0.6) onT = 0 /* 다시 올라갔다 내려오면 처음부터 */
        if (onMix < 1) blendDraw(TL, cityP * (N_TL - 1), settle * push, W / 2, H * 0.46)
        /* 엔딩 직전부터 영상을 미리 재생해 두고, 멀어지면 멈춘다 */
        const want = !reduce && sv > T.city1 - 0.6
        if (want !== onVidWanted) {
          onVidWanted = want
          if (want) onVid.play().catch(() => {})
          else onVid.pause()
        }
        if (onMix > 0) {
          if (want && !onVid.paused && onVid.readyState >= 2) draw(onVid, settle * push, W / 2, H * 0.46, onMix)
          else drawOn(onT, settle * push, W / 2, H * 0.46, onMix)
        }
        motesAmt = ease(revP)
      } else if (orb > 0.6 || sv <= T.fall0) {
        if (onVidWanted) { onVidWanted = false; onVid.pause() }
        blendDraw(O, orb, 1, 0, 0)
        if (orb <= 1 && F[0].ok) draw(F[0].img, 1, 0, 0, 1 - orb) /* 낙하 영상 첫 프레임으로 자연스럽게 정착 */
        motesAmt = 0.45
      } else {
        blendDraw(F, fallP * (N_F - 1), 1 + easeIn(zoomP) * 13, ax, ay)
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
      const active = canDrag() && heroOut < 0.5 && O[0].ok
      if (active !== popActive) {
        popActive = active
        pop.classList.toggle(s.popActive, active)
        btn.tabIndex = active ? 0 : -1
        if (!active) { setOpen(false); if (document.activeElement === btn) btn.blur() }
      }
      if (active) {
        const fi = clamp(orb, 0, APPLE_TRACK.length - 1)
        const a0 = Math.floor(fi), a1 = Math.min(APPLE_TRACK.length - 1, a0 + 1), af = fi - a0
        const ox = APPLE_TRACK[a0][0] + (APPLE_TRACK[a1][0] - APPLE_TRACK[a0][0]) * af
        const oy = APPLE_TRACK[a0][1] + (APPLE_TRACK[a1][1] - APPLE_TRACK[a0][1]) * af
        const kc = c.w / 1280
        const px = tx(c.x + ox * kc), py = ty(c.y + oy * kc)
        const pr = (18 + (28 - 18) * (fi / 94)) * kc * breathe
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

      /* 도면 주석: 황금 사과(2021)에서 시작해 해마다 늘어난 열매를 얇은 선으로 잇는다 */
      if (active) {
        const fi = clamp(orb, 0, N_O - 1)
        const a0 = Math.floor(fi), a1 = Math.min(N_O - 1, a0 + 1), af = fi - a0
        const kc = c.w / 1280
        const at = (tr2: number[]) => {
          const x = tr2[a0 * 2] + (tr2[a1 * 2] - tr2[a0 * 2]) * af
          const y = tr2[a0 * 2 + 1] + (tr2[a1 * 2 + 1] - tr2[a0 * 2 + 1]) * af
          return [tx(c.x + x * kc), ty(c.y + y * kc)]
        }
        const g0 = APPLE_TRACK[a0], g1 = APPLE_TRACK[a1]
        const pts = [[tx(c.x + (g0[0] + (g1[0] - g0[0]) * af) * kc), ty(c.y + (g0[1] + (g1[1] - g0[1]) * af) * kc)], ...HUD_NODES.map((n) => at(n.track))]
        hudPath.setAttribute('d', pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '))
        hudNodes.forEach((n, i) => n.setAttribute('transform', `translate(${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)})`))
      }

      /* 엔딩 슈퍼트리: 불이 다 켜지고 hero-loop로 넘어간 뒤부터 링이 돌고 호버가 열린다.
         위치는 사과와 같은 방식 — 원본 비율 → cover() → 엔딩 배율(endS, 중심 W/2·H*0.46) → 장면 변형 tx/ty — 을 매 프레임 계산한다 */
      const oy0 = H * 0.46
      const fx = (u: number) => tx(W / 2 + (c.x + u * c.w - W / 2) * endS)
      const fy = (v: number) => ty(oy0 + (c.y + v * c.h - oy0) * endS)
      /* 세로로 좁은 화면에선 영상 가장자리가 잘린다 — 기본 나무가 화면 밖이면 세로용 나무로, 그마저 밖이면 쉰다 */
      const onScreen = (u: number) => fx(u) > 24 && fx(u) < W - 24
      const ST = onScreen(SUPERTREE.cx) ? SUPERTREE : SUPERTREE_PORTRAIT
      const tActive = revP >= 1 && sv > T.city1 + 0.25 && onScreen(ST.cx)
      if (tActive !== treeActive) {
        treeActive = tActive
        tPop.classList.toggle(s.popActive, tActive)
        tBtn.tabIndex = tActive ? 0 : -1
        if (!tActive) { setTreeOpen(false); if (document.activeElement === tBtn) tBtn.blur() }
      }
      if (tActive) {
        const px = fx(ST.cx), py = fy(ST.cy)
        const pr = ST.r * c.w * endS * breathe
        tAnchor.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`
        tAnchor.style.setProperty('--r', `${pr.toFixed(1)}px`)
        /* 히트 영역: 화면 안으로 자르고, 서명 줄(링크·맨 위로)은 가리지 않게 그 위에서 멈춘다 */
        const sigTop = sig.offsetTop - 8
        const bx0 = clamp(fx(ST.x0), 0, W), bx1 = clamp(fx(ST.x1), 0, W)
        const by0 = clamp(fy(ST.y0), 0, H), by1 = clamp(fy(ST.y1), 0, Math.min(H, sigTop))
        const nb = { x: bx0, y: by0, w: Math.max(0, bx1 - bx0), h: Math.max(0, by1 - by0) }
        tBtn.style.transform = `translate(${nb.x.toFixed(1)}px,${nb.y.toFixed(1)}px)`
        if (Math.abs(nb.w - tBox.w) > 0.5 || Math.abs(nb.h - tBox.h) > 0.5) {
          tBtn.style.width = `${nb.w.toFixed(1)}px`
          tBtn.style.height = `${nb.h.toFixed(1)}px`
          tBox = nb
        }

        /* 카드: 호버 영역 오른쪽, 갓 높이 근처. 오른쪽이 넘치면 왼쪽으로 뒤집고, 위아래는 화면 안으로 맞춘다 */
        if (window.innerWidth > 760) {
          const cw = tCard.offsetWidth, ch = tCard.offsetHeight
          const gap = 28
          const dir = bx1 + gap + cw > W - 16 ? -1 : 1
          const left = dir === 1 ? bx1 + gap : bx0 - gap - cw
          const top = clamp(py - ch * 0.35, 16, H - ch - 16)
          tCardPos.style.transform = `translate(${left.toFixed(1)}px,${top.toFixed(1)}px)`
          /* 헤어라인: 갓 가장자리 → 살짝 꺾여 → 카드 옆면 */
          const sx = px + dir * pr * 0.9, sy = py
          const ex = dir === 1 ? left : left + cw
          const ey = clamp(py, top + 18, top + ch - 18)
          const elbowX = ex - dir * Math.min(18, Math.abs(ex - sx) * 0.5)
          tLink.setAttribute('d', `M${sx.toFixed(1)} ${sy.toFixed(1)} L${elbowX.toFixed(1)} ${ey.toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(1)}`)
        } else {
          tCardPos.style.transform = ''
        }
      }
      /* 카드가 열려 있는 동안 가운데 카피·로고를 흐리게 — 시간 기반으로 부드럽게 */
      treeDim += ((treeOpen ? 1 : 0) - treeDim) * damp(9, dt)
      if (treeDim < 0.001) treeDim = 0

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
      const mo = revP > 0 ? 1 - ease(seg(revP, 0, 0.5)) : ease(seg(zoomP, 0.6, 0.95))
      moment.style.opacity = String(mo)
      /* 나타나기 시작하면 글자들이 왼쪽부터 차례로 들어오고, 완전히 사라지면 다음 번을 위해 되돌린다 */
      if (mo > 0.02) moment.classList.add(s.momentOn)
      else if (mo < 0.005) moment.classList.remove(s.momentOn)

      /* SCENE 01 카피 — 히어로가 걷힌 뒤 잠깐 */
      const o1 = ease(seg(sv, 0.45, 0.8)) * (1 - ease(seg(sv, 1.25, 1.65)))
      copy1.style.opacity = String(o1)
      if (o1 > 0.05 && !copyShown[0] && copyEyebrows[0]) { copyShown[0] = true; scrambleTo(copyEyebrows[0], copyEyebrows[0].dataset.scramble || '') }
      if (o1 < 0.01) copyShown[0] = false
      copy1.style.transform = `translateY(${18 * (1 - ease(seg(sv, 0.45, 0.8))) - 28 * seg(sv, 1.25, 1.65)}px)`

      /* SCENE 02 카피 — 도시가 다 펼쳐질 즈음 떠오르고, 엔딩에서 살짝 위로 자리를 내준다 */
      const t2 = ease(seg(sv, T.city1 - 1.1, T.city1 - 0.3))
      const out2 = ease(seg(brandP, 0, 0.2))
      copy2.style.opacity = String(t2 * (1 - out2) * (1 - 0.85 * treeDim))
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
      brand.style.opacity = treeDim > 0 ? (1 - 0.85 * treeDim).toFixed(3) : ''
    }

    /* 첫 프레임 먼저(그동안은 <img> 포스터가 같은 장면을 보여 준다), 나머지는 우선순위대로 백그라운드 로드 */
    Promise.all([load(O[0]), load(F[0])]).then(() => {
      if (!alive) return
      raf = requestAnimationFrame(frame)
      Promise.all(Array.from({ length: 6 }, worker))
    })

    return () => {
      alive = false
      onVid.pause()
      if (onVidSrc) { onVid.removeAttribute('src'); onVid.load() }
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(idleTimer)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onMove)
      cv.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
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
      window.removeEventListener('pointermove', onDragMove)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerdown', onDocDown, true)
      window.clearTimeout(treeCloseTimer)
      tBtn.removeEventListener('pointerenter', onTBtnEnter)
      tBtn.removeEventListener('pointerleave', onTLeave)
      tBtn.removeEventListener('pointerdown', onTBtnDown)
      tBtn.removeEventListener('focus', onTFocus)
      tBtn.removeEventListener('blur', onTBlur)
      tBtn.removeEventListener('click', onTClick)
      tCard.removeEventListener('pointerenter', onTCardEnter)
      tCard.removeEventListener('pointerleave', onTLeave)
      tCard.removeEventListener('pointerdown', onTCardDown)
      tCard.removeEventListener('click', onTCardClick)
      document.removeEventListener('pointerdown', onTDocDown, true)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <section ref={seqRef} aria-label="사과나무에서 황금 숲의 도시로" className={s.seq} style={{ height: `${(SCROLL_END + 1) * 100}vh` }}>
      <div ref={stageRef} className={s.stage}>
        {/* 첫 프레임 포스터 — JS가 프레임을 받아 캔버스에 그리기 전까지 빈 화면 대신 같은 장면을 보여 준다 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/f/001.webp`} alt="" aria-hidden="true" className={s.poster} fetchPriority="high" decoding="async" />
        <canvas ref={cvRef} className={s.canvas} aria-hidden="true" />
        <div className={s.shade} />
        <div ref={heroShadeRef} className={s.heroShade} />
        <div ref={blackoutRef} className={s.blackout} aria-hidden="true" />
        <div ref={bloomRef} className={s.bloom} />
        <div ref={floodRef} className={s.flood} />
        <p ref={momentRef} className={s.moment} style={{ opacity: 0 }} aria-hidden="true">
          {/* 한 글자씩 왼쪽부터 스르륵 — 단어 단위로 묶어 줄바꿈(keep-all)은 그대로 */}
          {(() => {
            let i = 0
            return MOMENT.split(' ').map((w, wi, arr) => (
              <span key={wi} className={s.mWord}>
                {[...w].map((ch) => <span key={i} className={s.mChar} style={{ '--i': i++ } as React.CSSProperties}>{ch}</span>)}
                {wi < arr.length - 1 && ' '}
              </span>
            ))
          })()}
        </p>

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
            {[2021, ...HUD_NODES.map((n) => n.year)].map((y, i) => (
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
            <span className={s.cStrong}>{'// ThinkForest'}</span>
          </div>
          <div ref={blRef} className={`${s.corner} ${s.bl}`}>
            <div className={s.cue}>
              <span className={s.cueTrack} aria-hidden="true"><i /></span>
              <span>Scroll down.</span>
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
          <p className={s.line}>문득 떠오른 영감,<br /><span className={s.gold}>위대한 시작</span>이 될지도 모릅니다.</p>
        </div>

        <div ref={endShadeRef} className={s.endShade} style={{ opacity: 0 }} />
        <div ref={copy2Ref} className={`${s.copy} ${s.copyCenter}`}>
          <p className={s.eyebrow} data-scramble="[ 04 ] — Business">[ 04 ] — Business</p>
          <p className={`${s.line} ${s.lineBig}`}>생각은 사업이 되어<br /><span className={s.gold}>눈부신 발전을 이룹니다.</span></p>
        </div>
        <div ref={brandRef} className={s.brand}>
          <span className={s.brandGlow} aria-hidden="true" />
          <p className={s.brandEyebrow}>{'// ThinkForest'}</p>
          <h2 className={s.brandWord}>기획의 숲</h2>
          <div className={s.brandFoot}>
            <span className={s.brandRule} aria-hidden="true" />
            <p className={s.brandTag}>Think Plan Build</p>
          </div>
        </div>

        {/* 엔딩 슈퍼트리 — 사과와 같은 링 · 빛 · 헤어라인 · 카드. 히트 영역만 갓 + 기둥을 덮는 사각형 */}
        <div ref={treePopRef} className={`${s.pop} ${s.popReady} ${s.treePop}`}>
          <svg className={s.popLine} aria-hidden="true"><path ref={treeLinkRef} pathLength={1} /></svg>
          <div ref={treeAnchorRef} className={s.anchor}>
            <span className={s.glow} aria-hidden="true" />
            <span className={s.ring} aria-hidden="true" />
          </div>
          <button ref={treeBtnRef} type="button" className={s.treeBtn} tabIndex={-1}
            aria-label="Gardens by the Bay 설명 보기" aria-expanded="false" aria-controls="supertree-card" />
          <div ref={treeCardPosRef} className={s.cardPos}>
            <div ref={treeCardRef} id="supertree-card" role="note" aria-label={SUPERTREE_CARD.title} className={s.card}>
              <p className={`${s.eyebrow} ${s.cardEyebrow}`} style={{ '--i': 0 } as React.CSSProperties}>{SUPERTREE_CARD.eyebrow}</p>
              <p className={s.cardTitle} style={{ '--i': 1 } as React.CSSProperties}>{SUPERTREE_CARD.title}</p>
              {SUPERTREE_CARD.paras.map((t, i) => (
                <p key={i} className={s.cardBody} style={{ '--i': i + 2 } as React.CSSProperties}>{t}</p>
              ))}
              <p className={s.cardLast} style={{ '--i': SUPERTREE_CARD.paras.length + 2 } as React.CSSProperties}>{SUPERTREE_CARD.last}</p>
            </div>
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
