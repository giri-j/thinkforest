'use client'

import { Instagram, Youtube, Mail, ArrowUpRight } from 'lucide-react'

export default function ContactPage() {
    const snsLinks = [
        {
            name: 'Instagram',
            handle: '@gianteunkil',
            href: 'https://www.instagram.com/gianteunkil/',
            icon: <Instagram className="w-6 h-6" />,
            color: 'hover:text-[#E1306C]'
        },
        {
            name: 'Youtube',
            handle: 'iamgil_Official',
            href: 'https://www.youtube.com/@iamgil_Official',
            icon: <Youtube className="w-6 h-6" />,
            color: 'hover:text-[#FF0000]'
        },
        {
            name: 'Email',
            handle: 'jek5797@naver.com',
            href: 'mailto:jek5797@naver.com',
            icon: <Mail className="w-6 h-6" />,
            color: 'hover:text-primary'
        }
    ]

    return (
        <main className="min-h-screen bg-white pt-40 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-20">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Get in Touch</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter mb-8 font-maple">
                        새로운 연결을<br />기다립니다
                    </h1>
                    <p className="text-xl text-secondary-foreground leading-relaxed max-w-2xl">
                        기획에 대한 고민, 프로젝트 협업 제안, 혹은 단순한 커피 챗까지 모두 환영합니다.
                        아래 채널을 통해 편하게 연락 주세요.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {snsLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group p-8 rounded-3xl border border-border bg-white transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between h-48 ${link.color}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-3 rounded-2xl bg-secondary/30 text-brand-dark group-hover:bg-current group-hover:text-white transition-colors">
                                    {link.icon}
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-border group-hover:text-current transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-1">
                                    {link.name}
                                </h3>
                                <p className="text-2xl font-bold text-brand-dark group-hover:text-current transition-colors">
                                    {link.handle}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                <section className="mt-32 p-12 rounded-[3rem] bg-brand-dark text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">오프라인 미팅</h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                            주로 서울 강남 인근에서 미팅이 가능합니다.<br />
                            현재 비대면 미팅(Zoom, Google Meet)도 활발히 진행하고 있으니 편하게 말씀해 주세요.
                        </p>
                        <div className="flex gap-4">
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">#기획컨설팅</span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">#제품전략</span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">#협업제안</span>
                        </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                </section>
            </div>
        </main>
    )
}
