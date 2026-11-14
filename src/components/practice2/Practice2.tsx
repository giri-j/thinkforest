'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appendixA, appendixB, chapters, coda, epilogue, interlude, type Chapter } from './content'
import { chapterCta, chapterGrid, codaP2, darkThemes, essaysP2, heroP2, marqueeP2, prologueP2 } from './extra'
import { G, GrainDefs, GrowthIcon, HEAD, MONO } from './visuals'
import SideDrawerTab from './SideDrawerTab'
import { CardStack, CompareModule, Devices, FilmStrip, PinnedSequence, useReducedMotion } from './media'
import s from './practice2.module.css'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const LeafIcon = ({ color = 'currentColor', size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.4" aria-hidden="true">
    <path d="M10 18V9M10 11C6 11 4 7 4 5c3 0 6 2 6 6zM10 9c0-4 3-6 6-6 0 3-2 6-6 6z" />
  </svg>
)

const GOLD = '#E1B970'
const INK = '#0B0F0C'

/* ---------------- 로직 트리 (Hero 작은 일러스트 · Interlude 공용) ---------------- */

const X = [40, 130, 220, 310, 400]

function LogicDiagram({ small = false }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 440 300" role={small ? undefined : 'img'} aria-hidden={small ? true : undefined} aria-label={small ? undefined : '기획 로직 트리: 기획에서 다섯 동사로 갈라지는 다이어그램'} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <g stroke="#8C9C8B" strokeWidth="1.2" fill="none">
        <path d="M220 46V80M40 80H400M40 80V120M130 80V120M220 80V120M310 80V120M400 80V120" />
        <path d="M40 150V190M130 150V190M220 150V190M310 150V190M400 150V190" strokeDasharray="2 4" />
      </g>
      <rect x="175" y="18" width="90" height="28" rx="4" fill={GOLD} />
      <text x="220" y="37" textAnchor="middle" fontFamily="var(--p2-sans), Noto Sans KR, sans-serif" fontWeight="700" fontSize="13" fill={INK}>기획</text>
      {interlude.nodes.map((n, i) => (
        <g key={n}>
          <rect x={X[i] - 38} y="120" width="76" height="30" rx="4" fill={G} stroke="#8C9C8B" />
          <text x={X[i]} y="139" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#EDE7DA">{n}</text>
          {!small && <text x={X[i]} y="206" textAnchor="middle" fontSize="9" fill="#93A592">{interlude.verbs[i]}</text>}
        </g>
      ))}
      {!small && <text x="220" y="270" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#6E776D">FIG. 02-A — THE DIAGRAM</text>}
    </svg>
  )
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section aria-label="히어로" className={s.hero}>
      <div className={s.dots} data-dots aria-hidden="true" />
      <div className={s.heroInner}>
        <p data-after className={s.eyebrow} style={{ opacity: 0 }}>{heroP2.eyebrow}</p>
        <div data-hero style={{ opacity: 0 }}>
          <h1 className={s.h1}>
            {heroP2.lines.map((l) => <span key={l} className={s.hLine}>{l}</span>)}
          </h1>
        </div>
        <p data-after className={s.subtitle} style={{ opacity: 0 }}>{heroP2.subtitle}</p>
      </div>
      <div data-after className={s.heroTree} aria-hidden="true" style={{ opacity: 0 }}><LogicDiagram small /></div>
      <div data-after className={s.heroMeta} style={{ opacity: 0 }}>
        <span>{heroP2.meta}</span>
        <span className={s.metaDim}>{heroP2.role}</span>
        <span className={s.metaDim}>{heroP2.scroll} ↓</span>
      </div>
    </section>
  )
}

/* ---------------- Marquee ---------------- */

function Marquee() {
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !track.current) return
    const tw = gsap.to(track.current, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 })
    return () => { tw.kill() }
  }, [reduced])
  const text = `${marqueeP2.items.join('  ·  ')}  ·  `
  return (
    <div className={s.marquee}>
      <Link href={marqueeP2.href} aria-label={marqueeP2.items.join(' · ')}>
        <div ref={track} className={s.marqueeTrack} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <span key={i}><i className={s.badge}>{marqueeP2.badge}</i>{text}</span>)}
        </div>
      </Link>
    </div>
  )
}

/* ---------------- Prologue (스크롤 컬러 리빌) ---------------- */

function ScrollWords({ text, className }: { text: string; className: string }) {
  return (
    <p data-words className={className}>
      {text.split(' ').map((w, i) => <span key={i} data-word>{w}{' '}</span>)}
    </p>
  )
}

function Prologue() {
  return (
    <section id="prologue" aria-label="Prologue" className={s.prologue}>
      <span className={s.pLabel}>{prologueP2.label}</span>
      <ScrollWords text={prologueP2.statement} className={s.bigWords} />
      <ScrollWords text={prologueP2.body} className={s.smallWords} />
      <span className={s.facts}>{prologueP2.facts}</span>
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

/** vanschneider식 2단 엇갈림 이미지 그리드 — 지금은 플레이스홀더 */
function ImageGrid({ id }: { id: string }) {
  const items = chapterGrid(id)
  if (!items.length) return null
  return (
    <div className={s.grid}>
      {items.map((img, i) => (
        <figure key={img.caption} className={i % 2 === 1 ? s.offset : undefined}>
          <div className={s.media} data-media>
            {img.src ? (
              <div data-inner className={s.mediaInner} style={{ position: 'relative' }}>
                <Image src={img.src} alt={img.alt ?? img.caption} fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
            ) : (
              <div data-inner className={s.mediaInner} style={{ background: `radial-gradient(120% 90% at ${i % 2 ? '80% 20%' : '20% 80%'}, ${img.tone.glow}, ${img.tone.mid} 45%, ${img.tone.base} 85%)` }} />
            )}
          </div>
          <figcaption data-reveal>{img.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function ChapterSection({ c }: { c: Chapter }) {
  const t = darkThemes[c.theme]
  return (
    <section id={c.id} aria-label={`Chapter ${c.no} ${c.en}`} className={s.chapter} style={{ background: t.bg, color: t.fg }}>
      <div className={s.watermark} data-drift aria-hidden="true">{c.en}</div>
      <div className={s.chInner}>
        <div className={s.chTop} style={{ borderColor: '#2A332C' }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em' }}>CHAPTER {c.no} · {c.en}</span>
          <span style={{ fontSize: 12, color: t.sub }}>{c.verb}</span>
        </div>
        <div className={s.chRow}>
          <div className={s.chLeft}>
            <h2 data-reveal className={s.headline}>
              <b style={{ color: GOLD }}>{c.en}</b> — {c.question[0]} {c.question[1]}
            </h2>
            <p data-reveal className={s.metaLine} style={{ color: t.sub }}>{c.caption} · STAGE {c.stage}</p>
            <p data-reveal className={s.bodyText} style={{ color: t.body }}>{c.body}</p>
            <Link data-reveal href={`/about#${c.id}`} className={s.pill}>{chapterCta} <span aria-hidden="true">→</span></Link>
          </div>
          <div className={s.chRight}>
            <figure data-reveal style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <GrowthIcon stage={c.growth} color={t.line} label={c.stage} />
              <figcaption style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', color: t.line, opacity: 0.85 }}>STAGE {c.stage}</figcaption>
            </figure>
            <span className={s.big} style={{ color: t.num }}>{c.big}</span>
            <span style={{ fontSize: 11, lineHeight: 1.6, color: t.sub }}>{c.bigCaption}</span>
          </div>
        </div>
      </div>
      <ChapterMedia c={c} />
      <ImageGrid id={c.id} />
      <p data-reveal className={s.maxim}>“{c.maxim}”</p>
    </section>
  )
}

/* ---------------- Interlude: 다이어그램 → 나무 ---------------- */

function Interlude() {
  const wrap = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const diagram = useRef<HTMLDivElement>(null)
  const tree = useRef<HTMLDivElement>(null)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)')
    const update = () => setStill(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (still || !wrap.current || !tree.current || !diagram.current) return
    const draw = tree.current.querySelectorAll('[data-draw]')
    const fruits = tree.current.querySelectorAll('[data-fruit]')
    const ctx = gsap.context(() => {
      gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set(fruits, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(tree.current, { opacity: 0 })
      gsap.timeline({
        scrollTrigger: { trigger: wrap.current, start: 'top top', end: '+=1100', scrub: 0.6, pin: stage.current, anticipatePin: 1 },
      })
        .to(diagram.current, { rotateX: 180, duration: 0.45, ease: 'power2.inOut' }, 0)
        .to(diagram.current, { opacity: 0, duration: 0.15 }, 0.32)
        .to(tree.current, { opacity: 1, duration: 0.15 }, 0.4)
        .to(draw, { strokeDashoffset: 0, duration: 0.35, stagger: 0.02, ease: 'none' }, 0.45)
        .to(fruits, { scale: 1, duration: 0.12, stagger: 0.03, ease: 'back.out(2)' }, 0.78)
    }, wrap)
    return () => ctx.revert()
  }, [still])

  const treeSvg = (
    <svg viewBox="0 0 440 300" role="img" aria-label="뒤집힌 로직 트리가 줄기와 열매를 가진 나무가 된 모습" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <circle cx="220" cy="130" r="125" fill={GOLD} opacity="0.08" />
      <g stroke="#C9A66B" strokeWidth="1.6" fill="none">
        <path data-draw pathLength={1} d="M220 290V200" />
        <path data-draw pathLength={1} d="M220 200C220 180 40 190 40 150" /><path data-draw pathLength={1} d="M220 200C220 180 130 180 130 150" /><path data-draw pathLength={1} d="M220 200V150" /><path data-draw pathLength={1} d="M220 200C220 180 310 180 310 150" /><path data-draw pathLength={1} d="M220 200C220 190 400 190 400 150" />
        {X.map((x, i) => <path key={x} data-draw pathLength={1} d={`M${x} 120V${[80, 70, 60, 70, 80][i]}`} />)}
        <path data-draw pathLength={1} d="M190 300C200 292 210 290 220 290 230 290 240 292 250 300" />
      </g>
      <g fill={INK} stroke={GOLD} strokeWidth="1.2">{X.map((x) => <rect key={x} x={x - 24} y="120" width="48" height="16" rx="3" />)}</g>
      <g fill={GOLD}>{X.map((x, i) => <circle key={x} data-fruit cx={x} cy={[74, 64, 52, 64, 74][i]} r={[7, 8, 9, 8, 7][i]} />)}</g>
      <text x="220" y="20" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#6E776D">FIG. 02-B — THE TREE</text>
    </svg>
  )

  return (
    <section ref={wrap} aria-label="Interlude The Method" className={s.interlude}>
      <div ref={stage} className={s.interStage}>
        <div className={s.interHead}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: GOLD }}>{interlude.label}</span>
          <p>{interlude.line1}<br /><span style={{ color: GOLD }}>{interlude.line2}</span></p>
        </div>
        {still ? (
          <div className={s.interStatic}>
            <div><LogicDiagram /></div>
            <div>{treeSvg}</div>
          </div>
        ) : (
          <div className={s.interFig}>
            <div ref={diagram} style={{ transformStyle: 'preserve-3d' }}><LogicDiagram /></div>
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
    <section aria-label="Epilogue The Tree" className={s.epilogue}>
      <div className={s.epHead}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: GOLD }}>{epilogue.label}</span>
        <p data-reveal className={s.epLine}>{epilogue.line1}<br />{epilogue.line2}</p>
        <p style={{ margin: 0, fontSize: 13, color: '#A9BC9C' }}>{epilogue.sub}</p>
      </div>
      <div ref={ref}>
        <svg viewBox="0 -50 720 620" role="img" aria-label={`경력 나무: ${epilogue.roots.text}, ${epilogue.trunk.text}, ${epilogue.branches.text}, 나뭇잎으로 흩어진 ${epilogue.leaves.join('·')}`} style={{ display: 'block', width: '100%', maxWidth: 760, margin: '40px auto 0' }}>
          <defs><radialGradient id="p2-crownglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={GOLD} stopOpacity="0.22" /><stop offset="1" stopColor={GOLD} stopOpacity="0" /></radialGradient></defs>
          <circle cx="360" cy="190" r="230" fill="url(#p2-crownglow)" />
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
          <g fill={GOLD}>{[[140, 108, 7], [240, 86, 8], [290, 52, 7], [375, 57, 9], [495, 76, 8], [560, 123, 7], [540, 198, 6]].map(([x, y, r]) => <circle key={`${x}-${y}`} data-fruit cx={x} cy={y} r={r} />)}</g>
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
            <text x="360" y="-30" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2" fill={GOLD}>{epilogue.branches.title}</text>
            <text x="360" y="-12" fontFamily="var(--p2-sans), Noto Sans KR, sans-serif" fontWeight="600" fontSize="15" fill="#F2EDE3">{epilogue.branches.text}</text>
          </g>
          <g textAnchor="end">
            <text x="340" y="350" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2" fill="#93A592">{epilogue.trunk.title}</text>
            <text x="340" y="368" fontFamily="var(--p2-sans), Noto Sans KR, sans-serif" fontWeight="600" fontSize="15" fill="#F2EDE3">{epilogue.trunk.text}</text>
          </g>
          <g textAnchor="middle">
            <text x="360" y="540" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2" fill="#93A592">{epilogue.roots.title}</text>
            <text x="360" y="558" fontFamily="var(--p2-sans), Noto Sans KR, sans-serif" fontWeight="600" fontSize="15" fill="#F2EDE3">{epilogue.roots.text}</text>
          </g>
        </svg>
      </div>
    </section>
  )
}

/* ---------------- Appendix A ---------------- */

type Lab = (typeof appendixA.left)[number]
function LabItem({ l, i }: { l: Lab; i: number }) {
  const margins = ['0 12% 0 10%', '0 10% 0 14%', '0 18% 0 4%', '0 14% 0 6%', '0 16% 0 0', '0 8% 0 10%']
  return (
    <figure data-reveal style={{ margin: margins[i % 6], display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ position: 'relative', aspectRatio: l.ratio, background: l.color, overflow: 'hidden' }}>
        {l.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={l.src} alt={`${l.tag} — ${l.caption}`} className={s.img} />
        ) : null}
        <span className={s.chip}>{l.tag}</span>
      </div>
      <figcaption style={{ fontSize: 10.5, color: '#B0B5A8' }}>{l.caption}</figcaption>
    </figure>
  )
}

function AppendixA() {
  return (
    <section id="appendix-a" aria-label="Appendix A 공방" className={s.appA}>
      <div className={s.appHead} style={{ borderBottom: '1px solid #2A332C', marginBottom: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', color: GOLD }}>{appendixA.label}</span>
        <span style={{ fontSize: 12, color: '#8C9C8B' }}>{appendixA.title}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 72, paddingTop: 220 }}>
          {appendixA.left.map((l, i) => <LabItem key={i} l={l} i={i} />)}
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 72 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingLeft: '30%', height: 200, paddingTop: 40 }}>
            <span aria-hidden="true" style={{ width: 1, height: '100%', background: '#3A433C' }} />
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <LeafIcon color={GOLD} size={16} />
              <span className={s.vertical} style={{ fontSize: 14, lineHeight: 1.5 }}>{appendixA.vertical[0]}<br />{appendixA.vertical[1]}</span>
            </span>
          </div>
          {appendixA.right.map((l, i) => <LabItem key={i} l={l} i={i + 3} />)}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Appendix B: Featured Essays 화살표 리스트 ---------------- */

function AppendixB() {
  return (
    <section aria-label="Appendix B 숲의 기록" className={s.appB}>
      <div className={s.essayHead} data-reveal>
        <span>{appendixB.label}</span>
        <em>{essaysP2.sublabel}</em>
        <Link href="/blog" className={s.essayAll}>{essaysP2.allLabel}</Link>
      </div>
      <h2 data-reveal className={s.essayTitle}>{appendixB.title}</h2>
      <p data-reveal style={{ margin: '4px 0 28px', fontSize: 13, color: '#8C9C8B' }}>{appendixB.sub}</p>
      <ul className={s.essayList}>
        {appendixB.posts.map((p, i) => (
          <li key={i} data-reveal>
            <Link href={p.href}><span>{p.title}</span><i aria-hidden="true">→</i></Link>
          </li>
        ))}
      </ul>
      <form id="letter" aria-label="숲 편지 구독" onSubmit={(e) => e.preventDefault()} className={s.letter}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: HEAD, fontWeight: 700, letterSpacing: '-0.03em', fontSize: 22 }}>{appendixB.letterTitle}</span>
          <span style={{ fontSize: 12, color: '#8C9C8B' }}>{appendixB.letterSub}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '0 1 380px' }}>
          <label htmlFor="p2-email" style={{ fontSize: 12, color: '#8C9C8B' }}>이메일</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <input id="p2-email" type="email" required placeholder="name@example.com" className={s.input} />
            <button type="submit" className={s.subscribe}>구독</button>
          </div>
        </div>
      </form>
    </section>
  )
}

/* ---------------- Coda ---------------- */

const Pillar = () => <span aria-hidden="true" style={{ flex: '0 0 44px', alignSelf: 'flex-end', height: 160, background: 'repeating-linear-gradient(90deg, #2A302B 0 1px, transparent 1px 7px)', borderTop: '3px double #3A403B' }} />

function Coda() {
  return (
    <footer id="coda" aria-label="Coda" className={s.coda}>
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: GOLD }}>{codaP2.label}</span>
      <h2 data-reveal className={s.codaCopy}>
        {codaP2.lines.map((l) => <span key={l}>{l}</span>)}
      </h2>
      <div data-reveal className={s.codaActions}>
        <Link href={codaP2.cta.href} className={s.goldPill}>{codaP2.cta.label}</Link>
        {codaP2.links.map((l) => <Link key={l.label} href={l.href} className={s.underLink}>{l.label}</Link>)}
      </div>
      <div aria-hidden="true" className={s.arches}>
        <Pillar />
        {coda.arches.map((a) => <span key={a.title} className={s.arch} />)}
        <Pillar />
      </div>
      <div className={s.codaBottom}>
        <span>{coda.signature}</span><span>{coda.copyright}</span>
      </div>
    </footer>
  )
}

/* ---------------- Page ---------------- */

export default function Practice2({ afterHero }: { afterHero?: React.ReactNode } = {}) {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const el = root.current
    let cancelled = false
    const cleanups: Array<() => void> = []
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(['[data-hero]', '[data-after]'], { opacity: 1 })
        return
      }
      const mm = gsap.matchMedia()

      /* Hero: /vanschneider와 동일한 헤어라인 드로잉 —
         가는 외곽선이 글자를 따라 그려진 뒤 채움이 차오르고, 나머지 요소가 뒤따른다.
         SVG <text> 복제본을 실제 <h1> 위에 정확히 겹치고, 끝나면 SVG를 걷어내 실제 텍스트로 넘긴다. */
      const heroBlock = el.querySelector<HTMLElement>('[data-hero]')
      const h1 = heroBlock?.querySelector<HTMLElement>('h1')
      const after = gsap.utils.toArray<HTMLElement>('[data-after]')
      if (heroBlock && h1) {
        gsap.set(after, { filter: 'blur(10px)', y: -20 })
        const start = () => {
          if (cancelled) return
          const NS = 'http://www.w3.org/2000/svg'
          const lines = Array.from(h1.querySelectorAll('span')) as HTMLElement[]
          const svg = document.createElementNS(NS, 'svg')
          svg.setAttribute('class', s.hairline)
          svg.setAttribute('aria-hidden', 'true')
          h1.appendChild(svg)
          const texts = lines.map((line) => {
            const t = document.createElementNS(NS, 'text')
            t.textContent = line.textContent
            t.setAttribute('fill', '#fff')
            t.setAttribute('fill-opacity', '0')
            t.setAttribute('stroke', '#fff')
            t.setAttribute('stroke-width', '1')
            svg.appendChild(t)
            return t as SVGTextElement
          })
          const dashes: number[] = []
          const place = () => {
            const hr = h1.getBoundingClientRect()
            svg.setAttribute('width', String(Math.ceil(hr.width)))
            svg.setAttribute('height', String(Math.ceil(hr.height)))
            lines.forEach((line, i) => {
              const probe = document.createElement('span')
              probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'
              line.appendChild(probe)
              const sr = line.getBoundingClientRect()
              const base = probe.getBoundingClientRect().top
              line.removeChild(probe)
              const cs = getComputedStyle(line)
              const t = texts[i]
              t.style.fontFamily = cs.fontFamily
              t.style.fontSize = cs.fontSize
              t.style.fontWeight = cs.fontWeight
              t.style.letterSpacing = cs.letterSpacing
              t.setAttribute('x', (sr.left - hr.left).toFixed(2))
              t.setAttribute('y', (base - hr.top).toFixed(2))
              const dash = parseFloat(cs.fontSize) * 11
              dashes[i] = dash
              t.style.strokeDasharray = String(dash)
            })
          }
          place()
          texts.forEach((t, i) => (t.style.strokeDashoffset = String(dashes[i])))
          lines.forEach((l) => (l.style.color = 'transparent'))
          gsap.set(heroBlock, { opacity: 1 })
          window.addEventListener('resize', place)
          const done = () => {
            window.removeEventListener('resize', place)
            lines.forEach((l) => (l.style.color = ''))
            svg.remove()
          }
          cleanups.push(() => { window.removeEventListener('resize', place); svg.remove(); lines.forEach((l) => (l.style.color = '')) })
          const DRAW = 1.8
          gsap.timeline({ delay: 0.25, onComplete: done })
            .to(texts, { strokeDashoffset: 0, duration: DRAW, ease: 'power2.inOut', stagger: 0.18 }, 0)
            .to(texts, { attr: { 'fill-opacity': 1 }, duration: 0.9, ease: 'power1.inOut', stagger: 0.18 }, DRAW - 0.55)
            .to(texts, { attr: { 'stroke-opacity': 0 }, duration: 0.6, ease: 'power1.out', stagger: 0.18 }, DRAW + 0.1)
            .to(after, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, clearProps: 'filter,transform' }, DRAW + 0.4)
        }
        if (document.fonts?.ready) document.fonts.ready.then(start)
        else start()
      }

      /* 공통 리빌 — 요소별 once 트리거. 끝나면 clearProps로 흐린 상태가 남지 않음 */
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((node) => {
        gsap.from(node, {
          y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: node, start: 'top 92%', once: true },
        })
      })

      /* 프롤로그 단어 컬러 리빌 — 스크롤 구간 안에서 반드시 끝까지 선명해진다 */
      gsap.utils.toArray<HTMLElement>('[data-words]').forEach((p) => {
        const words = p.querySelectorAll('[data-word]')
        gsap.fromTo(words, { opacity: 0.18 }, {
          opacity: 1, ease: 'none', stagger: 0.12,
          scrollTrigger: { trigger: p, start: 'top 85%', end: 'bottom 58%', scrub: true },
        })
      })

      mm.add('(min-width: 761px)', () => {
        /* 도트 그리드 패럴랙스 */
        gsap.to('[data-dots]', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '[data-dots]', start: 'top bottom', end: 'bottom top', scrub: true } })

        /* 워터마크 좌우 패럴랙스 */
        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((node, i) => {
          gsap.fromTo(node, { xPercent: i % 2 ? 10 : -10 }, { xPercent: i % 2 ? -10 : 10, ease: 'none', scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub: true } })
        })

        /* 이미지: clip-path 리빌 + 내부 패럴랙스 */
        gsap.utils.toArray<HTMLElement>('[data-media]').forEach((node) => {
          const inner = node.querySelector('[data-inner]')
          gsap.fromTo(node, { clipPath: 'inset(12% 8% 12% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: node, start: 'top 95%', end: 'top 45%', scrub: true } })
          if (inner) gsap.fromTo(inner, { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.05, ease: 'none', scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub: true } })
        })
      })
      return () => mm.revert()
    }, el)

    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 1500)
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => { cancelled = true; cleanups.forEach((f) => f()); window.clearTimeout(t1); window.clearTimeout(t2); ctx.revert() }
  }, [reduced])

  return (
    <div ref={root} className={s.page}>
      <GrainDefs />
      <div className={s.wrap}>
        {/* 잡지 페이지 래퍼: relative + 가운데 정렬. overflow/transform 없음 (sticky·서랍 연출 보호) */}
        <div className="relative mx-auto w-[88vw] max-w-[1200px] max-md:w-full max-md:max-w-none">
          <SideDrawerTab />
          <main className={`relative z-10 ${s.column}`}>
          <Hero />
          {afterHero}
          <Marquee />
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
    </div>
  )
}
