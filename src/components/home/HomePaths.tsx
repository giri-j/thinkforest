'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const PATHS = [
    {
        title: 'Planning',
        description: '복잡함 속에서 본질을 찾는 기록',
        path: '/blog/category/Planning'
    },
    {
        title: 'Reverse Engineering',
        description: '서비스의 구조를 해부하다',
        path: '/blog/category/Reverse Engineering'
    },
    {
        title: 'Journey',
        description: '경험이 기획이 되는 순간',
        path: '/blog/category/Journey'
    },
    {
        title: 'Cutlet Lab',
        description: '일상의 구조를 탐구하다',
        path: '/blog/category/Cutlet Lab'
    }
]

export default function HomePaths() {
    return (
        <section className="pt-40 pb-32 px-6 md:px-12 bg-[#F6F8F7]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-32">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#1C2E24] mb-6 font-maple tracking-tight">
                        “제가 관심을 가지고 있는 것들이에요.”
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                    {PATHS.map((path) => (
                        <Link href={path.path} key={path.title} className="group">
                            <motion.div
                                className="pb-8 border-b border-[#E5EBE8] relative"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-[#1C2E24] font-maple">
                                        {path.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-[#1C2E24]/60 font-medium">
                                        {path.description}
                                    </p>
                                </div>
                                {/* Underline animation */}
                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#355BE5] group-hover:w-full transition-all duration-500 ease-in-out" />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
