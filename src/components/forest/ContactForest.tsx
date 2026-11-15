'use client'

/* Contact — 홈의 스토리에서 "다음 열매를 심는 자리".
   은하수 영상·세계수 대신 홈 시퀀스의 프레임(불 켜진 사과) 위에서 시작하고,
   아래는 About · 블로그와 같은 괘선 문법(섹션 번호, 표, 통계 줄)으로 짠다. */

import { useRef, useState } from 'react'
import Image from 'next/image'
import d from '@/components/blog/desk/desk.module.css'
import { useReveal } from './useReveal'
import f from './forest.module.css'

const CHANNELS = [
  { no: '01', k: 'Email', v: 'jek5797@naver.com', note: '가장 빠릅니다', href: 'mailto:jek5797@naver.com' },
  { no: '02', k: 'Instagram', v: '@gianteunkil', note: '일상과 공간', href: 'https://www.instagram.com/gianteunkil/' },
  { no: '03', k: 'Youtube', v: '@iamgil_Official', note: '기획 이야기', href: 'https://www.youtube.com/@iamgil_Official' },
]

const FACTS = [
  { v: '2~3', u: '일', l: '답장까지 보통 걸리는 시간' },
  { v: 'Seoul', u: '', l: '서울 기준 · 온라인 미팅 환영' },
  { v: '3', u: '가지', l: '기획 · 협업 · 사업 제안 모두' },
]

export default function ContactForest() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', projectIdea: '', message: '' })
  useReveal(rootRef)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value })
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 전송 백엔드가 없으므로 메일 앱으로 넘긴다 — 입력한 내용이 제목과 본문에 미리 채워진다
    const subject = `[기획의 숲] ${form.projectIdea.trim() || '제안'} — ${form.name.trim()}`
    const body = `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`
    window.location.href = `mailto:jek5797@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div ref={rootRef} className={f.page}>
      {/* 01 — 히어로: 블로그 주제 페이지와 같은 프레임 히어로 */}
      <section className={d.catHero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={d.heroBg} src="/practice3/o/030.webp" alt="" fetchPriority="high" />
        <div className={d.catShade} />
        <div className={f.contactHead}>
          <p className={d.eyebrow} data-rv>[ 01 ] — Contact · 다음 열매를 심는 자리</p>
          <h1 className={f.contactH1} data-rv style={{ ['--d' as string]: 1 }}>무엇이든<br />제안해주세요.</h1>
          <p className={f.contactLead} data-rv style={{ ['--d' as string]: 2 }}>
            불이 켜진 생각 하나면 충분합니다. 기획, 협업, 사업 — 어떤 이야기든 이 숲의 다음 열매가 될 수 있습니다.
          </p>
        </div>
      </section>

      {/* 통계 줄 — About의 stats와 같은 문법 */}
      <section className={d.pad}>
        <dl className={`${f.stats} ${f.facts}`} data-rv>
          {FACTS.map((s) => (
            <div key={s.l} className={f.stat}>
              <dt>{s.l}</dt>
              <dd><b>{s.v}</b>{s.u && <small>{s.u}</small>}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 02 / 03 — 채널 표 + 제안 폼 */}
      <section className={`${f.sec} ${f.contactGrid}`}>
        <div data-rv>
          <h2 className={f.secHead}><span><b>[ 02 ]</b> — Channels</span><span>어디로든</span></h2>
          <ul className={f.channels}>
            {CHANNELS.map((c) => (
              <li key={c.k}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <span className={d.mono}>{c.no}</span>
                  <span className={f.chName}>{c.k}<em>{c.note}</em></span>
                  <span className={f.chVal}>{c.v}</span>
                  <span className={`${d.mono} ${d.gold}`}>↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={f.chNote}>
            폼으로 보내면 메일 앱이 열리고, 적은 내용이 제목과 본문에 미리 채워집니다.
          </p>
        </div>

        <form className={f.form} onSubmit={onSubmit} data-rv style={{ ['--d' as string]: 1 }}>
          <h2 className={f.secHead}><span><b>[ 03 ]</b> — Proposal</span><span>숲지기 기리가 읽습니다</span></h2>
          <div className={f.fields}>
            <label className={f.field}>
              <span className={`${d.mono} ${d.caps}`}>Name</span>
              <input type="text" required placeholder="이름" value={form.name} onChange={set('name')} />
            </label>
            <label className={f.field}>
              <span className={`${d.mono} ${d.caps}`}>Email</span>
              <input type="email" required placeholder="your@email.com" value={form.email} onChange={set('email')} />
            </label>
            <label className={`${f.field} ${f.fieldWide}`}>
              <span className={`${d.mono} ${d.caps}`}>Project idea</span>
              <input type="text" required placeholder="어떤 내용에 대한 제안인가요?" value={form.projectIdea} onChange={set('projectIdea')} />
            </label>
            <label className={`${f.field} ${f.fieldWide}`}>
              <span className={`${d.mono} ${d.caps}`}>Message</span>
              <textarea rows={5} required placeholder="제안 내용을 자세히 들려주세요." value={form.message} onChange={set('message')} />
            </label>
          </div>
          <div className={f.formFoot}>
            <button type="submit" className={`${f.pill} ${f.submit}`}>Submit proposal →</button>
            {sent
              ? <p className={`${f.sent} ${d.mono}`} role="status">메일 앱이 열립니다. 열리지 않으면 jek5797@naver.com으로 보내 주세요.</p>
              : <p className={`${f.sentHint} ${d.mono}`}>Opens your mail app · 메일 앱으로 이어집니다</p>}
          </div>
        </form>
      </section>

      {/* 마무리 — 홈 엔딩 · 블로그 note와 같은 결. 너구리는 About CTA처럼 작게 */}
      <section className={f.contactEnd}>
        <div className={f.raccoonSm} data-rv aria-hidden>
          <Image src="/contact_img/raccoon-sit.png" alt="" fill sizes="140px" style={{ objectFit: 'contain' }} />
        </div>
        <p className={f.endLine} data-rv style={{ ['--d' as string]: 1 }}>
          좋은 사업은 늘 <span className={d.gold}>사과 한 알</span>에서 시작했습니다.
        </p>
        <p className={`${d.mono} ${d.grey}`} data-rv style={{ ['--d' as string]: 2 }}>— 숲지기 너구리 기리</p>
      </section>
    </div>
  )
}
