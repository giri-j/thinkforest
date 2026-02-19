'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, CheckCircle2, AlertCircle, Users, Settings, BarChart3, Lightbulb, MessageSquare, Layers, ShieldCheck, Zap, ArrowRight, Target, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function MessagePlatformCaseStudy() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.reveal', {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 pointer-events-none">
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-border rounded-full text-brand-dark font-bold hover:bg-primary hover:text-white transition-all pointer-events-auto shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> 리스트로 돌아가기
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 md:px-12 bg-[#F1F5F9]">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/5 text-slate-900 rounded-full text-sm font-black tracking-widest uppercase">
                        B2B Platform / Complexity Management
                    </div>
                    <h1 className="reveal text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter leading-tight mb-12">
                        통합 메시징 플랫폼 <br />구조 및 정책 기획
                    </h1>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-900/10">
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Service</p>
                            <p className="text-xl font-bold text-brand-dark">B2B Messaging</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Nature</p>
                            <p className="text-xl font-bold text-brand-dark">플랫폼 통합</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Role</p>
                            <p className="text-xl font-bold text-brand-dark">핵심 정책 기획</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Focus</p>
                            <p className="text-xl font-bold text-primary">복잡성 해소</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-4xl mx-auto space-y-32">

                    {/* 1. Goal */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Target className="w-8 h-8 text-slate-700" /> 프로젝트의 목적
                        </h2>
                        <div className="p-8 md:p-12 rounded-[3.5rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl md:text-3xl font-medium leading-[1.6] relative z-10">
                                “파편화된 메시징 시장의 혼란을 정리하고,<br />
                                <span className="text-warm font-bold italic underline decoration-4 underline-offset-8">통합된 운영 기준</span>을 제공하는 것”
                            </p>
                            <div className="mt-8 text-white/60 text-lg leading-relaxed max-w-2xl relative z-10">
                                문자, 카카오(알림톡/친구톡), 네이버 알림 등 채널마다 다른 계약, 정책, 관리 화면으로 인한
                                기업의 '운영 지옥'을 해결하기 위해 이 모든 복잡성을 하나의 시스템으로 흡수하는 플랫폼을 설계했습니다.
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-warm/10 rounded-full blur-[100px]" />
                        </div>
                    </div>

                    {/* 2. Problem */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <AlertCircle className="w-8 h-8 text-red-500" /> 문제 정의
                        </h2>
                        <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 italic text-xl text-brand-dark text-center font-bold mb-12">
                            “메시지를 보내는 일은 단순하지만, <br className="md:hidden" /> 메시지 서비스를 운영하는 일은 매우 복잡하다.”
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-[2.5rem] bg-secondary/10 border border-border/50">
                                <p className="text-xs font-black text-secondary-foreground mb-4 uppercase tracking-[0.2em]">Customer side</p>
                                <h3 className="text-xl font-bold text-brand-dark mb-4">선택의 과부하</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    어떤 메시지를 어떤 채널로, 언제 보내야 가장 효율적인지 판단하기 어려운 파편화된 서비스 구조
                                </p>
                            </div>
                            <div className="p-10 rounded-[2.5rem] bg-secondary/10 border border-border/50">
                                <p className="text-xs font-black text-secondary-foreground mb-4 uppercase tracking-[0.2em]">Operator side</p>
                                <h3 className="text-xl font-bold text-brand-dark mb-4">관리 프로세스의 폭발</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    채널별로 상이한 승인 정책, 과금 구조, 장애 대응 체계를 제각각 관리해야 하는 운영 리소스 낭비
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. My Role */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Users className="w-8 h-8 text-slate-700" /> 기술 번역가의 시점
                        </h2>
                        <div className="space-y-8">
                            <p className="text-2xl text-secondary-foreground leading-relaxed">
                                단순 기획을 넘어 <span className="text-brand-dark font-black">기술·정책·운영을 사용자 언어로 번역</span>하는 역할을 수행했습니다.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                                    <h4 className="font-black text-slate-400 mb-2">Policy Align</h4>
                                    <p className="text-sm font-bold text-brand-dark leading-snug">채널별 상이한 정책을 고객 중심으로 재분류</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                                    <h4 className="font-black text-slate-400 mb-2">Common Structure</h4>
                                    <p className="text-sm font-bold text-brand-dark leading-snug">운영/CS/개발이 공유하는 통합 기준 확립</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                                    <h4 className="font-black text-slate-400 mb-2">UI Simplification</h4>
                                    <p className="text-sm font-bold text-brand-dark leading-snug">복잡한 로직을 단순한 발송 화면으로 추상화</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Actions */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <Settings className="w-8 h-8 text-slate-700" /> 핵심 개선 포인트
                        </h2>
                        <div className="space-y-4">
                            <div className="group p-8 rounded-[2.5rem] border border-border hover:border-primary transition-all bg-white hover:shadow-xl">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-brand-dark font-black group-hover:bg-primary group-hover:text-white transition-colors">01</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-brand-dark mb-3">통합 발송 프로세스 설계</h3>
                                        <p className="text-secondary-foreground leading-relaxed">
                                            채널별 인터페이스 차이를 무시하고 고객이 "생각 안 해도 되게" 만드는 단일 발송 로직 구축.
                                            판단이 필요한 영역을 시스템이 대신 처리하도록 설계했습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group p-8 rounded-[2.5rem] border border-border hover:border-primary transition-all bg-white hover:shadow-xl">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-brand-dark font-black group-hover:bg-primary group-hover:text-white transition-colors">02</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-brand-dark mb-3">승인·과금·로그 구조의 단일화</h3>
                                        <p className="text-secondary-foreground leading-relaxed">
                                            각기 노는 데이터를 하나의 기준으로 묶었습니다. 채널에 상관없이 통합된 기준으로 정산하고
                                            이력을 추적할 수 있는 백엔드 정책 구조를 완성했습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Outcome */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <BarChart3 className="w-8 h-8 text-slate-700" /> 결과 및 성과
                        </h2>
                        <div className="p-12 rounded-[3.5rem] bg-brand-dark text-white text-center relative overflow-hidden">
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <div className="text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Scalability</div>
                                    <div className="text-6xl font-black text-warm mb-4 tracking-tighter italic">Large-scale</div>
                                    <p className="text-lg font-bold">월 수천만 건 이상의 발송량</p>
                                    <p className="text-sm text-white/40 mt-1">대규모 데이터 처리의 안정성 확보</p>
                                </div>
                                <div>
                                    <div className="text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Efficiency</div>
                                    <div className="text-6xl font-black text-white mb-4 tracking-tighter italic">Stability</div>
                                    <p className="text-lg font-bold">내부 CS 및 운영 부담 급감</p>
                                    <p className="text-sm text-white/40 mt-1">플랫폼 통합으로 인한 휴먼 에러 제로화</p>
                                </div>
                            </div>
                            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                                <p className="text-gray-400 italic font-medium leading-relaxed">
                                    "메시지 플랫폼은 조용히 잘 돌아가는 것 자체가 가장 큰 성과입니다. <br />
                                    통합 관리의 편리함은 기업의 고객 경험 향상으로 이어졌습니다."
                                </p>
                            </div>
                            <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-500/10 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* 6. Insight */}
                    <div className="reveal pb-20">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Lightbulb className="w-8 h-8 text-yellow-500" /> 기획자의 인사이트
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-12 rounded-[3rem] bg-[#F8FAFC] border-t-8 border-slate-900 shadow-sm">
                                <h3 className="text-2xl font-black text-brand-dark mb-6 leading-tight">
                                    “복잡한 기술일수록 <br />기획은 더 단순해야 한다”
                                </h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    사용자를 똑똑하게 만들려고 하기보다, 시스템이 대신 생각하게 하는 것이 진정한 플랫폼 기획의 가치임을 깨달았습니다.
                                </p>
                            </div>
                            <div className="p-12 rounded-[3rem] bg-[#F8FAFC] border-t-8 border-slate-900 shadow-sm">
                                <h3 className="text-2xl font-black text-brand-dark mb-6 leading-tight">
                                    “통합은 기준을 <br />제시하는 일이다”
                                </h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    단순히 기술을 묶는 것이 아니라, 산업계의 흩어진 흐름을 하나의 질서로 재정의하는 즐거움을 경험했습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Nav */}
            <footer className="py-20 bg-[#F1F5F9] px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/about" className="flex items-center gap-2 hover:text-primary transition-colors font-bold text-brand-dark">
                        <ArrowLeft className="w-5 h-5" /> 리스트로 돌아가기
                    </Link>
                    <div className="flex gap-4 items-center">
                        <span className="text-gray-400 text-sm hidden md:block">Next Project</span>
                        <Link href="/about/case-study/s-group-platform" className="font-bold hover:text-primary transition-colors flex items-center gap-2 text-brand-dark">
                            'S'그룹 교육 플랫폼 기획 <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
