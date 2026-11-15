import type { Metadata } from 'next'
import HomeHero from '@/components/home/HomeHero'
import HomePaths from '@/components/home/HomePaths'

/* 예전 홈. 새 홈(사과나무 시퀀스)과 자리를 바꿨다. */
export const metadata: Metadata = {
  title: '기획의 숲 | 이전 홈',
}

export default function LegacyHomePage() {
  return (
    <main className="bg-[#0F1A14]">
      <HomeHero />
      <HomePaths />
    </main>
  )
}
