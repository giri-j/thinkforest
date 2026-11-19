'use client'

/* 16:9 미디어 틀. 영상은 화면에 들어올 때만 재생하고 나가면 멈춘다(움직임 줄이기 설정이면 포스터만).
   이미지가 여러 장이면 2.5초마다 크로스페이드. */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/app/portfolio/portfolioData'
import p from './portfolio.module.css'

const SIZES = '(min-width: 1200px) 520px, (min-width: 761px) 42vw, 92vw'

function VideoMedia({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} className={p.mediaEl} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={`${title} 화면 영상`} />
}

function ImageMedia({ srcs, title }: { srcs: string[]; title: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (srcs.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % srcs.length), 2500)
    return () => clearInterval(t)
  }, [srcs.length])
  return (
    <>
      {srcs.map((src, n) => (
        <Image
          key={src} src={src} alt={`${title} 화면 ${n + 1}`} fill sizes={SIZES}
          className={`${p.mediaEl} ${p.slide} ${n === i ? p.slideOn : ''}`}
        />
      ))}
      {srcs.length > 1 && (
        <div className={p.dots}>
          {srcs.map((src, n) => (
            <button key={src} type="button" aria-label={`${n + 1}번째 화면`} aria-current={n === i ? 'true' : undefined} onClick={() => setI(n)} />
          ))}
        </div>
      )}
    </>
  )
}

/* 아직 보여줄 화면이 없는 진행 중 프로젝트 — 같은 16:9 틀에 글자만 */
function NoteMedia({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className={p.note}>
      <span className={p.noteLabel}><i aria-hidden="true" />{label}</span>
      <strong>{title}</strong>
      {sub && <span className={p.noteSub}>{sub}</span>}
    </div>
  )
}

export default function ProjectMedia({ media, title }: { media: Media; title: string }) {
  return (
    <div className={p.media}>
      {media.kind === 'video' && <VideoMedia src={media.src} poster={media.poster} title={title} />}
      {media.kind === 'images' && <ImageMedia srcs={media.srcs} title={title} />}
      {media.kind === 'note' && <NoteMedia label={media.label} title={media.title} sub={media.sub} />}
    </div>
  )
}
