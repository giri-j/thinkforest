// ─────────────────────────────────────────────────────────────
// 기획의 숲 · Forest of Thought — 사이트 문구 데이터
// vanschneider 클론 페이지의 모든 문구를 이 파일 하나에서 관리합니다.
// 이미지: src 를 비워두면 tone 그라데이션 플레이스홀더, 경로를 넣으면 실제 이미지.
// ─────────────────────────────────────────────────────────────

export type Tone = {
  /** 그라데이션 가장 밝은 빛 */
  glow: string
  /** 그라데이션 중간 */
  mid: string
  /** 그라데이션 가장 어두운 바탕 */
  base: string
}

export type ProjectImage = {
  /** "무엇 — 왜" 한 줄 캡션 */
  caption: string
  src?: string
  alt?: string
}

export type Project = {
  no: string
  /** 배경에 외곽선으로 크게 깔리는 워드마크 */
  watermark: string
  /** 빨간(→ 포인트 컬러) 이름 */
  name: string
  /** 이름 뒤 " — " 다음에 오는 태그라인 */
  tagline: string
  /** 작은 대문자 라벨 (원본의 BRAND IDENTITY, PRODUCT DESIGN 자리) */
  label: string
  /** 성장 단계 표기 */
  stage: string
  description: string
  cta: { label: string; href: string }
  /** 원본과 같은 순서: [큰 이미지 1, 작은 이미지 1, 큰 이미지 2, 작은 이미지 2] */
  images: ProjectImage[]
  tone: Tone
}

// ── 공통 ─────────────────────────────────────────────────────

export const site = {
  /** 원본 HOUSE OF STUDIO 자리 */
  brand: 'FOREST OF THOUGHT',
  brandKo: '기획의 숲',
  /** 원본 NEW YORK CITY / BKLYN 자리 */
  location: 'SEOUL / KOREA',
  /** 원본 REPERTOIRE ≡ 자리 */
  menuLabel: 'INDEX',
  /** 원본 빨강(#E5202E 계열)을 대체할 포인트 컬러 */
  accent: '#E1B970',
  /** 포인트 컬러 위에 올라가는 글자색 */
  accentInk: '#0B0F0C',
}

export const menu = [
  { group: '숲길 · WORK', links: [{ label: '케이스 스터디', href: '#observe' }, { label: '소개', href: '#intro' }, { label: '함께하기', href: '#closing' }] },
  { group: '기록 · JOURNAL', links: [{ label: '숲의 기록', href: '/blog' }, { label: '필드노트', href: '/blog' }, { label: '숲 편지', href: '#closing' }] },
  { group: '공방 · LAB', links: [{ label: '실험', href: '/blog' }, { label: '기획 템플릿', href: '#closing' }, { label: '사진 아카이브', href: '/blog' }] },
]

// ── 히어로 ───────────────────────────────────────────────────
// 원본 "I CREATE; / THEREFORE / I AM" 의 3줄 구조를 그대로 사용

export const hero = {
  lines: ['SEED;', 'TREE;', 'FOREST.'],
  /** 히어로 바로 아래 한글 한 줄 (원본에 없던 줄 — 큰 제목 아래 작게) */
  subtitleKo: '생각의 씨앗이 모여 나무가 되고, 숲을 이룹니다.',
  /** 원본 DESIGN PRAXIS EST. 2008 자리 */
  meta: 'PLANNING PRAXIS EST. [첫 기획 연도]',
  /** 원본 STUDIO FOUNDER · CREATIVE DIRECTOR 자리 */
  role: 'SERVICE PLANNER · PM · OPERATION MANAGER',
  scrollLabel: 'SCROLL',
}

// ── 흐르는 띠 배너 (marquee) ──────────────────────────────────

export const marquee = {
  badge: 'NEW',
  items: ['숲의 기록이 열렸습니다', '기획, 일, 그리고 삶에 대한 필드노트', '읽으러 가기 →'],
  href: '/blog',
}

// ── 2톤 소개문 ───────────────────────────────────────────────
// primary = 흰 글씨, secondary = 회색 글씨. highlight 는 포인트 컬러 + ✣ 아이콘

export const intro = {
  primary: {
    before: '저는 ',
    highlight: '기획의 숲',
    after: '을 가꾸는 서비스 기획자입니다. 대기업 e커머스에서 뿌리를 내리고, 스타트업에서 줄기를 키웠고, 지금은 직접 브랜드와 서비스를 짓습니다.',
  },
  secondary: '지금은 해외 브랜드를 한국에 심는 일을 하고 있어요. 문제는 현장에서 들리고, 답은 구조에서 보인다고 믿습니다.',
  link: { label: '숲길을 걸어보기 ↓', href: '#observe' },
}

// ── 프로젝트 5개 = 기획의 동사 5개 ─────────────────────────────
// 색은 성장 단계 순서: 흙(씨앗) → 연두(새싹) → 이끼(묘목) → 딥그린(나무) → 밤과 호박빛(숲)

export const projects: Project[] = [
  {
    no: '01',
    watermark: 'OBSERVE',
    name: 'OBSERVE',
    tagline: '모두가 매장을 탓할 때, 나는 매장으로 갔다',
    label: 'L그룹 e커머스 · 스마트픽, 한 시간 배송',
    stage: 'STAGE 01 · 씨앗',
    description:
      '40여 개 점포를 직접 걸으며 들었다. 매장은 게으르지 않았다. 상품 하나하나를 손으로 체크해야 하는 구조가 그들을 지치게 했을 뿐. 한 시간 배송도 배달기사의 한마디에서 상품 구성을 다시 짰다.',
    cta: { label: '케이스 스터디 보기', href: '/about#observe' },
    images: [
      { caption: '점포 방문 — 상품마다 체크해야 하는 동선을 직접 본 곳' },
      { caption: '인터뷰 메모 — "협조를 안 한다"는 말 뒤의 실제 이유' },
      { caption: '매장 매니저의 하루 — 여정 지도로 다시 그린 하루의 병목' },
      { caption: '파트너플러스 앱 — 매니저의 체크 단계를 줄인 화면' },
    ],
    tone: { glow: '#C8915A', mid: '#5A3A22', base: '#1E140C' },
  },
  {
    no: '02',
    watermark: 'DEFINE',
    name: 'DEFINE',
    tagline: '105억의 취소, 전부 풀 필요는 없었다',
    label: 'L그룹 e커머스 · 주문완료율',
    stage: 'STAGE 02 · 새싹',
    description:
      '취소 15% 가운데 우리가 통제할 수 있는 건 결품 3%뿐이었다. 그 3%에 전부를 걸었다. 교육으로는 0.5%p, 정책 구조를 바꾸자 1%p. 사람이 아니라, 구조였다.',
    cta: { label: '케이스 스터디 보기', href: '/about#define' },
    images: [
      { caption: '깔때기 — 105억의 취소에서 바꿀 수 있는 3%만 남기다' },
      { caption: '배송 할당 정책 — 1+1+1과 2+1, 같은 물량 다른 구조' },
      { caption: '교육 vs 구조 — 같은 문제, 두 배의 효과' },
      { caption: '정책 개선안 — [개선안 한 줄 설명]' },
    ],
    tone: { glow: '#B7D08A', mid: '#4E6B35', base: '#141D0E' },
  },
  {
    no: '03',
    watermark: 'STRUCTURE',
    name: 'STRUCTURE',
    tagline: '고객은 채널의 사정을 알 필요가 없다',
    label: '메시지 플랫폼 · S그룹 교육 플랫폼',
    stage: 'STAGE 03 · 묘목',
    description:
      '채널마다 제각각이던 정책을 고객의 언어로 다시 나눴다. 승인·과금·로그를 한 줄기로 묶자, 월 수천만 건이 소리 없이 흐르기 시작했다. 낯선 건설 도메인에서는 권한의 지도를 다시 그렸고, MAU는 200%가 됐다.',
    cta: { label: '케이스 스터디 보기', href: '/about#structure' },
    images: [
      { caption: '정책 매트릭스 → 통합 구조 — 채널별 예외를 [n]개 규칙으로' },
      { caption: '발송 화면 Before/After — 채널마다 달랐던 흐름을 하나로' },
      { caption: 'S그룹 IA 트리 — 낯선 도메인을 사용자 언어로 재구성' },
      { caption: '대시보드 — 월 수천만 건이 한눈에 보이도록' },
    ],
    tone: { glow: '#8FB58A', mid: '#36553A', base: '#0F1A12' },
  },
  {
    no: '04',
    watermark: 'PERSUADE',
    name: 'PERSUADE',
    tagline: '매출 0원의 회사가 50억을 설득하는 법',
    label: '그린앤그레이 IR · 셀룩 기획전',
    stage: 'STAGE 04 · 나무',
    description:
      'COO의 숫자, CTO의 기술, CFO의 리스크. 서로 다른 세 개의 언어를 하나의 이야기로 엮었고, 장표의 90%를 직접 썼다. 셀룩에서는 입점몰이 거절할 수 없는 제안을 만들어 참여 업체 매출을 최대 2,000%까지 끌어올렸다.',
    cta: { label: '케이스 스터디 보기', href: '/about#persuade' },
    images: [
      { caption: 'IR 장표 — 수치는 가리고 이야기의 구조만' },
      { caption: '스토리라인 — 세 경영진의 언어를 하나로 묶은 흐름' },
      { caption: '셀룩 기획전 — 입점몰을 설득하기 위해 만든 무기' },
      { caption: '카카오 채널 메시지 — [메시지가 만든 반응]' },
    ],
    tone: { glow: '#5F8F6A', mid: '#1F3326', base: '#08110C' },
  },
  {
    no: '05',
    watermark: 'CREATE',
    name: 'CREATE',
    tagline: '도메인 경험 0, 그래서 처음부터 지었다',
    label: 'Revind · Artch · 마우이앤선즈 코리아',
    stage: 'STAGE 05 · 숲',
    description:
      'Revind는 레드오션을 역기획으로 해부해 두 달 만에 유료화했다. Artch는 작가와 기업 사이에 길을 내 협업 상품과 라이선스 계약으로 이었다. 마우이앤선즈 코리아는 계약서 첫 줄부터 자사몰까지 직접 짰고, 법인 설립 두 달 만에 첫 드롭을 열었다.',
    cta: { label: '케이스 스터디 보기', href: '/about#create' },
    images: [
      { caption: 'Revind — 레드오션에서 빈틈을 찾은 역기획 표' },
      { caption: 'Artch × 마틸라 — 구조가 실제 상품이 된 결과' },
      { caption: '마우이앤선즈 자사몰 — 계약서부터 직접 짠 브랜드의 집' },
      { caption: '첫 드롭 — 법인 설립 2개월 만의 첫 시즌' },
    ],
    tone: { glow: '#E1B970', mid: '#2A3A2C', base: '#060A08' },
  },
]

// ── 중간 에세이 목록 (원본 FEATURED ESSAYS 자리, 03번 프로젝트 뒤) ──

export const essays = {
  label: 'FEATURED ESSAYS',
  sublabel: 'FROM 숲의 기록',
  items: [
    { title: '주니어 기획자에게 — 기획서보다 먼저 현장으로', href: '/blog' },
    { title: '숫자 하나로 설득하는 법', href: '/blog' },
    { title: '역기획으로 두 달 만에 유료화한 이야기', href: '/blog' },
  ],
}

// ── Interlude (원본에 없는 새 섹션 — 05번과 마무리 사이) ──────────

export const interlude = {
  label: 'INTERLUDE · THE METHOD',
  line1: '다섯 개의 동사를 이으면, 하나의 로직 트리가 된다.',
  line2: '뒤집으면 — 나무가 된다.',
  root: '기획',
  nodes: [
    { en: 'OBSERVE', ko: '듣다' },
    { en: 'DEFINE', ko: '좁히다' },
    { en: 'STRUCTURE', ko: '덜어내다' },
    { en: 'PERSUADE', ko: '잇다' },
    { en: 'CREATE', ko: '짓다' },
  ],
  career: {
    roots: 'L그룹 — 현장과 구조를 배운 땅',
    trunk: 'G사 — 설득으로 굵어진 시간',
    branches: 'N사 — 만들고 이으며 맺은 열매',
  },
}

// ── 마무리 + 푸터 ────────────────────────────────────────────

export const closing = {
  /** 원본 "Let's make something that has a point of view." 자리 (두 줄) */
  lines: ['당신의 다음 숲,', '첫 나무를 함께 심겠습니다.'],
  cta: { label: '경력기술서 받아보기 →', href: '/contact' },
  secondary: [
    { label: '프로젝트 의뢰', href: '/contact' },
    { label: '숲 편지 구독', href: '/blog' },
  ],
}

export const footer = {
  left: '© 2026 기획의 숲 · 숲지기 너구리 기리',
  /** 원본 MOTION STUDY · NOT THE ORIGINAL SITE 자리 */
  right: '다녀가신 발자국도, 이 숲의 일부입니다.',
}
