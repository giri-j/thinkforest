/* 서버·클라이언트 양쪽에서 쓰는 블로그 메타. fs를 쓰지 않는다. */

export type Category = 'Idea' | 'Trials' | 'Personal' | 'Life'

export interface CategoryMeta {
    key: Category
    slug: string
    no: string
    ko: string
    description: string
    /* 홈 스토리에서 이 주제가 서 있는 자리 — 카테고리 페이지 히어로에 쓴다 */
    scene: string
    frame: string
}

/* 숲의 책상(Forest Desk)에서 쓰는 네 가지 주제. 번호는 상단 내비게이션 순서와 같다.
   홈의 흐름(생각 → 열매 → 나무 → 숲)에 맞춰, 각 주제에 홈 시퀀스의 프레임 하나씩을 짝지어 둔다. */
export const CATEGORIES: CategoryMeta[] = [
    { key: 'Idea', slug: 'idea', no: '02', ko: '생각나는', scene: '불이 켜진 열매', frame: '/practice3/o/001.webp', description: '좋은 생각이 떠올랐을 때 적어 두는 곳. 기획, 제품, 그리고 아직 답이 없는 질문들.' },
    { key: 'Trials', slug: 'trials', no: '03', ko: '해본', scene: '땅에 심어 본 것', frame: '/practice3/f/043.webp', description: '그동안 해본 사업과 실험의 기록. 잘된 것보다 배운 것 위주로 씁니다.' },
    { key: 'Personal', slug: 'personal', no: '04', ko: '개인적인', scene: '숲지기의 일기', frame: '/practice3/f/022.webp', description: '개인적으로 하고 싶은 말. 일기에 가깝고, 결론이 없어도 괜찮은 글.' },
    { key: 'Life', slug: 'life', no: '05', ko: '다녀온', scene: '숲 밖으로 나간 산책', frame: '/practice3/c/095.webp', description: '맛집, 카페, 좋은 공간. 다시 가고 싶은 곳들의 메모.' },
]

export function getCategoryMeta(value: string): CategoryMeta | undefined {
    const v = value.toLowerCase()
    return CATEGORIES.find((c) => c.slug === v || c.key.toLowerCase() === v)
}

/* ---------- 실(thread)과 성장 단계 ----------
   같은 thread 값을 가진 글들은 하나의 실로 묶인다: Idea(처음 떠오른 생각) → Trials(해 본 것) → caseStudy(사업이 된 것).
   홈에서 말로 한 "생각이 사업이 된다"를 블로그에서 실제로 따라갈 수 있게 하는 장치다. */

export type Stage = 'seed' | 'sprout' | 'fruit' | 'forest'

export const STAGES: Record<Stage, { ko: string; en: string; note: string }> = {
    seed: { ko: '씨앗', en: 'Seed', note: '아직 생각으로만 있습니다. 이어지는 글이 생기면 여기에 실이 자랍니다.' },
    sprout: { ko: '싹', en: 'Sprout', note: '생각이 다음 글로 이어졌습니다.' },
    fruit: { ko: '열매', en: 'Fruit', note: '실제로 해 봤습니다. 결과보다 배운 것을 남깁니다.' },
    forest: { ko: '숲', en: 'Forest', note: '사업이 되었습니다. 케이스 스터디로 이어집니다.' },
}

/* 실 안에서의 순서: 생각 → 시도 → 그 외. 같은 단계면 오래된 글이 먼저 */
export const THREAD_RANK: Record<Category, number> = { Idea: 0, Trials: 1, Personal: 2, Life: 3 }

/* 실 안에서 각 글이 맡는 역할 이름 */
export const THREAD_ROLE: Record<Category, string> = { Idea: '생각', Trials: '시도', Personal: '곁가지', Life: '산책' }

export interface Post {
    title: string
    slug: string
    date: string
    category: Category
    tags: string[]
    summary: string
    cover?: string
    /* 목록 카드에 실제로 쓰는 이미지 — cover 파일이 있으면 그것, 없으면 주제 장면의 한 프레임 (blog.ts가 채운다) */
    image: string
    place?: string
    /* 같은 실로 묶을 때 쓰는 이름 (frontmatter: thread) */
    thread?: string
    /* 이 실이 사업까지 간 경우, 케이스 스터디 경로 (frontmatter: caseStudy) */
    caseStudy?: string
    draft: boolean
    readingTime: string
    minutes: number
    wordCount: number
    content: string
}

/* 2026·11·02 — DESK식 날짜 표기 */
/* 날짜는 프런트매터에 적힌 YYYY-MM-DD 그대로 쓴다 — 작성 시각(T10:57+09:00)이 붙어도,
   서버 시간대(UTC)가 달라도 하루가 밀리지 않게. 시각은 목록 정렬에만 쓰인다. */
function ymd(date: string) {
    const [y, m, d] = date.slice(0, 10).split('-')
    return { y, m, d }
}

export function deskDate(date: string) {
    const { y, m, d } = ymd(date)
    return `${y}·${m}·${d}`
}

/* 13·01·2025 — 서명 줄에 쓰는 일·월·년 표기 */
export function signDate(date: string) {
    const { y, m, d } = ymd(date)
    return `${d}·${m}·${y}`
}
