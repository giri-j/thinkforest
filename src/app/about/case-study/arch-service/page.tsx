'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, AlertCircle, Users, Settings, BarChart3, Lightbulb, Palette, Share2, ArrowRight, Target } from 'lucide-react'
import Link from 'next/link'

export default function ArchCaseStudy() {
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
            <section className="pt-40 pb-20 px-6 md:px-12 bg-[#F0FDF4]">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-sm font-black tracking-widest uppercase">
                        Artist Platform / B2B Matching
                    </div>
                    <h1 className="reveal text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter leading-tight mb-12">
                        아치(artch) <br />서비스 기획 프로젝트
                    </h1>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-emerald-500/10">
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Organization</p>
                            <p className="text-xl font-bold text-brand-dark">artch</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Project</p>
                            <p className="text-xl font-bold text-brand-dark">중개 플랫폼</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Role</p>
                            <p className="text-xl font-bold text-brand-dark">기획 / 영입</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Outcome</p>
                            <p className="text-xl font-bold text-emerald-600">50+ 작가 영입</p>
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
                            <Target className="w-8 h-8 text-emerald-500" /> 프로젝트의 목적
                        </h2>
                        <div className="p-8 md:p-12 rounded-[3.5rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl md:text-3xl font-medium leading-[1.6] relative z-10">
                                “상품에 예술의 숨결을 불어넣고,<br />
                                <span className="text-warm font-black italic underline decoration-4 underline-offset-8">작가와 기업을 잇는 가교</span>를 만드는 것”
                            </p>
                            <div className="mt-8 text-white/60 text-lg leading-relaxed max-w-2xl relative z-10">
                                기존 커머스 인프라에 아티스트의 고유한 스토리와 디자인을 결합하여, 차별화된 상품 가치를 창출하고 예술가의 지속 가능한 창작 환경을 지원하는 아치(artch) 서비스를 기획했습니다.
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-warm/10 rounded-full blur-[100px]" />
                        </div>
                    </div>

                    {/* 2. Problem */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <AlertCircle className="w-8 h-8 text-red-500" /> 문제 정의
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                <h3 className="text-xl font-black text-brand-dark mb-4">② 작가의 현실</h3>
                                <p className="text-secondary-foreground text-sm leading-relaxed">
                                    그림만으로 생계 유지가 어려워 많은 작가들이 투잡을 병행하며 창작 활동을 지속하기 힘든 구조적 한계
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                <h3 className="text-xl font-black text-brand-dark mb-4">② 기업의 갈증</h3>
                                <p className="text-secondary-foreground text-sm leading-relaxed">
                                    상품 디자인의 차별화가 필요하지만, 작가 섭외부터 저작권 계약까지의 과정이 리스크이자 부담으로 작용
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                <h3 className="text-xl font-black text-brand-dark mb-4">③ 연결의 부재</h3>
                                <p className="text-secondary-foreground text-sm leading-relaxed">
                                    조직 내 예술 네트워크가 부족하여 이 둘을 신뢰로 묶을 수 있는 비즈니스 구조 자체가 부재한 상태
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. My Role */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Users className="w-8 h-8 text-emerald-500" /> 역할과 접근 방식
                        </h2>
                        <div className="space-y-8">
                            <p className="text-2xl text-secondary-foreground leading-relaxed">
                                단순한 매칭을 넘어 <span className="text-brand-dark font-black">‘작가와 기업이 공존하는 생태계’</span>를 설계했습니다.
                            </p>
                            <div className="p-10 rounded-[3rem] border-2 border-emerald-500/10 bg-emerald-50/50">
                                <p className="text-lg text-secondary-foreground leading-relaxed">
                                    홈페이지 기획부터 작가 영입 전반을 총괄했습니다. 초기 단계에서는 서비스 시스템보다 <span className="text-emerald-600 font-bold">‘사람과 풀(Pool)’</span>을 만드는 것이 진정한 성패를 가를 핵심이라고 판단하여 발로 뛰는 영입을 진행했습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Actions */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <Settings className="w-8 h-8 text-emerald-500" /> 핵심 개선 포인트
                        </h2>
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                    <Share2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">다각도 작가 네트워크 영입</h3>
                                    <p className="text-secondary-foreground leading-relaxed text-lg italic mb-4">"기다리지 않고 직접 찾아가는 영입"</p>
                                    <p className="text-secondary-foreground">
                                        공모전 기획은 물론, 일러스트레이션 페어 등 오프라인 현장에 방문하여 직접 명함을 건넸습니다. 인스타그램과 노트폴리오를 샅샅이 뒤져 맞춤형 작가들에게 개별 컨택하며 진정성 있는 풀을 구축했습니다.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                    <Palette className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">B2B 매칭 최적화 홈페이지 기획</h3>
                                    <p className="text-secondary-foreground leading-relaxed text-lg italic mb-4">"포트폴리오 나열이 아닌 비즈니스 매칭 구조로"</p>
                                    <p className="text-secondary-foreground">
                                        홈페이지를 기업 관점에서 설계했습니다. 작가의 화풍과 작품이 어떤 상품군에 적합한지, 그리고 어떤 가치를 줄 수 있는지를 비즈니스 언어로 재정의하여 매칭 성공률을 높였습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Outcome */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12">
                            <BarChart3 className="w-8 h-8 text-emerald-500" /> 결과 및 성과
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-[3rem] bg-emerald-600 text-white shadow-xl relative overflow-hidden">
                                <h3 className="text-4xl font-black mb-2">50+ Writers</h3>
                                <p className="text-emerald-100">프로젝트 활용 동의 작가 확보</p>
                                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                                    <Palette className="w-40 h-40" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-white border border-border shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">1</div>
                                    <p className="font-bold text-brand-dark">마틸라 침구류 디자인 상품 출시</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-border shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">2</div>
                                    <p className="font-bold text-brand-dark">유베이스 일러스트 라이선스 계약</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 text-center">
                            <p className="text-emerald-800 font-bold">
                                👉 단순한 중개 아이디어를 넘어, 실제 기업의 매출과 라이선스 성과로 연결되는 구조를 검증했습니다.
                            </p>
                        </div>
                    </div>

                    {/* 6. Insight */}
                    <div className="reveal pb-20">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8">
                            <Lightbulb className="w-8 h-8 text-yellow-500" /> 기획자의 인사이트
                        </h2>
                        <div className="p-12 rounded-[3.5rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl font-black mb-8 leading-tight relative z-10">
                                “기획은 새로운 가치를 만드는 일이 아니라,<br />
                                이미 존재하는 가치를 연결하는 일”
                            </p>
                            <div className="space-y-6 text-white/60 relative z-10 text-lg">
                                <p>• AI가 그림을 그리는 시대에도 작가의 <strong>고유한 스토리</strong>는 강력한 시장 경쟁력을 가집니다.</p>
                                <p>• 플랫폼 가치 창출의 핵심은 기술의 화려함이 아니라 <strong>공급자와 수요자 사이의 신뢰 구조</strong>를 만드는 일입니다.</p>
                                <p>• 발로 뛰는 영입을 통해 구축된 강력한 <strong>인적 네트워크</strong> 비즈니스의 가장 강력한 해자가 됩니다.</p>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-warm/10 rounded-full blur-[100px]" />
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Nav */}
            <footer className="py-20 bg-[#F0FDF4] px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/about" className="flex items-center gap-2 hover:text-emerald-600 transition-colors font-bold text-brand-dark">
                        <ArrowLeft className="w-5 h-5" /> 리스트로 돌아가기
                    </Link>
                    <div className="flex gap-4 items-center">
                        <span className="text-gray-400 text-sm hidden md:block">Next Project</span>
                        <Link href="/about/case-study/message-platform" className="font-bold hover:text-emerald-600 transition-colors flex items-center gap-2 text-brand-dark">
                            메시지 플랫폼 기획 <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
