import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Eye } from 'lucide-react'

interface RelatedPostsProps {
    currentSlug: string
    category: string
}

export default async function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
    const allPosts = await getAllPosts()

    // Suggest 3 posts in the same category, excluding the current one
    const related = allPosts
        .filter(post => post.slug !== currentSlug && post.category === category)
        .slice(0, 3)

    if (related.length === 0) return null

    return (
        <section className="mt-32">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1C2E24]/30 mb-10 text-center">Related Research Notes</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(post => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                        <Card className="h-full border-none shadow-none bg-white hover:bg-[#E5EBE8] transition-all overflow-hidden p-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] font-black text-[#355BE5] uppercase tracking-widest">
                                    {post.category}
                                </span>
                                <h5 className="text-base font-bold text-[#1C2E24] group-hover:text-[#355BE5] line-clamp-2 leading-snug">
                                    {post.title}
                                </h5>
                            </div>
                            <div className="mt-auto flex items-center justify-between text-[10px] text-[#1C2E24]/30 font-bold uppercase tracking-tight">
                                <span>{post.readingTime}</span>
                                <Eye size={10} />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
