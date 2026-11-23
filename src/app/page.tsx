import type { Metadata } from 'next'
import Practice3 from '@/components/practice3/Practice3'
import { forestFonts } from '@/components/practice3/fonts'

/* 홈 = 사과나무 → 황금 숲 시퀀스 (예전 /practice3). 예전 홈은 /practice3로 옮겼다. */
export const metadata: Metadata = {
  title: '기획의 숲 — Think; Plan; Build.',
  description: '생각이 기획을 만나, 사업으로 자라납니다. 사과나무에서 불 켜진 밤의 숲으로.',
}

export default function Home() {
  return (
    <div className={forestFonts}>
      <Practice3 />
    </div>
  )
}
