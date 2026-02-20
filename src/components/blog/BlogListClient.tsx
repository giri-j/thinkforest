'use client'

import { useState } from 'react'
import { Post } from '@/lib/blog'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Eye, Search, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface BlogListClientProps {
    posts: Post[]
    categories: string[]
    initialCategory?: string
    showSearchOnMount?: boolean
}

export default function BlogListClient({
    posts,
    categories,
    initialCategory,
    showSearchOnMount = false
}: BlogListClientProps) {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null)

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.summary.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = !selectedCategory || post.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const allCategories = ['All', ...categories]

    return (
        <section>
            <div className="flex flex-col items-start gap-10 mb-20 px-2">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full no-scrollbar">
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${(cat === 'All' && selectedCategory === null) || selectedCategory === cat
                                ? 'bg-white border-[#E8B86D] text-[#1C2E24] shadow-sm'
                                : 'bg-[#E5EBE8] border-transparent text-[#1C2E24]/60 hover:bg-[#E5EBE8]/80'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full max-w-md">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1C2E24]/30" size={18} />
                    <input
                        type="text"
                        placeholder="어떤 생각을 찾고 계신가요?"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-14 pr-6 py-3 rounded-2xl border-2 border-[#E5EBE8] focus:border-[#355BE5] outline-none bg-white transition-all text-sm shadow-sm placeholder:text-[#1C2E24]/20"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode='popLayout'>
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <Card className="h-full border-[#E5EBE8] bg-white overflow-hidden hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-[#355BE5]">
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <Badge variant="secondary" className="bg-[#E5EBE8] text-[#1C2E24] hover:bg-[#E5EBE8] border-none text-[10px]">
                                                {post.category}
                                            </Badge>
                                            <div className="flex gap-1">
                                                {post.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[10px] text-[#1C2E24]/40 font-bold">#{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-[#1C2E24] mb-3 group-hover:text-[#355BE5] line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#1C2E24]/60 text-xs mb-6 line-clamp-3 leading-relaxed">
                                            {post.summary}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between text-[10px] text-[#1C2E24]/40 font-medium">
                                            <div className="flex items-center gap-3">
                                                <span>{formatDate(post.date)}</span>
                                                <span className="flex items-center gap-1"><Clock size={10} /> {post.readingTime}</span>
                                            </div>
                                            <span className="flex items-center gap-1"><Eye size={10} /> 987</span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-[#E5EBE8] text-[#1C2E24]/40">
                    <p className="text-lg font-medium">No results found for "{search}"</p>
                    <p className="text-sm">Try different keywords or category.</p>
                </div>
            )}
        </section>
    )
}
