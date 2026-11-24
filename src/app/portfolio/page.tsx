import type { Metadata } from 'next'
import Link from 'next/link'
import { FIELDS, PROJECTS, projectsByField, type Field, type Project } from './portfolioData'
import FieldBar from '@/components/portfolio/FieldBar'
import ProjectIndex from '@/components/portfolio/ProjectIndex'
import ProjectEntry from '@/components/portfolio/ProjectEntry'
import Reveal from '@/components/portfolio/Reveal'
import s from '@/components/blog/desk/desk.module.css'
import f from '@/components/forest/forest.module.css'
import p from '@/components/portfolio/portfolio.module.css'

export const metadata: Metadata = {
    title: 'Portfolio — 기획의 숲',
    description: 'IT 서비스부터 현장 운영, 사업과 그 밖의 일까지. 기획자 기리가 해본 일 전부.',
}

/* 전체 목차는 분야와 상관없이 시간 역순. 진행 중인 일이 맨 위, 같은 해는 'YYYY.MM'의 달로 한 번 더 가르고,
   달을 모르면 원고 순서를 따른다. 번호(01~25)도 이 순서로 매겨 목차와 각 프로젝트가 같은 번호를 쓴다. */
function timeKey(pr: Project) {
    if (pr.period.includes('진행 중')) return pr.sortYear * 100 + 13
    const months = [...pr.period.matchAll(/(\d{4})\.(\d{2})/g)].filter((m) => Number(m[1]) === pr.sortYear).map((m) => Number(m[2]))
    return pr.sortYear * 100 + (months.length ? Math.max(...months) : 0)
}
const ORDERED = [...PROJECTS].sort((a, b) => timeKey(b) - timeKey(a))
const NUMBERS: Record<string, string> = Object.fromEntries(ORDERED.map((pr, i) => [pr.id, String(i + 1).padStart(2, '0')]))
const COUNTS = Object.fromEntries(FIELDS.map((fd) => [fd.key, PROJECTS.filter((pr) => pr.field === fd.key).length])) as Record<Field, number>

export default function PortfolioPage() {
    return (
        <Reveal className={f.page}>
            <header className={`${s.magHead} ${s.in}`}>
                <p className={s.eyebrow}>[ 03 ] — Portfolio</p>
                <h1 className={s.pageTitle}>Portfolio<span>해본 일 전부, 한곳에</span></h1>
                <p className={`${s.pageDesc} ${p.lead}`}>IT 서비스부터 현장 운영, 사업과 그 밖의 일까지. 기획자로 걸어온 일을 빠짐없이 모았습니다.</p>
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
                    </div>
                </div>
            </section>
        </Reveal>
    )
}
