'use client'

/* 분야 탭 — 블로그 SubjectBar와 같은 생김새. 누르면 해당 분야로 스크롤, 스크롤 중엔 보고 있는 분야에 금색 밑줄. */

import { useEffect, useState } from 'react'
import type { Field } from '@/app/portfolio/portfolioData'
import s from '@/components/blog/desk/desk.module.css'
import p from './portfolio.module.css'

type FieldMeta = { key: Field; en: string; ko: string }

export default function FieldBar({ fields, counts, total }: { fields: FieldMeta[]; counts: Record<Field, number>; total: number }) {
  const [active, setActive] = useState<Field | null>(null)
  const pad = (n: number) => String(n).padStart(2, '0')

  useEffect(() => {
    const els = fields.map((f) => document.getElementById(`field-${f.key}`)).filter((e): e is HTMLElement => !!e)
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) setActive((en.target as HTMLElement).dataset.field as Field)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    els.forEach((e) => io.observe(e))
    // 첫 분야 위(머리·목차)로 돌아가면 All
    const first = els[0]
    const onScroll = () => { if (first && first.getBoundingClientRect().top > window.innerHeight * 0.2) setActive(null) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [fields])

  const go = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav aria-label="분야" className={`${s.subjectBar} ${p.fieldBar}`}>
      <div className={s.subjectTabs}>
        <a href="#top" onClick={go('top')} aria-current={active === null ? 'true' : undefined} className={s.subjectTab}>
          <b>All</b><sup className={s.mono}>{pad(total)}</sup>
        </a>
        {fields.map((f) => (
          <a key={f.key} href={`#field-${f.key}`} onClick={go(`field-${f.key}`)} aria-current={active === f.key ? 'true' : undefined} className={s.subjectTab}>
            <b>{f.en}</b><span className={s.subjectKo}>{f.ko}</span><sup className={s.mono}>{pad(counts[f.key])}</sup>
          </a>
        ))}
      </div>
    </nav>
  )
}
