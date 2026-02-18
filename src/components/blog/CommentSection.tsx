'use client'

import { useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Comment {
    id: string
    user: { name: string, avatar?: string }
    body: string
    created_at: string
    replies?: Comment[]
}

export default function CommentSection({ comments: initialComments }: { comments: Comment[] }) {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState(initialComments)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!comment.trim()) return
        // Mock submit
        const newComment: Comment = {
            id: Date.now().toString(),
            user: { name: '방문자 (나)' },
            body: comment,
            created_at: new Date().toISOString()
        }
        setComments([newComment, ...comments])
        setComment('')
    }

    return (
        <div className="mt-16 border-t border-border pt-16">
            <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="text-primary" size={24} />
                <h3 className="text-2xl font-bold text-brand-dark">댓글 ({comments.length})</h3>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="mb-12">
                <div className="relative">
                    <textarea
                        placeholder="생각을 나눠주세요..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-6 pb-16 rounded-3xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px] resize-none"
                    />
                    <button
                        type="submit"
                        className="absolute right-4 bottom-4 bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>

            {/* List */}
            <div className="space-y-8">
                {comments.map(c => (
                    <div key={c.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-primary">
                            {c.user.name[0]}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-brand-dark">{c.user.name}</span>
                                <span className="text-xs text-secondary-foreground">{formatDate(c.created_at)}</span>
                            </div>
                            <p className="text-secondary-foreground leading-relaxed">{c.body}</p>
                            <div className="mt-3 flex gap-4 text-xs font-bold text-secondary-foreground/50">
                                <button className="hover:text-primary transition-colors">답글 달기</button>
                                <button className="hover:text-rose-400 transition-colors text-rose-300">신고</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
