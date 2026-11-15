'use client'

/* practice3의 코너 마이크로타입(TL)과 같은 문법의 상단 크롬.
   목차(/blog)에서는 히어로 이미지 위에 겹치고, 나머지 페이지에서는 흐름 안에 놓인다.
   주제 전환은 히어로 아래 SubjectBar가 맡는다 — 우상단 인덱스는 두지 않는다. */

import { usePathname } from 'next/navigation'
import s from './desk.module.css'

export default function DeskHeader() {
  const isIndex = usePathname() === '/blog'

  return (
    <header className={`${s.chrome} ${isIndex ? s.chromeOver : ''} ${s.mono}`}>
      <div className={s.corner}>
        <strong>{'// Forest Desk'}</strong>
        <span>Journal of 기획의 숲</span>
        <span>Seoul — since 2021</span>
      </div>
    </header>
  )
}
