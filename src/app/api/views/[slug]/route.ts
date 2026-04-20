import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params
    const supabase = createClient()

    const { data, error } = await supabase
        .from('post_views')
        .select('count')
        .eq('slug', slug)
        .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows found'
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ count: data?.count || 0 })
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params
    const supabase = createClient()

    // RPC or upsert
    const { data, error } = await supabase.rpc('increment_post_view', { post_slug: slug })

    if (error) {
        // Fallback to manual upsert if RPC doesn't exist
        const { data: current, error: getError } = await supabase
            .from('post_views')
            .select('count')
            .eq('slug', slug)
            .single()

        if (getError && getError.code !== 'PGRST116') {
            return NextResponse.json({ error: getError.message }, { status: 500 })
        }

        const newCount = (current?.count || 0) + 1
        const { error: upsertError } = await supabase
            .from('post_views')
            .upsert({ slug, count: newCount })

        if (upsertError) {
            return NextResponse.json({ error: upsertError.message }, { status: 500 })
        }

        return NextResponse.json({ count: newCount })
    }

    return NextResponse.json({ count: data })
}
