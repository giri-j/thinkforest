export const config = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    /* 공유 미리보기(og:image)·사이트맵·RSS에 쓰는 절대 주소. 환경변수가 없으면 빌드(실서버)는 실제 도메인, 개발 서버(next dev)는 localhost */
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'production' ? 'https://thinkforest.kr' : 'http://localhost:3000'),
    adminEmail: process.env.ADMIN_EMAIL || '',
}

export const isConfigured =
    config.supabaseUrl !== '' &&
    config.supabaseAnonKey !== ''
