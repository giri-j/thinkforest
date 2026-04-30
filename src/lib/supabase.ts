import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://szjcitwlvndnlechvvwf.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6amNpdHdsdm5kbmxlY2h2dndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0ODQ2NDMsImV4cCI6MjA5MzA2MDY0M30.TBXe-_Q3aK0lQRP7kVgXaFbBhD4K0vY66dmzBLmu-nY'
    )
