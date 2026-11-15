import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { numberPosts } from '@/components/blog/desk/PostTable'
import DeskSearch from '@/components/blog/desk/DeskSearch'
import s from '@/components/blog/desk/desk.module.css'

export const metadata = { title: 'Search — Forest Desk' }

export default async function SearchPage() {
    const posts = await getAllPosts()

    return (
        <div className={s.pad}>
            <header className={`${s.pageHead} ${s.in}`}>
                <p className={s.eyebrow}><Link href="/blog" className={s.back}>← Index</Link> &nbsp;/&nbsp; [ ? ] — Search the archive</p>
                <h1 className={s.pageTitle}>Search<span>찾기</span></h1>
            </header>
            <div className={s.in2}>
                <DeskSearch posts={posts} numbers={numberPosts(posts)} />
            </div>
        </div>
    )
}
