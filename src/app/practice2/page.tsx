import type { Metadata } from 'next'
import Practice2 from '@/components/practice2/Practice2'

export const metadata: Metadata = {
  title: '기획의 숲 — The Grammar of Planning (v2)',
  description: '생각의 씨앗이 모여 나무가 되고 숲을 이룹니다. 기획자 기리의 다섯 가지 기획의 문법.',
}

export default function Practice2Page() {
  return <Practice2 />
}
