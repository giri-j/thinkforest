'use client'

/* 블로그 히어로 — 홈이 끝난 자리(황금 숲의 마지막 프레임)에서 그대로 이어서 시작한다.
   홈이 "생각은 숲이 되고"로 끝났다면, 여기는 그 숲이 실제로 자라는 기록이다.
   헤드라인은 practice3와 같은 헤어라인 연출(외곽선 → 채움 → 부제가 흐림에서 내려옴). */

import { useRef } from 'react'
import Link from 'next/link'
import p2 from '@/components/practice2/practice2.module.css'
import { useHairlineIntro } from '@/components/practice3/useHairlineIntro'
import s from './desk.module.css'

const LINES = ['THE FOREST', 'IS STILL', 'GROWING.']

interface Props {
  total: number
  firstYear: number
  /* 올해 심은 글 수 */
  thisYear: number
  /* 사업(케이스 스터디)까지 간 실의 수 */
  grown: number
}

export default function DeskHero({ total, firstYear, thisYear, grown }: Props) {
  const ref = useRef<HTMLElement>(null)
  useHairlineIntro(ref, p2.hairline)

  return (
    <section ref={ref} className={s.hero}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.heroBg} src="/practice3/c/095.webp" alt="" fetchPriority="high" />
      <div className={s.heroShade} />
      <div className={s.heroInner}>
        <p data-after className={s.eyebrow} style={{ opacity: 0 }}>[ 00 ] — The Desk · 숲지기의 기록</p>
        <div data-hero style={{ opacity: 0 }}>
          <h1 className={`${p2.h1} ${s.heroH1}`}>
            {LINES.map((l) => <span key={l} className={p2.hLine}>{l}</span>)}
          </h1>
        </div>
        <p data-after className={`${p2.subtitle} ${s.heroSub}`} style={{ opacity: 0 }}>
          숲은 아직 자라는 중입니다. 여기는 그 기록 — 떠오른 생각, 해본 일, 좋았던 곳.
        </p>
      </div>
      <div data-after className={`${s.heroMeta} ${s.mono}`} style={{ opacity: 0 }}>
        <span className={s.heroStats}>
          <b>{total}</b> 그루 심음 · 첫 심기 <b>{firstYear}</b>
          {thisYear > 0 && <> · 올해 <b>{thisYear}</b></>}
          {grown > 0 && <> · <b>{grown}</b> 그루는 숲이 됨</>}
        </span>
        <Link href="#entries">Scroll to entries ↓</Link>
      </div>
    </section>
  )
}
