import type { Metadata } from 'next'
import Home2 from '@/components/home2/Home2'
import { forestFonts } from '@/components/practice3/fonts'

/* 새 영상(불 켜짐 → 대기 → 낙하)으로 만든 홈 시안. 검색에는 노출하지 않는다. */
export const metadata: Metadata = {
  title: '기획의 숲 — Think Plan Build (시안 2)',
  robots: { index: false, follow: false },
}

export default function Home2Page() {
  return (
    <div className={forestFonts}>
      <Home2 />
    </div>
  )
}
