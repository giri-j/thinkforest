'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Shot, Step } from './content'
import { Diagram, Frame, Grain, HEAD, MONO, Scene, G } from './visuals'
import styles from './practice2.module.css'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

/* ---------- hooks ---------- */

const RM_QUERY = '(prefers-reduced-motion: reduce)'
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(RM_QUERY)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  )
}

/** 5초마다 1씩 증가 — 모션 줄이기 사용자는 멈춤 */
export function useTicker(ms = 5000) {
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setTick((t) => t + 1), ms)
    return () => window.clearInterval(id)
  }, [ms, reduced])
  return tick
}

function Caption({ label, why, color }: { label: string; why: string; color: string }) {
  return (
    <p style={{ margin: '10px 0 0', fontSize: 11.5, lineHeight: 1.6, color }}>
      <strong style={{ fontWeight: 500, color: '#F2EDE3' }}>{label}</strong> — {why}
    </p>
  )
}

/** 크로스페이드 + 켄 번즈 */
export function Crossfade({ shots, tick, offset = 0, labels = true }: { shots: Shot[]; tick: number; offset?: number; labels?: boolean }) {
  const active = (tick + offset) % shots.length
  return (
    <div className={styles.frame}>
      {shots.map((s, i) => (
        <div key={s.label} className={styles.layer} style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'scale(1.07)' : 'scale(1)' }} aria-hidden={i !== active}>
          <Frame shot={s} showLabel={labels} style={{ position: 'absolute', inset: 0, aspectRatio: 'auto' }} />
        </div>
      ))}
    </div>
  )
}

/* ---------- I · 필름 스트립 ---------- */

export function FilmStrip({ frames }: { frames: Shot[] }) {
  const item = (f: Shot, k: string) => (
    <figure key={k} style={{ margin: 0, flex: '0 0 300px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Frame shot={f} />
      <figcaption style={{ fontSize: 11, lineHeight: 1.5, color: '#C9C3B2' }}>
        <strong style={{ color: '#F4EFE4', fontWeight: 500 }}>{f.label}</strong> — {f.why}
      </figcaption>
    </figure>
  )
  return (
    <div style={{ marginTop: 72 }}>
      <div aria-label="현장 기록 필름 스트립" style={{ position: 'relative', overflow: 'hidden', background: '#141A16', padding: '14px 0 16px' }}>
        <div aria-hidden="true" className={styles.perf} style={{ marginBottom: 12 }} />
        <div className={styles.film}>
          {frames.map((f, i) => item(f, `a${i}`))}
          {frames.map((f, i) => item(f, `b${i}`))}
        </div>
        <div aria-hidden="true" className={styles.perf} style={{ marginTop: 12 }} />
      </div>
      <p style={{ margin: '10px 9% 0', fontFamily: MONO, fontSize: 10, color: '#8C9C8B' }}>35MM FIELD ROLL · 마우스를 올리면 멈춰요</p>
    </div>
  )
}

/* ---------- II · 고정 시퀀스 ---------- */

export function PinnedSequence({ steps }: { steps: Step[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !wrap.current || !inner.current) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 761px)', () => {
      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top top+=60',
        end: () => `+=${steps.length * 300}`,
        anticipatePin: 1,
        pin: inner.current,
        onUpdate: (self) => setStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
      })
      return () => st.kill()
    })
    return () => mm.revert()
  }, [reduced, steps.length])

  return (
    <div ref={wrap} style={{ marginTop: 72, padding: '0 9%' }}>
      <div ref={inner} style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', padding: '20px 0' }}>
        <div role="group" aria-label="문제를 좁히는 단계" style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column' }}>
          {steps.map((s, i) => (
            <button key={s.title} type="button" onClick={() => setStep(i)} aria-pressed={i === step}
              style={{ display: 'flex', gap: 14, alignItems: 'flex-start', textAlign: 'left', padding: '14px 0', minHeight: 44, border: 0, borderTop: '1px solid #3A5442', background: 'transparent', color: '#F2EDE3', opacity: i === step ? 1 : 0.4, transition: 'opacity .5s', cursor: 'pointer', font: 'inherit' }}>
              <span style={{ fontFamily: MONO, fontSize: 11, color: '#E1B970', paddingTop: 3 }}>0{i + 1}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{s.title}</span>
                <span style={{ fontSize: 12, color: '#C9D3C4' }}>{s.line}</span>
              </span>
            </button>
          ))}
          <p style={{ margin: '14px 0 0', fontFamily: MONO, fontSize: 10, color: '#93A592' }}>PINNED SEQUENCE · 스크롤하면 한 단계씩 좁혀져요</p>
        </div>
        <div style={{ flex: '2 1 420px' }}>
          <div className={styles.frame} style={{ boxShadow: '0 20px 50px -20px rgba(0,0,0,.5)' }}>
            {steps.map((s, i) => (
              <div key={s.title} className={styles.layer} style={{ opacity: i === step ? 1 : 0, transition: 'opacity .7s ease' }} aria-hidden={i !== step}>
                <Diagram type={s.diagram} />
                <Grain />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- III · Before/After + 크로스페이드 ---------- */

export function CompareModule({ compare, screens }: { compare: { before: Shot; after: Shot; caption: string; why: string }; screens: Shot[] }) {
  const [ba, setBa] = useState(50)
  const tick = useTicker()
  const active = screens[tick % screens.length]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 72, padding: '0 3% 0 9%' }}>
      <figure style={{ margin: 0, flex: '1.6 1 380px' }}>
        <div className={styles.frame}>
          <div style={{ position: 'absolute', inset: 0 }}><Scene kind={compare.after.kind} /><Grain /></div>
          <span style={{ position: 'absolute', right: 10, top: 10, fontFamily: MONO, fontSize: 10, padding: '3px 8px', background: G, color: '#F4EFE4' }}>AFTER</span>
          <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - ba}% 0 0)` }}>
            <Scene kind={compare.before.kind} /><Grain />
            <span style={{ position: 'absolute', left: 10, top: 10, fontFamily: MONO, fontSize: 10, padding: '3px 8px', background: 'rgba(247,242,230,.92)', color: '#17201A' }}>BEFORE</span>
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: `${ba}%`, width: 2, background: '#9A4F12' }} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, fontSize: 11, color: '#8C9C8B' }}>
          Before / After
          <input type="range" min={0} max={100} value={ba} onChange={(e) => setBa(Number(e.target.value))} style={{ flex: '1 1 auto', accentColor: G, minHeight: 28 }} />
        </label>
        <Caption label={compare.caption} why={compare.why} color="#8C9C8B" />
      </figure>
      <figure style={{ margin: 0, flex: '1 1 260px' }}>
        <Crossfade shots={screens} tick={tick} />
        <Caption label={active.label} why={active.why} color="#8C9C8B" />
      </figure>
    </div>
  )
}

/* ---------- IV · 카드 스택 ---------- */

export function CardStack({ cards }: { cards: Shot[] }) {
  const tick = useTicker()
  const [manual, setManual] = useState(0)
  const n = cards.length
  const top = (((tick + manual) % n) + n) % n
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', marginTop: 72, padding: '0 9%' }}>
      <div style={{ flex: '2 1 420px', padding: '24px 40px 40px 0' }}>
        <div aria-label="설득 자료 덱" style={{ position: 'relative', aspectRatio: '16 / 10' }}>
          {cards.map((c, i) => {
            const d = (((i - top) % n) + n) % n
            return (
              <div key={c.label} aria-hidden={d !== 0}
                style={{ position: 'absolute', inset: 0, zIndex: n - d, opacity: d < 4 ? 1 : 0,
                  transform: d === 0 ? 'none' : `translate(${d * 16}px, ${d * 12}px) rotate(${d * 1.6}deg) scale(${1 - d * 0.03})`,
                  transition: 'transform .9s cubic-bezier(.2,.8,.2,1), opacity .9s', boxShadow: '0 18px 40px -18px rgba(0,0,0,.6)' }}>
                <Frame shot={c} style={{ position: 'absolute', inset: 0, aspectRatio: 'auto' }} />
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: 14 }} aria-live="polite">
        <span style={{ fontFamily: MONO, fontSize: 11, color: '#E1B970' }}>{top + 1} / {n}</span>
        <span style={{ fontFamily: HEAD, fontWeight: 700, letterSpacing: '-0.03em', fontSize: 22, lineHeight: 1.3 }}>{cards[top].label}</span>
        <span style={{ fontSize: 12.5, lineHeight: 1.7, color: '#C9D3C4' }}>{cards[top].why}</span>
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <button type="button" onClick={() => setManual((m) => m - 1)} aria-label="이전 장" style={{ minWidth: 44, minHeight: 44, borderRadius: 999, border: '1px solid #5C7560', background: 'transparent', color: '#F2EDE3', cursor: 'pointer' }}>←</button>
          <button type="button" onClick={() => setManual((m) => m + 1)} aria-label="다음 장" style={{ minWidth: 44, minHeight: 44, borderRadius: 999, border: 0, background: '#E1B970', color: '#0B0F0C', cursor: 'pointer' }}>→</button>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 10, color: '#8C9C8B' }}>CARD STACK · 5초마다 한 장씩 넘어가요</span>
      </div>
    </div>
  )
}

/* ---------- V · 디바이스 목업 ---------- */

export function Devices({ laptop, products }: { laptop: Shot[]; products: Shot[] }) {
  const tick = useTicker()
  const a = laptop[(tick + 1) % laptop.length]
  const p = products[(tick + 2) % products.length]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-end', marginTop: 72, padding: '0 3% 0 9%' }}>
      <figure style={{ margin: 0, flex: '2 1 420px', position: 'relative' }}>
        <div style={{ padding: '14px 14px 18px', background: '#1A1F1B', borderRadius: '14px 14px 4px 4px' }}>
          <Crossfade shots={laptop} tick={tick} offset={1} />
        </div>
        <div aria-hidden="true" style={{ height: 12, margin: '0 -4%', background: 'linear-gradient(#C9C3B2, #A39D8C)', borderRadius: '0 0 14px 14px' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '-2%', bottom: 28, width: '22%', aspectRatio: '9 / 19', padding: 6, background: '#1A1F1B', borderRadius: 18, boxShadow: '0 20px 40px -16px rgba(0,0,0,.5)' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden' }}>
            {laptop.map((s, i) => (
              <div key={s.label} className={styles.layer} style={{ opacity: i === (tick + 1) % laptop.length ? 1 : 0 }}>
                <Scene kind={s.kind === 'screen' ? 'app' : s.kind} /><Grain />
              </div>
            ))}
          </div>
        </div>
        <Caption label={a.label} why={a.why} color="#8C9C8B" />
      </figure>
      <figure style={{ margin: 0, flex: '1 1 240px' }}>
        <Crossfade shots={products} tick={tick} offset={2} />
        <Caption label={p.label} why={p.why} color="#8C9C8B" />
      </figure>
    </div>
  )
}
