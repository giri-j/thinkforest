'use client'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import { Lightbulb } from 'lucide-react'

const components = {
    h1: (props: any) => <h1 className="text-3xl font-bold mt-12 mb-6" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mt-10 mb-5 pb-2 border-b border-[#E5EBE8]" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mt-8 mb-4" {...props} />,
    p: (props: any) => <p className="mb-6 leading-[1.8]" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[#1C2E24]/80" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#1C2E24]/80" {...props} />,
    blockquote: (props: any) => {
        const children = props.children?.props?.children || props.children
        const isInsight = typeof children === 'string' && children.includes('Insight')

        if (isInsight) {
            return (
                <div className="my-12 p-10 bg-[#E5EBE8] rounded-2xl relative overflow-visible border-l-4 border-[#E8B86D]">
                    <div className="absolute -top-3.5 left-6 bg-[#E8B86D] text-[#1C2E24] px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5 uppercase">
                        <Lightbulb size={12} />
                        Insight
                    </div>
                    <div className="text-[#1C2E24] font-medium leading-relaxed italic">
                        {props.children}
                    </div>
                </div>
            )
        }
        return <blockquote className="border-l-4 border-[#1C2E24] pl-8 my-10 italic text-[#1C2E24] font-medium" {...props} />
    },
    pre: (props: any) => (
        <pre className="p-8 rounded-xl bg-[#1C2E24] text-[#F6F8F7] overflow-x-auto my-12 text-[13px] leading-relaxed font-mono shadow-2xl" {...props} />
    ),
    code: (props: any) => <code className="bg-[#E5EBE8] px-1.5 py-0.5 rounded text-sm font-semibold text-[#1C2E24]" {...props} />,
}

export default function MDXContent({ content }: { content: string }) {
    const [mdxSource, setMdxSource] = useState<any>(null)

    useEffect(() => {
        const prepareMDX = async () => {
            const source = await serialize(content)
            setMdxSource(source)
        }
        prepareMDX()
    }, [content])

    if (!mdxSource) return <div className="animate-pulse space-y-4 pt-10">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>

    return (
        <div className="mdx-content">
            <MDXRemote {...mdxSource} components={components} />
        </div>
    )
}
