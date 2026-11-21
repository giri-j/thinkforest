/* /home2 — 홈(Practice3)과 같은 잡지 프레임에 새 영상으로 만든 시퀀스(AppleSequence2)를 담는다. */

import SideNavTab from '@/components/practice3/SideNavTab'
import p2 from '@/components/practice2/practice2.module.css'
import AppleSequence2 from './AppleSequence2'

export default function Home2() {
  return (
    <div className={p2.page}>
      <div className={p2.wrap}>
        <div className="relative mx-auto w-[88vw] max-w-[1200px] max-md:w-full max-md:max-w-none">
          <SideNavTab />
          <main className={`relative z-10 ${p2.column}`}>
            <AppleSequence2 />
          </main>
        </div>
      </div>
    </div>
  )
}
