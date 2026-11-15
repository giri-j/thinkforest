import { notFound } from 'next/navigation'
import { CATEGORIES, getAllPosts, getCategoryCounts, getCategoryMeta, getPostsByCategory, stagesOf } from '@/lib/blog'
import PostTable, { numberPosts } from '@/components/blog/desk/PostTable'
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

export default async function CategoryPage(context: { params: Promise<{ category: string }> }) {
    const { category } = await context.params
    const meta = getCategoryMeta(category)
    if (!meta) notFound()

    const all = await getAllPosts()
    const posts = await getPostsByCategory(category)
    const counts = await getCategoryCounts()

    return (
        <>
            {/* 주제마다 홈 시퀀스의 한 장면을 깔아, 숲의 어느 자리에 왔는지 보이게 */}
            <div className={s.catHero}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.heroBg} src={meta.frame} alt="" fetchPriority="high" />
                <div className={s.catShade} />
                <header className={`${s.pageHead} ${s.in}`} style={{ position: 'relative', zIndex: 2 }}>
                    <p className={s.eyebrow}>[ {meta.no} ] — Subject · {meta.scene}</p>
                    <h1 className={s.pageTitle}>{meta.key}<span>{meta.ko}</span></h1>
                    <p className={s.pageDesc}>{meta.description}</p>
                    <span className={`${s.mono} ${s.grey}`}>{posts.length} {posts.length === 1 ? 'entry' : 'entries'}</span>
                </header>
            </div>
            <SubjectBar counts={counts} total={all.length} active={meta.key} />
            <div className={`${s.pad} ${s.in2}`} style={{ paddingTop: 40 }}>
                <PostTable posts={posts} numbers={numberPosts(all)} stages={stagesOf(all)} latestSlug={all[0]?.slug} showCategory={false} empty={`아직 ${meta.key}에 쓴 글이 없습니다. 곧 채워집니다.`} />
            </div>
        </>
    )
}
