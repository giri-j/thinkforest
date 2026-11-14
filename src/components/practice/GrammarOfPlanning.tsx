'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  appendixA, appendixB, chapters, coda, epilogue, hero, interlude, nav, prologue, themes,
  type Chapter,
} from './content'
import { G, GrainDefs, GrowthIcon, HeroScene, MONO, SERIF, SeedConstellation } from './visuals'
import { CardStack, CompareModule, Devices, FilmStrip, PinnedSequence, useReducedMotion } from './media'
import styles from './practice.module.css'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const LeafIcon = ({ color = 'currentColor', size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.4" aria-hidden="true">
    <path d="M10 18V9M10 11C6 11 4 7 4 5c3 0 6 2 6 6zM10 9c0-4 3-6 6-6 0 3-2 6-6 6z" />
  </svg>
)

const TreeMark = () => (
  <svg width="22" height="22" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M15 28V13" /><path d="M15 17l-6-5M15 15l6-5M15 21l-5-3M15 20l5-3" />
    <rect x="11" y="3" width="8" height="5" rx="1.5" /><rect x="3" y="9" width="6" height="4" rx="1" /><rect x="21" y="9" width="6" height="4" rx="1" />
  </svg>
)

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section aria-label="히어로" style={{ position: 'relative', background: 'radial-gradient(120% 70% at 50% 100%, #1C2E22 0%, #0E1712 45%, #070B08 100%)', color: '#EDE7DA', overflow: 'hidden' }}>
      <nav aria-label="주 메뉴" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 48, padding: '32px 48px 0', fontSize: 13, lineHeight: 1.5 }}>
        {nav.map((g) => (
          <div key={g.group} style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: '#8FA585', marginBottom: 4 }}>{g.group}</span>
            {g.links.map((l) => (
              <Link key={l.label} href={l.href} style={{ textDecoration: 'none' }}>
                ✢ {l.label}{'badge' in l && l.badge ? <span style={{ fontSize: 9, color: '#E1B970', marginLeft: 4 }}>{l.badge}</span> : null}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '72px 40px 0' }}>
        <p data-hero-in style={{ margin: 0, fontFamily: MONO, fontSize: 11, letterSpacing: '0.32em', color: '#B9C4B3' }}>{hero.eyebrow}</p>
        <h1 style={{ margin: '28px 0 0', letterSpacing: '-0.035em' }}>
          <span data-hero-in style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(34px, 4.6vw, 64px)', lineHeight: 1.2 }}>{hero.line1}</span>
          <span data-hero-in style={{ display: 'block', fontWeight: 900, fontSize: 'clamp(56px, 8.4vw, 118px)', lineHeight: 1.05, color: '#F4EFE4' }}>{hero.line2}</span>
        </h1>
        <p data-hero-in style={{ margin: '18px 0 0', fontFamily: "var(--font-tf-script), 'Pinyon Script', cursive", fontSize: 32, color: '#C9B98F' }}>{hero.script}</p>
        <Link data-hero-in href={hero.newHref} style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 30, padding: '4px 14px 4px 4px', borderRadius: 999, background: '#E1B970', color: '#0B0F0C', textDecoration: 'none', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>
          <span style={{ padding: '2px 8px', borderRadius: 999, background: '#0B0F0C', color: '#F2EDE3' }}>NEW</span>{hero.newLabel} →
        </Link>
      </div>
      <div style={{ marginTop: 8 }}><HeroScene /></div>
    </section>
  )
}

/* ---------------- Prologue ---------------- */

function Prologue() {
  return (
    <section id="prologue" aria-label="Prologue" style={{ background: '#F4EFE4', color: '#17201A', padding: '160px 12% 120px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28 }}>
      <div data-reveal><SeedConstellation /></div>
      <span data-reveal style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: '#6A6E66' }}>{prologue.label}</span>
      <p data-reveal style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 1.45, letterSpacing: '-0.025em' }}>
        {prologue.statement[0]}<br />{prologue.statement[1]}
      </p>
      <span aria-hidden="true" style={{ width: 1, height: 64, background: '#B9B19C' }} />
      <span data-reveal style={{ fontSize: 13, color: '#4A4F45' }}>{prologue.intro}<br /><strong style={{ fontWeight: 500, color: '#17201A' }}>{prologue.verbs}</strong></span>
      <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', color: '#8A8D84' }}>{prologue.facts}</span>
    </section>
  )
}

/* ---------------- Chapter ---------------- */

function ChapterMedia({ c }: { c: Chapter }) {
  switch (c.media) {
    case 'film': return <FilmStrip frames={c.frames} />
    case 'pinned': return <PinnedSequence steps={c.steps} />
    case 'compare': return <CompareModule compare={c.compare} screens={c.screens} />
    case 'stack': return <CardStack cards={c.cards} />
    case 'devices': return <Devices laptop={c.laptop} products={c.products} />
  }
}

function ChapterSection({ c }: { c: Chapter }) {
  const t = themes[c.theme]
  return (
    <section id={c.id} aria-label={`Chapter ${c.no} ${c.en}`} style={{ position: 'relative', overflow: 'hidden', background: t.bg, color: t.fg, padding: '96px 0 104px' }}>
      <span aria-hidden="true" style={{ position: 'absolute', left: '3%', top: 40, fontFamily: SERIF, fontSize: 'clamp(220px, 30vw, 420px)', lineHeight: 0.8, color: t.fg, opacity: 0.05, pointerEvents: 'none' }}>{c.no}</span>
      <div style={{ position: 'relative', padding: '0 9%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, paddingBottom: 14, borderBottom: `1px solid ${t.sub}` }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em' }}>CHAPTER {c.no} · {c.en}</span>
          <span style={{ fontSize: 12, color: t.sub }}>{c.verb}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginTop: 56, alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 440px', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2 data-reveal style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 3.2vw, 42px)', lineHeight: 1.45, letterSpacing: '-0.02em' }}>
              {c.question[0]}<br />{c.question[1]}
            </h2>
            <p data-reveal style={{ margin: 0, maxWidth: 520, fontSize: 14.5, lineHeight: 1.9, color: t.body }}>{c.body}</p>
          </div>
          <div style={{ flex: '0 1 300px', display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'right' }}>
            <figure data-reveal style={{ margin: '0 0 22px', alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <GrowthIcon stage={c.growth} color={t.line} label={c.stage} />
              <figcaption style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', color: t.line, opacity: 0.85 }}>STAGE {c.stage}</figcaption>
            </figure>
            <span data-count style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(72px, 9vw, 128px)', lineHeight: 0.95, letterSpacing: '-0.04em', color: t.num }}>{c.big}</span>
            <span style={{ fontSize: 11, lineHeight: 1.6, color: t.sub }}>{c.bigCaption}</span>
          </div>
        </div>
      </div>
      <ChapterMedia c={c} />
      <p style={{ margin: '24px 9% 0', fontSize: 10.5, color: t.sub }}>{c.caption}</p>
      <p data-reveal style={{ margin: '56px 9% 0', fontFamily: SERIF, fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.5, textAlign: 'center' }}>“{c.maxim}”</p>
    </section>
  )
}

/* ---------------- Interlude: 다이어그램 → 나무 ---------------- */

const X = [40, 130, 220, 310, 400]

function Interlude() {
  const wrap = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const diagram = useRef<HTMLDivElement>(null)
  const tree = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !wrap.current) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 761px)', () => {
      const draw = tree.current!.querySelectorAll('[data-draw]')
      const fruits = tree.current!.querySelectorAll('[data-fruit]')
      gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set(fruits, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(tree.current, { opacity: 0 })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap.current, start: 'top top', end: '+=1800', scrub: 0.6, pin: stage.current },
      })
      tl.to(diagram.current, { rotateX: 180, duration: 0.45, ease: 'power2.inOut' }, 0)
        .to(diagram.current, { opacity: 0, duration: 0.15 }, 0.32)
        .to(tree.current, { opacity: 1, duration: 0.15 }, 0.4)
        .to(draw, { strokeDashoffset: 0, duration: 0.35, stagger: 0.02, ease: 'none' }, 0.45)
        .to(fruits, { scale: 1, duration: 0.12, stagger: 0.03, ease: 'back.out(2)' }, 0.78)
      return () => tl.kill()
    })
    return () => mm.revert()
  }, [reduced])

  const diagramSvg = (
    <svg viewBox="0 0 440 300" role="img" aria-label="기획 로직 트리: 기획에서 다섯 동사로 갈라지는 다이어그램" style={{ width: '100%', height: 'auto' }}>
      <g stroke="#8C9C8B" strokeWidth="1.2" fill="none">
        <path d="M220 46V80M40 80H400M40 80V120M130 80V120M220 80V120M310 80V120M400 80V120" />
        <path d="M40 150V190M130 150V190M220 150V190M310 150V190M400 150V190" strokeDasharray="2 4" />
      </g>
      <rect x="175" y="18" width="90" height="28" rx="4" fill="#E1B970" />
      <text x="220" y="37" textAnchor="middle" fontFamily="Noto Serif KR, serif" fontSize="13" fill="#0B0F0C">기획</text>
      {interlude.nodes.map((n, i) => (
        <g key={n}>
          <rect x={X[i] - 38} y="120" width="76" height="30" rx="4" fill={G} stroke="#8C9C8B" />
          <text x={X[i]} y="139" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#EDE7DA">{n}</text>
          <text x={X[i]} y="206" textAnchor="middle" fontSize="9" fill="#93A592">{interlude.verbs[i]}</text>
        </g>
      ))}
      <text x="220" y="270" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#6E776D">FIG. 02-A — THE DIAGRAM</text>
    </svg>
  )

  const treeSvg = (
    <svg viewBox="0 0 440 300" role="img" aria-label="뒤집힌 로직 트리가 줄기와 열매를 가진 나무가 된 모습" style={{ width: '100%', height: 'auto' }}>
      <circle cx="220" cy="120" r="130" fill="#E1B970" opacity="0.08" />
      <g stroke="#C9A66B" strokeWidth="1.6" fill="none">
        <path data-draw pathLength={1} d="M220 290V200" />
        <path data-draw pathLength={1} d="M220 200C220 180 40 190 40 150" /><path data-draw pathLength={1} d="M220 200C220 180 130 180 130 150" /><path data-draw pathLength={1} d="M220 200V150" /><path data-draw pathLength={1} d="M220 200C220 180 310 180 310 150" /><path data-draw pathLength={1} d="M220 200C220 190 400 190 400 150" />
        {X.map((x, i) => <path key={x} data-draw pathLength={1} d={`M${x} 120V${[80, 70, 60, 70, 80][i]}`} />)}
        <path data-draw pathLength={1} d="M190 300C200 292 210 290 220 290 230 290 240 292 250 300" />
      </g>
      <g fill="#0B0F0C" stroke="#E1B970" strokeWidth="1.2">{X.map((x) => <rect key={x} x={x - 24} y="120" width="48" height="16" rx="3" />)}</g>
      <g fill="#E1B970">{X.map((x, i) => <circle key={x} data-fruit cx={x} cy={[74, 64, 52, 64, 74][i]} r={[7, 8, 9, 8, 7][i]} />)}</g>
      <text x="220" y="20" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#6E776D">FIG. 02-B — THE TREE</text>
    </svg>
  )

  return (
    <section ref={wrap} aria-label="Interlude The Method" style={{ position: 'relative', background: '#0B0F0C', color: '#EDE7DA' }}>
      <div ref={stage} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '96px 6%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: '#E1B970' }}>{interlude.label}</span>
          <p style={{ margin: 0, fontFamily: SERIF, fontSize: 'clamp(24px, 2.8vw, 36px)', lineHeight: 1.45 }}>
            {interlude.line1}<br /><span style={{ color: '#E1B970' }}>{interlude.line2}</span>
          </p>
        </div>
        {reduced ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginTop: 56 }}>
            <div style={{ flex: '1 1 340px', maxWidth: 460 }}>{diagramSvg}</div>
            <div style={{ flex: '1 1 340px', maxWidth: 460 }}>{treeSvg}</div>
          </div>
        ) : (
          <div style={{ position: 'relative', width: '100%', maxWidth: 560, margin: '48px auto 0', perspective: 1200 }}>
            <div ref={diagram} style={{ transformStyle: 'preserve-3d' }}>{diagramSvg}</div>
            <div ref={tree} style={{ position: 'absolute', inset: 0 }}>{treeSvg}</div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------------- Epilogue: 경력 나무 ---------------- */

function Epilogue() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-draw]', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'center center', scrub: 0.8 } })
      gsap.fromTo('[data-fruit]', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, stagger: 0.06, ease: 'back.out(2)', scrollTrigger: { trigger: ref.current, start: 'center 70%', end: 'center 40%', scrub: 0.8 } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section aria-label="Epilogue The Tree" style={{ position: 'relative', background: G, color: '#F2EDE3', padding: '120px 6% 96px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: '#E1B970' }}>{epilogue.label}</span>
        <p data-reveal style={{ margin: 0, fontFamily: SERIF, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.45 }}>{epilogue.line1}<br />{epilogue.line2}</p>
        <p style={{ margin: 0, fontSize: 13, color: '#A9BC9C' }}>{epilogue.sub}</p>
      </div>
      <div ref={ref}>
        <svg viewBox="0 -50 720 620" role="img" aria-label={`경력 나무: ${epilogue.roots.text}, ${epilogue.trunk.text}, ${epilogue.branches.text}, 나뭇잎으로 흩어진 ${epilogue.leaves.join('·')}`} style={{ display: 'block', width: '100%', maxWidth: 760, margin: '40px auto 0' }}>
          <defs><radialGradient id="tf-crownglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#E1B970" stopOpacity="0.22" /><stop offset="1" stopColor="#E1B970" stopOpacity="0" /></radialGradient></defs>
          <circle cx="360" cy="190" r="230" fill="url(#tf-crownglow)" />
          <g stroke="#C9A66B" fill="none" strokeLinecap="round">
            <path data-draw pathLength={1} d="M360 420 V300" strokeWidth="4" />
            <path data-draw pathLength={1} d="M360 300 C360 250 250 240 210 170" strokeWidth="2.4" />
            <path data-draw pathLength={1} d="M360 300 C360 240 330 190 330 120" strokeWidth="2.4" />
            <path data-draw pathLength={1} d="M360 290 C370 230 420 200 470 150" strokeWidth="2.4" />
            <path data-draw pathLength={1} d="M360 310 C380 260 500 250 540 200" strokeWidth="2" />
            <path data-draw pathLength={1} d="M210 170 C190 140 160 130 140 110 M210 170 C215 130 230 110 240 90 M330 120 C320 90 300 75 290 55 M330 120 C345 90 360 75 375 60 M470 150 C470 120 480 100 495 80 M470 150 C500 135 530 130 560 125" strokeWidth="1.4" />
            <path data-draw pathLength={1} d="M360 420 C340 445 300 455 250 470 M360 420 C350 455 330 480 320 515 M360 420 C370 455 395 480 410 515 M360 420 C385 445 430 455 480 470" strokeWidth="1.6" opacity="0.7" />
          </g>
          <line x1="200" y1="420" x2="520" y2="420" stroke="#5C7560" strokeWidth="1" />
          <g fill="#E1B970">{[[140, 108, 7], [240, 86, 8], [290, 52, 7], [375, 57, 9], [495, 76, 8], [560, 123, 7], [540, 198, 6]].map(([x, y, r]) => <circle key={`${x}-${y}`} data-fruit cx={x} cy={y} r={r} />)}</g>
          <g fill="#5C7560" opacity="0.9">
            <ellipse cx="180" cy="135" rx="9" ry="4" transform="rotate(-30 180 135)" /><ellipse cx="315" cy="85" rx="9" ry="4" transform="rotate(25 315 85)" />
            <ellipse cx="430" cy="110" rx="9" ry="4" transform="rotate(-20 430 110)" /><ellipse cx="520" cy="150" rx="9" ry="4" transform="rotate(15 520 150)" />
          </g>
          <g fontSize="12" fill="#C9D3C4">
            {epilogue.leaves.map((l, i) => {
              const [x, y, rot, rx] = [[96, 190, -12, 30], [612, 250, 10, 30], [640, 70, -6, 34]][i]
              return (
                <g key={l} transform={`rotate(${rot} ${x} ${y})`}>
                  <ellipse cx={x} cy={y} rx={rx} ry="13" fill="none" stroke="#7E9580" />
                  <text x={x} y={y + 4} textAnchor="middle">{l}</text>
                </g>
              )
            })}
          </g>
          <g textAnchor="middle">
            <text x="360" y="-30" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2" fill="#E1B970">{epilogue.branches.title}</text>
            <text x="360" y="-12" fontFamily="Noto Serif KR, serif" fontSize="15" fill="#F2EDE3">{epilogue.branches.text}</text>
          </g>
          <g textAnchor="end">
            <text x="340" y="350" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2" fill="#93A592">{epilogue.trunk.title}</text>
            <text x="340" y="368" fontFamily="Noto Serif KR, serif" fontSize="15" fill="#F2EDE3">{epilogue.trunk.text}</text>
          </g>
          <g textAnchor="middle">
            <text x="360" y="540" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2" fill="#93A592">{epilogue.roots.title}</text>
            <text x="360" y="558" fontFamily="Noto Serif KR, serif" fontSize="15" fill="#F2EDE3">{epilogue.roots.text}</text>
          </g>
        </svg>
      </div>
    </section>
  )
}

/* ---------------- Appendix ---------------- */

type Lab = (typeof appendixA.left)[number]
function LabItem({ l, i }: { l: Lab; i: number }) {
  const margins = ['0 12% 0 10%', '0 10% 0 14%', '0 18% 0 4%', '0 14% 0 6%', '0 16% 0 0', '0 8% 0 10%']
  return (
    <figure data-reveal style={{ margin: margins[i % 6], display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ position: 'relative', aspectRatio: l.ratio, background: l.color, overflow: 'hidden' }}>
        {l.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={l.src} alt={`${l.tag} — ${l.caption}`} className={styles.img} />
        ) : null}
        <span className={styles.chip}>{l.tag}</span>
      </div>
      <figcaption style={{ fontSize: 10.5, color: '#B0B5A8' }}>{l.caption}</figcaption>
    </figure>
  )
}

function AppendixA() {
  return (
    <section id="appendix-a" aria-label="Appendix A 공방" style={{ background: 'linear-gradient(#050806, #1C2620 55%, #8E9286)', color: '#E6E2D6', padding: '96px 8% 120px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, paddingBottom: 14, borderBottom: '1px solid #3A433C', marginBottom: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', color: '#E1B970' }}>{appendixA.label}</span>
        <span style={{ fontSize: 12, color: '#8C9C8B' }}>{appendixA.title}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 72, paddingTop: 220 }}>
          {appendixA.left.map((l, i) => <LabItem key={i} l={l} i={i} />)}
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 72 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingLeft: '30%', height: 200, paddingTop: 40 }}>
            <span aria-hidden="true" style={{ width: 1, height: '100%', background: '#4A524B' }} />
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <LeafIcon color="#E1B970" size={16} />
              <span className={styles.vertical} style={{ fontSize: 14, lineHeight: 1.5 }}>{appendixA.vertical[0]}<br />{appendixA.vertical[1]}</span>
            </span>
          </div>
          {appendixA.right.map((l, i) => <LabItem key={i} l={l} i={i + 3} />)}
        </div>
      </div>
    </section>
  )
}

const essayArt = [
  <svg key="a" viewBox="0 0 100 100" aria-hidden="true" style={{ width: '100%', aspectRatio: '1 / 1', display: 'block' }}><defs><radialGradient id="tf-e1" cx="0.5" cy="0.45" r="0.6"><stop offset="0" stopColor="#E1B970" /><stop offset="1" stopColor="#9A4F12" /></radialGradient></defs><rect width="100" height="100" fill="url(#tf-e1)" /><path d="M50 92V40M50 55L32 38M50 50L68 32M50 66L36 58M50 64L64 54" stroke="#FBF8F2" strokeWidth="1.6" fill="none" /></svg>,
  <svg key="b" viewBox="0 0 100 100" aria-hidden="true" style={{ width: '100%', aspectRatio: '1 / 1', display: 'block' }}><rect width="100" height="100" fill="#17201A" /><g stroke="#F2EDE3" strokeWidth="1.1" fill="none">{[30, 42, 54, 66, 78].map((y) => <path key={y} d={`M-5 ${y} Q25 ${y - 20} 50 ${y} T105 ${y - 2}`} />)}</g></svg>,
  <svg key="c" viewBox="0 0 100 100" aria-hidden="true" style={{ width: '100%', aspectRatio: '1 / 1', display: 'block' }}><rect width="100" height="100" fill="#3E5A2E" /><path d="M0 100 L0 40 C30 30 40 70 100 20 L100 100 Z" fill="#17201A" /></svg>,
]

function AppendixB() {
  return (
    <section aria-label="Appendix B 숲의 기록" style={{ background: '#FBF8F2', color: '#17201A', padding: '72px 4% 88px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, paddingBottom: 14, borderBottom: '1px solid #D9D1BF', marginBottom: 40 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em' }}>{appendixB.label}</span>
        <Link href="/blog" style={{ fontSize: 12 }}>전체 기록 보기 →</Link>
      </div>
      <h2 style={{ margin: 0, fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1.1 }}>{appendixB.title}</h2>
      <p style={{ margin: '2px 0 32px', fontSize: 13, color: '#6A6E66' }}>{appendixB.sub}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        {appendixB.posts.map((p, i) => (
          <Link key={i} href={p.href} data-reveal style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 10, textDecoration: 'none', color: '#17201A' }}>
            {essayArt[i % 3]}
            <span style={{ fontSize: 15 }}>{p.title}</span>
          </Link>
        ))}
      </div>
      <form id="letter" aria-label="숲 편지 구독" onSubmit={(e) => e.preventDefault()} style={{ marginTop: 56, paddingTop: 28, borderTop: '1px solid #D9D1BF', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: SERIF, fontSize: 22 }}>{appendixB.letterTitle}</span>
          <span style={{ fontSize: 12, color: '#6A6E66' }}>{appendixB.letterSub}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '0 1 380px' }}>
          <label htmlFor="tf-email" style={{ fontSize: 12, color: '#4A4F45' }}>이메일</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <input id="tf-email" type="email" required placeholder="name@example.com" style={{ flex: '1 1 auto', minWidth: 0, minHeight: 46, padding: '0 14px', border: '1px solid #C9C1AE', background: '#FFFFFF', color: '#17201A', fontSize: 13 }} />
            <button type="submit" style={{ minHeight: 46, padding: '0 20px', border: 0, background: G, color: '#F4EFE4', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>구독</button>
          </div>
        </div>
      </form>
    </section>
  )
}

/* ---------------- Coda ---------------- */

const Pillar = () => <span aria-hidden="true" style={{ flex: '0 0 44px', alignSelf: 'flex-end', height: 240, background: 'repeating-linear-gradient(90deg, #2A302B 0 1px, transparent 1px 7px)', borderTop: '3px double #3A403B' }} />

function Coda() {
  return (
    <footer id="coda" aria-label="Coda" style={{ position: 'relative', background: '#050806', color: '#EDE7DA', padding: '140px 4% 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 26 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: '#E1B970' }}>{coda.label}</span>
        <p data-reveal style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(30px, 3.6vw, 46px)', lineHeight: 1.45, letterSpacing: '-0.02em' }}>{coda.line1}<br />{coda.line2}</p>
        <Link href={coda.cta.href} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 52, padding: '0 30px', borderRadius: 999, background: '#E1B970', color: '#0B0F0C', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>{coda.cta.label}</Link>
      </div>
      <div aria-hidden="true" style={{ width: 1, height: 72, background: '#3A403B', margin: '40px auto 0' }} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginTop: 8 }}>
        <Pillar />
        {coda.arches.map((a) => (
          <nav key={a.title} aria-label={a.title} style={{ flex: '0 1 240px', height: 400, border: '1px solid #2A302B', borderBottom: 0, borderRadius: '120px 120px 0 0', background: 'linear-gradient(#050806 35%, #24302A)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: SERIF, fontSize: 15 }}>
            <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: '#8C918A', marginBottom: 40 }}>{a.title}</span>
            {a.links.map((l, i) => (
              <span key={l.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                {i > 0 && <span aria-hidden="true" style={{ color: '#4A524B' }}>•</span>}
                <Link href={l.href} style={{ textDecoration: 'none', minHeight: 32, display: 'inline-flex', alignItems: 'center' }}>{l.label}</Link>
              </span>
            ))}
          </nav>
        ))}
        <Pillar />
      </div>
      <div style={{ borderTop: '1px solid #1E241F', padding: '22px 0 26px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontFamily: MONO, fontSize: 11, color: '#7C8277' }}>
        <span>{coda.signature}</span><span>{coda.copyright}</span>
      </div>
    </footer>
  )
}

/* ---------------- Page ---------------- */

export default function GrammarOfPlanning() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { y: 24, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.1 })
      gsap.from('[data-seed-dot]', { opacity: 0, scale: 0, transformOrigin: '50% 50%', stagger: { each: 0.008, from: 'random' }, scrollTrigger: { trigger: '#prologue', start: 'top 70%' } })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 85%',
        onEnter: (els) => gsap.fromTo(els, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1, overwrite: true }),
      })
    }, root)
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => { window.clearTimeout(refresh); ctx.revert() }
  }, [reduced])

  return (
    <div ref={root} className={styles.page}>
      <GrainDefs />
      <div className={styles.wrap}>
        <Link href="/" aria-label="기획의 숲 홈" className={styles.tab}>
          <span className={styles.tabMain}>
            <TreeMark />
            <span className={styles.vertical} style={{ fontWeight: 900, fontSize: 20, letterSpacing: '0.08em' }}>기획의 숲</span>
            <span className={styles.vertical} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', opacity: 0.85 }}>FOREST OF THOUGHT</span>
          </span>
          <span className={styles.tabSub}><LeafIcon /></span>
        </Link>
        <main className={styles.column}>
          <Hero />
          <Prologue />
          {chapters.map((c) => <ChapterSection key={c.id} c={c} />)}
          <Interlude />
          <Epilogue />
          <AppendixA />
          <AppendixB />
          <Coda />
        </main>
      </div>
    </div>
  )
}
