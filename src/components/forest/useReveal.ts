'use client'

import { useEffect, type RefObject } from 'react'

/* [data-rv] 요소가 화면에 들어오면 data-in을 붙인다 (CSS가 transform/opacity로 등장시킴). 한 번만. */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-rv]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.setAttribute('data-in', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue
          en.target.setAttribute('data-in', '')
          io.unobserve(en.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [rootRef])
}
