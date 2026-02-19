'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Instagram, Mail, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ContactPage() {
    const [animStep, setAnimStep] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectIdea: '',
        message: ''
    })

    useEffect(() => {
        // Step 1: 나무 페이드 인
        const timer1 = setTimeout(() => setAnimStep(1), 100)
        // Step 2: 너구리 "슬라이딩 + 투명도 0->1" 시작
        const timer2 = setTimeout(() => setAnimStep(2), 1200)
        // Step 3: 글자 및 폼 및 너구리 숨쉬기 시작 (2배 빠른 타이밍)
        const timer3 = setTimeout(() => setAnimStep(3), 2200)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('감사합니다! 곧 연락드리겠습니다.')
    }

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-black">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 select-none">
                {/* 1. Video Background */}
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="/contact_img/milkywaybg.mp4" type="video/mp4" />
                </video>

                {/* 2. World Tree Image */}
                <div className={cn(
                    "absolute bottom-[-10%] left-[-15%] w-[175%] max-w-[1485px] aspect-square transition-opacity duration-1000",
                    animStep >= 1 ? "opacity-100" : "opacity-0"
                )}>
                    <Image
                        src="/contact_img/worldtree.png"
                        alt="World Tree"
                        fill
                        priority
                        className="object-contain object-bottom"
                    />

                    {/* 3. Raccoon: 수직 이동 + 서서히 페이드 인 */}
                    <div
                        className="absolute left-[39%] top-[66%] -translate-x-1/2 w-[15%] aspect-square pointer-events-none"
                    >
                        <div
                            className="w-full h-full transition-all duration-[2500ms] ease-out"
                            style={{
                                opacity: animStep >= 2 ? 1 : 0,
                                transform: animStep >= 2 ? 'translateY(0) scale(1)' : 'translateY(-250px) scale(0.9)',
                            }}
                        >
                            <div className={cn("relative w-full h-full", animStep >= 3 && "animate-pulse-subtle")}>
                                <Image
                                    src="/contact_img/raccoon-sit.png"
                                    alt="Sitting Raccoon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Overlay */}
            <div
                className={cn(
                    "relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 lg:gap-24 transition-[opacity,transform] duration-[600ms] ease-out",
                    animStep >= 3
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none"
                )}
                style={{ willChange: 'opacity, transform' }}
            >
                {/* Left Side: Info */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-20">
                    <span className="text-warm font-black uppercase tracking-[0.3em] text-[10px] mb-6 drop-shadow-md">
                        Think Forest
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-[1.2] drop-shadow-lg whitespace-nowrap">
                        무엇이든 제안해주세요.
                    </h1>
                    <p className="text-gray-300/80 text-sm md:text-base italic mb-12 max-w-lg leading-relaxed drop-shadow-md">
                        Where ideas take root and creativity blooms in the quiet<br className="hidden md:block" />
                        spaces between thought and action.
                    </p>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-warm to-[#D4A358] bg-clip-text text-transparent mb-2 font-somi">기획자 기리</span>
                            <a href="https://www.instagram.com/gianteunkil/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-white/50 hover:text-white transition-all text-lg font-medium">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                                    <Instagram size={20} />
                                </div>
                                Instagram
                            </a>
                            <a href="https://www.youtube.com/@iamgil_Official" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-white/50 hover:text-white transition-all text-lg font-medium">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF0000] group-hover:border-[#FF0000] transition-all duration-300">
                                    <Youtube size={20} />
                                </div>
                                Youtube
                            </a>
                            <a href="mailto:jek5797@naver.com" className="group flex items-center gap-4 text-white/50 hover:text-white transition-all text-lg font-medium">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-warm group-hover:border-warm transition-all duration-300">
                                    <Mail size={20} />
                                </div>
                                Email
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side: Glassmorphism Form Card */}
                <div className="w-full max-w-xl bg-[#1C2E24]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="name" className="text-[10px] font-black text-warm uppercase tracking-[0.2em] ml-1">Name</label>
                            <input type="text" id="name" placeholder="이름을 입력해주세요" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-warm/50 transition-all font-medium" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="text-[10px] font-black text-warm uppercase tracking-[0.2em] ml-1">Email</label>
                            <input type="email" id="email" placeholder="your@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-warm/50 transition-all font-medium" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="projectIdea" className="text-[10px] font-black text-warm uppercase tracking-[0.2em] ml-1">Project Idea</label>
                            <input type="text" id="projectIdea" placeholder="어떤 내용에 대한 제안인가요?" required value={formData.projectIdea} onChange={(e) => setFormData({ ...formData, projectIdea: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-warm/50 transition-all font-medium" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="message" className="text-[10px] font-black text-warm uppercase tracking-[0.2em] ml-1">Message</label>
                            <textarea id="message" rows={5} placeholder="제안 내용을 자세히 들려주세요." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-warm/50 transition-all resize-none font-medium leading-relaxed" />
                        </div>
                        <button type="submit" className="mt-6 w-full bg-warm hover:bg-[#D4A358] text-[#1C2E24] font-black py-5 rounded-2xl shadow-[0_20px_40px_rgba(232,184,109,0.2)] hover:shadow-[0_25px_50px_rgba(232,184,109,0.3)] transition-all active:scale-[0.98] text-lg uppercase tracking-widest">
                            Submit Proposal
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
