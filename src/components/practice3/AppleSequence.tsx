'use client'

/* 사과나무 → 황금 사과 낙하 → 금빛 확대 → 황금 숲의 도시.
   매거진 칼럼 안에서 sticky로 고정되고, 스크롤한 만큼만 프레임이 넘어간다.
   프레임: public/practice3/{o,f,c}/NNN.webp (o=나무 회전, f=사과 낙하, c=도시) */

import { useEffect, useRef } from 'react'
import s from './apple.module.css'

const BASE = '/practice3'
const N_O = 95
const N_F = 43
const N_C = 95
/* 낙하 영상 마지막 프레임에서 빛나는 사과가 놓인 위치 (1280×720 기준 비율) */
const APPLE = { x: 805 / 1280, y: 627 / 720 }
/* 타임라인 — 단위: 화면 높이(vh). 섹션 높이 700vh = 고정 100vh + 스크롤 600vh */
const T = { fall0: 0.4, fall1: 1.8, zoom0: 1.8, zoom1: 2.9, rev0: 2.9, rev1: 3.6, city0: 3.4, city1: 5.8 }

type Frame = { src: string; img: HTMLImageElement | null; ok: boolean }

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const seg = (v: number, a: number, b: number) => clamp((v - a) / (b - a), 0, 1)
const ease = (t: number) => t * t * (3 - 2 * t)
const easeIn = (t: number) => t * t * t

export default function AppleSequence() {
  const seqRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const bloomRef = useRef<HTMLDivElement>(null)
  const floodRef = useRef<HTMLDivElement>(null)
  const copy1Ref = useRef<HTMLDivElement>(null)
  const copy2Ref = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const seq = seqRef.current, stage = stageRef.current, cv = cvRef.current
    const bloom = bloomRef.current, flood = floodRef.current
    const copy1 = copy1Ref.current, copy2 = copy2Ref.current, meta = metaRef.current
    if (!seq || !stage || !cv || !bloom || !flood || !copy1 || !copy2 || !meta) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const pad = (n: number) => String(n).padStart(3, '0')
    const mk = (dir: string, n: number): Frame[] =>
      Array.from({ length: n }, (_, i) => ({ src: `${BASE}/${dir}/${pad(i + 1)}.webp`, img: null, ok: false }))
    const O = mk('o', N_O), F = mk('f', N_F), C = mk('c', N_C)

    let alive = true
    let dirty = true
    const load = (fr: Frame) =>
      new Promise<void>((res) => {
        if (fr.img) return res()
        const im = new Image()
        im.decoding = 'async'
        im.onload = () => { fr.ok = true; dirty = true; res() }
        im.onerror = () => res()
        im.src = fr.src
        fr.img = im
      })
    const loadAll = async (list: Frame[]) => {
      let i = 0
      const worker = async () => { while (alive && i < list.length) await load(list[i++]) }
      await Promise.all(Array.from({ length: 6 }, worker))
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
      dirty = true
    }
    const ro = new ResizeObserver(resize)
    ro.observe(stage)
    resize()

    const cover = () => {
      const k = Math.max(W / 1280, H / 720)
      const w = 1280 * k, h = 720 * k
      return { w, h, x: (W - w) / 2, y: (H - h) / 2 }
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
    const onScroll = () => { svT = -seq.getBoundingClientRect().top / window.innerHeight }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    /* 드래그로 나무 돌리기 — 시퀀스 시작 지점에서만 */
    let orbT = 0, orb = 0, dragging = false, lastX = 0
    const canDrag = () => svT < 0.12
    const down = (e: PointerEvent) => { if (!canDrag()) return; dragging = true; lastX = e.clientX; cv.classList.add(s.canvasDrag) }
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

    let raf = 0
    let prevKey = ''
    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (svT < -1.2 || svT > 7.2) return /* 화면 밖이면 쉬기 */
      sv += (svT - sv) * 0.16
      if (Math.abs(svT - sv) < 0.0005) sv = svT
      const locked = !canDrag()
      if (locked) { orbT = 0; dragging = false }
      orb += (orbT - orb) * (locked ? 0.12 : 0.22)
      if (Math.abs(orbT - orb) < 0.01) orb = orbT
      cv.classList.toggle(s.canvasLocked, locked)

      const c = cover()
      const ax = c.x + APPLE.x * c.w, ay = c.y + APPLE.y * c.h
      const fallP = orb > 0.6 ? 0 : seg(sv, T.fall0, T.fall1)
      const zoomP = seg(sv, T.zoom0, T.zoom1)
      const revP = seg(sv, T.rev0, T.rev1)
      const cityP = seg(sv, T.city0, T.city1)
      const key = [orb.toFixed(2), sv.toFixed(4), W, H].join('|')
      if (!dirty && key === prevKey) return
      prevKey = key; dirty = false

      ctx.fillStyle = '#0d1220'
      ctx.fillRect(0, 0, cv.width, cv.height)
      if (revP > 0) {
        draw(nearest(C, cityP * (N_C - 1)), 1.12 - 0.12 * ease(revP), W / 2, H / 2)
      } else if (orb > 0.6 || sv <= T.fall0) {
        draw(nearest(O, orb), 1, 0, 0)
        if (orb <= 1 && F[0].ok) draw(F[0].img, 1, 0, 0, 1 - orb) /* 낙하 영상 첫 프레임으로 자연스럽게 정착 */
      } else {
        draw(nearest(F, fallP * (N_F - 1)), 1 + easeIn(zoomP) * 13, ax, ay)
      }

      /* 떨어진 사과의 빛이 화면 전체로 커진다 */
      const diag = Math.hypot(W, H)
      const bs = 0.5 + easeIn(zoomP) * ((diag * 3.4) / 200)
      const bx = ax + (W / 2 - ax) * ease(zoomP), by = ay + (H / 2 - ay) * ease(zoomP)
      bloom.style.transform = `translate(${bx}px,${by}px) scale(${bs})`
      bloom.style.opacity = String(revP > 0 ? 0 : seg(zoomP, 0, 0.18))
      flood.style.opacity = String(revP > 0 ? 1 - ease(revP) : ease(seg(zoomP, 0.55, 1)))

      const o1 = seg(sv, -0.55, -0.1) * (1 - seg(sv, 0.2, 0.7))
      copy1.style.opacity = String(o1)
      copy1.style.transform = `translateY(${-28 * seg(sv, 0.2, 0.7)}px)`
      meta.style.opacity = String(seg(sv, -0.55, -0.1) * (1 - seg(sv, 0.1, 0.4)))
      const t2 = ease(seg(sv, T.city1 - 1.3, T.city1 - 0.5))
      copy2.style.opacity = String(t2)
      copy2.style.transform = `translateY(${24 * (1 - t2)}px)`
    }

    /* 첫 프레임 먼저, 나머지는 순서대로 백그라운드 로드 */
    Promise.all([load(O[0]), load(F[0])]).then(() => {
      if (!alive) return
      raf = requestAnimationFrame(frame)
      loadAll(O).then(() => loadAll(F)).then(() => loadAll(C))
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cv.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [])

  return (
    <section ref={seqRef} aria-label="사과나무에서 황금 숲의 도시로" className={s.seq}>
      <div ref={stageRef} className={s.stage}>
        <canvas ref={cvRef} className={s.canvas} />
        <div className={s.shade} />
        <div ref={bloomRef} className={s.bloom} />
        <div ref={floodRef} className={s.flood} />
        <div ref={copy1Ref} className={s.copy} style={{ opacity: 0 }}>
          <p className={s.eyebrow}>SCENE 01 · THE APPLE</p>
          <p className={s.line}>모든 기획은<br />하나의 질문에서 떨어집니다.</p>
        </div>
        <div ref={copy2Ref} className={`${s.copy} ${s.copyCenter}`}>
          <p className={s.eyebrow}>SCENE 02 · THE GOLDEN FOREST</p>
          <p className={`${s.line} ${s.lineBig}`}>그 열매들이 모여, <span className={s.gold}>숲이 되었습니다.</span></p>
        </div>
        <div ref={metaRef} className={s.meta} style={{ opacity: 0 }}>
          <span>SCROLL ↓</span>
          <span>좌우로 드래그해서 나무를 돌려보세요</span>
        </div>
      </div>
    </section>
  )
}
