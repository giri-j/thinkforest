import Link from 'next/link'
import { deskDate, getCategoryMeta, STAGES, type Post, type Stage } from '@/lib/blog-meta'
import s from './desk.module.css'

interface Props {
  posts: Post[]
  /* 전체 글 중 가장 새 글의 slug — "Latest" 배지를 단다. */
  latestSlug?: string
  /* slug → 글 번호(오래된 글이 001) */
  numbers?: Record<string, number>
  /* slug → 성장 단계(씨앗·싹·열매·숲). 있으면 제목 아래 작은 표시를 단다. */
  stages?: Record<string, Stage>
  showCategory?: boolean
  empty?: string
}

export default function PostTable({ posts, latestSlug, numbers, stages, showCategory = true, empty = '아직 발행된 글이 없습니다.' }: Props) {
  return (
    <div className={s.table}>
      <div className={`${s.thead} ${s.mono} ${s.caps}`}>
        <span className={s.num}>No.</span>
        <span>Title</span>
        <span>Date</span>
        <span className={s.len}>Length</span>
      </div>
      {posts.length === 0 && <div className={s.empty}>{empty}</div>}
      {posts.map((p) => {
        const cat = getCategoryMeta(p.category)
        const no = numbers?.[p.slug]
        const stage = stages?.[p.slug]
        const showSub = (showCategory && cat) || stage || p.place
        return (
          <article key={p.slug} className={s.row}>
            <span className={`${s.num} ${s.mono}`}>{no ? String(no).padStart(3, '0') : '—'}</span>
            <div className={s.titleCell}>
              <Link href={`/blog/${p.slug}`} className={s.titleLink}>{p.title}</Link>
              {p.slug === latestSlug && <span className={`${s.badge} ${s.mono}`}>Latest</span>}
              {showSub && (
                <span className={`${s.sub} ${s.mono}`}>
                  {showCategory && cat && <Link href={`/blog/category/${cat.slug}`}>[ {cat.no} ] {cat.key}</Link>}
                  {stage && <em className={`${s.stageTag} ${s[`st_${stage}`]}`}><i aria-hidden="true" />{STAGES[stage].ko}</em>}
                  {p.place ? <span> · {p.place}</span> : null}
                </span>
              )}
            </div>
            <span className={`${s.date} ${s.mono}`}>{deskDate(p.date)}</span>
            <span className={`${s.len} ${s.mono}`}>{p.readingTime}</span>
          </article>
        )
      })}
    </div>
  )
}

/* slug → 글 번호(오래된 글이 1번) */
export function numberPosts(all: Post[]): Record<string, number> {
  const n = all.length
  const out: Record<string, number> = {}
  all.forEach((p, i) => { out[p.slug] = n - i })
  return out
}
