'use client'

/* About — 홈 · 블로그와 같은 다크 컬럼 안에서. 원고는 app/about/aboutData.ts 그대로. */

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { heroCopy, stats, principles, growth, featuredCases, otherProjects, ctaCopy } from '@/app/about/aboutData'
import d from '@/components/blog/desk/desk.module.css'
import { useReveal } from './useReveal'
import f from './forest.module.css'

function SecHead({ no, label, title, desc }: { no: string; label: string; title: string; desc?: string }) {
  return (
    <>
      <h2 className={f.secHead} data-rv><span><b>[ {no} ]</b> — {label}</span></h2>
      <p className={f.secTitle} data-rv style={{ ['--d' as string]: 1 }}>{title}</p>
      {desc && <p className={f.secDesc} data-rv style={{ ['--d' as string]: 2 }}>{desc}</p>}
    </>
  )
}

export default function AboutForest() {
  const rootRef = useRef<HTMLDivElement>(null)
  const growthRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  useReveal(rootRef)

  /* 나이테 줄기: 스크롤에 따라 금색 선이 아래로 자란다 (transform만) */
  useEffect(() => {
    const box = growthRef.current, fill = fillRef.current
    if (!box || !fill) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { fill.style.transform = 'scaleY(1)'; return }
    let raf = 0
    const update = () => {
      raf = 0
      const r = box.getBoundingClientRect(), vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / (r.height + vh * 0.1)))
      fill.style.transform = `scaleY(${p})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div ref={rootRef} className={f.page}>
      {/* 01 · Hero */}
      <section className={f.aboutHero}>
        <div>
          <p className={d.eyebrow} data-rv>[ 01 ] — About</p>
          <h1 className={f.aboutH1} data-rv style={{ ['--d' as string]: 1 }}>
            {heroCopy.titleLines[0]}<br /><em>{heroCopy.titleLines[1]}</em>
          </h1>
          <p className={f.lead} data-rv style={{ ['--d' as string]: 2 }}>{heroCopy.lead[0]} {heroCopy.lead[1]}</p>
          <p className={f.belief} data-rv style={{ ['--d' as string]: 3 }}>{heroCopy.belief}</p>
          <p className={`${d.mono} ${f.byline}`} data-rv style={{ ['--d' as string]: 4 }}>{heroCopy.name} · {heroCopy.role}</p>
        </div>
        <figure className={f.portrait} data-rv style={{ ['--d' as string]: 2, margin: 0 }}>
          <Image src="/about_img/giri_picture.jpeg" alt="기획자 기리(전은길)" fill sizes="(min-width: 768px) 420px, 320px" priority />
          <figcaption className={`${f.figCap} ${d.mono}`}><span>Fig. 01 — 기리</span><span>Seoul</span></figcaption>
        </figure>
      </section>

      {/* 02 · Proof */}
      <section className={f.sec}>
        <h2 className={f.secHead} data-rv><span><b>[ 02 ]</b> — Proof in numbers</span></h2>
        <dl className={f.stats}>
          {stats.map((s, i) => (
            <div key={s.label} className={f.stat} data-rv style={{ ['--d' as string]: i }}>
              <dt>{s.label}</dt>
              <dd><b>{s.value}</b>{s.unit && <small>{s.unit}</small>}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 03 · How I work */}
      <section className={f.sec}>
        <SecHead no="03" label="How I work" title="일하는 방식" desc="12년 동안 회사와 업무는 바뀌었지만, 일하는 방식은 한 번도 바뀌지 않았습니다." />
        <div className={f.trio}>
          {principles.map((p, i) => (
            <article key={p.no} className={f.prin} data-rv style={{ ['--d' as string]: i }}>
              <span className={`${d.mono} ${d.gold}`}>{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <p className={`${f.proof} ${d.mono}`}>{p.proof}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 04 · Growth rings */}
      <section className={f.sec}>
        <SecHead no="04" label="Growth rings" title="한 그루가 자란 기록" desc="현장에 뿌리를 내리고, 서비스로 줄기를 세우고, 사업으로 가지를 뻗어왔습니다." />
        <div ref={growthRef} className={f.growth}>
          <span className={f.trunk} aria-hidden />
          <span ref={fillRef} className={f.trunkFill} aria-hidden />
          {growth.map((g) => (
            <div key={g.stage} className={f.ring} data-rv>
              <div className={f.ringL}>
                <span className={`${d.mono} ${d.gold}`}>{g.stageEn}</span>
                <h3>{g.stage}</h3>
                <span className={`${d.mono} ${d.grey}`}>{g.period}</span>
              </div>
              <div className={f.ringR}>
                <h4>{g.org}</h4>
                <p className={`${f.role} ${d.mono}`}>{g.role}</p>
                <p className={f.summary}>{g.summary}</p>
                <ul className={`${f.hl} ${d.mono}`}>
                  {g.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 · Case studies */}
      <section className={f.sec}>
        <SecHead no="05" label="Case studies" title="대표 프로젝트" desc="각 프로젝트는 하나의 길입니다. 현장의 문제에서 출발해 구조를 바꾸고, 숫자로 끝났습니다." />
        <div className={f.cases}>
          {featuredCases.map((c, i) => (
            <article key={c.id} className={f.case} data-rv style={{ ['--d' as string]: i % 2 }}>
              {c.href && <Link href={c.href} className={f.cover} aria-label={`${c.title} 자세히 보기`} />}
              <div className={`${f.caseTop} ${d.mono}`}>
                <span><b>{String(i + 1).padStart(2, '0')}</b> · {c.tag}</span>
                <span>{c.org}</span>
              </div>
              <h3>{c.title}</h3>
              <dl className={f.pal}>
                <div><dt className={d.mono}>문제</dt><dd>{c.problem}</dd></div>
                <div><dt className={d.mono}>접근</dt><dd>{c.approach}</dd></div>
                <div><dt className={d.mono}>결과</dt><dd>{c.result}</dd></div>
              </dl>
              <div className={f.caseFoot}>
                <span className={f.metric}>{c.metric}</span>
                {c.href ? <span className={`${f.more} ${d.mono}`}>Read case →</span> : <span className={`${f.soon} ${d.mono}`}>상세 준비 중</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 06 · Other paths */}
      <section className={f.sec}>
        <h2 className={f.secHead} data-rv><span><b>[ 06 ]</b> — 그 외 걸어온 길</span></h2>
        <ul className={f.others}>
          {otherProjects.map((p, i) => (
            <li key={p.title} className={f.other} data-rv style={{ ['--d' as string]: i % 2 }}>
              {p.href && <Link href={p.href} className={f.cover} aria-label={`${p.title} 자세히 보기`} />}
              <div className={f.otherTop}>
                <strong>{p.title}{p.href && <span className={d.gold}> ↗</span>}</strong>
                <span className={d.mono}>{p.tag}</span>
              </div>
              <span className={`${f.org} ${d.mono}`}>{p.org}</span>
              <p>{p.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 07 · CTA */}
      <section className={f.cta}>
        <div>
          <p className={d.eyebrow} data-rv>[ 07 ] — {ctaCopy.eyebrow}</p>
          <p className={f.ctaTitle} data-rv style={{ ['--d' as string]: 1 }}>
            {ctaCopy.titleLines[0]}<br /><span>{ctaCopy.titleLines[1]}</span>
          </p>
          <p className={f.ctaBody} data-rv style={{ ['--d' as string]: 2 }}>{ctaCopy.body}</p>
          <Link href="/contact" className={f.pill} data-rv style={{ ['--d' as string]: 3 }}>{ctaCopy.button} →</Link>
        </div>
        <div className={f.raccoon} data-rv style={{ ['--d' as string]: 2 }}>
          <Image src="/contact_img/raccoon-sit.png" alt="숲을 지키는 너구리 기리" fill sizes="220px" style={{ objectFit: 'contain' }} />
        </div>
      </section>
    </div>
  )
}
