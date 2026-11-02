'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import {
    heroCopy,
    stats,
    principles,
    growth,
    featuredCases,
    otherProjects,
    ctaCopy,
} from './aboutData'

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

const stagger = (delay = 0.1): Variants => ({
    hidden: {},
    visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
})

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger()}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20"
        >
            <motion.div variants={fadeUp}>
                <span className="block text-sm font-bold uppercase tracking-[0.25em] text-warm mb-4">{eyebrow}</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-brand-dark leading-tight">{title}</h2>
            </motion.div>
            {desc && (
                <motion.p variants={fadeUp} className="max-w-sm text-lg leading-relaxed text-secondary-foreground/80">
                    {desc}
                </motion.p>
            )}
        </motion.div>
    )
}

export default function AboutPage() {
    const reduceMotion = useReducedMotion()
    const growthRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: growthRef, offset: ['start 70%', 'end 60%'] })
    const trunkScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
            {/* 1. Hero */}
            <section className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger(0.12)}
                    className="mx-auto flex max-w-6xl flex-col items-center gap-14 md:flex-row md:gap-20"
                >
                    <motion.div variants={fadeUp} className="relative h-80 w-64 shrink-0 md:h-[500px] md:w-[400px]">
                        <div className="absolute inset-4 -rotate-3 rounded-[2rem] border-2 border-warm/40" />
                        <div className="absolute inset-0 rotate-3 overflow-hidden rounded-[2rem] bg-secondary shadow-2xl transition-transform duration-700 hover:rotate-0">
                            <Image
                                src="/about_img/giri_picture.jpeg"
                                alt="기획자 기리(전은길)"
                                fill
                                sizes="(min-width: 768px) 400px, 256px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-8">
                        <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.18em] text-warm md:text-sm md:tracking-[0.25em]">
                            {heroCopy.eyebrow}
                        </motion.span>
                        <motion.h1
                            variants={fadeUp}
                            className="text-[2.6rem] font-bold leading-[1.15] tracking-tighter text-brand-dark md:text-7xl"
                        >
                            {heroCopy.titleLines[0]}
                            <br />
                            <span className="relative inline-block isolate">
                                {heroCopy.titleLines[1]}
                                <span className="absolute -bottom-1 left-0 h-3 w-full -z-10 bg-warm/40 md:h-4" />
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-lg font-medium leading-[1.8] text-secondary-foreground md:text-xl">
                            {heroCopy.lead[0]}
                            <br className="hidden md:block" /> {heroCopy.lead[1]}
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="border-l-4 border-warm bg-warm/10 py-3 pl-6 pr-4 text-lg font-bold text-brand-dark rounded-r-xl"
                        >
                            {heroCopy.belief}
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-sm font-semibold text-secondary-foreground/70">
                            {heroCopy.name} · {heroCopy.role}
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* 2. Proof in numbers */}
            <section className="bg-brand-dark px-6 py-16 text-background md:px-12 md:py-20">
                <motion.dl
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={stagger(0.08)}
                    className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5"
                >
                    {stats.map((s) => (
                        <motion.div key={s.label} variants={fadeUp} className="flex flex-col-reverse gap-2">
                            <dt className="text-sm leading-snug text-background/60">{s.label}</dt>
                            <dd className="font-bold tracking-tighter text-background">
                                <span className="text-4xl md:text-5xl">{s.value}</span>
                                {s.unit && <span className="ml-1 text-xl text-warm md:text-2xl">{s.unit}</span>}
                            </dd>
                        </motion.div>
                    ))}
                </motion.dl>
            </section>

            {/* 3. How I work */}
            <section className="px-6 py-28 md:px-12 md:py-36">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="How I Work"
                        title="일하는 방식"
                        desc="12년 동안 회사와 업무는 바뀌었지만, 일하는 방식은 한 번도 바뀌지 않았습니다."
                    />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={stagger(0.12)}
                        className="grid grid-cols-1 gap-6 md:grid-cols-3"
                    >
                        {principles.map((p) => (
                            <motion.article
                                key={p.no}
                                variants={fadeUp}
                                className="flex flex-col rounded-[2rem] border border-border/60 bg-white p-8 md:p-10"
                            >
                                <span className="mb-8 font-mono text-sm font-bold text-warm">{p.no}</span>
                                <h3 className="mb-4 text-2xl font-bold tracking-tight text-brand-dark">{p.title}</h3>
                                <p className="mb-8 flex-1 leading-[1.8] text-secondary-foreground/80">{p.body}</p>
                                <p className="border-t border-border/60 pt-5 text-sm font-bold text-brand-dark">{p.proof}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. Growth — roots, trunk, branches */}
            <section className="relative bg-secondary/50 px-6 py-28 md:px-12 md:py-36">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader
                        eyebrow="Growth Rings"
                        title="한 그루가 자란 기록"
                        desc="현장에 뿌리를 내리고, 서비스로 줄기를 세우고, 사업으로 가지를 뻗어왔습니다."
                    />

                    <div ref={growthRef} className="relative">
                        {/* trunk line: transform만 애니메이션 */}
                        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-brand-dark/10 md:left-[calc(25%+11px)]" />
                        <motion.div
                            style={{ scaleY: reduceMotion ? 1 : trunkScale }}
                            className="absolute left-[11px] top-2 bottom-2 w-[2px] origin-top bg-brand-dark md:left-[calc(25%+11px)]"
                        />

                        <div className="flex flex-col gap-16 md:gap-24">
                            {growth.map((g) => (
                                <motion.div
                                    key={g.stage}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-100px' }}
                                    variants={stagger(0.08)}
                                    className="relative grid grid-cols-1 gap-4 pl-12 md:grid-cols-4 md:gap-0 md:pl-0"
                                >
                                    <motion.div variants={fadeUp} className="md:pr-12 md:text-right">
                                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-warm">{g.stageEn}</p>
                                        <p className="text-3xl font-bold tracking-tighter text-brand-dark">{g.stage}</p>
                                        <p className="mt-1 font-mono text-sm text-secondary-foreground/70">{g.period}</p>
                                    </motion.div>

                                    <span className="absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-background bg-brand-dark md:left-[25%]" />

                                    <motion.div variants={fadeUp} className="md:col-span-3 md:pl-14">
                                        <h3 className="text-2xl font-bold tracking-tight text-brand-dark">{g.org}</h3>
                                        <p className="mb-4 mt-1 text-sm font-semibold text-secondary-foreground/70">{g.role}</p>
                                        <p className="mb-6 text-lg leading-[1.8] text-secondary-foreground">{g.summary}</p>
                                        <ul className="flex flex-wrap gap-2">
                                            {g.highlights.map((h) => (
                                                <li
                                                    key={h}
                                                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-bold text-brand-dark"
                                                >
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Featured cases */}
            <section className="px-6 py-28 md:px-12 md:py-36">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="Case Studies"
                        title="대표 프로젝트"
                        desc="각 프로젝트는 하나의 길입니다. 현장의 문제에서 출발해 구조를 바꾸고, 숫자로 끝났습니다."
                    />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={stagger(0.08)}
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                        {featuredCases.map((c, i) => {
                            const card = (
                                <>
                                    <div className="mb-8 flex items-start justify-between gap-4">
                                        <div>
                                            <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-black uppercase tracking-wider text-secondary-foreground">
                                                {c.tag}
                                            </span>
                                            <p className="text-sm font-semibold text-secondary-foreground/70">{c.org}</p>
                                        </div>
                                        <span className="font-mono text-2xl font-black text-secondary">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h3 className="mb-6 text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">{c.title}</h3>
                                    <dl className="mb-8 flex-1 space-y-3 text-[15px] leading-relaxed">
                                        <div className="grid grid-cols-[3.5rem_1fr] gap-3">
                                            <dt className="font-bold text-secondary-foreground/50">문제</dt>
                                            <dd className="text-secondary-foreground">{c.problem}</dd>
                                        </div>
                                        <div className="grid grid-cols-[3.5rem_1fr] gap-3">
                                            <dt className="font-bold text-secondary-foreground/50">접근</dt>
                                            <dd className="text-secondary-foreground">{c.approach}</dd>
                                        </div>
                                        <div className="grid grid-cols-[3.5rem_1fr] gap-3">
                                            <dt className="font-bold text-secondary-foreground/50">결과</dt>
                                            <dd className="text-secondary-foreground">{c.result}</dd>
                                        </div>
                                    </dl>
                                    <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-6">
                                        <p className="text-lg font-bold text-brand-dark">{c.metric}</p>
                                        {c.href ? (
                                            <span className="flex items-center gap-1 text-sm font-bold text-secondary-foreground/50 transition-colors group-hover:text-accent">
                                                자세히 보기
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        ) : (
                                            <span className="text-sm font-bold text-secondary-foreground/40">상세 준비 중</span>
                                        )}
                                    </div>
                                </>
                            )
                            const cls =
                                'group flex h-full flex-col rounded-[2rem] border border-border/60 bg-white p-8 md:p-10 transition-[border-color,box-shadow] duration-500'
                            return (
                                <motion.div key={c.id} variants={fadeUp}>
                                    {c.href ? (
                                        <Link
                                            href={c.href}
                                            className={`${cls} hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(28,46,36,0.08)]`}
                                        >
                                            {card}
                                        </Link>
                                    ) : (
                                        <div className={cls}>{card}</div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 6. Other projects */}
            <section className="px-6 pb-28 md:px-12 md:pb-36">
                <div className="mx-auto max-w-6xl">
                    <motion.h3
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-8 text-2xl font-bold tracking-tight text-brand-dark"
                    >
                        그 외 걸어온 길
                    </motion.h3>
                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={stagger(0.05)}
                        className="grid grid-cols-1 gap-x-10 border-t border-border md:grid-cols-2"
                    >
                        {otherProjects.map((p) => {
                            const inner = (
                                <>
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <p className="font-bold text-brand-dark">{p.title}</p>
                                        <span className="shrink-0 text-[11px] font-black uppercase tracking-wider text-secondary-foreground/50">
                                            {p.tag}
                                        </span>
                                    </div>
                                    <p className="mb-1 text-xs font-semibold text-secondary-foreground/60">{p.org}</p>
                                    <p className="text-sm leading-relaxed text-secondary-foreground/80">
                                        {p.note}
                                        {p.href && <ArrowUpRight className="ml-1 inline h-4 w-4 text-accent" />}
                                    </p>
                                </>
                            )
                            return (
                                <motion.li key={p.title} variants={fadeUp} className="border-b border-border">
                                    {p.href ? (
                                        <Link href={p.href} className="block py-6 transition-opacity hover:opacity-70">
                                            {inner}
                                        </Link>
                                    ) : (
                                        <div className="py-6">{inner}</div>
                                    )}
                                </motion.li>
                            )
                        })}
                    </motion.ul>
                </div>
            </section>

            {/* 7. CTA */}
            <section className="relative overflow-hidden bg-brand-dark px-6 py-28 text-background md:px-12 md:py-32">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={stagger(0.12)}
                    className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:justify-between"
                >
                    <div className="text-center md:text-left">
                        <motion.span
                            variants={fadeUp}
                            className="mb-5 block text-sm font-bold uppercase tracking-[0.25em] text-warm"
                        >
                            {ctaCopy.eyebrow}
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="mb-6 text-3xl font-bold leading-snug tracking-tighter md:text-5xl">
                            {ctaCopy.titleLines[0]}
                            <br />
                            {ctaCopy.titleLines[1]}
                        </motion.h2>
                        <motion.p variants={fadeUp} className="mb-10 text-lg text-background/70">
                            {ctaCopy.body}
                        </motion.p>
                        <motion.div variants={fadeUp}>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 rounded-full bg-warm px-10 py-4 font-bold text-brand-dark transition-transform hover:scale-[1.03] active:scale-95"
                            >
                                {ctaCopy.button} <ArrowRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div variants={fadeUp} className="relative h-40 w-40 shrink-0 md:h-56 md:w-56">
                        <div className="absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgba(232,184,109,0.35)_0%,rgba(232,184,109,0)_65%)]" />
                        <Image
                            src="/contact_img/raccoon-sit.png"
                            alt="숲을 지키는 너구리 기리"
                            fill
                            sizes="(min-width: 768px) 224px, 160px"
                            className="object-contain"
                        />
                    </motion.div>
                </motion.div>
            </section>
        </main>
    )
}
