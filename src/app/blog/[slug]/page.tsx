import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Clock, Eye, Calendar, ChevronLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import MDXContent from '@/components/blog/MDXContent'
import TableOfContents from '@/components/blog/TableOfContents'
import RelatedPosts from '@/components/blog/RelatedPosts'
import ViewCounter from '@/components/blog/ViewCounter'

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata(context: { params: Promise<{ slug: string }> }) {
    const params = await context.params
    const post = await getPostBySlug(params.slug)
    if (!post) return {}

    return {
        title: `${post.title} | 기획의 숲`,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.date,
            authors: ['기획의 숲'],
            images: post.cover ? [post.cover] : [],
        },
    }
}

export default async function PostPage(context: { params: Promise<{ slug: string }> }) {
    const { slug } = await context.params
    const post = await getPostBySlug(slug)
    const allPosts = await getAllPosts()

    if (!post) {
        notFound()
    }

    const currentIndex = allPosts.findIndex(p => p.slug === slug)
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

    return (
        <article className="min-h-screen bg-[#F6F8F7] pb-32">
            <ViewCounter slug={slug} />

            {/* Post Header Section - Centered Header */}
            <header className="pt-40 pb-20 px-6">
                <div className="max-w-[760px] mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-black text-[#1C2E24]/30 hover:text-[#1C2E24] transition-colors mb-12 group"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Index
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C2E24] mb-10 leading-[1.1] tracking-tight font-maple">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-y-4 gap-6 text-[11px] font-bold text-[#1C2E24]/40 uppercase tracking-widest pb-10 border-b border-[#E5EBE8]">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-[#355BE5]" />
                            {formatDate(post.date)}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-[#1C2E24]/10" />
                        <div className="flex items-center gap-1.5">
                            <span className="text-[#355BE5]">Category /</span>
                            <span className="text-[#1C2E24]">{post.category}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-[#1C2E24]/10" />
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {post.readingTime}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-[#1C2E24]/10" />
                        <div className="flex items-center gap-1.5">
                            <Eye size={12} />
                            2,497 views
                        </div>
                    </div>

                    {post.summary && (
                        <div className="mt-12 p-10 bg-[#E5EBE8] rounded-xl relative overflow-hidden">
                            <p className="text-base md:text-lg text-[#1C2E24] leading-relaxed font-medium">
                                {post.summary}
                            </p>
                        </div>
                    )}
                </div>
            </header>

            {/* Post Content Body */}
            <div className="px-6">
                <div className="max-w-[1200px] mx-auto flex gap-16 relative">
                    <div className="flex-1 max-w-[760px] mx-auto">
                        <div className="prose prose-lg max-w-none 
                            prose-headings:text-[#1C2E24] prose-headings:font-bold prose-headings:font-maple prose-headings:tracking-tight
                            prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-8
                            prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-6
                            prose-p:text-[#1C2E24] prose-p:leading-[1.8] prose-p:mb-8
                            prose-a:text-[#355BE5] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-[#1C2E24] prose-strong:font-black
                            prose-blockquote:border-l-4 prose-blockquote:border-[#1C2E24] prose-blockquote:bg-transparent prose-blockquote:pl-8 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-[#1C2E24] prose-blockquote:font-medium
                            prose-hr:border-[#E5EBE8] prose-hr:my-20
                            prose-ul:text-[#1C2E24] prose-ol:text-[#1C2E24]
                        ">
                            <MDXContent content={post.content} />
                        </div>

                        {/* Pagination Section */}
                        <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#E5EBE8] pt-12">
                            {prevPost ? (
                                <Link href={`/blog/${prevPost.slug}`} className="group p-8 rounded-2xl bg-white border border-[#E5EBE8] hover:border-[#355BE5] transition-all flex flex-col items-start gap-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1C2E24]/30 flex items-center gap-2">
                                        <ChevronLeft size={12} /> Previous Note
                                    </span>
                                    <span className="text-sm font-bold text-[#1C2E24] group-hover:text-[#355BE5] transition-colors line-clamp-2">
                                        {prevPost.title}
                                    </span>
                                </Link>
                            ) : <div />}

                            {nextPost ? (
                                <Link href={`/blog/${nextPost.slug}`} className="group p-8 rounded-2xl bg-white border border-[#E5EBE8] hover:border-[#355BE5] transition-all flex flex-col items-end gap-4 text-right">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1C2E24]/30 flex items-center gap-2">
                                        Next Note <ChevronLeft size={12} className="rotate-180" />
                                    </span>
                                    <span className="text-sm font-bold text-[#1C2E24] group-hover:text-[#355BE5] transition-colors line-clamp-2">
                                        {nextPost.title}
                                    </span>
                                </Link>
                            ) : <div />}
                        </div>

                        <div className="mt-20">
                            <RelatedPosts currentSlug={post.slug} category={post.category} />
                        </div>
                    </div>

                    <aside className="hidden xl:block w-64 top-40 sticky h-fit">
                        <TableOfContents content={post.content} />
                    </aside>
                </div>
            </div>
        </article>
    )
}
