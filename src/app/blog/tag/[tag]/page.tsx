import { getPostsByTag, getCategories } from '@/lib/blog'
import BlogListClient from '@/components/blog/BlogListClient'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function TagPage({ params }: { params: { tag: string } }) {
    const { tag } = params
    const posts = await getPostsByTag(tag)
    const categories = await getCategories()

    return (
        <div className="min-h-screen bg-[#F6F8F7]">
            <div className="max-w-7xl mx-auto px-6 py-32">
                <header className="mb-20">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#1C2E24]/40 hover:text-[#1C2E24] transition-colors mb-8 group"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to All Posts
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#1C2E24] mb-4 tracking-tight font-maple">
                        #{tag}
                    </h1>
                    <p className="text-[#1C2E24]/60 text-lg">"{tag}" 태그와 관련된 기획 조각들입니다.</p>
                </header>

                <BlogListClient posts={posts} categories={categories} />
            </div>
        </div>
    )
}
