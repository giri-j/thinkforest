'use client'

/* Contact — 한 문장, 한 줄 설명, 버튼 하나. 연락 수단은 이메일 하나로 모은다. */

import { useRef } from 'react'
import d from '@/components/blog/desk/desk.module.css'
import { useReveal } from './useReveal'
import f from './forest.module.css'

const EMAIL = 'jek5797@naver.com'
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('[기획의 숲] 안녕하세요')}`

/* 아이콘은 1.5px 선 하나로 — 버튼 테두리·모노 글자와 같은 굵기 감으로 맞춘다 */
const ICON = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
const SOCIALS = [
  {
    label: 'Instagram', handle: '@gianteunkil', href: 'https://www.instagram.com/gianteunkil/',
    icon: (
      <svg {...ICON}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube', handle: '@iamgil_Official', href: 'https://www.youtube.com/@iamgil_Official',
    icon: (
      <svg {...ICON}>
        <rect x="2.5" y="5" width="19" height="14" rx="4" />
        <path d="M10.2 9.3v5.4l4.6-2.7z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function ContactForest() {
  const rootRef = useRef<HTMLDivElement>(null)
  useReveal(rootRef)

  return (
    <div ref={rootRef} className={f.page}>
      <section className={f.reach}>
        <p className={d.eyebrow} data-rv>[ 03 ] — Contact</p>
        <h1 className={f.reachH1} data-rv style={{ ['--d' as string]: 1 }}>
          Let&apos;s build <em>together.</em>
        </h1>
        <p className={f.reachSub} data-rv style={{ ['--d' as string]: 2 }}>
          무엇이든 제안해주세요.<br />
          긍정적으로 되게 만들어봅시다.
        </p>
        <div className={f.reachRow} data-rv style={{ ['--d' as string]: 3 }}>
          <a href={MAILTO} className={`${f.pill} ${f.reachBtn}`}>Reach out →</a>
          <a href={MAILTO} className={`${d.mono} ${f.reachMail}`}>{EMAIL}</a>
        </div>
        <ul className={f.socials} data-rv style={{ ['--d' as string]: 4 }}>
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={f.social}>
                {s.icon}
                <span className={d.mono}>{s.handle}</span>
                <span className={`${d.mono} ${f.socialArrow}`} aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
