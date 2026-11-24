/* 홈의 코너 마이크로타입(TL/TR)과 같은 문법의 상단 크롬 — About · Contact용 */

import s from '@/components/blog/desk/desk.module.css'

/* title: 첫 줄(기본 '// Forest of Thought'), section: 둘째 줄(없으면 생략) */
export default function PageChrome({ section, title = 'Forest of Thought', right, over = false }: { section?: string; title?: string; right?: string[]; over?: boolean }) {
  return (
    <header className={`${s.chrome} ${over ? s.chromeOver : ''} ${s.mono}`}>
      <div className={s.corner}>
        <strong>{`// ${title}`}</strong>
        {section && <span>{section}</span>}
        <span>Seoul — since 2021</span>
      </div>
      {right && right.length > 0 && (
        <div className={`${s.corner} ${s.cornerR}`}>
          <strong>{`////// ${right[0]}`}</strong>
          {right.slice(1).map((l) => <span key={l}>{l}</span>)}
        </div>
      )}
    </header>
  )
}
