'use client'

/* /vanschneider · /practice2 와 같은 헤드라인 연출:
   가는 외곽선이 글자를 따라 그려진 뒤 채움이 차오르고, [data-after] 요소가 뒤따른다.
   SVG <text> 복제본을 실제 <h1> 위에 정확히 겹치고, 끝나면 SVG를 걷어내 실제 텍스트로 넘긴다. */

import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'

/** onDone: 헤드라인과 뒤따르는 요소가 모두 자리를 잡은 뒤 한 번 호출 (모션 줄이기면 즉시)
 *  onReveal: 외곽선이 다 그려지고 글자가 채워지기 시작하는 순간 한 번 호출 — 암전을 걷는 타이밍 */
export function useHairlineIntro(rootRef: RefObject<HTMLElement | null>, hairlineClass: string, onDone?: () => void, onReveal?: () => void) {
  const doneRef = useRef(onDone)
  const revealRef = useRef(onReveal)
  useEffect(() => { doneRef.current = onDone; revealRef.current = onReveal }, [onDone, onReveal])
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const heroBlock = root.querySelector<HTMLElement>('[data-hero]')
    const h1 = heroBlock?.querySelector<HTMLElement>('h1')
    const after = Array.from(root.querySelectorAll<HTMLElement>('[data-after]'))
    if (!heroBlock || !h1) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set([heroBlock, ...after], { opacity: 1 })
      revealRef.current?.()
      doneRef.current?.()
      return
    }

    let cancelled = false
    let cleanup = () => {}
    let tl: gsap.core.Timeline | null = null
    gsap.set(after, { filter: 'blur(10px)', y: -20 })

    const start = () => {
      if (cancelled) return
      const NS = 'http://www.w3.org/2000/svg'
      const lines = Array.from(h1.querySelectorAll('span')) as HTMLElement[]
      const svg = document.createElementNS(NS, 'svg')
      svg.setAttribute('class', hairlineClass)
      svg.setAttribute('aria-hidden', 'true')
      h1.appendChild(svg)
      const texts = lines.map((line) => {
        const t = document.createElementNS(NS, 'text')
        t.textContent = line.textContent
        t.setAttribute('fill', '#fff')
        t.setAttribute('fill-opacity', '0')
        t.setAttribute('stroke', '#fff')
        t.setAttribute('stroke-width', '1')
        svg.appendChild(t)
        return t as SVGTextElement
      })
      const dashes: number[] = []
      const place = () => {
        const hr = h1.getBoundingClientRect()
        svg.setAttribute('width', String(Math.ceil(hr.width)))
        svg.setAttribute('height', String(Math.ceil(hr.height)))
        lines.forEach((line, i) => {
          const probe = document.createElement('span')
          probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'
          line.appendChild(probe)
          const sr = line.getBoundingClientRect()
          const base = probe.getBoundingClientRect().top
          line.removeChild(probe)
          const cs = getComputedStyle(line)
          const t = texts[i]
          t.style.fontFamily = cs.fontFamily
          t.style.fontSize = cs.fontSize
          t.style.fontWeight = cs.fontWeight
          t.style.letterSpacing = cs.letterSpacing
          t.setAttribute('x', (sr.left - hr.left).toFixed(2))
          t.setAttribute('y', (base - hr.top).toFixed(2))
          const dash = parseFloat(cs.fontSize) * 11
          dashes[i] = dash
          t.style.strokeDasharray = String(dash)
        })
      }
      place()
      texts.forEach((t, i) => (t.style.strokeDashoffset = String(dashes[i])))
      lines.forEach((l) => (l.style.color = 'transparent'))
      gsap.set(heroBlock, { opacity: 1 })
      window.addEventListener('resize', place)
      cleanup = () => {
        window.removeEventListener('resize', place)
        lines.forEach((l) => (l.style.color = ''))
        svg.remove()
      }
      const DRAW = 1.8
      tl = gsap.timeline({ delay: 0.25, onComplete: () => { cleanup(); doneRef.current?.() } })
        .to(texts, { strokeDashoffset: 0, duration: DRAW, ease: 'power2.inOut', stagger: 0.18 }, 0)
        .to(texts, { attr: { 'fill-opacity': 1 }, duration: 0.9, ease: 'power1.inOut', stagger: 0.18 }, DRAW - 0.55)
        .call(() => revealRef.current?.(), [], DRAW - 0.35)
        .to(texts, { attr: { 'stroke-opacity': 0 }, duration: 0.6, ease: 'power1.out', stagger: 0.18 }, DRAW + 0.1)
        .to(after, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, clearProps: 'filter,transform' }, DRAW + 0.4)
    }

    if (document.fonts?.ready) document.fonts.ready.then(start)
    else start()

    return () => {
      cancelled = true
      tl?.kill()
      cleanup()
    }
  }, [rootRef, hairlineClass])
}
