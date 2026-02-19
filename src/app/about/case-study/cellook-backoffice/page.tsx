'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, CheckCircle2, AlertCircle, Users, Settings, BarChart3, Lightbulb, Layout, MousePointer2, Database, DollarSign, ArrowRight, Target, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function CellookBackofficeCaseStudy() {
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
            <section className="pt-40 pb-20 px-6 md:px-12 bg-[#F2FBF9]">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-brand-dark/5 text-brand-dark rounded-full text-sm font-black tracking-widest uppercase">
                        Admin UX / Product Strategy
                    </div>
                    <h1 className="reveal text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter leading-tight mb-12">
                        여성의류 플랫폼 ‘셀룩’ <br />백오피스 기획 프로젝트
                    </h1>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-brand-dark/10">
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Organization</p>
                            <p className="text-xl font-bold text-brand-dark">셀룩 (Cellook)</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Domain</p>
                            <p className="text-xl font-bold text-brand-dark">F-Commerce</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Role</p>
                            <p className="text-xl font-bold text-brand-dark">스타트업 백오피스 기획자</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Focus</p>
                            <p className="text-xl font-bold text-primary">운영 효율 & 수익화</p>
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
                            <Target className="w-8 h-8 text-primary" /> 프로젝트의 목적
                        </h2>
                        <div className="p-8 md:p-12 rounded-[3rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl md:text-3xl font-medium leading-[1.6] relative z-10">
                                "어드민을 단순한 관리 도구가 아닌, <br className="hidden md:block" />
                                <span className="text-primary font-bold italic">비즈니스 수익을 창출하는 도구</span>로 진화시키는 것"
                            </p>
                            <div className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl relative z-10">
                                실사용자(MD, CS)의 업무 효율을 극대화함과 동시에 입점몰들이 기꺼이 비용을 지불하고서라도
                                사용하고 싶은 수익형 기능을 기획하는 것이 핵심이었습니다.
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                        </div>
                    </div>

                    {/* 2. Problem */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <AlertCircle className="w-8 h-8 text-red-500" /> 문제 정의
                        </h2>
                        <div className="space-y-6">
                            <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 italic text-xl text-brand-dark text-center font-bold">
                                “운영자는 불편하고, 플랫폼은 돈을 벌지 못하는 상태”
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                    <h3 className="text-xl font-bold text-brand-dark mb-4 border-b pb-2">사용성 부재</h3>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        구색만 갖춘 시스템으로 인해 상품 관리, 매출 데이터 정리, 입점몰 관리 등 대부분의 업무를 사람이 일일이 수작업으로 처리하는 비효율 발생
                                    </p>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                    <h3 className="text-xl font-bold text-brand-dark mb-4 border-b pb-2">수익 모델 부재</h3>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        백오피스가 철저히 운영 도구에만 함몰되어 있어, 입점몰로부터 매출을 만들어낼 수 있는 비즈니스 로직이 전혀 설계되어 있지 않음
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. My Role */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Users className="w-8 h-8 text-primary" /> 역할과 접근 방식
                        </h2>
                        <div className="space-y-8">
                            <p className="text-xl text-secondary-foreground leading-relaxed">
                                스타트업 기업의 백오피스 기획자로 참여하여 실사용자들의 목소리를 직접 들었습니다.
                                단순히 <strong>“불편을 줄이는 것”</strong>을 넘어,
                                <strong>“현재 가진 자원으로 입점몰이 매력을 느낄 수 있는 서비스는 무엇인가?”</strong>라는 질문을 중심에 두고 기획을 진행했습니다.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                                    <div className="text-primary font-black mb-1">01</div>
                                    <p className="font-bold text-brand-dark">심층 인터뷰</p>
                                    <p className="text-xs text-secondary-foreground mt-2">반복 작업 및 페인 포인트 식별</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                                    <div className="text-primary font-black mb-1">02</div>
                                    <p className="font-bold text-brand-dark">Flow 설계</p>
                                    <p className="text-xs text-secondary-foreground mt-2">업무 흐름 중심 메뉴 재정립</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                                    <div className="text-primary font-black mb-1">03</div>
                                    <p className="font-bold text-brand-dark">비즈니스 확장</p>
                                    <p className="text-xs text-secondary-foreground mt-2">입점몰 유인책 및 수익 모델 기획</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Actions */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <Settings className="w-8 h-8 text-primary" /> 핵심 개선 포인트
                        </h2>
                        <div className="space-y-16">
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#F2FBF9] text-brand-dark flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <MousePointer2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">백오피스 사용성(UI/UX) 개선</h3>
                                    <p className="text-brand-dark font-bold text-sm mb-4 uppercase tracking-widest opacity-60 italic">"Micro Improvements, Macro Impact"</p>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        상품 등록 시 Default 값 개선, 전체 선택(체크) 기능 추가, 흩어져 있던 관리 메뉴를 업무 흐름 기준으로 재정리했습니다.
                                        매일 사용하는 사용자의 피로도를 낮추는 기본 구조를 개선했습니다.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#F2FBF9] text-brand-dark flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <Database className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">반복 업무 자동화 (매크로·크롤링)</h3>
                                    <p className="text-brand-dark font-bold text-sm mb-4 uppercase tracking-widest opacity-60 italic">"From Human-hand to System-base"</p>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        입점몰 순위 및 매출 정보를 수기로 체크하던 구조를 매크로·크롤링 방식을 활용해 자동 추출하도록 변경했습니다.
                                        반복 업무를 사람 중심에서 시스템 중심의 관리 방식으로 전환했습니다.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#F2FBF9] text-brand-dark flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <DollarSign className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">매출 발생을 위한 기능 기획</h3>
                                    <p className="text-brand-dark font-bold text-sm mb-4 uppercase tracking-widest opacity-60 italic">"Turning Admin into a Revenue Engine"</p>
                                    <p className="text-secondary-foreground leading-relaxed">
                                        기획전 기능(메인 배너 노출, 상품 묶음 노출, 스토리텔링 구조)과 라이브 커머스 기능을 도입했습니다.
                                        입점몰 홍보 및 매출 유도를 위해 프론트(FO)와 백오피스(BO)를 동시에 고려한 구조를 설계했습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Outcome */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <BarChart3 className="w-8 h-8 text-primary" /> 결과 및 성과
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-[3rem] bg-brand-dark text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <Rocket className="w-10 h-10 text-warm mb-6" />
                                    <h3 className="text-2xl font-bold mb-4">비즈니스 확장성 확보</h3>
                                    <p className="text-white/60">기획전 및 라이브 기능 도입을 통해 입점몰 홍보 수단 확보 및 플랫폼 매출 발생 구조 마련</p>
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-warm/20 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />
                            </div>
                            <div className="p-10 rounded-[3rem] bg-primary text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <Layout className="w-10 h-10 text-warm mb-6" />
                                    <h3 className="text-2xl font-bold mb-4">운영 리소스 효율화</h3>
                                    <p className="text-white/80">업무 흐름 중심 UX 개선과 반복 수기 작업 자동화를 통해 업무 시간 및 운영 리소스의 획기적 절감 달성</p>
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>

                    {/* 6. Insight */}
                    <div className="reveal pb-20">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Lightbulb className="w-8 h-8 text-yellow-500" /> 기획자의 인사이트
                        </h2>
                        <div className="p-12 rounded-[3.5rem] bg-[#F8F9FA] border-l-[12px] border-primary">
                            <p className="text-2xl font-black text-brand-dark mb-10 leading-tight">
                                “운영을 이해하는 기획이 <br />
                                결국 비즈니스 성과를 만든다”
                            </p>
                            <div className="space-y-6 text-lg text-secondary-foreground">
                                <p>• <strong>모든 서비스는 사용자와의 소통</strong>을 통해서만 개선됩니다. MD/CS 담당자의 실제 목소리가 기획의 가장 강력한 근거가 되었습니다.</p>
                                <p>• <strong>반복적이고 루틴한 업무</strong>에는 반드시 개선하거나 자동화할 수 있는 포인트가 존재합니다. 이를 찾아내는 것이 기획자의 능력입니다.</p>
                                <p>• 백오피스 기획은 단순한 관리 화면 설계가 아니라 <strong>운영 효율과 비즈니스 성과</strong>를 동시에 만드는 일임을 확신하게 되었습니다.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Nav */}
            <footer className="py-20 bg-[#F2FBF9] px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/about" className="flex items-center gap-2 hover:text-primary transition-colors font-bold text-brand-dark">
                        <ArrowLeft className="w-5 h-5" /> 리스트로 돌아가기
                    </Link>
                    <div className="flex gap-4 items-center">
                        <span className="text-gray-400 text-sm hidden md:block">Next Project</span>
                        <Link href="/about/case-study/rebind-service" className="font-bold hover:text-primary transition-colors flex items-center gap-2 text-brand-dark">
                            리바인드 서비스 기획 <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
