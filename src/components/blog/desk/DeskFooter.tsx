import Link from 'next/link'
import s from './desk.module.css'

/* practice3 엔딩의 서명 줄과 같은 모양 */
export default function DeskFooter() {
  return (
    <footer className={`${s.sig} ${s.mono}`}>
      <span>© 기획의 숲 · Forest Desk</span>
      <a href="#top" className={s.toTop}>처음으로 ↑</a>
      <span>Think; Plan; Build. — <Link href="/about">전은길</Link></span>
    </footer>
  )
}
