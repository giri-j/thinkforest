/* 포트폴리오 원고 — 해본 일 전부를 한곳에 모은 아카이브.
   기존 portfolio 사이트(thinkforest-web /project)의 목록 + About의 featuredCases·otherProjects + 블로그 글을 합쳤다.
   표기는 About과 같은 규칙(회사는 'L그룹'·'G사'·'N사', 자사·개인 서비스는 실명)을 따른다.
   숫자는 케이스 스터디 페이지와 같은 값으로 맞췄다. */

export type Field = 'service' | 'operation' | 'business' | 'side'

export const FIELDS: { key: Field; no: string; en: string; ko: string; note: string }[] = [
  { key: 'service', no: '01', en: 'Service', ko: '서비스 기획', note: '웹·앱 서비스를 0부터 만들거나 다시 짠 일' },
  { key: 'operation', no: '02', en: 'Operation', ko: '운영 기획', note: '현장의 문제를 구조와 정책으로 고친 일' },
  { key: 'business', no: '03', en: 'Business', ko: '사업 기획', note: '브랜드를 들여오고, 사업을 세우고, 투자를 설득한 일' },
  { key: 'side', no: '04', en: 'Side', ko: '기타', note: '일 밖에서 기획해 본 것들' },
]

export type Media =
  | { kind: 'video'; src: string; poster: string }
  | { kind: 'images'; srcs: string[] }
  | { kind: 'note'; label: string; title: string; sub?: string } // 아직 보여줄 화면이 없을 때 — 글자만 있는 카드

export type ProjectLink = { label: string; href: string; kind: 'blog' | 'site' | 'locked' }

export type Project = {
  id: string
  field: Field
  title: string
  org: string
  period: string // 표기용. 정렬은 sortYear
  sortYear: number
  summary: string
  role: string
  metric?: string // 한 줄 성과. 있으면 금색으로 강조
  media?: Media // 없으면 번호·제목만 있는 타이포 카드
  links?: ProjectLink[]
  featured?: boolean // 케이스 스터디가 있는 대표 프로젝트
}

export const PROJECTS: Project[] = [
  // ── 01 Service ──────────────────────────────────────────
  {
    id: 'p-marketing-platform',
    field: 'service',
    title: "'P'사 통합 마케팅 플랫폼",
    org: "스타트업 'N사' · 외주 · 약 1억 원 규모",
    period: '2026 — 진행 중',
    sortYear: 2026,
    summary: "외주로 맡은 통합 마케팅 플랫폼입니다. 누구나 쉽게 이미지를 편집할 수 있게 만든 '이미지 편집' 기능이 메인이고, 화면 약 200개 규모의 요구사항정의서를 작성했습니다.",
    role: '서비스 기획, IA·화면 설계',
    media: { kind: 'note', label: 'In progress', title: '지금 만들고 있습니다', sub: '오픈 후 화면을 공개할게요' },
  },
  {
    id: 'wedding-invitation',
    field: 'side',
    title: '셀프 모바일 청첩장',
    org: '개인 프로젝트',
    period: '2026',
    sortYear: 2026,
    summary: '바이브 코딩으로 셀프 모바일 청첩장을 개발했습니다. 화려함을 더하기 위해 애니메이션 효과와 3D 영상을 활용했고, 방명록을 저장하기 위해 Supabase를 활용했습니다.',
    role: '기획, 디자인, 개발',
    media: { kind: 'video', src: '/images/blog/wedding/fireworks.mp4', poster: '/images/blog/wedding/fireworks-poster.jpg' },
    links: [
      { label: '제작기 읽기', href: '/blog/self-made-mobile-wedding-invitation', kind: 'blog' },
      { label: '청첩장 보기', href: '/wedding', kind: 'site' },
    ],
  },
  {
    id: 'message-platform',
    field: 'service',
    title: '통합 메시지 플랫폼',
    org: "스타트업 'N사' · 자사 서비스",
    period: '2024',
    sortYear: 2024,
    summary: '기업용 문자·카카오 메시지 발송 통합 플랫폼입니다. 채널별 정책을 고객 언어로 재분류하고, 승인·과금·로그를 하나로 묶었습니다.',
    role: '핵심 정책 기획, UX·정보 구조 설계, 주요 기능 정의',
    metric: '월 이익 수천만 원대',
    media: { kind: 'video', src: '/images/portfolio/message-platform.mp4', poster: '/images/portfolio/message-platform-poster.jpg' },
    links: [
      { label: '서비스 보기', href: 'https://www.nitsoft.co.kr/', kind: 'site' },
    ],
    featured: true,
  },
  {
    id: 's-group-platform',
    field: 'service',
    title: '디지털 교육 플랫폼 리뉴얼',
    org: "대기업 'S'건설사 · SI · 약 1억 원 규모",
    period: '2024',
    sortYear: 2024,
    summary: '폐쇄적이던 사내 DX 교육 플랫폼을 양방향 구조로 다시 짰습니다. 발주사의 언어를 먼저 익히고 권한 체계와 소통 구조를 재설계했습니다.',
    role: 'PM, 기획 총괄',
    metric: '월간 활성 사용자 200% 증가',
    media: { kind: 'video', src: '/images/portfolio/s-group-platform.mp4', poster: '/images/portfolio/s-group-platform-poster.jpg' },
    links: [
      { label: '사내 전용 사이트', href: '', kind: 'locked' },
    ],
    featured: true,
  },
  {
    id: 'artch',
    field: 'service',
    title: 'Artch 작가 매칭 플랫폼',
    org: '자사 신규 서비스 · 기획 총괄',
    period: '2024',
    sortYear: 2024,
    summary: '기업과 아티스트의 협업을 잇는 플랫폼입니다. 박람회·전시를 직접 다니며 작가를 영입하고 기업 협업까지 운영했습니다.',
    role: '기획, 비즈니스 모델 수립, 운영 총괄',
    metric: '작가 50명 이상 영입',
    media: { kind: 'video', src: '/images/portfolio/artch.mp4', poster: '/images/portfolio/artch-poster.jpg' },
    links: [
      { label: 'artch.io', href: 'https://artch.io', kind: 'site' },
    ],
  },
  {
    id: 'revind',
    field: 'service',
    title: '멀티링크 서비스 Revind',
    org: '자사 신규 서비스 · 기획 총괄',
    period: '2023',
    sortYear: 2023,
    summary: '개발자 두 명, 기획자 한 명이 두 달 만에 만들고 월 3,300원을 받은 링크인바이오 서비스입니다. 1등 서비스를 구독해 역기획했습니다.',
    role: '서비스 기획 총괄, UX·웹앱 설계',
    metric: '2개월 만에 유료화',
    media: { kind: 'video', src: '/images/portfolio/revind.mp4', poster: '/images/portfolio/revind-poster.jpg' },
    links: [
      { label: '사업 이야기 읽기', href: '/blog/revind-multilink-service', kind: 'blog' },
      { label: 'revind.io', href: 'https://revind.io', kind: 'site' },
    ],
    featured: true,
  },
  {
    id: 'cellook',
    field: 'service',
    title: '여성의류 플랫폼 기획전 콘텐츠',
    org: "패션 커머스 스타트업 'G사' · 셀룩",
    period: '2022',
    sortYear: 2022,
    summary: '수익 모델도 없던 플랫폼에, 공유하기 쉬운 웹 기획전과 카카오톡 채널 메시지로 트래픽을 만들었습니다. 기획전은 서비스의 메인 콘텐츠가 됐습니다.',
    role: '백오피스·기획전 기획 총괄, UI/UX 설계',
    metric: '참여 업체 매출 최대 2,000%',
    media: { kind: 'video', src: '/images/portfolio/cellook.mp4', poster: '/images/portfolio/cellook-poster.jpg' },
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/cellook.kr/', kind: 'site' },
    ],
    featured: true,
  },
  {
    id: 'asset-mgmt-site',
    field: 'service',
    title: "자산운용사 'S'사 홈페이지",
    org: '외주 · 약 1천만 원 규모',
    period: '2025.08',
    sortYear: 2025,
    summary: '말로 설명되지 않는 대표의 취향을 실무자를 통해 읽어내, 브랜드 방향과 정보 구조, 화면을 설계했습니다.',
    role: 'UX 기획, 디자인 디렉션',
    media: { kind: 'video', src: '/images/portfolio/asset-mgmt-site.mp4', poster: '/images/portfolio/asset-mgmt-site-poster.jpg' },
    links: [{ label: '사이트 보기', href: 'http://seedamc.com/', kind: 'site' }],
  },

  // ── 02 Operation ────────────────────────────────────────
  {
    id: 'backoffice-automation',
    field: 'operation',
    title: '백오피스 업무 자동화',
    org: "패션 커머스 스타트업 'G사'",
    period: '2022',
    sortYear: 2022,
    summary: '입점 쇼핑몰 300곳의 순위·매출을 손으로 옮기던 반복 작업을 매크로로 자동화하고 사내 교육까지 맡았습니다.',
    role: '자동화 설계, 사내 교육',
    media: { kind: 'video', src: '/images/portfolio/autohotkey.mp4', poster: '/images/portfolio/autohotkey-poster.jpg' }, // AutoHotkey 키 입력 애니메이션(GIF → mp4)
  },
  {
    id: 'lotte-o4o',
    field: 'operation',
    title: '스마트픽 O4O 서비스 운영기획',
    org: "대기업 'L그룹' e커머스 사업부",
    period: '2018 — 2021',
    sortYear: 2021,
    summary: '온라인 주문 후 매장에서 찾아가는 서비스입니다. 상품마다 하던 체크를 카테고리 단위 기본값으로 바꾸고, 안내 전화를 카카오 알림톡으로 자동화했습니다.',
    role: '운영 정책·프로세스 설계, 매장 교육',
    metric: '적용 상품 40% → 80%',
    media: { kind: 'images', srcs: ['/images/portfolio/smartpick-1.webp', '/images/portfolio/smartpick-2.webp', '/images/portfolio/smartpick-3.webp'] },
    featured: true,
  },
  {
    id: 'pickup-edu-video',
    field: 'operation',
    title: '스마트픽 교육 영상',
    org: "대기업 'L그룹' e커머스 사업부",
    period: '2018',
    sortYear: 2018,
    summary: '전국 40개 이상 백화점을 돌며 백화점 매니저들에게 시스템 교육을 진행했고, 온라인으로도 접할 수 있게 교육 콘텐츠를 인포그래픽으로 만들어 동영상으로 제작했습니다.',
    role: '기획, 대본 구성, 제작 관리',
    media: {
      kind: 'images', // 매장 교육용 스마트픽 서비스 매뉴얼(2020.05) 중 6쪽
      srcs: [
        '/images/portfolio/smartpick-edu-cover.webp',
        '/images/portfolio/smartpick-edu-intro.webp',
        '/images/portfolio/smartpick-edu-pickup-types.webp',
        '/images/portfolio/smartpick-edu-process.webp',
        '/images/portfolio/smartpick-edu-alimtalk.webp',
        '/images/portfolio/smartpick-edu-alimtalk-flow.webp',
      ],
    },
  },
  {
    id: 'lotte-order',
    field: 'operation',
    title: '주문수행율 개선',
    org: "대기업 'L그룹' e커머스 사업부",
    period: '2014 — 2018',
    sortYear: 2018,
    summary: '결품의 원인을 사람이 아닌 구조에서 찾았습니다. 전국 매장을 돌며 교육하고, 배송 할당 정책을 바꿔 결품과 배송 리드타임을 함께 줄였습니다.',
    role: 'QCM 파트 신설 멤버 → 파트장',
    metric: '결품률 3% → 1.5%',
    media: {
      kind: 'images', // 백화점 점이동 확대 계획 — 개요 · 기대 효과 · 수치 변화
      srcs: [
        '/images/portfolio/lotte-order-overview.webp',
        '/images/portfolio/lotte-order-effect.webp',
        '/images/portfolio/lotte-order-numbers.webp',
      ],
    },
    featured: true,
  },
  {
    id: 'one-hour-delivery',
    field: 'operation',
    title: "'한 시간 배송' 런칭",
    org: "대기업 'L그룹' 그룹 TF",
    period: '2020.08',
    sortYear: 2020,
    summary: '배달기사의 이야기를 듣고 상품 구성을 다시 짜서 잠실 권역에 서비스를 열었습니다.',
    role: 'TF 운영 기획',
    media: { kind: 'images', srcs: ['/images/portfolio/one-hour-delivery-square.webp'] }, // 조선일보 기사 대표 이미지(원본 600×600)
    links: [{ label: '관련 기사 · 조선일보', href: 'https://www.chosun.com/site/data/html_dir/2020/08/26/2020082601279.html', kind: 'site' }],
  },
  {
    id: 'qr-pickup',
    field: 'operation',
    title: 'QR 픽업 · 라이브커머스 파일럿',
    org: "대기업 'L그룹' 백화점 파견",
    period: '2020.03 — 2020.06',
    sortYear: 2020,
    summary: 'QR 픽업 존을 기획부터 전시까지 맡았고, 이 일이 라이브커머스 운영 조직 신설로 이어졌습니다.',
    role: '기획, 현장 운영',
    media: {
      kind: 'images',
      srcs: [
        '/images/portfolio/qr-zone.webp',
        '/images/portfolio/qr-luxury.webp',
        '/images/portfolio/live-fashion.webp',
        '/images/portfolio/live-food.webp',
        '/images/portfolio/live-luxury.webp',
      ],
    },
  },

  // ── 03 Business ─────────────────────────────────────────
  {
    id: 'maui-and-sons',
    field: 'business',
    title: '마우이앤선즈 코리아 브랜드 런칭',
    org: "스타트업 'N사' · 브랜드 사업",
    period: '2026',
    sortYear: 2026,
    summary: '미국 서프 헤리티지 브랜드를 한국에서 0부터 다시 시작했습니다. 서브라이선스 계약부터 자사몰, 상품·배송·교환·적립금·회원 정책까지 직접 설계했습니다.',
    role: '브랜드 사업 운영 총괄',
    metric: '법인 설립 2개월 만에 1차 드롭',
    media: { kind: 'video', src: '/images/portfolio/maui-and-sons.mp4', poster: '/images/portfolio/maui-and-sons-poster.jpg' }, // 자사몰 화면 녹화(15초, 960×540)
    links: [{ label: '자사몰 보기', href: 'https://mauiandsons.kr/', kind: 'site' }],
  },
  {
    id: 'lux-cosmetics',
    field: 'business',
    title: '럭셔리 화장품 직구몰',
    org: "스타트업 'N사'",
    period: '2025',
    sortYear: 2025,
    summary: "홍콩 유통망을 활용한 명품 화장품 직구 사업입니다. 스마트스토어를 세팅하고 상품 상세페이지를 직접 만들었습니다. 정식 수입은 판매자가 관세를 부담하는 만큼 가격이 오르지만, 150달러 미만 상품을 소비자가 직접 사는 '직구' 형태로 팔면 관세가 붙지 않는다는 점에 착안해 기획했습니다.",
    role: '브랜드 전략, 판매 채널 셋업',
    media: { kind: 'video', src: '/images/portfolio/lux-cosmetics.mp4', poster: '/images/portfolio/lux-cosmetics-poster.jpg' }, // 스마트스토어 화면 녹화(10초, 960×540)
  },
  {
    id: 'ir-deck',
    field: 'business',
    title: '투자 유치 IR 자료',
    org: "패션 커머스 스타트업 'G사'",
    period: '2022',
    sortYear: 2022,
    summary: '실적이 아니라 가능성으로 설득해야 했던 IR입니다. COO·CTO·CFO의 의견을 하나의 이야기로 묶었습니다. 자료 기획의 약 40%를 맡았고, 자료 작성은 100% 직접 했습니다.',
    role: 'IR 자료 기획(약 40%) · 작성(100%)',
    media: { kind: 'images', srcs: ['/images/portfolio/ir-deck.webp'] },
    metric: '50억 원 투자 유치',
    featured: true,
  },

  // ── 04 Side ─────────────────────────────────────────────
  {
    id: 'youtube-crew',
    field: 'side',
    title: '유튜브 크루 활동',
    org: '콘텐츠 크루',
    period: '2021',
    sortYear: 2021,
    summary: "한국의 명소들을 외국인에게 알리는 유튜브 크루 'TRAVEL MAKER'에 참여했습니다.",
    role: '고정 출연 멤버',
    media: { kind: 'video', src: '/images/portfolio/youtube-crew.mp4', poster: '/images/portfolio/youtube-crew-poster.jpg' }, // TRAVEL MAKER EP.2 서울 남산(16초, 800×450, 무음)
  },
  {
    id: 'univ-talk',
    field: 'side',
    title: '대학생 진로 강연 · 상담',
    org: '대외활동 플러스',
    period: '2016 — 2018',
    sortYear: 2018,
    summary: "약 2년 동안 대학생들과 '영업, 마케팅, 인사' 직무에 대한 대외활동을 하며 부팀장, 국장을 역임했고, 이미 취업한 직장인 멘토로서 취업 고민 상담, 진로 강연 등을 했습니다.",
    role: '취업 상담, 진로 강연',
    media: {
      kind: 'images', // 강연 무대 · 상담 현장 (무대 화면 속 실명은 흐림 처리)
      srcs: ['/images/portfolio/univ-talk-stage.webp', '/images/portfolio/univ-talk-mentoring.webp'],
    },
  },
  {
    id: 'theater',
    field: 'side',
    title: "직장인 극단 '우리들의 시간' 주연",
    org: '직장인 극단',
    period: '2016',
    sortYear: 2016,
    summary: "옴니버스식 연극 '사랑에 관한 5가지 소묘'에서 두 가지 이야기의 주연배우를 맡았습니다. '경상도 부부' 이야기에서는 경상도 남편 역할을, '할아버지 할머니' 이야기에서는 할아버지 역할을 연기했습니다.",
    role: '배우(주연)',
    media: {
      kind: 'images', // 공연 · 커튼콜 · 연습
      srcs: [
        '/images/portfolio/theater-stage.webp',
        '/images/portfolio/theater-curtain-call.webp',
        '/images/portfolio/theater-rehearsal.webp',
      ],
    },
  },
]

/* 분야 순서 → 분야 안에서는 최신순 */
export function projectsByField(field: Field) {
  return PROJECTS.filter((p) => p.field === field).sort((a, b) => b.sortYear - a.sortYear)
}
