export const config = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    adminEmail: process.env.ADMIN_EMAIL || '',
}

export const isConfigured =
    config.supabaseUrl !== '' &&
    config.supabaseAnonKey !== ''
