import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import LikeButton from '@/components/blog/LikeButton'
import CommentSection from '@/components/blog/CommentSection'

// Mock post fetching
const getPost = (slug: string) => {
    const posts = {
        'problem-definition': {
            title: '문제를 정의하는 기술: 기획의 시작',
            published_at: '2024-02-18T00:00:00Z',
            reading_time: '5 min read',
            tags: ['STRATEGY', 'PRODUCT'],
            content: `
        ## 들어가는 말
        많은 기획자가 해결책을 찾는 데 급급합니다. 하지만 진짜 중요한 것은 우리가 직면한 문제가 무엇인지 정확히 정의하는 것입니다.
        
        ### 1. 현상의 이면을 보기
        사용자가 불편하다고 말하는 것은 현상일 뿐입니다. 그 이면의 욕구를 파악해야 합니다.
        
        ### 2. '왜?'라고 다섯 번 묻기
        5-Whys 기법은 문제의 근본 원인에 도달하게 도와줍니다.
        
        \`\`\`javascript
        const defineProblem = (symptoms) => {
          return symptoms.map(s => analyze(s))
        }
        \`\`\`
      `,
            likes: 42,
            comments: [
                { id: 'c1', user: { name: '이하나' }, body: '정말 공감되는 글입니다. 많은 도움이 되었어요!', created_at: '2024-02-18T10:00:00Z' }
            ]
        }
    }
    return posts[slug as keyof typeof posts] || null
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const post = getPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-32">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors mb-12 group"
            >
                <ArrowLeft className="transition-transform group-hover:-translate-x-2" size={20} />
                Back to blog
            </Link>

            <header className="mb-16">
                <div className="flex items-center gap-4 text-primary font-bold mb-6">
                    {post.tags.map(t => <span key={t} className="tracking-widest uppercase text-xs">#{t}</span>)}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-8 tracking-tight leading-[1.1]">
                    {post.title}
                </h1>
                <div className="flex items-center justify-between py-6 border-y border-border">
                    <div className="flex items-center gap-4 text-secondary-foreground">
                        <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden" />
                        <div>
                            <p className="font-bold text-brand-dark">Giri (은길전)</p>
                            <div className="flex items-center gap-2 text-xs">
                                <span>{formatDate(post.published_at)}</span>
                                <span>·</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {post.reading_time}</span>
                            </div>
                        </div>
                    </div>
                    <button className="p-3 rounded-full bg-secondary text-primary hover:bg-secondary/80 transition-all">
                        <Share2 size={20} />
                    </button>
                </div>
            </header>

            {/* Content Rendering (Simplified for now) */}
            <article className="prose prose-lg max-w-none prose-headings:text-brand-dark prose-p:text-secondary-foreground prose-strong:text-brand-dark prose-code:text-primary prose-pre:bg-secondary/50">
                <div className="whitespace-pre-line leading-relaxed text-lg text-secondary-foreground">
                    {post.content}
                </div>
            </article>

            {/* Actions */}
            <div className="mt-16 flex flex-col items-center gap-8 py-12 border-y border-border">
                <p className="text-secondary-foreground font-medium">이 글이 도움이 되셨나요?</p>
                <LikeButton
                    initialLikes={post.likes}
                    onToggle={() => console.log('Toggled like')}
                />
            </div>

            <CommentSection comments={post.comments} />
        </div>
    )
}
