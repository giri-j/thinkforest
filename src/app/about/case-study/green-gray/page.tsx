'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, CheckCircle2, AlertCircle, Users, Settings, BarChart3, Lightbulb, Coins, Presentation, ArrowRight, Target, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function GreenGrayIRCaseStudy() {
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
            <section className="pt-40 pb-20 px-6 md:px-12 bg-[#FFF9F0]">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 text-orange-600 rounded-full text-sm font-black tracking-widest uppercase">
                        Start-up IR / Funding
                    </div>
                    <h1 className="reveal text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter leading-tight mb-12">
                        그린앤그레이 IR <br />투자 유치 프로젝트 (50억)
                    </h1>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-orange-500/10">
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Organization</p>
                            <p className="text-xl font-bold text-brand-dark">그린앤그레이</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Nature</p>
                            <p className="text-xl font-bold text-brand-dark">투자 유치 / IR</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Role</p>
                            <p className="text-xl font-bold text-brand-dark">IR 총괄 기획</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Impact</p>
                            <p className="text-xl font-bold text-orange-600">50억 유치 성공</p>
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
                            <Target className="w-8 h-8 text-orange-500" /> 프로젝트의 목적
                        </h2>
                        <div className="p-8 md:p-12 rounded-[3.5rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl md:text-4xl font-medium leading-[1.4] relative z-10">
                                “스타트업의 생존을 넘어,<br />
                                <span className="text-orange-400 font-black italic underline decoration-4 underline-offset-8">다음 도약을 위한 탄약</span>을 확보하는 것”
                            </p>
                            <div className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl relative z-10">
                                그린앤그레이의 비전과 기술력이 시장에서 신뢰받을 수 있도록 최적의 투자 스토리를 설계하여,
                                실제 투자 유치에 성공하는 것이 본 프로젝트의 단일한 목적이었습니다.
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />
                        </div>
                    </div>

                    {/* 2. Problem */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <AlertCircle className="w-8 h-8 text-red-500" /> 문제 정의
                        </h2>
                        <div className="space-y-6">
                            <div className="p-8 rounded-[2.5rem] bg-red-50 border border-red-100 italic text-xl text-brand-dark text-center font-bold">
                                “지금의 실적이 아니라, 미래의 가능성으로 설득해야 하는 상황”
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-3xl bg-secondary/10 border border-border/50">
                                    <p className="text-sm font-bold text-secondary-foreground mb-4 uppercase">Status</p>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        안정적인 매출이 아직 발생하지 않는 상태에서 <strong>비즈니스 모델</strong>과 <strong>기술 비전</strong>만으로 투자자를 납득시켜야 함.
                                    </p>
                                </div>
                                <div className="p-8 rounded-3xl bg-secondary/10 border border-border/50">
                                    <p className="text-sm font-bold text-secondary-foreground mb-4 uppercase">Challenge</p>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        COO, CTO, CFO 각 영역의 파편화된 논리를 제3자인 투자자가 이해할 수 있는 <strong>하나의 일관된 스토리</strong>로 연결해야 함.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. My Role */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Users className="w-8 h-8 text-orange-500" /> 역할과 접근 방식
                        </h2>
                        <div className="space-y-8">
                            <p className="text-2xl text-secondary-foreground leading-relaxed">
                                IR 자료(PPT)의 <span className="text-brand-dark font-black">메인 기획자</span>로서 전체 자료의 90% 이상을 직접 구성하고 작성했습니다.
                            </p>
                            <div className="p-10 rounded-[3rem] border-2 border-orange-500/10 bg-orange-50 relative">
                                <blockquote className="text-xl font-bold text-brand-dark leading-relaxed mb-6">
                                    "단순히 자료를 '정리'하는 것이 아니라, <br className="hidden md:block" />
                                    기술과 비전, 그리고 숫자를 하나의 흐름으로 설계했습니다."
                                </blockquote>
                                <div className="flex gap-4">
                                    <span className="px-4 py-1.5 bg-white rounded-full text-xs font-black text-orange-600 border border-orange-100">STORY DESIGNER</span>
                                    <span className="px-4 py-1.5 bg-white rounded-full text-xs font-black text-orange-600 border border-orange-100">LOGIC ARCHITECT</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Actions */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <Settings className="w-8 h-8 text-orange-500" /> 핵심 개선 포인트
                        </h2>
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-[2rem] bg-white border border-border hover:border-orange-500 transition-colors shadow-sm group">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-dark mb-3">통합 서사 구조 설계</h3>
                                    <p className="text-secondary-foreground text-sm leading-relaxed">
                                        COO의 사업 방향, CTO의 기술력, CFO의 재무 계획을 투자자가 숨 가쁘지 않게 따라올 수 있는 논리적 흐름으로 재배치했습니다.
                                    </p>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-white border border-border hover:border-orange-500 transition-colors shadow-sm group">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                        <Presentation className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-dark mb-3">시각적 스토리텔링 전환</h3>
                                    <p className="text-secondary-foreground text-sm leading-relaxed">
                                        장황한 텍스트 대신 '이해되는 도식'과 '구조화된 그래프'를 활용. "읽는 자료"가 아닌 "직관적으로 느껴지는 자료"로 설계했습니다.
                                    </p>
                                </div>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-brand-dark text-white">
                                <div className="flex items-center gap-4 mb-4">
                                    <CheckCircle2 className="text-warm w-6 h-6" />
                                    <h3 className="text-xl font-bold">흔들리지 않는 기준점 유지</h3>
                                </div>
                                <p className="text-white/60 leading-relaxed md:pl-10">
                                    내부 이해당사자들의 의견이 계속 더해지는 상황에서도, "이 자료가 설득해야 할 최종 대상(투자자)의 시선"을 기준으로 끊임없이 조율하고 품질을 관리했습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. Outcome */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <BarChart3 className="w-8 h-8 text-orange-500" /> 결과 및 성과
                        </h2>
                        <div className="relative p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-orange-500 to-orange-700 text-white overflow-hidden text-center">
                            <div className="relative z-10">
                                <Coins className="w-16 h-16 mx-auto mb-6 text-orange-200" />
                                <p className="text-xl font-black uppercase tracking-widest mb-4 opacity-80 underline decoration-2 underline-offset-8">Series Success</p>
                                <div className="text-7xl md:text-9xl font-black tracking-tighter mb-8">
                                    50억 원
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight leading-snug">
                                    ‘N’사로부터 투자 유치 성공
                                </h3>
                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <span className="px-6 py-2 bg-black/20 rounded-full font-bold text-sm">#스타트업 재정 안정성 확보</span>
                                    <span className="px-6 py-2 bg-black/20 rounded-full font-bold text-sm">#중장기 사업 선택지 확보</span>
                                </div>
                            </div>
                            {/* Abs decoration */}
                            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                        </div>
                    </div>

                    {/* 6. Insight */}
                    <div className="reveal pb-20">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Lightbulb className="w-8 h-8 text-yellow-500" /> 기획자의 인사이트
                        </h2>
                        <div className="p-12 rounded-[3.5rem] bg-[#F8F9FA] border-2 border-dashed border-orange-200">
                            <p className="text-2xl font-black text-brand-dark mb-10 leading-tight">
                                “기획은 내부를 정리하는 일이자,<br className="hidden md:block" />
                                외부를 설득하는 언어를 만드는 일”
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-orange-500 shrink-0" />
                                    <p className="text-lg text-secondary-foreground leading-relaxed">
                                        <strong>IR은 자료 제작이 아니라 설득 구조의 설계다:</strong> 기술, 비전, 숫자 중 어느 하나만으로는 투자를 이끌 수 없음을 확인했습니다.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-orange-500 shrink-0" />
                                    <p className="text-lg text-secondary-foreground leading-relaxed">
                                        <strong>통합자의 언어:</strong> 기획자의 역할은 각 영역의 날것의 언어를 하나의 울림 있는 이야기로 통합하는 것임을 다시금 깨달았습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Nav */}
            <footer className="py-20 bg-brand-dark text-white px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/about" className="flex items-center gap-2 hover:text-orange-400 transition-colors font-bold">
                        <ArrowLeft className="w-5 h-5" /> 리스트로 돌아가기
                    </Link>
                    <div className="flex gap-4 items-center">
                        <span className="text-gray-500 text-sm hidden md:block">Next Project</span>
                        <Link href="/about/case-study/cellook-backoffice" className="font-bold hover:text-orange-400 transition-colors flex items-center gap-2">
                            셀룩 백오피스 기칙 <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
