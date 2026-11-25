'use client'

/* 모바일 내비 — 왼쪽 서랍 탭이 숨는 768px 미만에서만 보인다.
   우상단 작은 모노 버튼 → 전체 화면 메뉴(홈 / 01 Blog / 02 About / 03 Portfolio / 04 Contact). */

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { no: '00', label: '기획의 숲', sub: 'Home', href: '/' },
  { no: '01', label: 'Blog', sub: 'Forest Desk', href: '/blog' },
  { no: '02', label: 'About', sub: '기리', href: '/about' },
  { no: '03', label: 'Portfolio', sub: '해본 일', href: '/portfolio' },
  { no: '04', label: 'Contact', sub: '제안하기', href: '/contact' },
]

const MONO = { fontFamily: 'var(--font-tf-mono), ui-monospace, monospace' } as const
const HEAD = { fontFamily: 'var(--p2-sans), var(--font-tf-sans), sans-serif' } as const

export default function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  // 열려 있는 동안 뒤 페이지 스크롤 잠금 + Esc로 닫기
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="md:hidden" data-mobile-nav>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        style={MONO}
        className={`fixed right-[14px] top-[14px] z-[90] inline-flex h-8 items-center gap-2 rounded-full border px-3 text-[11px] tracking-[0.14em] uppercase backdrop-blur-md transition-colors duration-300 ${
          open ? 'border-[#e1b970] bg-[#e1b970] text-[#0b0f0c]' : 'border-[#e1b970]/70 bg-[#0b0f0c]/55 text-[#f2ede3]'
        }`}
      >
        <span aria-hidden className="relative block h-[9px] w-[14px]">
          <i className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
          <i className={`absolute left-0 bottom-0 block h-px w-full bg-current transition-transform duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
        </span>
        {open ? 'Close' : 'Menu'}
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="사이트 메뉴"
        aria-hidden={!open}
        className={`fixed inset-0 z-[80] flex flex-col bg-[#0b0f0c]/96 px-6 pb-8 pt-20 text-[#f2ede3] backdrop-blur-xl transition-[opacity,visibility] duration-400 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <p style={MONO} className="mb-6 text-[11px] tracking-[0.14em] text-[#f2ede3]/55">{'// Forest of Thought'} — Seoul, since 2021</p>
        <nav aria-label="사이트" className="border-t border-[#f2ede3]/15">
          {ITEMS.map((it, i) => {
            const active = isActive(it.href)
            return (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
                className={`flex items-baseline justify-between gap-4 border-b border-[#f2ede3]/15 py-5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
              >
                <span className="flex items-baseline gap-4">
                  <span style={MONO} className="text-[11px] text-[#e1b970]">{it.no}</span>
                  <span style={HEAD} className={`text-[34px] font-bold leading-none tracking-[-0.03em] ${active ? 'text-[#e1b970]' : ''}`}>{it.label}</span>
                </span>
                <span style={MONO} className="text-[11px] tracking-[0.06em] text-[#f2ede3]/55">{active ? '● 지금 여기' : it.sub}</span>
              </Link>
            )
          })}
        </nav>
        <div style={MONO} className="mt-auto flex justify-between text-[11px] tracking-[0.06em] text-[#f2ede3]/55">
          <span>Think Plan Build</span>
          <a href="mailto:jek5797@naver.com" className="text-[#e1b970]">Email ↗</a>
        </div>
      </div>
    </div>
  )
}
