import Link from 'next/link'
import ForestFrame from '@/components/forest/ForestFrame'
import PageChrome from '@/components/forest/PageChrome'
import d from '@/components/blog/desk/desk.module.css'
import f from '@/components/forest/forest.module.css'

/* 404 — 숲에서 길을 잃었을 때도 같은 프레임 안에서 */
export default function NotFound() {
  return (
    <ForestFrame header={<PageChrome section="404 — Lost in the forest" right={['Wayfinding', '길은 네 갈래뿐입니다.', '홈 · Blog · About · Contact']} />}>
      <div className={`${d.pad} ${f.page}`} style={{ paddingBottom: 40 }}>
        <header className={d.pageHead}>
          <p className={d.eyebrow}>[ 404 ] — Not found</p>
          {/* .pageTitle은 한 줄 라틴 제목용(행간 0.92) — 한글 두 줄이라 행간과 크기를 따로 준다 */}
          <h1 className={d.pageTitle} style={{ lineHeight: 1.1, fontSize: 'clamp(38px, 6vw, 84px)', letterSpacing: '-0.04em' }}>이 길은<br />아직 나지 않았습니다.</h1>
          <p className={d.pageDesc}>주소가 바뀌었거나, 아직 심지 않은 나무입니다. 아래 갈림길 중 하나로 돌아가 주세요.</p>
          <nav aria-label="돌아가기" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
            <Link href="/" className={f.pill}>홈으로 →</Link>
            <Link href="/blog" className={f.pill}>Blog</Link>
            <Link href="/about" className={f.pill}>About</Link>
            <Link href="/contact" className={f.pill}>Contact</Link>
          </nav>
        </header>
      </div>
    </ForestFrame>
  )
}
