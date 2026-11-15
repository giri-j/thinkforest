import Link from 'next/link'
import { getAllPosts, getPostsByTag } from '@/lib/blog'
import PostTable, { numberPosts } from '@/components/blog/desk/PostTable'
import s from '@/components/blog/desk/desk.module.css'

export default async function TagPage(context: { params: Promise<{ tag: string }> }) {
    const { tag: raw } = await context.params
    const tag = decodeURIComponent(raw)
    const all = await getAllPosts()
    const posts = await getPostsByTag(tag)

    return (
        <div className={s.pad}>
            <header className={`${s.pageHead} ${s.in}`}>
                <p className={s.eyebrow}><Link href="/blog" className={s.back}>← Index</Link> &nbsp;/&nbsp; [ # ] — Tag</p>
                <h1 className={s.pageTitle}>#{tag}</h1>
                <span className={`${s.mono} ${s.grey}`}>{posts.length} {posts.length === 1 ? 'entry' : 'entries'}</span>
            </header>
            <div className={s.in2}>
                <PostTable posts={posts} numbers={numberPosts(all)} latestSlug={all[0]?.slug} empty={`"${tag}" 태그가 붙은 글이 없습니다.`} />
            </div>
        </div>
    )
}
