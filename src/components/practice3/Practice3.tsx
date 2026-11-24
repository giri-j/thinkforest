/* /practice3 — /practice2의 잡지 프레임(세이지 배경 + 떠 있는 페이지 + 왼쪽 서랍 탭)을 그대로 쓰고,
   페이지 안에는 사과나무 히어로 → 황금 도시 엔딩 시퀀스 하나만 담는다. */

import SideNavTab from '@/components/practice3/SideNavTab'
import p2 from '@/components/practice2/practice2.module.css'
import AppleSequence from './AppleSequence'
import s from './apple.module.css'

export default function Practice3() {
  return (
    <div className={p2.page}>
      <div className={`${p2.wrap} ${s.wrapEnd}`}>
        <div className="relative mx-auto w-[88vw] max-w-[1200px] max-md:w-full max-md:max-w-none">
          <SideNavTab />
          <main className={`relative z-10 ${p2.column} ${s.columnEnd}`}>
            <AppleSequence />
          </main>
        </div>
      </div>
    </div>
  )
}
