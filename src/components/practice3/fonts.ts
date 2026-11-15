import { IBM_Plex_Mono, Inter_Tight, Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'

/* 홈(사과나무 시퀀스)과 블로그(Forest Desk)가 같이 쓰는 글꼴 */
const head = Inter_Tight({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--p2-sans', display: 'swap' })
const sans = Noto_Sans_KR({ weight: ['300', '400', '500', '700', '900'], variable: '--font-tf-sans', display: 'swap', preload: false })
const serif = Noto_Serif_KR({ weight: ['400', '500'], variable: '--font-tf-serif', display: 'swap', preload: false })
const mono = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-tf-mono', display: 'swap' })

export const forestFonts = `${head.variable} ${sans.variable} ${serif.variable} ${mono.variable}`
