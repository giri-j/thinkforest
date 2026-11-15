import { IBM_Plex_Mono, Inter_Tight, Noto_Serif_KR } from 'next/font/google'

/* 홈(사과나무 시퀀스) · About · Contact · 블로그(Forest Desk)가 같이 쓰는 글꼴.
   기본 서체 --font-tf-sans(Pretendard Variable)는 globals.css의 :root에서 온다 — 여기서 덮어쓰지 않는다. */
const head = Inter_Tight({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--p2-sans', display: 'swap' })
const serif = Noto_Serif_KR({ weight: ['400', '500'], variable: '--font-tf-serif', display: 'swap', preload: false })
const mono = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-tf-mono', display: 'swap' })

export const forestFonts = `${head.variable} ${serif.variable} ${mono.variable}`
