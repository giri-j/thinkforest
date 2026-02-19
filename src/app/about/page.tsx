'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Target, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPage() {
    const caseStudies = [
        { id: 'lotte-order', title: '롯데닷컴 주문완료율 개선 프로젝트', tag: 'Conversion' },
        { id: 'lotte-o4o', title: '롯데닷컴 O4O 서비스 스마트픽 시스템 관리', tag: 'O4O / Logistics' },
        { id: 'green-gray', title: '그린앤그레이 IR을 통한 50억 유치', tag: 'IR / Strategy' },
        { id: 'cellook-backoffice', title: '셀룩 서비스 백오피스 기획', tag: 'Backoffice' },
        { id: 'rebind-service', title: '리바인드 서비스 기획', tag: 'Service Planning' },
        { id: 'arch-service', title: '아치 서비스 기획', tag: 'Service Planning' },
        { id: 'message-platform', title: '메시지 플랫폼 기획', tag: 'Platform' },
        { id: 's-group-platform', title: "'S'그룹 교육 플랫폼 기획 (SI)", tag: 'SI / Platform' },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
        }
    }

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* 1. Profile Section */}
            <section className="pt-32 md:pt-48 pb-24 px-6 md:px-12 bg-background/50 border-b border-border/50">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20"
                >
                    {/* Profile Image */}
                    <motion.div variants={itemVariants} className="relative w-64 h-64 md:w-[400px] md:h-[500px] shrink-0">
                        <div className="absolute inset-4 border-2 border-primary/20 -rotate-3 rounded-3xl" />
                        <div className="absolute inset-0 bg-secondary rounded-3xl overflow-hidden shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-700">
                            <Image
                                src="/about_img/giri_picture.jpeg"
                                alt="전은길 (기리)"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Intro Text */}
                    <div className="flex flex-col gap-6">
                        <motion.header variants={itemVariants}>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Think Forest Master</span>
                            <h1 className="text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter leading-tight">
                                기획의 숲 지기,<br /> 기획자 기리 입니다.
                            </h1>
                        </motion.header>

                        <div className="space-y-6 text-xl text-secondary-foreground font-medium leading-[1.8]">
                            <motion.p variants={itemVariants} className="border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-xl">
                                현장을 이해하고, 구조를 설계하는 기획자.
                            </motion.p>
                            <motion.p variants={itemVariants}>
                                10년간 e커머스에서 운영과 전략을 경험하며<br />
                                문제를 흐름으로 읽고, 프로세스로 해결해왔습니다.
                            </motion.p>
                            <motion.p variants={itemVariants} className="text-brand-dark font-bold">
                                기획은 아이디어가 아니라<br />
                                성과로 이어지는 설계라고 믿습니다.
                            </motion.p>
                        </div>

                        <motion.div variants={itemVariants} className="flex gap-4 mt-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-border text-sm font-bold text-secondary-foreground">
                                <Target className="w-4 h-4 text-primary" /> 구조 중심 기획
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-border text-sm font-bold text-secondary-foreground">
                                <Zap className="w-4 h-4 text-primary" /> 데이터 드리븐
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* 2. Case Studies Section */}
            <section className="py-32 px-6 md:px-12">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Milestones</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-brand-dark tracking-tighter">
                                케이스 스터디
                            </h2>
                        </motion.div>
                        <motion.p variants={itemVariants} className="text-secondary-foreground text-lg pb-2 max-w-sm">
                            치열하게 고민하고 성과를 만들었던<br /> 주요 프로젝트의 기록입니다.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={listVariants}
                        className="grid grid-cols-1 gap-4"
                    >
                        {caseStudies.map((item, index) => (
                            <motion.div key={item.id} variants={itemVariants}>
                                <Link
                                    href={`/about/case-study/${item.id}`}
                                    className="group relative block bg-white border border-border/60 p-6 md:p-8 rounded-[2rem] hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(53,91,229,0.08)] cursor-pointer"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-6">
                                            <span className="text-2xl font-black text-secondary/30 group-hover:text-primary/20 transition-colors duration-500 font-mono">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <div>
                                                <span className="inline-block px-3 py-1 bg-secondary/30 rounded-full text-[10px] font-black text-secondary-foreground uppercase tracking-wider mb-2 group-hover:bg-primary group-hover:text-white transition-all">
                                                    {item.tag}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-bold text-brand-dark group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-secondary/40 group-hover:text-primary transition-all group-hover:translate-x-2">
                                            <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">자세히 보기</span>
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                    </div>

                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-20 text-center"
                    >
                        <p className="text-secondary-foreground mb-8">
                            더 많은 경험과 디테일한 포트폴리오가 궁금하신가요?
                        </p>
                        <Link href="/contact" className="inline-flex px-10 py-4 bg-primary text-white rounded-full font-bold hover:bg-accent transition-all hover:shadow-2xl active:scale-95 items-center gap-3 mx-auto">
                            경력기술서 요청하기 <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
