import Link from 'next/link'
import { CATEGORIES, type Category } from '@/lib/blog-meta'
import s from './desk.module.css'

/* 주제 전환 줄 — 히어로 바로 아래, 눈에 띄는 큰 탭. 우상단 인덱스는 프레임의 일부로 남기고, 실제 전환은 여기서 한다. */
export default function SubjectBar({ counts, total, active }: { counts: Record<Category, number>; total: number; active?: Category }) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <nav aria-label="주제" className={s.subjectBar}>
      <div className={s.subjectTabs}>
        <Link href="/blog" aria-current={!active ? 'page' : undefined} className={s.subjectTab}>
          <b>All</b><sup className={s.mono}>{pad(total)}</sup>
        </Link>
        {CATEGORIES.map((c) => (
          <Link key={c.key} href={`/blog/category/${c.slug}`} aria-current={active === c.key ? 'page' : undefined} className={s.subjectTab}>
            <b>{c.key}</b><span className={s.subjectKo}>{c.ko}</span><sup className={s.mono}>{pad(counts[c.key])}</sup>
          </Link>
        ))}
      </div>
      <div className={`${s.subjectMore} ${s.mono}`}>
        <Link href="/blog/archive">Archive</Link>
        <Link href="/blog/search">Search</Link>
      </div>
    </nav>
  )
}
