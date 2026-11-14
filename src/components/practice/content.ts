// 기획의 숲 — The Grammar of Planning
// 페이지의 모든 문구와 이미지 데이터는 이 파일에서만 고치면 됩니다.
// 이미지: src 를 비워두면 듀오톤 플레이스홀더가, 경로를 넣으면 실제 이미지가 표시됩니다.
//         (예: src: '/practice/observe-01.jpg' → public/practice/observe-01.jpg)

export type ThemeKey = 'ivory' | 'green' | 'sand' | 'night'
export type SceneKind =
  | 'people' | 'store' | 'note' | 'app' | 'map' | 'matrix' | 'tree'
  | 'dash' | 'screen' | 'blur' | 'product' | 'fair' | 'drop'

export interface Shot {
  label: string
  why: string
  kind: SceneKind
  src?: string
  /** 화면 캡처처럼 원래 컬러를 살릴 이미지 */
  capture?: boolean
}

export interface Step {
  title: string
  line: string
  diagram: 'funnel' | 'allocation' | 'graph'
}

interface ChapterBase {
  id: string
  no: string
  en: string
  verb: string
  stage: string
  growth: 'seed' | 'sprout' | 'sapling' | 'tree' | 'forest'
  theme: ThemeKey
  question: [string, string]
  body: string
  big: string
  bigCaption: string
  maxim: string
  caption: string
}

export type Chapter =
  | (ChapterBase & { media: 'film'; frames: Shot[] })
  | (ChapterBase & { media: 'pinned'; steps: Step[] })
  | (ChapterBase & { media: 'compare'; compare: { before: Shot; after: Shot; caption: string; why: string }; screens: Shot[] })
  | (ChapterBase & { media: 'stack'; cards: Shot[] })
  | (ChapterBase & { media: 'devices'; laptop: Shot[]; products: Shot[] })

export const themes: Record<ThemeKey, { bg: string; fg: string; sub: string; body: string; num: string; line: string }> = {
  ivory: { bg: '#F4EFE4', fg: '#17201A', sub: '#6A6E66', body: '#3F453D', num: '#1F3326', line: '#1F3326' },
  green: { bg: '#1F3326', fg: '#F2EDE3', sub: '#93A592', body: '#C9D3C4', num: '#E1B970', line: '#E1B970' },
  sand: { bg: '#EAE3D3', fg: '#17201A', sub: '#6A6E66', body: '#3F453D', num: '#1F3326', line: '#1F3326' },
  night: { bg: '#15241B', fg: '#F2EDE3', sub: '#8C9C8B', body: '#C9D3C4', num: '#E1B970', line: '#E1B970' },
}

export const hero = {
  eyebrow: 'FOREST OF THOUGHT · 기획의 숲',
  line1: '생각의 씨앗이 모여 나무가 되고',
  line2: '숲을 이룹니다.',
  script: 'Planted in Seoul',
  newLabel: '새 기록 — [최신 글 제목]',
  newHref: '/blog',
}

export const nav = [
  { group: '숲길 · WORK', links: [{ label: '프로젝트', href: '/about' }, { label: '소개', href: '#prologue' }, { label: '함께하기', href: '#coda' }] },
  { group: '기록 · JOURNAL', links: [{ label: '에세이', href: '/blog' }, { label: '필드노트', href: '/blog' }, { label: '숲 편지', href: '#letter' }] },
  { group: '공방 · LAB', links: [{ label: '실험', href: '#appendix-a' }, { label: '템플릿', href: '#coda', badge: 'NEW' }, { label: '사진 아카이브', href: '#appendix-a' }] },
]

export const prologue = {
  label: 'PROLOGUE · THE GRAMMAR OF PLANNING',
  statement: ['문제는 현장에서 들리고,', '답은 구조에서 보인다.'],
  intro: '제 기획에는 다섯 개의 동사가 있습니다.',
  verbs: '듣고, 좁히고, 덜어내고, 잇고, 짓는다.',
  facts: '1만 개 매장 · 월 수천만 건 · 50억 IR · 설립 2개월 첫 드롭',
}

export const chapters: Chapter[] = [
  {
    id: 'observe', no: 'I', en: 'OBSERVE', verb: '듣다', stage: '01 · 씨앗', growth: 'seed', theme: 'ivory',
    question: ['모두가 "매장이 협조를 안 한다"고 말했다.', '나는 매장으로 갔다.'],
    body: '40여 개 점포를 직접 걸으며 들었다. 매장은 게으르지 않았다. 상품 하나하나를 손으로 체크해야 하는 구조가 그들을 지치게 했을 뿐. 한 시간 배송도 그렇게 풀었다 — 배달기사의 한마디에서 상품 구성을 다시 짰다.',
    big: '40+', bigCaption: '직접 걸어 들어간 점포 · 전국 1만 개 매장 중',
    maxim: '불편은 늘, 데이터보다 먼저 도착한다.',
    caption: '스마트픽 · 한 시간 배송 — L그룹 e커머스',
    media: 'film',
    frames: [
      { kind: 'people', label: '매장 교육 현장', why: '교육보다 구조가 먼저라는 걸 확인한 자리 (얼굴 블러)' },
      { kind: 'store', label: '점포 방문', why: '상품마다 체크해야 하는 동선을 직접 본 곳' },
      { kind: 'note', label: '인터뷰 메모 스캔', why: '"협조를 안 한다"는 말 뒤의 실제 이유' },
      { kind: 'note', label: '현장 노트', why: '40여 개 점포 정기 인터뷰의 기록' },
      { kind: 'app', label: '파트너플러스 앱 화면', why: '매니저의 체크 단계를 줄인 화면', capture: true },
      { kind: 'map', label: '매장 매니저의 하루', why: '여정 지도로 다시 그린 하루의 병목' },
    ],
  },
  {
    id: 'define', no: 'II', en: 'DEFINE', verb: '좁히다', stage: '02 · 새싹', growth: 'sprout', theme: 'green',
    question: ['매달 105억이 취소되고 있었다.', '전부 풀 필요는 없었다.'],
    body: '취소 15% 가운데 우리가 통제할 수 있는 건 결품 3%뿐이었다. 그 3%에 전부를 걸었다. 교육으로는 0.5%p, 정책 구조를 바꾸자 1%p. 숫자가 대신 말해 주었다. 사람이 아니라, 구조였다.',
    big: '3%', bigCaption: '105억 중, 우리가 바꿀 수 있던 몫',
    maxim: '기획은 문제를 푸는 일이 아니다. 풀 수 있는 문제로 바꾸는 일이다.',
    caption: '주문완료율 개선 — L그룹 e커머스',
    media: 'pinned',
    steps: [
      { title: '깔때기', line: '105억의 취소에서, 바꿀 수 있는 3%만 남기다', diagram: 'funnel' },
      { title: '배송 할당 정책', line: '같은 물량, 다른 구조 — 1+1+1과 2+1', diagram: 'allocation' },
      { title: '교육 vs 구조', line: '같은 문제, 두 배의 효과. 답은 구조에 있었다', diagram: 'graph' },
    ],
  },
  {
    id: 'structure', no: 'III', en: 'STRUCTURE', verb: '덜어내다', stage: '03 · 묘목', growth: 'sapling', theme: 'sand',
    question: ['고객은 채널의 사정을', '알 필요가 없다.'],
    body: '채널마다 제각각이던 정책을 고객의 언어로 다시 나눴다. 승인·과금·로그를 한 줄기로 묶자, 월 수천만 건이 소리 없이 흐르기 시작했다. 처음 보는 건설 도메인에서도 같았다. 권한의 지도를 다시 그리자, 사람들이 돌아왔다.',
    big: '200%', bigCaption: '권한의 지도를 다시 그린 뒤 · MAU',
    maxim: '가장 잘 만든 구조는, 아무도 그 존재를 모른다.',
    caption: '메시지 플랫폼 · S그룹 교육 플랫폼',
    media: 'compare',
    compare: {
      before: { kind: 'matrix', label: 'BEFORE · 채널별 정책 매트릭스', why: '' },
      after: { kind: 'tree', label: 'AFTER · 통합 구조도', why: '' },
      caption: '정책 매트릭스 → 통합 구조',
      why: '채널별 예외를 [n]개 규칙으로 줄이고 승인·과금·로그를 하나로',
    },
    screens: [
      { kind: 'screen', label: '발송 화면 Before/After', why: '채널마다 달랐던 발송 흐름을 하나로', capture: true },
      { kind: 'dash', label: '대시보드', why: '월 수천만 건이 한눈에 보이도록', capture: true },
      { kind: 'tree', label: 'S그룹 IA 트리', why: '낯선 건설 도메인을 사용자 언어로 재구성' },
      { kind: 'blur', label: 'Jira / Confluence 보드', why: '권한 체계 재설계의 실행 기록 (블러)' },
    ],
  },
  {
    id: 'persuade', no: 'IV', en: 'PERSUADE', verb: '잇다', stage: '04 · 나무', growth: 'tree', theme: 'night',
    question: ['매출 0원의 회사가', '50억을 설득하는 법.'],
    body: 'COO의 숫자, CTO의 기술, CFO의 리스크. 서로 다른 세 개의 언어를 하나의 이야기로 엮었다. 장표의 90%를 직접 썼다. 셀룩에서는 입점몰이 거절할 수 없는 제안을 만들었고, 참여 업체의 매출은 최대 2,000%까지 뛰었다.',
    big: '50억', bigCaption: '매출이 없던 회사가 받아낸 믿음',
    maxim: '기획은 안을 정리하는 기술이자, 밖을 움직이는 언어다.',
    caption: '그린앤그레이 IR · 셀룩 기획전',
    media: 'stack',
    cards: [
      { kind: 'screen', label: 'IR 장표 01 · 문제 정의', why: '매출이 없는 회사의 가능성을 문제의 크기로 먼저 보여준 장' },
      { kind: 'screen', label: 'IR 장표 02 · 시장 구조', why: '세 경영진의 다른 언어를 하나의 시장 이야기로 묶은 장' },
      { kind: 'screen', label: 'IR 장표 03 · 비즈니스 모델', why: '[이 장이 설득한 지점]' },
      { kind: 'screen', label: 'IR 장표 04 · 팀과 로드맵', why: '[이 장이 설득한 지점]' },
      { kind: 'screen', label: '셀룩 기획전 페이지', why: '입점몰을 설득하기 위해 만든 무기', capture: true },
      { kind: 'app', label: '카카오 채널 메시지', why: '[메시지가 만든 반응]', capture: true },
    ],
  },
  {
    id: 'create', no: 'V', en: 'CREATE', verb: '짓다', stage: '05 · 숲', growth: 'forest', theme: 'ivory',
    question: ['도메인 경험, 0.', '그래서 처음부터 지었다.'],
    body: 'Revind — 레드오션을 역기획으로 해부해, 두 달 만에 돈을 받는 서비스로. Artch — 작가와 기업 사이에 길을 내, 협업 상품과 라이선스 계약으로. 마우이앤선즈 코리아 — 계약서의 첫 줄부터 자사몰과 정책까지. 법인 설립 두 달 만에 첫 드롭을 열었다.',
    big: '2개월', bigCaption: '법인 설립에서 첫 드롭까지',
    maxim: '기획서는 끝이 아니다. 첫 삽이다.',
    caption: 'Revind · Artch · 마우이앤선즈 코리아',
    media: 'devices',
    laptop: [
      { kind: 'screen', label: 'Revind — 경쟁사 역기획 표', why: '레드오션에서 빈틈을 찾은 방법' },
      { kind: 'app', label: 'Revind — 꾸미기 옵션', why: '역기획으로 2개월 만에 유료화한 기능', capture: true },
      { kind: 'screen', label: 'Artch — 작가 매칭 페이지', why: '작가와 기업을 잇는 구조', capture: true },
      { kind: 'screen', label: '마우이앤선즈 자사몰', why: '라이선스 계약서부터 직접 짠 브랜드의 집', capture: true },
    ],
    products: [
      { kind: 'product', label: 'Artch × 마틸라 협업 상품', why: '구조가 실제 상품이 된 결과' },
      { kind: 'fair', label: '일러스트레이션 페어 현장', why: '작가와 고객이 처음 만난 자리' },
      { kind: 'drop', label: '마우이앤선즈 드롭 비주얼', why: '법인 설립 2개월 만의 첫 드롭' },
    ],
  },
]

export const interlude = {
  label: 'INTERLUDE · THE METHOD',
  line1: '다섯 개의 동사를 이으면, 하나의 로직 트리가 된다.',
  line2: '뒤집으면 — 나무가 된다.',
  nodes: ['OBSERVE', 'DEFINE', 'STRUCTURE', 'PERSUADE', 'CREATE'],
  verbs: ['듣다', '좁히다', '덜어내다', '잇다', '짓다'],
}

export const epilogue = {
  label: 'EPILOGUE · THE TREE',
  line1: '뒤집힌 다이어그램은',
  line2: '한 그루의 나무였다.',
  sub: '그 나무가, 지금의 나다.',
  branches: { title: '가지와 열매 · BRANCHES', text: 'N사 — 만들고 이으며 맺은 열매' },
  trunk: { title: '줄기 · TRUNK', text: 'G사 — 설득으로 굵어진 시간' },
  roots: { title: '뿌리 · ROOTS', text: 'L그룹 — 현장과 구조를 배운 땅' },
  leaves: ['연극', '강연', '유튜브'],
}

export const appendixA = {
  label: 'APPENDIX A · THE WORKSHOP',
  title: '일 밖에서도, 숲은 자랐다',
  vertical: ['숲의 공방에서', '주워 온 조각들'],
  left: [
    { tag: 'POSTER', caption: '[작업 설명 한 줄]', color: '#B23A2B', ratio: '3 / 4', src: '' },
    { tag: 'BOOK COVER', caption: '[작업 설명 한 줄]', color: '#2A302B', ratio: '4 / 5', src: '' },
    { tag: 'PHOTO', caption: '[작업 설명 한 줄]', color: '#D7D3C8', ratio: '3 / 4', src: '' },
  ],
  right: [
    { tag: 'PHOTO', caption: '[작업 설명 한 줄]', color: '#E6E2D6', ratio: '1 / 1', src: '' },
    { tag: 'CUTLET LAB', caption: '[작업 설명 한 줄]', color: '#C8642F', ratio: '4 / 5', src: '' },
    { tag: 'AI FILM STILL', caption: '[작업 설명 한 줄]', color: '#17201A', ratio: '3 / 4', src: '' },
  ],
}

export const appendixB = {
  label: 'APPENDIX B · FIELD NOTES',
  title: '숲의 기록',
  sub: '필드노트에서 고른 글',
  posts: [
    { title: '[글 제목 1]', href: '/blog' },
    { title: '[글 제목 2]', href: '/blog' },
    { title: '[글 제목 3]', href: '/blog' },
  ],
  letterTitle: '생각이 한 뼘 자랄 때마다, 편지를 띄웁니다.',
  letterSub: '[발송 주기] · 언제든 구독 해지',
}

export const coda = {
  label: 'CODA',
  line1: '당신의 다음 숲,',
  line2: '첫 나무를 함께 심겠습니다.',
  cta: { label: '경력기술서 받아보기 →', href: '/contact' },
  arches: [
    { title: '함께하기', links: [{ label: '경력기술서 요청', href: '/contact' }, { label: '프로젝트 의뢰', href: '/contact' }, { label: '기획 템플릿', href: '/contact' }] },
    { title: '숲 밖에서', links: [{ label: '숲 편지', href: '#letter' }, { label: '[인스타그램]', href: '#' }, { label: '[링크드인]', href: '#' }] },
  ],
  signature: '다녀가신 발자국도, 이 숲의 일부입니다.',
  copyright: '© 기획의 숲 — 숲지기 너구리 기리',
}
