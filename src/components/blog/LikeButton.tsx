'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
    initialLikes: number
    isLiked?: boolean
    onToggle: () => void
}

export default function LikeButton({ initialLikes, isLiked, onToggle }: LikeButtonProps) {
    const [liked, setLiked] = useState(isLiked)
    const [count, setCount] = useState(initialLikes)

    const handleToggle = () => {
        setLiked(!liked)
        setCount(prev => liked ? prev - 1 : prev + 1)
        onToggle()
    }

    return (
        <button
            onClick={handleToggle}
            className={cn(
                "group flex items-center gap-2 px-6 py-3 rounded-full border transition-all active:scale-95",
                liked ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white border-border text-secondary-foreground hover:border-rose-200 hover:text-rose-400"
            )}
        >
            <Heart className={cn("transition-transform group-hover:scale-110", liked && "fill-current")} size={20} />
            <span className="font-bold">{count}</span>
        </button>
    )
}
