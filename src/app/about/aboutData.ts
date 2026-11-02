// About 페이지 원고 데이터
// 숫자·문구는 여기서만 고치면 페이지 전체에 반영됩니다.

export type Stat = { value: string; unit?: string; label: string }

export const heroCopy = {
    eyebrow: 'Think Forest Master · 기획의 숲 지기',
    titleLines: ['현장의 목소리를', '구조로 바꾸는 기획자'],
    lead: [
        '12년 동안 커머스 현장에서 사람들의 이야기를 듣고,',
        '그 문제를 정책과 시스템, 그리고 사업으로 바꿔왔습니다.',
    ],
    belief: '기획은 아이디어가 아니라, 성과로 이어지는 설계라고 믿습니다.',
    name: '기리 (전은길)',
    role: '서비스 기획자 · PM · Operation Manager',
}

export const stats: Stat[] = [
    { value: '12', unit: '년', label: '커머스 현장부터 사업까지' },
    { value: '30', unit: '억', label: '대기업 N사 투자 유치 IR' },
    { value: '2,000', unit: '%', label: '기획전 참여 업체 최대 매출 신장' },
    { value: '2', unit: '개월', label: '기획부터 유료화까지 (Revind)' },
    { value: '200', unit: '%', label: '교육 플랫폼 월간 활성 사용자 증가' },
]

export const principles = [
    {
        no: '01',
        title: '현장에서 먼저 듣습니다',
        body: '책상 위 데이터보다 현장의 목소리가 문제를 더 빨리 알려줍니다. 매장 매니저, MD, 배달기사, 발주사 실무자가 언제나 기획의 출발점이었습니다.',
        proof: '파트너사 약 1만 곳 교육 · 40여 개 점포 정기 인터뷰',
    },
    {
        no: '02',
        title: '사람 대신 구조를 고칩니다',
        body: '같은 실수가 반복된다면 사람이 아니라 구조의 문제입니다. 교육으로 덮기보다 정책, 기본값, 자동화로 다시 일어나지 않게 만듭니다.',
        proof: '스마트픽 적용 상품 40% → 80% · 반복 업무 매크로 자동화',
    },
    {
        no: '03',
        title: '0에서 1을 만듭니다',
        body: '기획서에서 멈추지 않습니다. 계약서와 IR, 운영 정책, 자사몰, 이 사이트까지 직접 만들며 결과가 나올 때까지 끝까지 갑니다.',
        proof: '창립 이래 첫 매출 · 2개월 유료화 · 브랜드 런칭',
    },
]

export type GrowthStage = {
    stage: string
    stageEn: string
    period: string
    org: string
    role: string
    summary: string
    highlights: string[]
}

export const growth: GrowthStage[] = [
    {
        stage: '뿌리',
        stageEn: 'Roots',
        period: '2014.11 — 2021.07',
        org: "대기업 'L그룹' e커머스 사업부",
        role: 'SCM팀 → 스마트픽팀 · 배송정책 / O4O 운영기획',
        summary: '배송과 O4O 현장 한가운데에서, 문제를 흐름으로 읽는 법을 배웠습니다.',
        highlights: [
            '결품률 2.2% → 1.7% (배송 할당 정책 개선)',
            '스마트픽 적용 상품 40% → 80%',
            "그룹 '한 시간 배송' 런칭 · QR 픽업 파일럿",
        ],
    },
    {
        stage: '줄기',
        stageEn: 'Trunk',
        period: '2021.07 — 2023.07',
        org: "패션 커머스 스타트업 'G사'",
        role: '서비스기획팀 → 기획팀 · 백오피스 / 신규 콘텐츠 기획',
        summary: '어드민을 관리 도구에서 매출을 만드는 도구로 바꿨습니다.',
        highlights: [
            '기획전 참여 업체 매출 신장 300~2,000%',
            '창립 이래 첫 매출 · 200개 업체 입점',
            '대기업 N사 30억 투자 유치 IR',
        ],
    },
    {
        stage: '가지와 열매',
        stageEn: 'Branches',
        period: '2023.07 — 현재',
        org: "스타트업 'N사'",
        role: '신규사업본부 기획팀장 · PM / 브랜드 사업 Operation Manager',
        summary: '서비스를 넘어 플랫폼, 외주 프로젝트, 브랜드 사업까지 가지를 뻗고 있습니다.',
        highlights: [
            '통합 메시지 플랫폼 · 월 이익 수천만 원대로 전환',
            'Revind · Artch 신규 서비스 기획 총괄',
            '마우이앤선즈 코리아 브랜드 런칭',
        ],
    },
]

export type FeaturedCase = {
    id: string
    href?: string
    tag: string
    org: string
    title: string
    problem: string
    approach: string
    result: string
    metric: string
}

export const featuredCases: FeaturedCase[] = [
    {
        id: 'message-platform',
        href: '/about/case-study/message-platform',
        tag: 'Platform',
        org: "스타트업 'N사' · 자사 서비스",
        title: '통합 메시지 플랫폼 기획',
        problem: '낡은 서비스, 매출은 있지만 이익이 거의 없는 구조',
        approach: '채널별 정책을 고객 언어로 재분류하고 승인·과금·로그를 하나로',
        result: '통합 이후 처음으로 의미 있는 이익, 고객과 매출 동반 성장',
        metric: '월 이익 수천만 원대',
    },
    {
        id: 'cellook-exhibition',
        href: '/about/case-study/cellook-backoffice',
        tag: 'Content · Commerce',
        org: "패션 커머스 스타트업 'G사'",
        title: '여성의류 플랫폼 기획전 콘텐츠',
        problem: '입점몰을 끌어들일 매력도, 플랫폼의 수익 모델도 없음',
        approach: '공유하기 쉬운 웹 기획전 + 카카오톡 채널 메시지로 트래픽 확보',
        result: '서비스의 메인 콘텐츠로 자리 잡음',
        metric: '참여 업체 매출 최대 2,000%',
    },
    {
        id: 'lotte-o4o',
        href: '/about/case-study/lotte-o4o',
        tag: 'O4O · Operation',
        org: "대기업 'L그룹' e커머스 사업부",
        title: '스마트픽 O4O 서비스 운영기획',
        problem: '매장 매니저가 상품마다 체크를 놓쳐 서비스가 돌지 않음',
        approach: '상품 단위 체크를 카테고리 단위 기본값으로, 알림은 카카오톡 자동화로',
        result: '휴먼 에러를 시스템으로 흡수, 월 약 50만 원 비용 절감',
        metric: '적용 상품 40% → 80%',
    },
    {
        id: 'rebind-service',
        href: '/about/case-study/rebind-service',
        tag: 'New Service',
        org: 'Revind · 기획 총괄',
        title: '링크인바이오 서비스 Revind',
        problem: '도메인 지식 없이 강력한 선발주자가 있는 시장에 진입',
        approach: '경쟁사 역기획으로 꾸미기 자유도와 쇼핑몰 친화 기능에 집중',
        result: '지금도 운영 중인 유료 서비스',
        metric: '2개월 만에 유료화',
    },
    {
        id: 'maui-and-sons',
        tag: 'Brand Launch',
        org: "스타트업 'N사' · 브랜드 사업",
        title: '마우이앤선즈 코리아 브랜드 런칭',
        problem: '미국 서프 헤리티지 브랜드를 한국에서 0부터 다시 시작',
        approach: '서브라이선스 계약부터 자사몰, 상품·배송·교환·적립금·회원 정책까지 직접 설계',
        result: '법인 설립 약 2개월 만에 1차 드롭, 이어서 2차 드롭 오픈',
        metric: '2026 FW 두 번의 드롭',
    },
    {
        id: 's-group-platform',
        href: '/about/case-study/s-group-platform',
        tag: 'SI · PM',
        org: "대기업 'S'건설사 · 약 1억 원 규모",
        title: '디지털 교육 플랫폼 리뉴얼',
        problem: '폐쇄적인 구조와 일방향 교육 경험, 낯선 건설 도메인',
        approach: '발주사의 언어를 먼저 익히고, 권한 체계와 양방향 소통 구조를 재설계',
        result: 'PM으로 발주사의 결정을 돕는 기준점 역할',
        metric: '월간 활성 사용자 200% 증가',
    },
]

export type OtherProject = { title: string; org: string; tag: string; note: string; href?: string }

export const otherProjects: OtherProject[] = [
    {
        title: 'Artch 작가 매칭 플랫폼',
        org: '기획 총괄',
        tag: 'Service',
        note: '박람회·전시를 직접 다니며 작가 50명 이상 영입, 침구 브랜드·대기업 협업 매출',
        href: '/about/case-study/arch-service',
    },
    {
        title: "'P'사 통합 마케팅 플랫폼",
        org: '약 1억 원 규모',
        tag: 'Platform · AI',
        note: 'AI 도구로 요구사항정의서와 89개 화면 와이어프레임 작성, 진행 중',
    },
    {
        title: "자산운용사 'S'사 홈페이지",
        org: '약 1천만 원 규모',
        tag: 'Web',
        note: '말로 설명되지 않는 대표의 취향을 실무자를 통해 읽어내 브랜드 방향·IA·화면 설계',
    },
    {
        title: '투자 유치 IR 자료',
        org: "패션 커머스 스타트업 'G사'",
        tag: 'IR',
        note: 'COO·CFO의 의견을 하나의 논리로 묶어 대기업 N사 30억 원 투자 유치',
        href: '/about/case-study/green-gray',
    },
    {
        title: '주문완료율 개선',
        org: "대기업 'L그룹'",
        tag: 'Operation',
        note: '배송 할당 정책과 패널티 정책을 바꿔 결품률 2.2% → 1.7%',
        href: '/about/case-study/lotte-order',
    },
    {
        title: "'한 시간 배송' 런칭",
        org: "대기업 'L그룹' 그룹 TF",
        tag: 'New Service',
        note: '배달기사의 이야기를 듣고 상품 구성을 다시 짜 잠실 권역 서비스 오픈',
    },
    {
        title: 'QR 픽업 · 라이브커머스 파일럿',
        org: "대기업 'L그룹' 백화점 파견",
        tag: 'O4O',
        note: 'QR 픽업 존을 기획부터 전시까지 맡고, 라이브커머스 운영 조직 신설로 이어짐',
    },
    {
        title: '백오피스 업무 자동화',
        org: "패션 커머스 스타트업 'G사'",
        tag: 'Automation',
        note: '쇼핑몰 300곳의 반복 수기 작업을 매크로로 자동화하고 사내 교육',
    },
]

export const ctaCopy = {
    eyebrow: 'Walk Together',
    titleLines: ['기획부터 운영, 사업까지', '함께 걸을 사람이 필요하다면'],
    body: '더 자세한 경력기술서와 포트폴리오를 보내드릴게요.',
    button: '경력기술서 요청하기',
}
