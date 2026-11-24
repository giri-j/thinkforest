import Link from 'next/link'
import { deskDate, getCategoryMeta, type Post } from '@/lib/blog-meta'
import s from './desk.module.css'

/* 매거진식 카드 목록 — 큰 세로 이미지, 제목, 그 아래 한 줄(주제 · 날짜).
   발췌문은 두지 않는다. 사진과 제목이 전부다. */
interface Props {
  posts: Post[]
  latestSlug?: string
  numbers?: Record<string, number>
  empty?: string
}

export default function PostGrid({ posts, latestSlug, numbers, empty = '아직 발행된 글이 없습니다.' }: Props) {
  if (posts.length === 0) return <div className={s.empty}>{empty}</div>
  return (
    <div className={s.grid}>
      {posts.map((p, i) => {
        const cat = getCategoryMeta(p.category)
        const no = numbers?.[p.slug]
        return (
          <article key={p.slug} className={s.card}>
            <Link href={`/blog/${p.slug}`} className={s.cardImg} aria-hidden="true" tabIndex={-1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" loading={i < 3 ? 'eager' : 'lazy'} decoding="async" />
              {no !== undefined && <span className={`${s.cardNo} ${s.mono}`}>{String(no).padStart(3, '0')}</span>}
              {p.slug === latestSlug && <span className={`${s.badge} ${s.cardBadge} ${s.mono}`}>Latest</span>}
            </Link>
            <h3 className={s.cardTitle}><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
            <p className={`${s.cardMeta} ${s.mono}`}>
              {cat ? <Link href={`/blog/category/${cat.slug}`}>{cat.key} · {cat.ko}</Link> : <span>{p.category}</span>}
              <span className={s.cardDot} aria-hidden="true">·</span>
              <time dateTime={p.date}>{deskDate(p.date)}</time>
            </p>
          </article>
        )
      })}
    </div>
  )
}
