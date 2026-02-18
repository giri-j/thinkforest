'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Mock data
const MOCK_POSTS = [
    {
        id: '1',
        slug: 'problem-definition',
        title: '문제를 정의하는 기술: 기획의 시작',
        summary: '해결책보다 중요한 것은 우리가 무엇을 해결하려 하는지 아는 것입니다.',
        tags: ['STRATEGY', 'PRODUCT'],
        published_at: '2024-02-18T00:00:00Z',
        reading_time: '5 min read'
    },
    {
        id: '2',
        slug: 'ux-psychology',
        title: '심리학으로 풀어보는 사용자 경험',
        summary: '인지 편향과 행동 모델을 활용하여 더 직관적인 인터페이스를 설계하는 방법.',
        tags: ['UX', 'DESIGN'],
        published_at: '2024-02-15T00:00:00Z',
        reading_time: '8 min read'
    }
]

export default function BlogList() {
    const [search, setSearch] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    const filteredPosts = MOCK_POSTS.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.summary.toLowerCase().includes(search.toLowerCase())
        const matchesTag = !selectedTag || post.tags.includes(selectedTag)
        return matchesSearch && matchesTag
    })

    const allTags = Array.from(new Set(MOCK_POSTS.flatMap(p => p.tags)))

    return (
        <div className="max-w-4xl mx-auto px-6 py-32">
            <header className="mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-6 tracking-tight">생각의 조각들</h1>
                <p className="text-secondary-foreground text-lg">기획과 제품, 그리고 성장에 대한 기록입니다.</p>
            </header>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="Searching for thoughts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-secondary-foreground/50"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${!selectedTag ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedTag === tag ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Post Grid */}
            <div className="space-y-12">
                {filteredPosts.map(post => (
                    <article key={post.id} className="group flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 text-sm text-secondary-foreground mb-4">
                                <span className="font-bold">{formatDate(post.published_at)}</span>
                                <span>·</span>
                                <span>{post.reading_time}</span>
                            </div>
                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-secondary-foreground leading-relaxed mb-6">
                                {post.summary}
                            </p>
                            <div className="flex gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-[10px] px-2 py-1 bg-secondary rounded-md font-bold text-primary flex items-center gap-1">
                                        <Tag size={10} /> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border text-secondary-foreground">
                        검색 결과가 없습니다. 다른 단어로 찾아보세요.
                    </div>
                )}
            </div>
        </div>
    )
}
