'use client'

import { useMemo, useState } from 'react'
import type { Post } from '@/lib/blog-meta'
import PostTable from './PostTable'
import s from './desk.module.css'

export default function DeskSearch({ posts, numbers }: { posts: Post[]; numbers: Record<string, number> }) {
    const [q, setQ] = useState('')
    const hits = useMemo(() => {
        const t = q.trim().toLowerCase()
        if (!t) return posts
        return posts.filter((p) =>
            p.title.toLowerCase().includes(t) ||
            p.summary.toLowerCase().includes(t) ||
            p.tags.some((x) => x.toLowerCase().includes(t)) ||
            p.content.toLowerCase().includes(t)
        )
    }, [q, posts])

    return (
        <>
            <input
                className={s.searchBox}
                type="search"
                autoFocus
                placeholder="무엇을 찾고 계신가요?"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="글 검색"
            />
            <span className={`${s.mono} ${s.grey}`} style={{ display: 'block', marginBottom: 14 }}>
                {q ? `${hits.length} ${hits.length === 1 ? 'result' : 'results'} for “${q}”` : `${posts.length} entries`}
            </span>
            <PostTable posts={hits} numbers={numbers} latestSlug={posts[0]?.slug} empty={`"${q}"에 해당하는 글이 없습니다.`} />
        </>
    )
}
