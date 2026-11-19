import type { Metadata } from 'next'
import Link from 'next/link'
import { FIELDS, PROJECTS, projectsByField, type Field } from './portfolioData'
import FieldBar from '@/components/portfolio/FieldBar'
import ProjectIndex from '@/components/portfolio/ProjectIndex'
import ProjectEntry from '@/components/portfolio/ProjectEntry'
import Reveal from '@/components/portfolio/Reveal'
import s from '@/components/blog/desk/desk.module.css'
import f from '@/components/forest/forest.module.css'
import p from '@/components/portfolio/portfolio.module.css'

export const metadata: Metadata = {
    title: 'Portfolio — 기획의 숲',
    description: 'IT 서비스부터 현장 운영, 사업과 곁가지까지. 기획자 기리가 해본 일 전부.',
}

/* 목차와 섹션이 같은 번호를 쓰도록, 분야 순서 → 분야 안 최신순으로 01~25 일련번호를 매긴다 */
const ORDERED = FIELDS.flatMap((fd) => projectsByField(fd.key))
const NUMBERS: Record<string, string> = Object.fromEntries(ORDERED.map((pr, i) => [pr.id, String(i + 1).padStart(2, '0')]))
const COUNTS = Object.fromEntries(FIELDS.map((fd) => [fd.key, PROJECTS.filter((pr) => pr.field === fd.key).length])) as Record<Field, number>

export default function PortfolioPage() {
    return (
        <Reveal className={f.page}>
            <header className={`${s.magHead} ${s.in}`}>
                <p className={s.eyebrow}>[ 02 ] — Portfolio</p>
                <h1 className={s.pageTitle}>Portfolio<span>해본 일 전부, 한곳에</span></h1>
                <p className={`${s.pageDesc} ${p.lead}`}>IT 서비스부터 현장 운영, 사업과 곁가지까지. 기획자로 걸어온 일을 빠짐없이 모았습니다.</p>
            </header>

            <FieldBar fields={FIELDS} counts={COUNTS} total={PROJECTS.length} />

            <section className={`${s.pad} ${p.indexWrap} ${s.in2}`} aria-label="전체 목차">
                <ProjectIndex projects={ORDERED} numbers={NUMBERS} fields={FIELDS} />
            </section>

            {FIELDS.map((fd) => (
                <section key={fd.key} id={`field-${fd.key}`} data-field={fd.key} className={`${s.pad} ${p.field}`}>
                    <header className={p.fieldHead} data-rv>
                        <p className={`${s.mono} ${s.gold}`}>[ {fd.no} ] — {fd.en}</p>
                        <h2>{fd.ko}</h2>
                        <p className={p.fieldNote}>{fd.note}</p>
                    </header>
                    {projectsByField(fd.key).map((pr) => (
                        <ProjectEntry key={pr.id} project={pr} no={NUMBERS[pr.id]} fieldEn={fd.en} />
                    ))}
                </section>
            ))}

            <section className={f.cta}>
                <div>
                    <p className={s.eyebrow} data-rv>Walk Together</p>
                    <p className={f.ctaTitle} data-rv style={{ ['--d' as string]: 1 }}>같이 기획할 일이 있다면</p>
                    <div className={p.ctaRow} data-rv style={{ ['--d' as string]: 2 }}>
                        <Link href="/contact" className={f.pill}>Contact →</Link>
                        <Link href="/blog" className={`${s.mono} ${p.textLink}`}>블로그 보기 →</Link>
                    </div>
                </div>
            </section>
        </Reveal>
    )
}
