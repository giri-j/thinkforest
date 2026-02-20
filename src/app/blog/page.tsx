import { getAllPosts, getCategories } from '@/lib/blog'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Eye, TrendingUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import BlogListClient from '@/components/blog/BlogListClient'

export const metadata = {
    title: '기획의 숲 블로그 | 기획, 역기획, 여행, 돈까스',
    description: '기획의 숲에서 길을 만든 흔적들. 기획, 역기획, 여행, 돈까스에 대한 기록입니다.',
}

export default async function BlogPage() {
    const posts = await getAllPosts()
    const categories = await getCategories()

    // Mock views for now - will be replaced with real data from Supabase
    const popularPosts = posts.slice(0, 3)
    const latestPosts = posts.slice(0, 10)

    return (
        <div className="min-h-screen bg-[#F6F8F7]">
            <div className="max-w-7xl mx-auto px-6 py-32">
                <header className="mb-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-[#1C2E24] mb-6 tracking-tight font-maple">생각의 기록</h1>
                    <p className="text-[#1C2E24]/70 text-lg md:text-xl">기획의 숲에서 길을 만든 흔적들</p>
                </header>

                {/* Popular Posts Section */}
                <section className="mb-24">
                    <div className="flex items-center gap-2 mb-8">
                        <TrendingUp className="text-[#E8B86D]" size={24} />
                        <h2 className="text-2xl font-bold text-[#1C2E24]">Popular Posts</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularPosts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                                <Card className="h-full border-[#E5EBE8] bg-white overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-transparent group-hover:border-l-[#1C2E24]">
                                    <div className="p-8 flex flex-col h-full">
                                        <div className="mb-4">
                                            <Badge variant="secondary" className="bg-[#E5EBE8] text-[#1C2E24] hover:bg-[#E5EBE8] border-none">
                                                {post.category}
                                            </Badge>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1C2E24] mb-3 group-hover:text-[#355BE5] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#1C2E24]/60 text-sm mb-6 line-clamp-3">
                                            {post.summary}
                                        </p>
                                        <div className="mt-auto flex items-center gap-4 text-xs text-[#1C2E24]/40 font-medium">
                                            <span>{formatDate(post.date)}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readingTime}</span>
                                            <span className="flex items-center gap-1"><Eye size={12} /> 1,234</span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                <BlogListClient posts={posts} categories={categories} />
            </div>
        </div>
    )
}
