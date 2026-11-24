import Link from 'next/link'
import { notFound } from 'next/navigation'
import { deskDate, getAdjacentPosts, getAllPosts, getCategoryMeta, getPostBySlug, signDate } from '@/lib/blog'
import MDXContent from '@/components/blog/MDXContent'
import ViewCounter from '@/components/blog/ViewCounter'
import { Divider } from '@/components/blog/desk/Ornaments'
import s from '@/components/blog/desk/desk.module.css'

const AUTHOR = '기리'
const PLACE = 'Seoul'

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(context: { params: Promise<{ slug: string }> }) {
    const params = await context.params
    const post = await getPostBySlug(params.slug)
    if (!post) return {}

    return {
        title: `${post.title} — Forest Desk`,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.date,
            authors: [AUTHOR],
            images: post.cover ? [post.cover] : [],
        },
    }
}

export default async function PostPage(context: { params: Promise<{ slug: string }> }) {
    const { slug } = await context.params
    const all = await getAllPosts()
    const post = all.find((p) => p.slug === slug)
    if (!post) notFound()

    const { newer, older } = await getAdjacentPosts(slug)
    const cat = getCategoryMeta(post.category)

    return (
        <article className={s.pad}>
            <ViewCounter slug={slug} />
            <div className={s.narrow}>
                <header className={`${s.postHead} ${s.in}`}>
                    <p className={s.eyebrow}>
                        <Link href="/blog" className={s.back}>← Index</Link>
                        {cat && <> &nbsp;/&nbsp; <Link href={`/blog/category/${cat.slug}`}>[ {cat.no} ] — {cat.key}</Link></>}
                    </p>
                    <h1 className={s.postTitle}>{post.title}</h1>
                    <dl className={`${s.meta} ${s.mono}`}>
                        <div><dt>Author</dt><dd>{AUTHOR}</dd></div>
                        <div><dt>Filed</dt><dd>{deskDate(post.date)}</dd></div>
                        <div><dt>Length</dt><dd>{post.readingTime}</dd></div>
                        <div><dt>Subject</dt><dd>{cat ? <Link href={`/blog/category/${cat.slug}`}>{cat.key}</Link> : post.category}</dd></div>
                        <div><dt>Place</dt><dd>{post.place || PLACE}</dd></div>
                    </dl>
                </header>

                <div className={`${s.body} ${s.in2}`}>
                    {post.summary && <p className={s.lead}>{post.summary}</p>}
                    <MDXContent content={post.content} />
                </div>

                <Divider className={s.divider} />

                <div className={s.signoff}>
                    <p>읽어 주셔서 고맙습니다.</p>
                    <p>Yours truly,</p>
                    <p className={s.hand}>{AUTHOR}</p>
                    <span className={s.mono}>{post.place || PLACE}, {signDate(post.date)}</span>
                </div>

                <section className={s.keep}>
                    <span className={`${s.mono} ${s.caps} ${s.grey}`}>다음 나무로 — Keep reading</span>
                    <div className={s.keepGrid}>
                        {newer ? (
                            <Link href={`/blog/${newer.slug}`}>
                                <span className={s.mono}>← Newer · {deskDate(newer.date)}</span>
                                <strong>{newer.title}</strong>
                            </Link>
                        ) : <div className={s.none}><span className={s.mono}>← Newer</span><strong>가장 최근에 심은 나무입니다.</strong></div>}
                        {older ? (
                            <Link href={`/blog/${older.slug}`}>
                                <span className={s.mono}>Older · {deskDate(older.date)} →</span>
                                <strong>{older.title}</strong>
                            </Link>
                        ) : <div className={s.none}><span className={s.mono}>Older →</span><strong>여기가 숲의 첫 나무입니다.</strong></div>}
                    </div>
                </section>
            </div>
        </article>
    )
}
