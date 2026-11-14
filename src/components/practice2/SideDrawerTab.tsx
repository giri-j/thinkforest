'use client'

/**
 * SideDrawerTab
 * vanschneider.com 왼쪽 탭처럼
 *  1) 첫 진입 시 잡지 페이지 뒤에서 서랍처럼 스르륵 열리고
 *  2) 스크롤하면 화면에 붙어 따라오면서, 스크롤 속도만큼 살짝 늦게 따라붙는(관성) 탭
 *
 * 사용법: 잡지 페이지(main)를 감싸는 relative 래퍼 안에, main보다 앞에 넣는다.
 *   <div className="relative mx-auto w-[88vw] max-w-[1200px]">
 *     <SideDrawerTab />
 *     <main className="relative z-10 ...">...</main>
 *   </div>
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

type Props = {
  title?: string
  subtitle?: string
  caption?: string
  href?: string
}

export default function SideDrawerTab({
  title = '기획의 숲',
  subtitle = 'Forest of Thought',
  caption = 'Seoul / Korea',
  href = '/',
}: Props) {
  const followRef = useRef<HTMLDivElement>(null) // 세로 관성(y) 담당
  const drawerRef = useRef<HTMLDivElement>(null) // 서랍 열림(x) 담당

  // 1) 서랍 열림: 페이지 뒤(오른쪽)에 숨어 있다가 왼쪽으로 빠져나옴
  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set(drawer, { xPercent: 0, autoAlpha: 1 })
      return
    }

    const tl = gsap.timeline({ delay: 0.35 })
    tl.fromTo(
      drawer,
      { xPercent: 100, autoAlpha: 1 },
      { xPercent: 0, duration: 1.15, ease: 'expo.out' }
    ).fromTo(
      drawer.querySelectorAll('[data-tab-item]'),
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      '-=0.55'
    )

    return () => {
      tl.kill()
    }
  }, [])

  // 2) 스크롤 관성: sticky로 붙어 있되, 스크롤 속도만큼 뒤로 밀렸다가 스프링처럼 복귀
  useEffect(() => {
    const el = followRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const setY = gsap.quickSetter(el, 'y', 'px') as (v: number) => void
    const MAX = 70 // 최대 밀림(px)
    const PUSH = 0.35 // 스크롤 1px당 밀리는 양
    const RETURN = 0.12 // 복귀 속도(클수록 빨리 돌아옴)

    let lastScroll = window.scrollY
    let offset = 0
    let raf = 0

    const tick = () => {
      const current = window.scrollY
      const delta = current - lastScroll
      lastScroll = current

      // 아래로 스크롤하면 탭이 콘텐츠에 끌려 살짝 위로 밀렸다가 따라붙음
      offset = gsap.utils.clamp(-MAX, MAX, offset - delta * PUSH)
      offset += (0 - offset) * RETURN
      if (Math.abs(offset) < 0.05) offset = 0

      setY(offset)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    // 페이지 높이 전체를 차지하는 레일. 페이지 왼쪽 가장자리 뒤로 16px 겹쳐 들어감
    <div
      className="pointer-events-none absolute inset-y-0 right-[calc(100%-16px)] z-0 hidden w-[76px] md:block"
    >
      {/* 레일 안에서 화면에 붙어 따라옴 */}
      <div className="sticky top-6">
        <div ref={followRef} className="will-change-transform">
          {/* 서랍 본체: 처음엔 페이지 뒤에 숨어 있음 */}
          <div
            ref={drawerRef}
            className="pointer-events-auto invisible flex h-[min(86vh,900px)] flex-col overflow-hidden rounded-l-[18px] shadow-[-12px_0_30px_-18px_rgba(0,0,0,0.6)] will-change-transform"
          >
            {/* 메인 컬러 영역 */}
            <Link
              href={href}
              className="group flex flex-1 flex-col items-center gap-6 bg-[#2f4a33] pb-6 pr-4 pt-7 text-[#f1ece0] transition-colors duration-300 hover:bg-[#365539]"
            >
              {/* 심볼 */}
              <span data-tab-item className="block">
                <svg width="22" height="30" viewBox="0 0 22 30" fill="none" aria-hidden>
                  <path
                    d="M11 29V9M11 9c0-4 3-7 7-8-1 4-3 7-7 8Zm0 0C11 5 8 2 4 1c1 4 3 7 7 8Zm0 7c0-3 2.5-5.5 6-6-.8 3-2.8 5.4-6 6Zm0 0c0-3-2.5-5.5-6-6 .8 3 2.8 5.4 6 6Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* 세로 타이틀 */}
              <span
                data-tab-item
                className="text-[30px] font-semibold leading-none tracking-[0.08em] [writing-mode:vertical-rl]"
              >
                {title}
              </span>

              {/* 세로 서브 텍스트 2줄 */}
              <span data-tab-item className="flex gap-1 text-[11px] leading-tight opacity-80 [writing-mode:vertical-rl]">
                <span className="font-medium">{subtitle}</span>
                <span className="opacity-70">{caption}</span>
              </span>
            </Link>

            {/* 하단 캡 */}
            <div className="flex h-[88px] items-center justify-center bg-[#3a3d3a] pr-4 text-[#cfc8b8]">
              <span data-tab-item className="text-lg" aria-hidden>
                ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
