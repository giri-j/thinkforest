'use client'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'

/* 본문 스타일은 desk.module.css의 .body 아래 선택자가 맡는다. 여기서는 제목 id만 붙인다. */
const generateId = (children: unknown): string => {
    if (typeof children === 'string') return children.toLowerCase().replace(/[^\w\s-가-힣]/g, '').replace(/\s+/g, '-')
    if (Array.isArray(children)) return children.map(generateId).join('')
    if (children && typeof children === 'object' && 'props' in children) {
        const p = (children as { props?: { children?: unknown } }).props
        if (p?.children) return generateId(p.children)
    }
    return ''
}

type HProps = React.HTMLAttributes<HTMLHeadingElement>
const components = {
    h1: (props: HProps) => <h1 id={generateId(props.children)} {...props} />,
    h2: (props: HProps) => <h2 id={generateId(props.children)} {...props} />,
    h3: (props: HProps) => <h3 id={generateId(props.children)} {...props} />,
}

export default function MDXContent({ content }: { content: string }) {
    const [mdxSource, setMdxSource] = useState<Awaited<ReturnType<typeof serialize>> | null>(null)

    useEffect(() => {
        let alive = true
        serialize(content).then((src) => { if (alive) setMdxSource(src) })
        return () => { alive = false }
    }, [content])

    if (!mdxSource) return (
        <div aria-hidden style={{ opacity: 0.25 }}>
            <p style={{ width: '72%', height: 14, background: 'currentColor', margin: '14px 0' }} />
            <p style={{ width: '100%', height: 14, background: 'currentColor', margin: '14px 0' }} />
            <p style={{ width: '84%', height: 14, background: 'currentColor', margin: '14px 0' }} />
        </div>
    )

    return (
        <div className="mdx-content">
            <MDXRemote {...mdxSource} components={components} />
        </div>
    )
}
