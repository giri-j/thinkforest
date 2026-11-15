import Link from 'next/link'
import { CATEGORIES, getAllPosts, getCategoryCounts, stagesOf, threadOf } from '@/lib/blog'
import PostTable, { numberPosts } from '@/components/blog/desk/PostTable'
import DeskHero from '@/components/blog/desk/DeskHero'
import SubjectBar from '@/components/blog/desk/SubjectBar'
import s from '@/components/blog/desk/desk.module.css'

export const metadata = {
    title: 'Forest Desk — 기획의 숲 블로그',
    description: '기획의 숲의 책상. Idea, Trials, Personal, Life — 생각과 시도와 공간의 기록.',
}

const PER_PAGE = 48
const FIRST_YEAR = 2021 // 기획을 시작한 해

export default async function BlogPage(props: { searchParams: Promise<{ page?: string }> }) {
    const { page: pageParam } = await props.searchParams
    const posts = await getAllPosts()
    const counts = await getCategoryCounts()
    const numbers = numberPosts(posts)
    const stages = stagesOf(posts)

    /* 히어로 숫자: 올해 심은 글, 사업까지 간 실 */
    const year = new Date().getFullYear()
    const thisYear = posts.filter((p) => new Date(p.date).getFullYear() === year).length
    const grown = new Set(posts.map((p) => threadOf(p, posts)).filter((t) => t?.stage === 'forest').map((t) => t!.name)).size

    const pages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
    const page = Math.min(pages, Math.max(1, Number(pageParam) || 1))
    const slice = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <>
            <DeskHero total={posts.length} firstYear={FIRST_YEAR} thisYear={thisYear} grown={grown} />
            <SubjectBar counts={counts} total={posts.length} />

            <section id="entries" className={`${s.section} ${s.pad}`} style={{ scrollMarginTop: 24 }}>
                <h2 className={`${s.secHead} ${s.mono}`}>
                    <span><b>[ 01 ]</b> — Entries</span>
                    <Link href="/blog/archive">Browse by year →</Link>
                </h2>
                <PostTable posts={slice} latestSlug={posts[0]?.slug} numbers={numbers} stages={stages} />
                <div className={`${s.pager} ${s.mono}`}>
                    <span>{page > 1 ? <Link href={`/blog?page=${page - 1}`}>← Later entries</Link> : null}</span>
                    <span>Page {page} of {pages} · {posts.length} entries</span>
                    <span>{page < pages ? <Link href={`/blog?page=${page + 1}`}>Earlier entries →</Link> : null}</span>
                </div>
            </section>

            <section className={`${s.section} ${s.pad}`}>
                <h2 className={`${s.secHead} ${s.mono}`}>
                    <span><b>[ 02 ]</b> — Subjects</span>
                    <span>생각 → 시도 → 숲, 그리고 그 곁의 글들</span>
                </h2>
                <div className={s.subjectGrid}>
                    {CATEGORIES.map((c) => (
                        <div key={c.key} className={s.subject}>
                            <Link href={`/blog/category/${c.slug}`}>
                                <span className={`${s.mono} ${s.gold}`}>[ {c.no} ] · {String(counts[c.key]).padStart(2, '0')}</span>
                                <h3>{c.key}</h3>
                                <span className={`${s.mono} ${s.sceneTag}`}>{c.scene}</span>
                                <p>{c.description}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${s.note} ${s.pad}`}>
                <p>사과 하나가 떨어지듯 떠오른 질문을,</p>
                <p>그냥 흘려보내지 않으려고 <span className={s.gold}>이 책상을 두었습니다.</span></p>
            </section>
        </>
    )
}
