import { getAllPosts, getCategories } from '@/lib/blog'
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ChevronLeft, Calendar } from 'lucide-react'

export default async function ArchivePage() {
    const posts = await getAllPosts()
    const categories = await getCategories()

    // Group posts by Year/Month
    const groupedPosts: { [key: string]: typeof posts } = {}
    posts.forEach(post => {
        const date = new Date(post.date)
        const key = `${date.getFullYear()}년 ${date.getMonth() + 1}월`
        if (!groupedPosts[key]) groupedPosts[key] = []
        groupedPosts[key].push(post)
    })

    return (
        <div className="min-h-screen bg-[#F6F8F7]">
            <div className="max-w-4xl mx-auto px-6 py-32">
                <header className="mb-20">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#1C2E24]/40 hover:text-[#1C2E24] transition-colors mb-8 group"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1C2E24] mb-4 tracking-tight font-maple">Archive</h1>
                    <p className="text-[#1C2E24]/60 text-lg">기획의 숲에서 남긴 생각의 발자취들입니다.</p>
                </header>

                <div className="space-y-16">
                    {Object.entries(groupedPosts).map(([month, monthPosts]) => (
                        <div key={month} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Calendar className="text-[#355BE5]" size={20} />
                                <h2 className="text-xl font-bold text-[#1C2E24]">{month}</h2>
                                <div className="flex-1 h-px bg-[#E5EBE8]" />
                            </div>
                            <div className="grid gap-4">
                                {monthPosts.map(post => (
                                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                                        <Card className="p-6 hover:border-[#355BE5] transition-all bg-white border-[#E5EBE8] flex justify-between items-center group">
                                            <div>
                                                <p className="text-[10px] text-[#1C2E24]/40 font-bold mb-1 uppercase tracking-widest">{post.category}</p>
                                                <h3 className="text-lg font-bold text-[#1C2E24] group-hover:text-[#355BE5] transition-colors">{post.title}</h3>
                                            </div>
                                            <span className="text-sm font-medium text-[#1C2E24]/30">{new Date(post.date).getDate()}일</span>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
