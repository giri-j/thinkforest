import ForestFrame from '@/components/forest/ForestFrame'
import PageChrome from '@/components/forest/PageChrome'
import { PROJECTS } from './portfolioData'

/* About · Contact와 같은 프레임 — 세이지 배경 + 서랍 탭 + 다크 컬럼 + 서명 줄 */
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <ForestFrame header={<PageChrome section="Portfolio — Archive" right={['Works', `${PROJECTS.length} projects`, 'since 2014']} />}>
            {children}
        </ForestFrame>
    )
}
