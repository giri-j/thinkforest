/* 사이트 공용 잡지 프레임 — 세이지 배경 + 왼쪽 내비 탭 + 떠 있는 다크 컬럼 + 서명 줄.
   홈(/)은 사과나무 시퀀스가 컬럼을 통째로 쓰므로 Practice3가 직접 짜고,
   블로그 · About · Contact가 이 프레임을 쓴다. */

import { forestFonts } from '@/components/practice3/fonts'
import SideNavTab from '@/components/practice3/SideNavTab'
import p2 from '@/components/practice2/practice2.module.css'
import DeskFooter from '@/components/blog/desk/DeskFooter'
import s from '@/components/blog/desk/desk.module.css'

export default function ForestFrame({ header, children }: { header?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={forestFonts}>
      <div className={p2.page}>
        <div className={p2.wrap}>
          <div className="relative mx-auto w-[88vw] max-w-[1200px] max-md:w-full max-md:max-w-none">
            <SideNavTab />
            <main id="top" className={`relative z-10 ${p2.column} ${s.desk}`}>
              {header}
              {children}
              <DeskFooter />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
