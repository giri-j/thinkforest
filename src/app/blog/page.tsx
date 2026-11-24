import Link from 'next/link'
import { getAllPosts, getCategoryCounts } from '@/lib/blog'
import PostGrid from '@/components/blog/desk/PostGrid'
import { numberPosts } from '@/components/blog/desk/PostTable'
import SubjectBar from '@/components/blog/desk/SubjectBar'
import s from '@/components/blog/desk/desk.module.css'

export const metadata = {
    title: 'Forest Desk — 기획의 숲 블로그',
    description: '기획의 숲의 책상. Idea, Trials, Personal, Life — 생각과 시도와 공간의 기록.',
}

const PER_PAGE = 24

/* 매거진식 목차 — 제목 한 줄, 주제 줄, 그리고 큰 사진 카드 격자. 발췌문 없이 사진과 제목으로 읽힌다. */
export default async function BlogPage(props: { searchParams: Promise<{ page?: string }> }) {
    const { page: pageParam } = await props.searchParams
    const posts = await getAllPosts()
    const counts = await getCategoryCounts()
    const numbers = numberPosts(posts)

    const pages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
    const page = Math.min(pages, Math.max(1, Number(pageParam) || 1))
    const slice = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <>
            <header className={`${s.magHead} ${s.in}`}>
                <p className={s.eyebrow}>[ 01 ] — Forest Desk</p>
                <h1 className={s.pageTitle}>Blog<span>생각나는 것들의 기록</span></h1>
            </header>
            <SubjectBar counts={counts} total={posts.length} />

            <section id="entries" className={`${s.gridWrap} ${s.pad} ${s.in2}`} style={{ scrollMarginTop: 24 }}>
                <PostGrid posts={slice} latestSlug={posts[0]?.slug} numbers={numbers} />
                {pages > 1 && (
                    <div className={`${s.pager} ${s.mono}`}>
                        <span>{page > 1 ? <Link href={`/blog?page=${page - 1}`}>← Later entries</Link> : null}</span>
                        <span>Page {page} of {pages} · {posts.length} entries</span>
                        <span>{page < pages ? <Link href={`/blog?page=${page + 1}`}>Earlier entries →</Link> : null}</span>
                    </div>
                )}
            </section>
        </>
    )
}
