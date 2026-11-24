import type { Metadata } from 'next'
import ForestFrame from '@/components/forest/ForestFrame'
import PageChrome from '@/components/forest/PageChrome'
import AboutForest from '@/components/forest/AboutForest'

/* 홈 · 블로그와 같은 프레임. 케이스 스터디(/about/case-study/*)는 아직 예전 디자인이라 layout이 아닌 페이지에서 감싼다. */
export const metadata: Metadata = {
    title: 'About — 기획의 숲',
    description: '현장의 목소리를 구조로 바꾸는 기획자, 기리.',
}

export default function AboutPage() {
    return (
        <ForestFrame header={<PageChrome title="Problem Solver" />}>
            <AboutForest />
        </ForestFrame>
    )
}
