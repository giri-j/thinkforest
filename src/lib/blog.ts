import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { CATEGORIES, THREAD_RANK, getCategoryMeta, type Category, type Post, type Stage } from './blog-meta'

export { CATEGORIES, STAGES, THREAD_ROLE, getCategoryMeta, deskDate, signDate } from './blog-meta'
export type { Category, CategoryMeta, Post, Stage } from './blog-meta'

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog')
const PUBLIC_PATH = path.join(process.cwd(), 'public')

/* cover가 없는 글의 카드 사진 — 홈 시퀀스에서 서로 다르게 보이는 장면만 고른 목록.
   한 시퀀스 안의 이웃 프레임은 거의 같은 그림이라, 폴더 전체에서 고르면 카드들이 똑같아 보인다. */
const SCENE_FRAMES = [
    '/practice3/o/001.webp', '/practice3/o/032.webp', '/practice3/o/064.webp', '/practice3/o/090.webp',
    '/practice3/f/004.webp', '/practice3/f/018.webp', '/practice3/f/030.webp', '/practice3/f/040.webp',
    '/practice3/c/008.webp', '/practice3/c/036.webp', '/practice3/c/066.webp', '/practice3/c/095.webp',
]

function hashOf(s: string): number {
    let h = 0
    for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0
    return h
}

/* 카드 이미지: cover 파일이 public에 실제로 있으면 그것, 없으면 slug로 정해지는 장면.
   목록에서 이웃한 글과 같은 장면이 되지 않도록, 최근에 쓴 장면 셋은 피해 다음 장면으로 옮긴다. */
function assignImages(posts: Post[]): void {
    const recent: string[] = []
    for (const p of posts) {
        if (p.cover && fs.existsSync(path.join(PUBLIC_PATH, p.cover))) { p.image = p.cover; continue }
        let i = hashOf(p.slug) % SCENE_FRAMES.length
        for (let tries = 0; tries < SCENE_FRAMES.length && recent.includes(SCENE_FRAMES[i]); tries++) i = (i + 1) % SCENE_FRAMES.length
        p.image = SCENE_FRAMES[i]
        recent.push(p.image)
        if (recent.length > 3) recent.shift()
    }
}

export async function getAllPosts(): Promise<Post[]> {
    if (!fs.existsSync(BLOG_PATH)) {
        return []
    }

    const files = fs.readdirSync(BLOG_PATH)

    const posts = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const filePath = path.join(BLOG_PATH, file)
            const source = fs.readFileSync(filePath, 'utf8')
            const { data, content } = matter(source)
            const stats = readingTime(content)
            const minutes = Math.max(1, Math.ceil(stats.minutes))

            const slug = data.slug || file.replace('.mdx', '')
            return {
                tags: [],
                summary: '',
                ...data,
                slug,
                image: '',
                readingTime: `${minutes} min`,
                minutes,
                wordCount: stats.words,
                content
            } as unknown as Post
        })
        .filter((post) => !post.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    assignImages(posts)
    return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await getAllPosts()
    return posts.find((post) => post.slug === slug) || null
}

/* 이전/다음 글. 목록은 최신순이므로 index-1이 더 새 글, index+1이 더 오래된 글이다. */
export async function getAdjacentPosts(slug: string): Promise<{ newer: Post | null; older: Post | null }> {
    const posts = await getAllPosts()
    const i = posts.findIndex((p) => p.slug === slug)
    if (i < 0) return { newer: null, older: null }
    return { newer: i > 0 ? posts[i - 1] : null, older: i < posts.length - 1 ? posts[i + 1] : null }
}

export async function getCategories() {
    return CATEGORIES.map((c) => c.key)
}

export async function getCategoryCounts(): Promise<Record<Category, number>> {
    const posts = await getAllPosts()
    const counts = { Idea: 0, Trials: 0, Personal: 0, Life: 0 } as Record<Category, number>
    for (const p of posts) if (p.category in counts) counts[p.category]++
    return counts
}

export async function getPostsByCategory(category: string) {
    const meta = getCategoryMeta(category)
    if (!meta) return []
    const posts = await getAllPosts()
    return posts.filter((post) => post.category === meta.key)
}

export async function getPostsByTag(tag: string) {
    const posts = await getAllPosts()
    return posts.filter((post) => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()))
}

/* ---------- 실(thread) ---------- */

export interface Thread {
    name: string
    /* 생각 → 시도 → 그 외, 같은 단계면 오래된 글부터 */
    posts: Post[]
    /* 실 안의 어느 글이든 caseStudy를 달고 있으면 그 실은 사업까지 간 것 */
    caseStudy?: string
    stage: Stage
}

function stageOf(posts: Post[], caseStudy?: string): Stage {
    if (caseStudy) return 'forest'
    if (posts.some((p) => p.category === 'Trials')) return 'fruit'
    if (posts.length > 1) return 'sprout'
    return 'seed'
}

/* 글 하나가 속한 실. thread가 없는 Idea 글은 혼자서 '씨앗' 실을 이루고, 그 외 글은 실이 없다(null). */
export function threadOf(post: Post, all: Post[]): Thread | null {
    const members = post.thread ? all.filter((p) => p.thread === post.thread) : post.category === 'Idea' ? [post] : []
    if (members.length === 0) return null
    const posts = [...members].sort((a, b) =>
        THREAD_RANK[a.category] - THREAD_RANK[b.category] || new Date(a.date).getTime() - new Date(b.date).getTime())
    const caseStudy = posts.find((p) => p.caseStudy)?.caseStudy
    return { name: post.thread || post.slug, posts, caseStudy, stage: stageOf(posts, caseStudy) }
}

/* slug → 단계. 목록에서 글마다 작은 단계 표시를 달 때 쓴다. */
export function stagesOf(all: Post[]): Record<string, Stage> {
    const out: Record<string, Stage> = {}
    for (const p of all) {
        const t = threadOf(p, all)
        if (t) out[p.slug] = t.stage
    }
    return out
}
