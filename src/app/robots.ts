import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  const base = config.siteUrl.replace(/\/$/, '')
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/practice', '/practice2', '/practice3', '/vanschneider'] }],
    sitemap: `${base}/sitemap.xml`,
  }
}
