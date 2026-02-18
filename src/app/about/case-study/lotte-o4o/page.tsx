'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, CheckCircle2, AlertCircle, Users, Settings, BarChart3, Lightbulb, Wallet, Globe, ArrowRight, Target } from 'lucide-react'
import Link from 'next/link'

export default function LotteO4OCaseStudy() {
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
            <section className="pt-40 pb-20 px-6 md:px-12 bg-[#F0F4FF]">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-black tracking-widest uppercase">
                        O4O / Operation Strategy
                    </div>
                    <h1 className="reveal text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter font-maple leading-tight mb-12">
                        롯데닷컴 O4O 서비스 <br />‘스마트픽’ 시스템 관리
                    </h1>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-primary/10">
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Organization</p>
                            <p className="text-xl font-bold text-brand-dark">롯데닷컴</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Team</p>
                            <p className="text-xl font-bold text-brand-dark">스마트픽 TF</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Role</p>
                            <p className="text-xl font-bold text-brand-dark">정책·운영 담당</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-2">Impact</p>
                            <p className="text-xl font-bold text-primary">상품 범위 200% 확대</p>
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
                        <div className="p-8 md:p-12 rounded-[3rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl md:text-3xl font-medium leading-[1.6] relative z-10">
                                "계열사 인프라를 연결하는 O4O 서비스를 <br className="hidden md:block" />
                                <span className="text-primary font-bold italic">실제로 돌아가게 만드는 것</span>"
                            </p>
                            <div className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl relative z-10">
                                단순한 서비스 구축을 넘어, 전국 오프라인 거점(백화점, 세븐일레븐 등)에서
                                고객이 주문한 상품을 문제없이 픽업할 수 있도록 안정적인 운영 체계를 확립하는 것이 핵심이었습니다.
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                        </div>
                    </div>

                    {/* 2. Problem */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <AlertCircle className="w-8 h-8 text-red-500" /> 문제 정의
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                <p className="text-sm font-bold text-secondary-foreground mb-4 uppercase">Field Issue</p>
                                <h3 className="text-2xl font-bold text-brand-dark mb-4">낮은 현장 인지율</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    매장 담당자들이 서비스 자체를 모르거나 사용법을 미숙지하여 고객이 픽업을 하러 와도 대응이 불가능한 상황
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50">
                                <p className="text-sm font-bold text-secondary-foreground mb-4 uppercase">Collaboration Issue</p>
                                <h3 className="text-2xl font-bold text-brand-dark mb-4">계열사 협업의 한계</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    각 계열사 점포 입장에서는 직접적인 매출 기여도가 낮아 운영 협조를 끌어내기 어려운 복잡한 이해관계
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. My Role */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <Users className="w-8 h-8 text-primary" /> 역할과 접근 방식
                        </h2>
                        <div className="space-y-6 text-xl text-secondary-foreground leading-relaxed">
                            <p>
                                기획 이후의 <strong>실행(Execution)</strong> 단계에 집중했습니다.
                                문서가 아닌 <span className="text-brand-dark font-bold italic">현장에서 문제를 찾는 방식</span>으로 접근하여
                                점포 담당자들의 페인 포인트를 직접 수집했습니다.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                <span className="px-6 py-2 bg-[#F0F4FF] text-primary rounded-full font-bold text-sm">#현장밀착</span>
                                <span className="px-6 py-2 bg-[#F0F4FF] text-primary rounded-full font-bold text-sm">#사용자흐름관찰</span>
                                <span className="px-6 py-2 bg-[#F0F4FF] text-primary rounded-full font-bold text-sm">#이해관계조율</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Actions */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12 font-maple">
                            <Settings className="w-8 h-8 text-primary" /> 핵심 개선 포인트
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">01</div>
                                <h3 className="text-xl font-bold text-brand-dark">전국 단위 오프라인 교육</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    전국 롯데백화점 및 세븐일레븐을 직접 방문하여 매장 담당자 대상 시스템 사용 교육 실시. 현장과의 물리적/심리적 거리를 좁힘.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">02</div>
                                <h3 className="text-xl font-bold text-brand-dark">카테고리 단위 시스템 개선</h3>
                                <p className="text-secondary-foreground leading-relaxed text-sm italic py-2 px-4 bg-secondary/20 rounded-lg">
                                    "등록 실수라는 휴먼 에러를 시스템 기본값으로 보완"
                                </p>
                                <p className="text-secondary-foreground leading-relaxed">
                                    상품별 체크 방식에서 카테고리별 Default 적용 방식으로 로직 변경. 상품 범위가 약 40%에서 80%로 드라마틱하게 확대됨.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">03</div>
                                <h3 className="text-xl font-bold text-brand-dark">온라인 교육 체계화</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    전국 순회 교육의 한계를 극복하기 위해 온라인 교육 콘텐츠 신설 및 백화점 점포 채널을 통한 지식 공유 프로세스 구축.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">04</div>
                                <h3 className="text-xl font-bold text-brand-dark">주문 알림 시스템 최적화</h3>
                                <p className="text-secondary-foreground leading-relaxed">
                                    고객센터 상담원이 직접 전화하던 방식(OB Call)을 카카오 알림톡 서비스로 전환. 인지율은 높이고 운영 리소스는 절감.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. Outcome */}
                    <div className="reveal">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-12 font-maple">
                            <BarChart3 className="w-8 h-8 text-primary" /> 결과 및 성과
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-8 rounded-3xl bg-white border border-border shadow-sm text-center">
                                <Globe className="w-8 h-8 text-primary mx-auto mb-4" />
                                <p className="text-sm font-bold text-secondary-foreground uppercase mb-2">Service Range</p>
                                <p className="text-4xl font-black text-brand-dark">80%</p>
                                <p className="text-xs text-secondary-foreground mt-2">가능 상품 범위 2배 확대</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-border shadow-sm text-center">
                                <Wallet className="w-8 h-8 text-primary mx-auto mb-4" />
                                <p className="text-sm font-bold text-secondary-foreground uppercase mb-2">Cost Saving</p>
                                <p className="text-4xl font-black text-brand-dark">Efficient</p>
                                <p className="text-xs text-secondary-foreground mt-2">상담 알림 자동화로 비용 절감</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-border shadow-sm text-center">
                                <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                                <p className="text-sm font-bold text-secondary-foreground uppercase mb-2">Awareness</p>
                                <p className="text-4xl font-black text-brand-dark">Success</p>
                                <p className="text-xs text-secondary-foreground mt-2">전국 점포 숙달도 및 만족도 향상</p>
                            </div>
                        </div>
                    </div>

                    {/* 6. Insight */}
                    <div className="reveal pb-20">
                        <h2 className="flex items-center gap-3 text-3xl font-bold text-brand-dark mb-8 font-maple">
                            <Lightbulb className="w-8 h-8 text-yellow-500" /> 기획자의 인사이트
                        </h2>
                        <div className="p-12 rounded-[3rem] bg-brand-dark text-white relative overflow-hidden">
                            <p className="text-2xl font-bold mb-8 leading-tight relative z-10">
                                "서비스는 기능이 아니라, <br />
                                조직을 설득하고 움직이게 만드는 구조다"
                            </p>
                            <div className="space-y-4 text-lg text-gray-400 relative z-10">
                                <p>• 아무리 좋은 앱이라도 현장이 이해하지 못하면 서비스는 죽은 상태가 됩니다.</p>
                                <p>• 계열사 간 복잡한 이해관계 속에서는 기능보다 <strong>운영 체계와 인센티브 구조</strong>가 더 강력한 힘을 발휘합니다.</p>
                                <p>• 현장의 불만은 '교육'으로 덮는 것이 아니라 <strong>'시스템 로직'</strong>으로 해결해야 지속 가능합니다.</p>
                            </div>
                            <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Nav */}
            <footer className="py-20 bg-[#F8F9FA] px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/about" className="flex items-center gap-2 hover:text-primary transition-colors font-bold text-brand-dark">
                        <ArrowLeft className="w-5 h-5" /> 리스트로 돌아가기
                    </Link>
                    <div className="flex gap-4">
                        <span className="text-gray-400">Next Project</span>
                        <Link href="/about/case-study/green-gray" className="font-bold hover:text-primary transition-colors flex items-center gap-2 text-brand-dark">
                            그린앤그레이 IR 50억 유치 <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
