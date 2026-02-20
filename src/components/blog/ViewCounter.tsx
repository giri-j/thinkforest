'use client'
import { useEffect } from 'react'

export default function ViewCounter({ slug }: { slug: string }) {
    useEffect(() => {
        // Simple logic to avoid multiple increments in same session
        const viewed = sessionStorage.getItem(`viewed_${slug}`)
        if (!viewed) {
            fetch(`/api/views/${slug}`, { method: 'POST' })
            sessionStorage.setItem(`viewed_${slug}`, 'true')
        }
    }, [slug])

    return null
}
