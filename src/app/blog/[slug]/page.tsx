import Link from 'next/link'
import { notFound } from 'next/navigation'
import { deskDate, getAdjacentPosts, getAllPosts, getCategoryMeta, getPostBySlug, signDate, STAGES, THREAD_ROLE, threadOf } from '@/lib/blog'
import { featuredCases } from '@/app/about/aboutData'
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
    const thread = threadOf(post, all)
    const stage = thread ? STAGES[thread.stage] : null
    const caseStudy = thread?.caseStudy ? featuredCases.find((c) => c.href === thread.caseStudy) : undefined
    /* 실 안에서 이 글의 다음 장(있으면 "이 생각이 이어진 곳"으로 안내) */
    const idx = thread ? thread.posts.findIndex((p) => p.slug === slug) : -1
    const nextInThread = thread && idx >= 0 ? thread.posts[idx + 1] : undefined

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
                        {thread && stage && (
                            <div><dt>Stage</dt><dd><a href="#thread" className={`${s.stageTag} ${s[`st_${thread.stage}`]}`}><i aria-hidden="true" />{stage.ko} · {stage.en}</a></dd></div>
                        )}
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

                {/* 실 — 이 생각이 어디까지 갔는지. 홈의 "생각 → 열매 → 숲"을 글 단위로 따라간다 */}
                {thread && stage && (
                    <section id="thread" className={s.thread} style={{ scrollMarginTop: 24 }}>
                        <div className={s.threadHead}>
                            <span className={`${s.mono} ${s.caps} ${s.grey}`}>Thread — 이 생각이 간 길</span>
                            <p className={s.threadStage}>
                                <em className={`${s.stageTag} ${s.stageBig} ${s[`st_${thread.stage}`]}`}><i aria-hidden="true" />{stage.ko}</em>
                                <span>{stage.note}</span>
                            </p>
                        </div>
                        <ol className={s.threadList}>
                            {thread.posts.map((p, i) => {
                                const here = p.slug === slug
                                const inner = (
                                    <>
                                        <span className={`${s.mono} ${s.threadRole}`}>{String(i + 1).padStart(2, '0')} · {THREAD_ROLE[p.category]}</span>
                                        <strong>{p.title}</strong>
                                        <span className={`${s.mono} ${s.threadDate}`}>{here ? '● 지금 여기' : deskDate(p.date)}</span>
                                    </>
                                )
                                return (
                                    <li key={p.slug} className={`${s.threadItem} ${here ? s.threadHere : ''}`} aria-current={here ? 'page' : undefined}>
                                        {here ? <div>{inner}</div> : <Link href={`/blog/${p.slug}`}>{inner}</Link>}
                                    </li>
                                )
                            })}
                            {thread.caseStudy && (
                                <li className={`${s.threadItem} ${s.threadForest}`}>
                                    <Link href={thread.caseStudy}>
                                        <span className={`${s.mono} ${s.threadRole}`}>{String(thread.posts.length + 1).padStart(2, '0')} · 사업</span>
                                        <strong>{caseStudy?.title ?? '케이스 스터디'}</strong>
                                        <span className={`${s.mono} ${s.threadDate}`}>Case study →</span>
                                    </Link>
                                </li>
                            )}
                            {thread.stage !== 'forest' && (
                                <li className={`${s.threadItem} ${s.threadNext}`}>
                                    <div>
                                        <span className={`${s.mono} ${s.threadRole}`}>{String(thread.posts.length + 1).padStart(2, '0')} · 다음</span>
                                        <strong>{thread.stage === 'seed' ? '아직 심지 않았습니다.' : thread.stage === 'sprout' ? '아직 해 보지 않았습니다.' : '아직 숲이 되지 않았습니다.'}</strong>
                                        <span className={`${s.mono} ${s.threadDate}`}>— 자라는 중</span>
                                    </div>
                                </li>
                            )}
                        </ol>
                    </section>
                )}

                <section className={s.keep}>
                    <span className={`${s.mono} ${s.caps} ${s.grey}`}>{nextInThread ? '다음 나무로 — 이 생각이 이어진 곳' : '다음 나무로 — Keep reading'}</span>
                    <div className={s.keepGrid}>
                        {nextInThread ? (
                            <Link href={`/blog/${nextInThread.slug}`}>
                                <span className={s.mono}>← {THREAD_ROLE[nextInThread.category]} · {deskDate(nextInThread.date)}</span>
                                <strong>{nextInThread.title}</strong>
                            </Link>
                        ) : newer ? (
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
