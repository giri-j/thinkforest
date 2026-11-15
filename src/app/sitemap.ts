import type { MetadataRoute } from 'next'
import { CATEGORIES, getAllPosts } from '@/lib/blog'
import { config } from '@/lib/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = config.siteUrl.replace(/\/$/, '')
  const posts = await getAllPosts()
  const latest = posts[0]?.date ? new Date(posts[0].date) : new Date()

  return [
    { url: `${base}/`, lastModified: latest, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/blog`, lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    ...CATEGORIES.map((c) => ({ url: `${base}/blog/category/${c.slug}`, lastModified: latest, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: 'yearly' as const, priority: 0.7 })),
  ]
}
