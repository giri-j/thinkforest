'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, CheckCircle2, AlertCircle, Users, Settings, BarChart3, Lightbulb, TrendingDown, Target, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LotteOrderCaseStudy() {
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
            <section className="pt-40 pb-20 px-6 md:px-12 bg-[#F8F9FA]">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-black tracking-widest uppercase">
                        Conversion Optimization
                    </div>
                    <h1 className="reveal text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter font-maple leading-tight mb-12">
                        롯데닷컴 <br />주문완료율 개선 프로젝트
                    </h1>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-border/50">
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Organization</p>
                            <p className="text-xl font-bold text-brand-dark">롯데닷컴</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Period</p>
                            <p className="text-xl font-bold text-brand-dark">약 4년</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Role</p>
                            <p className="text-xl font-bold text-brand-dark">QCM 파트장</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Impact</p>
                            <p className="text-xl font-bold text-primary">결품률 50% 감소</p>
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
                            <Target className="w-8 h-8 text-primary" /> 프로젝트의 목적
                        </h2>
                        <div className="p-8 md:p-12 rounded-[3rem] bg-brand-dark dark text-white relative overflow-hidden">
                            <p className="text-2xl md:text-3xl font-medium leading-[1.6] relative z-10">
                                "결제 이후 발생하는 매출 손실을 최소화하여 <br className="hidden md:block" />
                                <span className="text-primary font-bold italic">안정적인 주문 완료 구조</span>를 만드는 것"
                            </p>
                            <div className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl relative z-10">
                                백화점 상품을 온라인으로 판매하는 환경에서 발생하는 결품·취소·반품 리스크를 관리하여
                                실제 매출 확정률을 높이는 것이 핵심이었습니다.
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
                        </div>
                    </div>

                    {/* 2. Problem */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <AlertCircle className="w-8 h-8 text-red-500" /> 문제 정의
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100">
                                <p className="text-sm font-bold text-red-500 mb-2 uppercase">Financial Loss</p>
                                <h3 className="text-4xl font-bold text-brand-dark mb-4 tracking-tighter">월 105억 원</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    월 700억 규모의 결제 중 약 15%가 취소되며 발생하는 거대한 매출 기회 손실
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-secondary/20 border border-border/50">
                                <p className="text-sm font-bold text-secondary-foreground mb-2 uppercase">Core Issue</p>
                                <h3 className="text-4xl font-bold text-brand-dark mb-4 tracking-tighter">3%의 결품</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    운영 정책과 시스템 관리 방식을 변경하여 해결 가능한 '품절로 인한 강제 취소' 지표에 주목
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 p-8 rounded-[2rem] border border-border flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full bg-secondary border-2 border-white flex items-center justify-center text-xs font-bold text-secondary-foreground italic">Reason</div>
                                ))}
                            </div>
                            <p className="text-secondary-foreground italic text-center md:text-left">
                                "매장 담당자의 시스템 미숙, 오프라인 업무 집중, 협소한 재고 관리 환경 등 <br className="hidden md:block" />
                                복합적인 현장 문제가 응집되어 있었습니다."
                            </p>
                        </div>
                    </div>

                    {/* 3. My Role */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <Users className="w-8 h-8 text-primary" /> 역할과 접근 방식
                        </h2>
                        <div className="space-y-6 text-xl text-secondary-foreground leading-relaxed">
                            <p>
                                물류혁신팀 내 신설된 <span className="text-brand-dark font-bold italic">QCM(Quality Control Management) 파트</span>장으로서,
                                단순한 지표 관리를 넘어 <span className="text-primary font-black underline decoration-2 underline-offset-8">현장-시스템-정책</span>을 연결하는 통합 관리를 수행했습니다.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                    <p className="font-black text-primary mb-2">Policy</p>
                                    <p className="text-sm font-medium">관리 정책 수립 및 지표 정의</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                    <p className="font-black text-primary mb-2">System</p>
                                    <p className="text-sm font-medium">관리자 앱 기능 개선 및 로직 최적화</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                    <p className="font-black text-primary mb-2">Education</p>
                                    <p className="text-sm font-medium">전국 1만여 매장 순회 교육 및 계도</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Actions */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12 font-maple">
                            <Settings className="w-8 h-8 text-primary" /> 핵심 개선 포인트
                        </h2>
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-dark text-white flex items-center justify-center font-black text-xl group-hover:bg-primary transition-colors">1</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-4">관리자 시스템 교육 강화</h3>
                                    <p className="text-secondary-foreground leading-relaxed text-lg italic mb-4">
                                        "앱을 쓸 줄 몰라서 결품을 내는 상황을 제로로 만든다"
                                    </p>
                                    <p className="text-secondary-foreground">
                                        전국 백화점을 직접 방문하여 파트너플러스 앱 활용 교육 진행. 4년간 약 10,000여 개 매장 숙달 교육 완료.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-dark text-white flex items-center justify-center font-black text-xl group-hover:bg-primary transition-colors">2</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-4">매장 맞춤형 현장 계도</h3>
                                    <p className="text-secondary-foreground leading-relaxed text-lg italic mb-4">
                                        "숫자 뒤에 숨은 매장의 동선과 고충을 직접 확인한다"
                                    </p>
                                    <p className="text-secondary-foreground">
                                        상위 결품 매장 직접 방문 미팅. 창고 동선 효율화 지원, 모바일 활용도 제고, 알림 기능 개선 등 현장 맞춤형 솔루션 제공.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-dark text-white flex items-center justify-center font-black text-xl group-hover:bg-primary transition-colors">3</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-4">배송 정책 구조 개선 (1+1+1 → 2+1)</h3>
                                    <p className="text-secondary-foreground leading-relaxed text-lg italic mb-4">
                                        "더 많은 시간을 주는 것이 오히려 더 빠른 배송을 만든다"
                                    </p>
                                    <p className="text-secondary-foreground">
                                        순차 할당 정책의 비효율 발견. 최초 매장에 처리 기간을 더 부여(2일)하는 정책 변경으로 결품률 및 배송 리드타임 동시 개선 확인.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Outcome */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12 font-maple">
                            <BarChart3 className="w-8 h-8 text-primary" /> 결과 및 성과
                        </h2>
                        <div className="p-12 rounded-[3.5rem] bg-secondary/10 border border-border/50 relative overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                                <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl shadow-sm">
                                    <p className="text-sm font-bold text-secondary-foreground uppercase mb-4 tracking-tighter">Stockout Rate</p>
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl font-bold text-gray-400 line-through tracking-tighter">3.0%</span>
                                        <ArrowRight className="text-primary w-6 h-6" />
                                        <span className="text-6xl font-black text-primary tracking-tighter">1.5%</span>
                                    </div>
                                    <p className="mt-4 text-brand-dark font-bold text-lg">결품률 50% 개선</p>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl shadow-sm">
                                    <p className="text-sm font-bold text-secondary-foreground uppercase mb-4 tracking-tighter">Revenue Recovery</p>
                                    <div className="text-5xl font-black text-brand-dark tracking-tighter flex items-end gap-1">
                                        <TrendingDown className="text-primary w-8 h-8 mb-2" />
                                        월 10.5억
                                    </div>
                                    <p className="mt-4 text-brand-dark font-bold text-lg">매출 손실 감소 효과</p>
                                </div>
                            </div>
                            <div className="mt-12 text-center text-secondary-foreground font-medium">
                                "단순 인력 투입보다 정책과 시스템을 바꾼 개선이 <span className="text-primary font-bold">2배 더 큰 성과</span>를 입증했습니다."
                            </div>
                        </div>
                    </div>

                    {/* 6. Insight */}
                    <div className="reveal pb-20">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <Lightbulb className="w-8 h-8 text-yellow-500" /> 기획자의 인사이트
                        </h2>
                        <div className="p-12 rounded-[3rem] bg-[#F8F9FA] border-l-[12px] border-primary">
                            <p className="text-2xl font-bold text-brand-dark mb-8 leading-tight">
                                "사람의 문제처럼 보이는 이슈는 <br />
                                결국 구조와 정책의 문제다"
                            </p>
                            <ul className="space-y-4 text-lg text-secondary-foreground">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                                    지속 가능한 개선을 위해서는 반드시 기획이 시스템으로 귀결되어야 함을 배웠습니다.
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                                    모든 데이터 기반의 설계는 현장의 목소리를 충분히 들었을 때 비로소 완성됩니다.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Nav */}
            <footer className="py-20 bg-brand-dark text-white px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/about" className="flex items-center gap-2 hover:text-primary transition-colors font-bold">
                        <ArrowLeft className="w-5 h-5" /> 뒤로 가기
                    </Link>
                    <div className="flex gap-4">
                        <span className="text-gray-500">Next Project</span>
                        <Link href="/about/case-study/lotte-o4o" className="font-bold hover:text-primary transition-colors flex items-center gap-2">
                            롯데닷컴 O4O 서비스 스마트픽 <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
