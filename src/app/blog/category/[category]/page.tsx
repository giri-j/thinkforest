import { notFound } from 'next/navigation'
import { CATEGORIES, getAllPosts, getCategoryCounts, getCategoryMeta, getPostsByCategory, stagesOf } from '@/lib/blog'
import PostGrid from '@/components/blog/desk/PostGrid'
import { numberPosts } from '@/components/blog/desk/PostTable'
import SubjectBar from '@/components/blog/desk/SubjectBar'
import s from '@/components/blog/desk/desk.module.css'

export async function generateStaticParams() {
    return CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata(context: { params: Promise<{ category: string }> }) {
    const { category } = await context.params
    const meta = getCategoryMeta(category)
    if (!meta) return {}
    return { title: `${meta.key} — Forest Desk`, description: meta.description }
}

/* 주제 페이지 — 목차와 같은 머리·주제 줄·카드 격자. 다른 점은 제목과 설명뿐. */
export default async function CategoryPage(context: { params: Promise<{ category: string }> }) {
    const { category } = await context.params
    const meta = getCategoryMeta(category)
    if (!meta) notFound()

    const all = await getAllPosts()
    const posts = await getPostsByCategory(category)
    const counts = await getCategoryCounts()

    return (
        <>
            <header className={`${s.magHead} ${s.in}`}>
                <p className={s.eyebrow}>[ {meta.no} ] — Subject · {meta.scene}</p>
                <h1 className={s.pageTitle}>{meta.key}<span>{meta.ko}</span></h1>
                <p className={s.pageDesc}>{meta.description}</p>
            </header>
            <SubjectBar counts={counts} total={all.length} active={meta.key} />
            <div className={`${s.gridWrap} ${s.pad} ${s.in2}`}>
                <PostGrid posts={posts} numbers={numberPosts(all)} stages={stagesOf(all)} latestSlug={all[0]?.slug} empty={`아직 ${meta.key}에 쓴 글이 없습니다. 곧 채워집니다.`} />
            </div>
        </>
    )
}
