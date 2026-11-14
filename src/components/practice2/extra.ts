// /practice2 전용 추가 데이터 — 기존 content.ts(복제본)는 그대로 두고, 새로 생긴 문구·테마만 여기서 관리합니다.
import { hero as forestHero, projects as forestProjects } from '@/content/forest-content'
import type { ThemeKey } from './content'

/* ---------- 다크 베이스 테마 (아이보리는 종이 질감 모듈 안에서만) ---------- */

export const darkThemes: Record<ThemeKey, { bg: string; fg: string; sub: string; body: string; num: string; line: string }> = {
  ivory: { bg: '#0b0f0c', fg: '#F2EDE3', sub: '#8C9C8B', body: '#C9D3C4', num: '#E1B970', line: '#E1B970' },
  green: { bg: '#0f1712', fg: '#F2EDE3', sub: '#8C9C8B', body: '#C9D3C4', num: '#E1B970', line: '#E1B970' },
  sand: { bg: '#0b0f0c', fg: '#F2EDE3', sub: '#8C9C8B', body: '#C9D3C4', num: '#E1B970', line: '#E1B970' },
  night: { bg: '#0f1712', fg: '#F2EDE3', sub: '#8C9C8B', body: '#C9D3C4', num: '#E1B970', line: '#E1B970' },
}

/* ---------- Hero ---------- */

export const heroP2 = {
  eyebrow: 'FOREST OF THOUGHT · 기획의 숲',
  lines: forestHero.lines,
  subtitle: forestHero.subtitleKo,
  meta: forestHero.meta,
  role: forestHero.role,
  scroll: forestHero.scrollLabel,
}

/* ---------- Marquee ---------- */

export const marqueeP2 = {
  badge: 'NEW',
  items: ['숲의 기록이 열렸습니다', '기획, 일, 그리고 삶에 대한 필드노트', '읽으러 가기 →'],
  href: '/blog',
}

/* ---------- Prologue (스크롤 컬러 리빌 문단) ---------- */

export const prologueP2 = {
  label: 'PROLOGUE · THE GRAMMAR OF PLANNING',
  /** 큰 문단 — 단어 단위로 스크롤에 따라 흐림 → 선명 */
  statement: '문제는 현장에서 들리고, 답은 구조에서 보인다.',
  /** 작은 문단 */
  body: '제 기획에는 다섯 개의 동사가 있습니다. 듣고, 좁히고, 덜어내고, 잇고, 짓는다.',
  facts: '1만 개 매장 · 월 수천만 건 · 50억 IR · 설립 2개월 첫 드롭',
}

/* ---------- Chapter ---------- */

export const chapterCta = '케이스 스터디 보기'

/** 챕터 id → 이미지 그리드 장수 (2~4장). 이미지는 플레이스홀더 */
const COUNT: Record<string, number> = { observe: 4, define: 2, structure: 4, persuade: 2, create: 4 }

export function chapterGrid(id: string) {
  const p = forestProjects.find((x) => x.watermark.toLowerCase() === id)
  if (!p) return []
  return p.images.slice(0, COUNT[id] ?? 2).map((img) => ({ caption: img.caption, tone: p.tone, src: img.src, alt: img.alt }))
}

/* ---------- Appendix B (Featured Essays 화살표 리스트) ---------- */

export const essaysP2 = {
  label: 'FEATURED ESSAYS',
  sublabel: 'FROM 숲의 기록',
  allLabel: '전체 기록 보기 →',
}

/* ---------- Coda ---------- */

export const codaP2 = {
  label: 'CODA',
  lines: ['당신의 다음 숲,', '첫 나무를 함께 심겠습니다.'],
  cta: { label: '경력기술서 받아보기 →', href: '/contact' },
  links: [
    { label: '프로젝트 의뢰', href: '/contact' },
    { label: '숲 편지 구독', href: '#letter' },
  ],
}
