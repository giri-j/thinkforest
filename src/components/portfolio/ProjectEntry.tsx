/* 프로젝트 한 건 — 번호·분야 줄 → (미디어 | 제목·설명·Role·Period·링크).
   미디어가 없으면 큰 번호를 장식으로 둔 한 열짜리 짧은 카드. */

import Link from 'next/link'
import type { Project, ProjectLink } from '@/app/portfolio/portfolioData'
import ProjectMedia from './ProjectMedia'
import s from '@/components/blog/desk/desk.module.css'
import p from './portfolio.module.css'

function LinkButton({ l }: { l: ProjectLink }) {
  if (l.kind === 'locked') {
    return (
      <span className={p.locked} aria-disabled="true">
        <span className={s.mono}>Private</span>{l.label}
      </span>
    )
  }
  if (l.kind === 'blog') return <Link href={l.href} className={p.lnk}>{l.label} →</Link>
  // site
  if (l.href.startsWith('/')) return <Link href={l.href} className={p.lnk}>{l.label} ↗</Link>
  return <a href={l.href} target="_blank" rel="noopener noreferrer" className={p.lnk}>{l.label} ↗</a>
}

export default function ProjectEntry({ project: pr, no, fieldEn }: { project: Project; no: string; fieldEn: string }) {
  const body = (
    <div className={p.text}>
      <h3 className={p.title}>{pr.title}</h3>
      <p className={p.org}>{pr.org}</p>
      <p className={p.summary}>{pr.summary}</p>
      {pr.metric && <p className={`${p.metric} ${s.gold}`}>{pr.metric}</p>}
      <dl className={p.meta}>
        <div><dt className={s.mono}>Role</dt><dd>{pr.role}</dd></div>
        <div><dt className={s.mono}>Period</dt><dd>{pr.period}</dd></div>
      </dl>
      {pr.links && pr.links.length > 0 && (
        <div className={p.links}>{pr.links.map((l) => <LinkButton key={l.label} l={l} />)}</div>
      )}
    </div>
  )

  return (
    <article id={pr.id} className={`${p.entry} ${pr.media ? p.withMedia : p.noMedia}`} data-rv>
      <div className={`${p.entryHead} ${s.mono}`}>
        <span>{no} — {fieldEn} › {pr.title}</span>
        <span>{pr.sortYear}</span>
      </div>
      {pr.media ? (
        <div className={p.grid}>
          <ProjectMedia media={pr.media} title={pr.title} />
          {body}
        </div>
      ) : (
        <div className={p.solo}>
          <span className={p.bigNo} aria-hidden="true">{no}</span>
          {body}
        </div>
      )}
    </article>
  )
}
