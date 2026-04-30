'use client'

import { useEffect, useState } from 'react'

interface Heading {
    id: string
    text: string
    level: number
}

export default function TableOfContents({ content }: { content: string }) {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        // Parse headings from markdown
        const headingLines = content
            .split('\n')
            .filter((line) => line.match(/^#{2,3}\s/))
            .map((line) => {
                const level = line.split('#').length - 1
                const text = line.replace(/^#{2,3}\s/, '')
                // Note: This logic for ID should match how MDX serializes IDs
                // For simplicity, we'll assume standard slugification
                const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-가-힣]/g, '')
                    .replace(/\s+/g, '-')

                return { id, text, level }
            })

        setHeadings(headingLines)
    }, [content])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-10% 0% -80% 0%' }
        )

        const elements = document.querySelectorAll('h2, h3')
        elements.forEach((elem) => observer.observe(elem))

        return () => observer.disconnect()
    }, [headings])

    if (headings.length === 0) return null

    return (
        <nav className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#1C2E24]/20 px-2 pb-2 border-b border-[#E5EBE8]">Contents</p>
            <div className="space-y-1">
                {headings.map((heading, index) => (
                    <a
                        key={`${heading.id}-${index}`}
                        href={`#${heading.id}`}
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className={`block py-1.5 px-3 text-[11px] font-bold uppercase tracking-tight transition-all border-l-2 ${activeId === heading.id
                                ? 'text-[#355BE5] border-[#355BE5] bg-[#E5EBE8]/50 translate-x-1'
                                : 'text-[#1C2E24]/30 border-transparent hover:text-[#1C2E24] hover:bg-[#E5EBE8]/20'
                            } ${heading.level === 3 ? 'ml-4' : ''}`}
                    >
                        {heading.text}
                    </a>
                ))}
            </div>
        </nav>
    )
}
