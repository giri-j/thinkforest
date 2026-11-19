import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

/* Supabase 무료 플랜은 활동이 없으면 프로젝트를 일시정지한다.
   Vercel Cron이 매일 이 주소를 불러 가벼운 조회를 한 번 보내, 방명록·조회수 DB가 잠들지 않게 한다. */
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    // CRON_SECRET을 설정해두면 Vercel Cron 외의 호출은 막는다 (Vercel이 Bearer 토큰을 자동으로 붙여 보냄)
    const secret = process.env.CRON_SECRET
    if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
        return NextResponse.json({ ok: false }, { status: 401 })
    }

    const supabase = createClient()
    const { error } = await supabase.from('guestbook').select('id', { count: 'exact', head: true })

    if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true, at: new Date().toISOString() })
}
