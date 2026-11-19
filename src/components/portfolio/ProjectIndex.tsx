/* 전체 목차 — 블로그 PostTable처럼 한 줄짜리 표. 행을 누르면 그 프로젝트로 내려간다. */

import type { Field, Project } from '@/app/portfolio/portfolioData'
import s from '@/components/blog/desk/desk.module.css'
import p from './portfolio.module.css'

type FieldMeta = { key: Field; en: string }

export default function ProjectIndex({ projects, numbers, fields }: { projects: Project[]; numbers: Record<string, string>; fields: FieldMeta[] }) {
  const fieldEn = Object.fromEntries(fields.map((f) => [f.key, f.en])) as Record<Field, string>
  return (
    <div className={s.table}>
      <div className={`${s.thead} ${p.idx} ${s.mono} ${s.caps}`}>
        <span>No.</span>
        <span>Project</span>
        <span className={p.idxField}>Field</span>
        <span>Period</span>
      </div>
      {projects.map((pr) => (
        <div key={pr.id} className={`${s.row} ${p.idx}`}>
          <span className={`${s.num} ${s.mono}`}>{numbers[pr.id]}</span>
          <div className={s.titleCell}>
            <a href={`#${pr.id}`} className={`${s.titleLink} ${p.idxTitle}`}>{pr.title}</a>
            {pr.featured && <span className={`${s.badge} ${s.mono}`}>Case Study</span>}
          </div>
          <span className={`${s.mono} ${s.grey} ${p.idxField}`}>{fieldEn[pr.field]}</span>
          <span className={`${s.mono} ${s.grey}`}>{pr.period}</span>
        </div>
      ))}
    </div>
  )
}
