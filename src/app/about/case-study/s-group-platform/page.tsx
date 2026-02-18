'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, CheckCircle2, AlertCircle, Users, Settings, BarChart3, Lightbulb, Building2, ShieldCheck, MessageCircle, Bot, Share2, ArrowRight, Target, Briefcase, Zap } from 'lucide-react'
import Link from 'next/link'

export default function SGroupPlatformCaseStudy() {
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
            <section className="pt-40 pb-20 px-6 md:px-12 bg-[#F8FAFC]">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/5 text-blue-900 rounded-full text-sm font-black tracking-widest uppercase border border-blue-900/10">
                        Enterprise SI / DX Education Platform
                    </div>
                    <h1 className="reveal text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter font-maple leading-tight mb-12">
                        ‘S’그룹 DX 교육 플랫폼 <br />2차 기획 리뉴얼 프로젝트
                    </h1>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-blue-900/10">
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Organization</p>
                            <p className="text-xl font-bold text-brand-dark">S 그룹</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Nature</p>
                            <p className="text-xl font-bold text-brand-dark">대기업 SI</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Role</p>
                            <p className="text-xl font-bold text-brand-dark">PM / 기획 총괄</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Growth</p>
                            <p className="text-xl font-bold text-blue-600">이용자 200% 증가</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-4xl mx-auto space-y-32">

                    {/* 1. Goal */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <Target className="w-8 h-8 text-blue-600" /> 프로젝트의 목적
                        </h2>
                        <div className="p-8 md:p-12 rounded-[3.5rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl md:text-3xl font-medium leading-[1.6] relative z-10">
                                “단순한 기능 보완을 넘어,<br />
                                <span className="text-blue-400 font-black italic underline decoration-4 underline-offset-8">플랫폼의 본질적인 구조를 재설계</span>하는 것”
                            </p>
                            <div className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl relative z-10">
                                1차 개발 이후 기대치에 미치지 못했던 사용성과 완성도를 극복하기 위해, 수기 중심의 운영을 시스템으로 전환하고 양방향 소통이 가능한 개방형 DX 교육 에코시스템을 구축하는 것이 핵심 목표였습니다.
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
                        </div>
                    </div>

                    {/* 2. Problem */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <AlertCircle className="w-8 h-8 text-red-500" /> 문제 정의
                        </h2>
                        <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 italic text-xl text-brand-dark text-center font-bold mb-12">
                            “형태는 플랫폼이었지만, 실제 사용성은 구색에 그친 상태”
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-[2.5rem] bg-secondary/10 border border-border/50">
                                <h3 className="text-xl font-bold text-brand-dark mb-4">폐쇄적 구조 및 비효율</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    임직원 전용 로그인으로 제한되어 외부 확장이 불가능했으며, 대부분의 관리 업무가 시스템이 아닌 수기 방식으로 처리되는 운영 리소스의 낭비가 심각했습니다.
                                </p>
                            </div>
                            <div className="p-10 rounded-[2.5rem] bg-secondary/10 border border-border/50">
                                <h3 className="text-xl font-bold text-brand-dark mb-4">일방향적 경험</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    교육 콘텐츠는 존재했으나 강사와 학생 간의 소통 창구가 부재하여, 실질적인 '참여'와 '학습'이 일어나기 어려운 구조적 설계가 문제였습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. My Role */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <Users className="w-8 h-8 text-blue-600" /> 역할과 접근 방식
                        </h2>
                        <div className="space-y-8">
                            <p className="text-2xl text-secondary-foreground leading-relaxed">
                                SI의 복잡한 이해관계를 조율하는 <span className="text-brand-dark font-black">PM이자 브릿지</span> 역할을 수행했습니다.
                            </p>
                            <div className="p-8 rounded-[3rem] border-2 border-blue-900/10 bg-blue-50/30">
                                <p className="text-lg text-secondary-foreground leading-relaxed">
                                    발주사의 모호한 요구사항을 기술적으로 가능한 범위로 <span className="text-blue-700 font-bold">재정리하고 설계</span>하는 데 집중했습니다.
                                    "새로 만드는 것"보다 중요한 것은 "복잡한 기존 구조를 얼마나 정교하게 재설계하여 요구사항을 흡수할 것인가"였습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Actions */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12 font-maple">
                            <Settings className="w-8 h-8 text-blue-600" /> 핵심 개선 포인트
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-[2rem] bg-white border border-border shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">협업 체계 정립 (Jira/Confluence)</h3>
                                <p className="text-secondary-foreground text-sm leading-relaxed">
                                    기능 구현 이전에 일하는 방식부터 투명하게 공개했습니다. 주 단위 정기 회의와 툴 기반 협업을 도입하여 발주사가 프로젝트 진행 상황을 실시간으로 인지하게 했습니다.
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white border border-border shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">회원 권한 체계 통합 개편</h3>
                                <p className="text-secondary-foreground text-sm leading-relaxed">
                                    폐쇄된 로그인 구조를 개방하여 외부 회원도 수용 가능하도록 아키텍처를 변경했습니다. 정교한 승인 프로세스와 권한 관리 로직을 새로 설계했습니다.
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white border border-border shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">양방향 커뮤니케이션 모듈</h3>
                                <p className="text-secondary-foreground text-sm leading-relaxed">
                                    댓글, 강의 요청, 노하우 공유 등 '소통'을 위한 기능을 전면 배치했습니다. 교육을 '보는 것'에서 '참여하는 것'으로 전환하는 구조적 변화를 꾀했습니다.
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white border border-border shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">지능형 AI 검색 & DX 최적화</h3>
                                <p className="text-secondary-foreground text-sm leading-relaxed">
                                    단순 검색을 넘어 AI 기반 질의응답 기능을 추가하고, 롱폼 영상을 숏폼 다단계 구조로 개선하여 최신 교육 트렌드와 기술적 우위를 동시에 확보했습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. Outcome */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12 font-maple">
                            <BarChart3 className="w-8 h-8 text-blue-600" /> 결과 및 성과
                        </h2>
                        <div className="relative p-12 md:p-20 rounded-[4rem] bg-blue-900 text-white overflow-hidden text-center">
                            <div className="relative z-10 flex flex-col items-center">
                                <Zap className="w-16 h-16 text-yellow-400 mb-6 animate-pulse" />
                                <div className="text-7xl md:text-9xl font-black tracking-tighter mb-4 italic">200%</div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">기존 대비 이용자 수 2배 이상 성장</h3>
                                <div className="w-full max-w-lg h-px bg-white/20 mb-8" />
                                <p className="text-xl font-medium text-blue-200">
                                    아이디어에 그치지 않고 대규모 조직의 요구를 완벽히 수렴하여 <br />
                                    실질적인 리뉴얼 성공 사례를 달성했습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6. Insight */}
                    <div className="reveal pb-20">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <Lightbulb className="w-8 h-8 text-yellow-500" /> 기획자의 인사이트
                        </h2>
                        <div className="p-12 rounded-[3.5rem] bg-[#F8FAFC] border-2 border-dashed border-blue-200">
                            <p className="text-2xl font-black text-brand-dark mb-10 leading-tight">
                                “기획은 설계 능력만큼이나 <br className="hidden md:block" />
                                조율 능력이 중요하다”
                            </p>
                            <div className="space-y-8 text-lg text-secondary-foreground leading-relaxed">
                                <div className="flex gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-600 shrink-0" />
                                    <p>대규모 SI 프로젝트에서 가장 중요한 것은 기능의 나열이 아니라 <strong>'기준을 잃지 않는 소통'</strong>임을 다시 한 번 확인했습니다.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-600 shrink-0" />
                                    <p>PM은 방향을 강제로 정하는 사람이 아닙니다. 발주사가 올바른 결정을 내릴 수 있도록 <strong>현실적인 지표와 구조</strong>를 정리해 주는 조력자입니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Nav */}
            <footer className="py-20 bg-[#F8FAFC] px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <Link href="/about" className="flex items-center gap-2 hover:text-blue-600 transition-colors font-bold text-brand-dark">
                        <ArrowLeft className="w-5 h-5" /> 리스트로 돌아가기
                    </Link>
                    <div className="flex gap-6 items-center">
                        <p className="text-secondary-foreground text-sm font-medium">모든 프로젝트를 확인하셨습니다.</p>
                        <Link href="/contact" className="px-8 py-3 bg-brand-dark text-white rounded-full font-bold hover:bg-primary transition-all shadow-lg active:scale-95">
                            협업 문의하기
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
