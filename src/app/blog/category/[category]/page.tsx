import { getPostsByCategory, getCategories } from '@/lib/blog'
import { ChevronLeft, Calendar, Clock, Eye } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    'Planning': '프로젝트의 시작부터 끝까지, 실무 경험과 함께 고민하는 기획의 본질과 문제 정의에 대한 기록입니다. 성과를 만드는 전략과 시스템 설계를 다룹니다.',
    'Reverse Engineering': '완성된 서비스를 사용자 여정과 비즈니스 로직 관점에서 해부하며 설계자의 의도를 추적합니다. 서비스 뒤에 숨겨진 기획적 근거를 탐구합니다.',
    'Journey': '낯선 곳으로의 여정 속에서 발견한 새로운 시각과 일상의 조각들을 기록합니다. 여행을 통해 얻은 영감과 생각의 확장을 공유합니다.',
    'Cutlet Lab': '완벽한 돈까스를 향한 치열한 탐구와 미식의 경험을 공유하는 개인적인 실험실입니다. 작은 디테일이 만드는 맛의 차이를 기록합니다.',
    'Personal Notes': '일상의 소소한 발견과 개인적인 단상들, 그리고 삶의 궤적을 기록하는 지극히 사적인 공간입니다.'
}

export async function generateStaticParams() {
    const categories = await getCategories()
    return categories.map((category) => ({
        category: category,
    }))
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const { category } = params
    const posts = await getPostsByCategory(category)
    const description = CATEGORY_DESCRIPTIONS[category] || `"${category}" 카테고리와 관련된 기획의 조각들을 모았습니다.`

    return (
        <div className="min-h-screen bg-[#F6F8F7]">
            <div className="max-w-[800px] mx-auto px-6 py-40">
                <header className="mb-24">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-black text-[#1C2E24]/30 hover:text-[#1C2E24] transition-colors mb-12 group"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Index
                    </Link>

                    <div className="flex flex-col gap-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#355BE5]">Category</span>
                        <h1 className="text-5xl md:text-6xl font-bold text-[#1C2E24] tracking-tight font-maple">
                            {category}
                        </h1>
                        <p className="text-[#1C2E24]/60 text-lg md:text-xl leading-relaxed max-w-[600px]">
                            {description}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[#1C2E24]/30 uppercase tracking-widest mt-4">
                            <span>{posts.length} Articles</span>
                        </div>
                    </div>
                </header>

                <div className="space-y-16">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <article key={post.slug} className="group pb-16 border-b border-[#E5EBE8] last:border-none">
                                <Link href={`/blog/${post.slug}`} className="block">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-[#1C2E24]/30 uppercase tracking-widest">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-[#E8B86D]" />
                                                {formatDate(post.date)}
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

                                        <h2 className="text-2xl md:text-3xl font-bold text-[#1C2E24] group-hover:text-[#355BE5] transition-colors leading-tight font-maple">
                                            {post.title}
                                        </h2>

                                        {post.summary && (
                                            <p className="text-[#1C2E24]/70 text-base leading-relaxed line-clamp-2">
                                                {post.summary}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#355BE5] tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                            Read Full Note
                                            <ChevronLeft size={12} className="rotate-180" />
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))
                    ) : (
                        <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-[#E5EBE8] text-[#1C2E24]/40">
                            <p className="text-lg font-medium">아직 발행된 글이 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
