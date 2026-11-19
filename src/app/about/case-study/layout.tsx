import ForestFrame from '@/components/forest/ForestFrame'
import PageChrome from '@/components/forest/PageChrome'
import cs from './caseStudy.module.css'

/* 케이스 스터디 8편은 밝은 문서 디자인을 그대로 두되, 사이트 공용 프레임(세이지 배경 + 왼쪽 내비 탭 + 다크 컬럼) 안에
   '종이 한 장'처럼 끼워 넣는다. 각 페이지 안의 '리스트로 돌아가기' 버튼은 컬럼 안에 머물도록 absolute로 바꾼다. */
export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <ForestFrame header={<PageChrome section="Case study — 기리" right={['Dossier', '문제 → 접근 → 결과.', '한 편에 한 프로젝트.']} />}>
      <div className={cs.paper}>{children}</div>
    </ForestFrame>
  )
}
