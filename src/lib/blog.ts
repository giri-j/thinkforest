import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { CATEGORIES, getCategoryMeta, type Category, type Post } from './blog-meta'

export { CATEGORIES, getCategoryMeta, deskDate, signDate } from './blog-meta'
export type { Category, CategoryMeta, Post } from './blog-meta'

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog')

/* cover가 없는 글의 카드 사진 — 홈 시퀀스에서 서로 다르게 보이는 장면만 고른 목록.
   한 시퀀스 안의 이웃 프레임은 거의 같은 그림이라, 폴더 전체에서 고르면 카드들이 똑같아 보인다. */
const SCENE_FRAMES = [
    '/practice3/o/001.webp', '/practice3/o/032.webp', '/practice3/o/064.webp', '/practice3/o/090.webp',
    '/practice3/f/007.webp', '/practice3/f/035.webp', '/practice3/f/059.webp', '/practice3/f/079.webp',
    '/practice3/c/008.webp', '/practice3/c/036.webp', '/practice3/c/066.webp', '/practice3/c/095.webp',
]

function hashOf(s: string): number {
    let h = 0
    for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0
    return h
}

/* 카드 이미지: cover가 있으면 그것, 없으면 slug로 정해지는 장면.
   (public 폴더를 런타임에 읽지 않는다 — 읽으면 Vercel이 public 전체를 서버 함수에 묶어 250MB 한도를 넘긴다)
   목록에서 이웃한 글과 같은 장면이 되지 않도록, 최근에 쓴 장면 셋은 피해 다음 장면으로 옮긴다. */
function assignImages(posts: Post[]): void {
    const recent: string[] = []
    for (const p of posts) {
        if (p.cover) { p.image = p.cover; continue }
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
