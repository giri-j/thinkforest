'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Footer() {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <footer className="bg-white border-t border-border mt-auto">
            {/* Toggle Button Area */}
            <div 
                className="py-4 px-6 md:px-12 flex justify-center border-b border-border hover:bg-[#F6F8F7] cursor-pointer transition-colors group"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1C2E24]/30 group-hover:text-[#1C2E24] transition-all">
                    <span className="font-maple">{isExpanded ? 'Close Info' : 'More Information'}</span>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ChevronUp size={14} />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-[#FDFCF8]"
                    >
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 py-20 px-6 md:px-12 border-b border-border">
                            <div className="col-span-1 md:col-span-2">
                                <Link href="/" className="flex items-center gap-3 text-2xl font-bold tracking-tighter text-brand-dark font-somi">
                                    <Image src="/favicon.svg" alt="Logo" width={32} height={32} />
                                    <div>기획의 숲</div>
                                </Link>
                                <p className="mt-6 text-secondary-foreground max-w-sm leading-relaxed text-sm md:text-base">
                                    생각이 뿌리 내리고 가치가 자라나는 공간.
                                    단순함 속에 깊이를 담는 기획을 지향합니다.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#355BE5] mb-8">Explore</h4>
                                <ul className="space-y-4 text-sm text-secondary-foreground font-medium">
                                    <li><Link href="/blog" className="hover:text-[#355BE5] transition-all hover:translate-x-1 inline-block">Blog</Link></li>
                                    <li><Link href="/about" className="hover:text-[#355BE5] transition-all hover:translate-x-1 inline-block">About</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#355BE5] mb-8">Contact</h4>
                                <ul className="space-y-4 text-sm text-secondary-foreground font-medium">
                                    <li><a href="mailto:jek5797@naver.com" className="hover:text-[#355BE5] transition-all hover:translate-x-1 inline-block">Email</a></li>
                                    <li><a href="https://www.youtube.com/@iamgil_Official" target="_blank" rel="noopener noreferrer" className="hover:text-[#355BE5] transition-all hover:translate-x-1 inline-block">Youtube</a></li>
                                    <li><a href="https://www.instagram.com/gianteunkil/" target="_blank" rel="noopener noreferrer" className="hover:text-[#355BE5] transition-all hover:translate-x-1 inline-block">Instagram</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Copyright Section (Inside Collapsible) */}
                        <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50">
                            <p className="text-[10px] font-bold text-[#1C2E24] uppercase tracking-widest">© 2026 Think Forest. All rights reserved.</p>
                            <p className="text-[10px] font-bold text-[#1C2E24] uppercase tracking-widest">Designed with intent for growth.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    )
}
