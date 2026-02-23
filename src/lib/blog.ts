import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog')

export interface Post {
    title: string
    slug: string
    date: string
    category: 'Planning' | 'Reverse Engineering' | 'Journey' | 'Cutlet Lab' | 'Personal Notes'
    tags: string[]
    summary: string
    cover?: string
    draft: boolean
    readingTime: string
    wordCount: number
    content: string
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

            return {
                ...data,
                slug: data.slug || file.replace('.mdx', ''),
                readingTime: stats.text,
                wordCount: stats.words,
                content
            } as Post
        })
        .filter((post) => !post.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await getAllPosts()
    return posts.find((post) => post.slug === slug) || null
}

export async function getCategories() {
    return ['Planning', 'Reverse Engineering', 'Journey', 'Cutlet Lab', 'Personal Notes']
}

export async function getPostsByCategory(category: string) {
    const posts = await getAllPosts()
    return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export async function getPostsByTag(tag: string) {
    const posts = await getAllPosts()
    return posts.filter((post) => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()))
}
