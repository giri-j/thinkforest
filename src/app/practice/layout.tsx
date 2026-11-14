import { IBM_Plex_Mono, Noto_Sans_KR, Noto_Serif_KR, Pinyon_Script } from 'next/font/google'

const sans = Noto_Sans_KR({ weight: ['300', '400', '500', '700', '900'], variable: '--font-tf-sans', display: 'swap', preload: false })
const serif = Noto_Serif_KR({ weight: ['400', '500'], variable: '--font-tf-serif', display: 'swap', preload: false })
const mono = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-tf-mono', display: 'swap' })
const script = Pinyon_Script({ weight: '400', subsets: ['latin'], variable: '--font-tf-script', display: 'swap' })

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${sans.variable} ${serif.variable} ${mono.variable} ${script.variable}`}>{children}</div>
}
