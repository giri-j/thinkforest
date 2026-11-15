import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import PostTable, { numberPosts } from '@/components/blog/desk/PostTable'
import s from '@/components/blog/desk/desk.module.css'

export const metadata = { title: 'Archive — Forest Desk', description: '연도별로 모아 둔 기획의 숲의 글.' }

export default async function ArchivePage() {
    const posts = await getAllPosts()
    const numbers = numberPosts(posts)

    const byYear = new Map<number, typeof posts>()
    for (const p of posts) {
        const y = new Date(p.date).getFullYear()
        if (!byYear.has(y)) byYear.set(y, [])
        byYear.get(y)!.push(p)
    }
    const years = [...byYear.keys()].sort((a, b) => b - a)

    return (
        <div className={s.pad}>
            <header className={`${s.pageHead} ${s.in}`}>
                <p className={s.eyebrow}><Link href="/blog" className={s.back}>← Index</Link> &nbsp;/&nbsp; [ ∞ ] — Archive</p>
                <h1 className={s.pageTitle}>By year<span>연도별</span></h1>
                <p className={s.pageDesc}>{posts.length}편의 글을 연도별로 모았습니다. 번호는 가장 오래된 글이 001번입니다.</p>
            </header>
            <div className={s.in2}>
                {years.map((y) => (
                    <section key={y}>
                        <h2 className={`${s.yearHead} ${s.mono}`}><b>{y}</b> · {byYear.get(y)!.length} {byYear.get(y)!.length === 1 ? 'entry' : 'entries'}</h2>
                        <PostTable posts={byYear.get(y)!} numbers={numbers} latestSlug={posts[0]?.slug} />
                    </section>
                ))}
                {years.length === 0 && <PostTable posts={[]} />}
            </div>
        </div>
    )
}
