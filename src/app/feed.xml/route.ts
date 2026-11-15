import { getAllPosts } from '@/lib/blog'
import { config } from '@/lib/config'

/* RSS — DESK처럼 구독할 수 있게. /feed.xml */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function GET() {
  const base = config.siteUrl.replace(/\/$/, '')
  const posts = await getAllPosts()
  const items = posts
    .map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${base}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.summary)}</description>
    </item>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Forest Desk — 기획의 숲</title>
    <link>${base}/blog</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
    <description>생각이 아이디어로 열리고, 기획으로 익어, 하나의 숲이 됩니다. Idea · Trials · Personal · Life.</description>
    <language>ko</language>
    <lastBuildDate>${(posts[0] ? new Date(posts[0].date) : new Date()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
