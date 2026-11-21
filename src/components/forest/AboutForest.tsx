'use client'

/* About — 소개 양식: 큰 소개 문장 → 경력 서술 + 사진 → 경력 표 → 숫자 → 한 줄 선언 → 하는 일 →
   일하는 방식 → 걸어온 길(프로젝트 목록) → 연락. 원고는 app/about/aboutData.ts. */

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  heroCopy, intro, narrative, experienceTitle, experience, stats, pull, services,
  beliefStatement, principles, featuredCases, otherProjects, ctaCopy,
} from '@/app/about/aboutData'
import d from '@/components/blog/desk/desk.module.css'
import { useReveal } from './useReveal'
import f from './forest.module.css'

/* 프로젝트 목록 한 줄 — 대표 프로젝트와 그 외를 같은 표에 싣는다 */
const WORK = [
  ...featuredCases.map((c) => ({ title: c.title, org: c.org, tag: c.tag, note: c.metric, href: c.href })),
  ...otherProjects.map((p) => ({ title: p.title, org: p.org, tag: p.tag, note: p.metric ?? '', href: p.href })),
]

export default function AboutForest() {
  const rootRef = useRef<HTMLDivElement>(null)
  useReveal(rootRef)

  return (
    <div ref={rootRef} className={f.page}>
      {/* 큰 소개 문장 */}
      <section className={f.intro}>
        <p className={d.eyebrow} data-rv>[ 01 ] — About</p>
        <h1 className={f.statement} data-rv style={{ ['--d' as string]: 1 }}>
          {intro.first}<br /><span>{intro.second}</span>
        </h1>
      </section>

      {/* 경력 서술 + 사진 */}
      <section className={`${f.sec} ${f.bio}`}>
        <div className={f.prose}>
          {narrative.map((p, i) => <p key={i} data-rv style={{ ['--d' as string]: i }}>{p}</p>)}
          <p className={`${d.mono} ${f.byline}`} data-rv>{heroCopy.name} · {heroCopy.role}</p>
        </div>
        <figure className={f.portrait} data-rv style={{ ['--d' as string]: 1, margin: 0 }}>
          <Image src="/about_img/giri_picture.jpeg" alt="기획자 기리" fill sizes="(min-width: 768px) 420px, 320px" priority />
          <figcaption className={`${f.figCap} ${d.mono}`}><span>Fig. 01 — 기리</span><span>Seoul</span></figcaption>
        </figure>
      </section>

      {/* 경력 표 */}
      <section className={f.sec}>
        <h2 className={f.label} data-rv>{experienceTitle}</h2>
        <ul className={f.rows}>
          {experience.map((e, i) => (
            <li key={e.period} className={f.row} data-rv style={{ ['--d' as string]: i }}>
              <span className={`${d.mono} ${f.rowPeriod}`}>{e.period}</span>
              <strong>{e.org}</strong>
              <span className={f.rowType}>/ {e.type}</span>
              <span className={f.rowRole}>{e.role}</span>
            </li>
          ))}
        </ul>
        <p className={f.portfolioRow} data-rv>
          <Link href="/portfolio" className={f.pill}>포트폴리오 보러가기 →</Link>
        </p>
      </section>

      {/* 숫자 */}
      <section className={f.sec}>
        <dl className={f.stats}>
          {stats.map((s, i) => (
            <div key={s.label} className={f.stat} data-rv style={{ ['--d' as string]: i }}>
              <dt>{s.label}</dt>
              <dd><b>{s.value}</b>{s.unit && <small>{s.unit}</small>}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 한 줄 선언 + 하는 일 */}
      <section className={f.sec}>
        <p className={f.statement} data-rv>{pull}</p>
        <div className={f.services}>
          {services.map((g, i) => (
            <div key={g.title} data-rv style={{ ['--d' as string]: i }}>
              <h3 className={d.mono}>{g.title}</h3>
              <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* 일하는 방식 */}
      <section className={`${f.sec} ${f.bio}`}>
        <p className={`${f.statement} ${f.statementSm}`} data-rv>{beliefStatement}</p>
        <div className={f.prose}>
          {principles.map((p, i) => (
            <div key={p.no} className={f.prin} data-rv style={{ ['--d' as string]: i }}>
              <h3><span className={`${d.mono} ${d.gold}`}>{p.no}</span>{p.title}</h3>
              <p>{p.body}</p>
              <p className={`${d.mono} ${f.proof}`}>{p.proof}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 걸어온 길 — 프로젝트 목록 */}
      <section className={f.sec}>
        <h2 className={f.label} data-rv>걸어온 길, 프로젝트 {WORK.length}개.</h2>
        <ul className={f.rows}>
          {WORK.map((w, i) => {
            const inner = (
              <>
                <span className={`${d.mono} ${f.rowPeriod}`}>{String(i + 1).padStart(2, '0')}</span>
                <strong>{w.title}</strong>
                <span className={f.rowType}>/ {w.tag}</span>
                <span className={f.rowRole}>{w.note || w.org}{w.href && <em className={d.gold}> ↗</em>}</span>
              </>
            )
            return w.href
              ? <li key={w.title} data-rv><Link href={w.href} className={`${f.row} ${f.rowLink}`}>{inner}</Link></li>
              : <li key={w.title} className={f.row} data-rv>{inner}</li>
          })}
        </ul>
        <p className={f.portfolioRow} data-rv>
          <Link href="/portfolio" className={f.pill}>포트폴리오 보러가기 →</Link>
          <span className={`${d.mono} ${f.portfolioNote}`}>해본 일 전부를 영상·화면과 함께 모았습니다</span>
        </p>
      </section>

      {/* 연락 */}
      <section className={f.cta}>
        <div>
          <p className={d.eyebrow} data-rv>{ctaCopy.eyebrow}</p>
          <p className={f.ctaTitle} data-rv style={{ ['--d' as string]: 1 }}>
            {ctaCopy.titleLines[0]}<br /><span>{ctaCopy.titleLines[1]}</span>
          </p>
          <p className={f.ctaBody} data-rv style={{ ['--d' as string]: 2 }}>{ctaCopy.body}</p>
          <Link href="/contact" className={f.pill} data-rv style={{ ['--d' as string]: 3 }}>{ctaCopy.button} →</Link>
        </div>
      </section>
    </div>
  )
}
