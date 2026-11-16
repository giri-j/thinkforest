/* practice3의 코너 마이크로타입(TL)과 같은 문법의 상단 크롬. 흐름 안에 놓인다.
   주제 전환은 머리 아래 SubjectBar가 맡는다 — 우상단 인덱스는 두지 않는다. */

import s from './desk.module.css'

export default function DeskHeader() {
  return (
    <header className={`${s.chrome} ${s.mono}`}>
      <div className={s.corner}>
        <strong>{'// Forest Desk'}</strong>
        <span>Journal of 기획의 숲</span>
        <span>Seoul — since 2021</span>
      </div>
    </header>
  )
}
