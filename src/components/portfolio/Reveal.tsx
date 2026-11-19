'use client'

/* 서버 페이지를 감싸 About과 같은 [data-rv] 등장 효과를 건다 (useReveal 재사용) */

import { useRef } from 'react'
import { useReveal } from '@/components/forest/useReveal'

export default function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  return <div ref={ref} className={className}>{children}</div>
}
