'use client'

/**
 * SideNavTab — practice2/SideDrawerTab의 서랍 탭을 사이트 내비게이션으로 쓰는 버전.
 * (공용 파일인 SideDrawerTab은 그대로 두고, 동작은 같게 복제했다)
 *  1) 첫 진입 시 잡지 페이지 뒤에서 서랍처럼 열리고
 *  2) 스크롤하면 화면에 붙어 따라오며, 스크롤 속도만큼 살짝 늦게 따라붙는다(관성)
 *  위 칸(초록) = 홈, 아래 칸 = Blog / About / Contact. 지금 있는 칸에 금색 표시.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import MobileNav from './MobileNav'

const TABS = [
  { no: '01', label: 'Blog', ko: '블로그', href: '/blog', bg: 'bg-[#25382a] hover:bg-[#2c4231]' },
  { no: '02', label: 'About', ko: '소개', href: '/about', bg: 'bg-[#1e2b21] hover:bg-[#253428]' },
  { no: '03', label: 'Contact', ko: '연락', href: '/contact', bg: 'bg-[#3a3d3a] hover:bg-[#444844]' },
]

/* 탭 음영 — 비활성 탭은 페이지와 윗칸 밑으로 들어가 있고(안쪽 그림자 + 어둠),
   활성 탭은 왼쪽으로 빠져나와 앞에 놓인다(바깥 그림자 + 위로 쌓임). transform/box-shadow만 전환. */
const TAB =
  'group relative flex flex-col items-center pr-4 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-[#e1b970] transition-[transform,box-shadow,border-radius,background-color] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]'
const BACK =
  'z-0 shadow-[inset_-18px_0_18px_-16px_rgba(0,0,0,0.6),inset_0_12px_14px_-12px_rgba(0,0,0,0.55)]'
const FRONT =
  'z-10 -translate-x-[8px] shadow-[-14px_10px_26px_-8px_rgba(0,0,0,0.7),0_-8px_16px_-10px_rgba(0,0,0,0.55),inset_1px_1px_0_rgba(255,255,255,0.08)]'

/* 비활성 탭을 한 톤 눌러 주는 막. 마우스를 올리면 살짝 걷힌다. */
function Shade({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-black transition-opacity duration-500 ${active ? 'opacity-0' : 'opacity-[0.22] group-hover:opacity-[0.1]'}`}
    />
  )
}

/* 서랍 열림 연출은 사이트에 처음 들어왔을 때 한 번만. 페이지마다 탭이 새로 마운트되지만
   이 모듈 변수는 클라이언트 이동 동안 유지된다(새로고침하면 다시 재생). */
let drawerOpened = false

export default function SideNavTab() {
  const pathname = usePathname()
  const followRef = useRef<HTMLDivElement>(null) // 세로 관성(y)
  const drawerRef = useRef<HTMLDivElement>(null) // 서랍 열림(x)
  const [skipIntro] = useState(() => drawerOpened) // 이미 열린 적 있으면 처음부터 보이게 그린다(깜빡임 없음)

  // /portfolio는 About의 버튼으로 들어오는 하위 페이지 — About 칸을 켠다
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href) || (href === '/about' && pathname.startsWith('/portfolio')))

  // 1) 서랍 열림
  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return
    if (skipIntro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(drawer, { xPercent: 0, autoAlpha: 1 })
      drawerOpened = true
      return
    }
    // 완료 시점에 기록한다 — 개발 모드 StrictMode의 즉시 언마운트로 연출이 건너뛰어지지 않게
    const tl = gsap.timeline({ delay: 0.35, onComplete: () => { drawerOpened = true } })
    tl.fromTo(drawer, { xPercent: 100, autoAlpha: 1 }, { xPercent: 0, duration: 1.15, ease: 'expo.out' })
      .fromTo(
        drawer.querySelectorAll('[data-tab-item]'),
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.55'
      )
    return () => { tl.kill() }
  }, [skipIntro])

  // 2) 스크롤 관성 — 스크롤할 때마다 위치를 바로 옮기지 않고 '속도'를 살짝 밀어 주고,
  //    거의 임계 감쇠인 스프링이 제자리로 부드럽게 되돌린다. 마우스 휠처럼 한 번에 크게 튀는 스크롤도 덜컹이지 않는다.
  //    - 시간(dt) 기반이라 60Hz·120Hz 화면에서 같은 느낌
  //    - 멀리 밀려날수록 미는 힘이 약해지고, 표시값은 tanh로 MAX에 부드럽게 다가갈 뿐 넘지 않는다(벽에 부딪히는 느낌 없음)
  //    - 스크롤이 멈추고 제자리에 오면 루프를 쉰다
  useEffect(() => {
    const el = followRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const KICK = 1.3 /* 스크롤 1px당 미는 속도 */
    const MAX = 22 /* 최대로 밀려나는 거리(px) — 부드럽게 다가가기만 한다 */
    const K = 22 /* 스프링 강도 — 낮을수록 천천히 돌아온다 */
    const C = 7.3 /* 감쇠 — 임계 감쇠의 약 0.78, 튕김이 거의 없다 */
    let fx = 0, fv = 0, lastY = window.scrollY, lastT = 0, raf = 0
    const tick = (t: number) => {
      const dt = lastT ? Math.min((t - lastT) / 1000, 1 / 30) : 1 / 60
      lastT = t
      const y = window.scrollY, dy = y - lastY
      lastY = y
      if (dy) {
        let kick = -dy * KICK
        if (kick * fx > 0) kick *= Math.max(0, 1 - Math.abs(fx) / MAX)
        fv += kick
      }
      fv += (-K * fx - C * fv) * dt
      fx += fv * dt
      if (Math.abs(fx) < 0.05 && Math.abs(fv) < 0.05 && dy === 0) {
        fx = fv = 0; el.style.transform = ''; raf = 0; lastT = 0
        return
      }
      el.style.transform = `translate3d(0, ${(MAX * Math.tanh(fx / MAX)).toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const homeActive = isActive('/')

  return (
    <>
    <MobileNav />
    <div className="pointer-events-none absolute inset-y-0 right-[calc(100%-16px)] z-0 hidden w-[76px] md:block">
      <div className="sticky top-6">
        <div ref={followRef} className="will-change-transform">
          <nav
            ref={drawerRef}
            aria-label="사이트"
            className={`pointer-events-auto ${skipIntro ? '' : 'invisible'} relative flex flex-col will-change-transform`}
          >
            {/* 홈 */}
            <Link
              href="/"
              aria-current={homeActive ? 'page' : undefined}
              className={`${TAB} shrink-0 gap-5 overflow-hidden rounded-tl-[18px] bg-[#2f4a33] pb-7 pt-8 text-[#f1ece0] hover:bg-[#365539] ${homeActive ? `${FRONT} rounded-bl-[12px]` : BACK}`}
            >
              <Shade active={homeActive} />
              <span data-tab-item className={`relative block transition-colors ${homeActive ? 'text-[#e1b970]' : ''}`}>
                <svg width="18" height="25" viewBox="0 0 22 30" fill="none" aria-hidden>
                  <path
                    d="M11 29V9M11 9c0-4 3-7 7-8-1 4-3 7-7 8Zm0 0C11 5 8 2 4 1c1 4 3 7 7 8Zm0 7c0-3 2.5-5.5 6-6-.8 3-2.8 5.4-6 6Zm0 0c0-3-2.5-5.5-6-6 .8 3 2.8 5.4 6 6Z"
                    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span data-tab-item className="relative whitespace-nowrap text-[26px] font-semibold leading-none tracking-[0.08em] [writing-mode:vertical-rl]">
                기획의 숲
              </span>
              <span data-tab-item className="relative flex flex-col gap-1 whitespace-nowrap text-[10px] leading-tight opacity-80 [writing-mode:vertical-rl] [@media(max-height:700px)]:hidden">
                <span className="font-medium">Forest of Thought</span>
                <span className="opacity-70">Seoul / Korea</span>
              </span>
            </Link>

            {/* Blog / About / Contact */}
            {TABS.map((t, i) => {
              const active = isActive(t.href)
              const last = i === TABS.length - 1
              const corners = active ? (last ? 'rounded-l-[12px] rounded-bl-[18px]' : 'rounded-l-[12px]') : last ? 'rounded-bl-[18px]' : ''
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={active ? 'page' : undefined}
                  className={`${TAB} h-[116px] shrink-0 justify-center gap-2 ${t.bg} ${corners} ${active ? `${FRONT} text-[#e1b970]` : `${BACK} text-[#d9d2c2]`}`}
                >
                  <Shade active={active} />
                  {/* 지금 있는 칸 표시 — 바깥 가장자리의 금색 선 */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 h-10 w-[2px] -translate-y-1/2 bg-[#e1b970] transition-transform duration-500 ${active ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}`}
                  />
                  <span data-tab-item className="relative font-mono text-[9px] tracking-[0.1em] text-[#e1b970]/80">{t.no}</span>
                  <span
                    data-tab-item
                    className="relative font-mono text-[11px] uppercase leading-none tracking-[0.22em] transition-transform duration-300 [writing-mode:vertical-rl] group-hover:-translate-y-0.5"
                  >
                    {t.label}
                  </span>
                  <span className="sr-only">{t.ko}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
    </>
  )
}
