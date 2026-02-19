'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, CheckCircle2, AlertCircle, Users, Settings, BarChart3, Lightbulb, Link2, Palette, ShoppingBag, Zap, ArrowRight, Target, Gem } from 'lucide-react'
import Link from 'next/link'

export default function RebindCaseStudy() {
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
            <section className="pt-40 pb-20 px-6 md:px-12 bg-[#F8F5FF]">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-[#6366F1]/10 text-[#6366F1] rounded-full text-sm font-black tracking-widest uppercase">
                        MVP / Revenue Validation
                    </div>
                    <h1 className="reveal text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter leading-tight mb-12">
                        리바인드(Re:bind) <br />서비스 기획 프로젝트
                    </h1>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-[#6366F1]/10">
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Organization</p>
                            <p className="text-xl font-bold text-brand-dark">리바인드</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Project</p>
                            <p className="text-xl font-bold text-brand-dark">멀티링크 서비스</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Role</p>
                            <p className="text-xl font-bold text-brand-dark">기획 총괄</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Speed</p>
                            <p className="text-xl font-bold text-[#6366F1]">2개월 내 유료화</p>
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
                            <Target className="w-8 h-8 text-[#6366F1]" /> 프로젝트의 목적
                        </h2>
                        <div className="p-8 md:p-12 rounded-[3.5rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl md:text-3xl font-medium leading-[1.6] relative z-10">
                                “아이디어 검증을 넘어,<br />
                                <span className="text-[#818CF8] font-black italic underline decoration-4 underline-offset-8">실제 현금 흐름</span>을 증명하는 것”
                            </p>
                            <div className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl relative z-10">
                                초기 스타트업 팀으로서 비즈니스 실행력을 보여주기 위해, 2개월 내에 기획부터 유료 과금까지
                                안정적으로 연결되는 멀티링크 서비스를 시장에 출시하는 것이 핵심 목표였습니다.
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#6366F1]/20 rounded-full blur-[100px]" />
                        </div>
                    </div>

                    {/* 2. Problem */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <AlertCircle className="w-8 h-8 text-red-500" /> 문제 정의
                        </h2>
                        <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 italic text-xl text-brand-dark text-center font-bold mb-8">
                            “늦게 들어온 시장에서 왜 우리여야 하는가?”
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                <p className="text-sm font-bold text-secondary-foreground mb-4 uppercase">Zero Base</p>
                                <h3 className="text-xl font-bold text-brand-dark mb-4">도메인 지식 부재</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    팀원 모두가 멀티링크 서비스에 대한 배경지식이 없는 상태로 투입되어 빠른 학습과 역기획이 필수적인 상황
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                <p className="text-sm font-bold text-secondary-foreground mb-4 uppercase">Heavy Competition</p>
                                <h3 className="text-xl font-bold text-brand-dark mb-4">강력한 선발 주자</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    인포크링크, 리틀리, 링크트리 등 이미 시장을 선점한 거대 경쟁사들과의 차별화 포인트를 발견해야 함
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. My Role */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Users className="w-8 h-8 text-[#6366F1]" /> 역할과 접근 방식
                        </h2>
                        <div className="space-y-8">
                            <p className="text-2xl text-secondary-foreground leading-relaxed">
                                단순 복제가 아닌 <span className="text-brand-dark font-black">역기획을 통한 합리적 포지셔닝</span>을 설계했습니다.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="p-8 rounded-[2rem] border-2 border-[#6366F1]/10 bg-[#6366F1]/5">
                                    <h4 className="font-black text-[#6366F1] mb-2 uppercase tracking-tighter">Competitor Review</h4>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        주요 경쟁 서비스들을 직접 유료 구독하며 모든 기능을 리스트업하고, 부족한 지점과 차별화 지점을 데이터화했습니다.
                                    </p>
                                </div>
                                <div className="p-8 rounded-[2rem] border-2 border-[#6366F1]/10 bg-[#6366F1]/5">
                                    <h4 className="font-black text-[#6366F1] mb-2 uppercase tracking-tighter">Value Proposition</h4>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        <strong>“기능은 더 많은데, 요금은 더 합리적인 서비스”</strong>라는 명확한 기준을 세워 기획의 나침반으로 삼았습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Actions */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <Settings className="w-8 h-8 text-[#6366F1]" /> 핵심 개선 포인트
                        </h2>
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center group-hover:bg-[#6366F1] group-hover:text-white transition-all shadow-sm">
                                    <Palette className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">극강의 ‘꾸미기 자유도’ 설계</h3>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        사용자가 개성을 가장 잘 표현할 수 있도록 색상, 버튼 스타일, 레이아웃 등 커스터마이징 범위를 경쟁사 대비 최대치로 확장하여 감성적인 만족도를 높였습니다.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center group-hover:bg-[#6366F1] group-hover:text-white transition-all shadow-sm">
                                    <ShoppingBag className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">쇼핑몰 친화형 특화 기능</h3>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        단순 링크 나열을 넘어 쇼핑몰 운영자가 상품을 홍보하고 구매 전환까지 자연스럽게 유도할 수 있는 전용 레이아웃과 브릿지 페이지 로직을 추가했습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Outcome */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <BarChart3 className="w-8 h-8 text-[#6366F1]" /> 결과 및 성과
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-[2.5rem] bg-white border border-border shadow-sm text-center group hover:border-[#6366F1] transition-all">
                                <div className="text-[#6366F1] font-black text-sm mb-4 uppercase tracking-widest">Speed</div>
                                <div className="text-5xl font-black text-brand-dark mb-2 tracking-tighter">2 Mo</div>
                                <p className="text-secondary-foreground text-sm">기획부터 유료화까지</p>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-white border border-border shadow-sm text-center group hover:border-[#6366F1] transition-all">
                                <div className="text-[#6366F1] font-black text-sm mb-4 uppercase tracking-widest">Scaling</div>
                                <div className="text-5xl font-black text-brand-dark mb-2 tracking-tighter">500+</div>
                                <p className="text-secondary-foreground text-sm">확보된 전체 회원수</p>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-brand-dark text-white text-center shadow-xl">
                                <div className="text-white/60 font-black text-sm mb-4 uppercase tracking-widest">Paid Users</div>
                                <div className="text-5xl font-black text-warm mb-2 tracking-tighter">50 P</div>
                                <p className="text-white/40 text-sm">실제 유료 과금 전환</p>
                            </div>
                        </div>
                        <div className="mt-8 p-8 rounded-[2rem] bg-[#6366F1]/5 border border-[#6366F1]/10 text-center">
                            <p className="text-secondary-foreground font-bold leading-relaxed">
                                👉 아이디어 검증을 넘어, <span className="text-[#6366F1]">월 3,300원의 실제 매출</span>로 자생 가능성을 단기간에 증명했습니다.
                            </p>
                        </div>
                    </div>

                    {/* 6. Insight */}
                    <div className="reveal pb-20">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Lightbulb className="w-8 h-8 text-yellow-500" /> 기획자의 인사이트
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-10 rounded-[3.5rem] bg-brand-dark text-white relative overflow-hidden">
                                <p className="text-2xl font-black mb-10 leading-tight relative z-10">
                                    “기획은 아이디어를 예쁘게 만드는 일이 아니라,<br />
                                    빠르게 돈이 되는 구조를 검증하는 일”
                                </p>
                                <div className="space-y-6 text-gray-400 relative z-10">
                                    <div className="flex gap-4 items-start">
                                        <Zap className="w-6 h-6 text-[#6366F1] shrink-0 mt-1" />
                                        <div>
                                            <p className="text-lg font-bold text-white mb-1">속도는 스타트업의 유일한 무기</p>
                                            <p>완성도에 매몰되기보다 '속도'로 시장을 읽고 바로 실행하는 것이 가장 현실적인 전략임을 배웠습니다.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <Gem className="w-6 h-6 text-[#6366F1] shrink-0 mt-1" />
                                        <div>
                                            <p className="text-lg font-bold text-white mb-1">후발주자의 역설</p>
                                            <p>선발주자의 기능을 정밀하게 재구성하고 부족한 지점을 채우는 것만으로도 충분한 경쟁력이 생깁니다.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#6366F1]/10 rounded-full blur-[100px]" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Nav */}
            <footer className="py-20 bg-[#F8F5FF] px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/about" className="flex items-center gap-2 hover:text-[#6366F1] transition-colors font-bold text-brand-dark text-sm md:text-base">
                        <ArrowLeft className="w-5 h-5" /> 리스트로 돌아가기
                    </Link>
                    <div className="flex gap-4 items-center">
                        <span className="text-gray-400 text-sm hidden md:block">Next Project</span>
                        <Link href="/about/case-study/arch-service" className="font-bold hover:text-[#6366F1] transition-colors flex items-center gap-2 text-brand-dark text-sm md:text-base">
                            아치 서비스 기획 <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
