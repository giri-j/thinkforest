import type { Metadata } from 'next'
import Practice3 from '@/components/practice3/Practice3'

export const metadata: Metadata = {
  title: '기획의 숲 — The Grammar of Planning (v3)',
  description: '생각의 씨앗이 모여 나무가 되고 숲을 이룹니다. 사과나무에서 황금 숲의 도시로.',
}

export default function Practice3Page() {
  return <Practice3 />
}
