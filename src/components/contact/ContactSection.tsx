'use client';

// ─────────────────────────────────────────────────────────────
// Contact 섹션 전체 (왼쪽: 소개·연락처 / 오른쪽: 편지 폼)
// 기존 contact 페이지의 <section className={styles.reach}> … </section> 자리를
// <ContactSection /> 한 줄로 바꾸면 됩니다.
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, KeyboardEvent } from 'react';
import s from './ContactSection.module.css';
import {
  CONTACT_EMAIL,
  EMAIL_RE,
  LIMITS,
  REPLY_TIME,
  SOCIALS,
  TOPICS,
  topicLabel,
  type TopicId,
} from './contact-config';

type Fields = {
  topic: TopicId | '';
  name: string;
  email: string;
  org: string;
  message: string;
  consent: boolean;
};

type FieldKey = keyof Fields;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: Fields = {
  topic: '',
  name: '',
  email: '',
  org: '',
  message: '',
  consent: false,
};

const DRAFT_KEY = 'tf-contact-draft-v1';

// 등장 애니메이션 순서(0,1,2…)를 CSS로 넘기는 도우미
const d = (n: number) => ({ '--d': n }) as CSSProperties;

function validate(f: Fields): Partial<Record<FieldKey, string>> {
  const e: Partial<Record<FieldKey, string>> = {};
  if (!f.topic) e.topic = '어떤 이야기인지 하나 골라주세요.';
  if (!f.name.trim()) e.name = '어떻게 불러드리면 될지 알려주세요.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = '답장 받으실 이메일 주소를 확인해주세요.';
  if (f.message.trim().length < LIMITS.messageMin)
    e.message = `${LIMITS.messageMin}자 이상 적어주시면 더 정확하게 답장드릴 수 있어요.`;
  if (!f.consent) e.consent = '답장을 위해 이름·이메일 수집에 동의가 필요해요.';
  return e;
}

/* ───────────── 작은 부품들 ───────────── */

function SeoulNow() {
  const [now, setNow] = useState<string>('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      hour: 'numeric',
      minute: '2-digit',
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className={s.now} aria-label={now ? `서울 현재 시각 ${now}` : undefined}>
      <span className={s.dot} aria-hidden="true" />
      Seoul {now || '—'}
    </span>
  );
}

function CopyEmail({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // 클립보드 권한이 막힌 환경 대비
      const ta = document.createElement('textarea');
      ta.value = CONTACT_EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <span className={compact ? s.copyCompact : s.copyRow}>
      <span className={s.mono}>{CONTACT_EMAIL}</span>
      <button type="button" className={s.copyBtn} onClick={copy} aria-live="polite">
        {copied ? '복사됨 ✓' : '복사'}
      </button>
    </span>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  if (kind === 'instagram')
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Chips({
  name,
  options,
  value,
  onChange,
  invalid,
  describedBy,
}: {
  name: string;
  options: readonly { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  describedBy?: string;
}) {
  return (
    <div className={s.chips} role="radiogroup" aria-invalid={invalid || undefined} aria-describedby={describedBy}>
      {options.map((o) => (
        <label key={o.id} className={s.chip} data-on={value === o.id || undefined}>
          <input
            type="radio"
            name={name}
            value={o.id}
            checked={value === o.id}
            onChange={() => onChange(o.id)}
            onClick={() => {
              // 선택 사항 칩은 한 번 더 누르면 해제
              if (value === o.id && name !== 'topic') onChange('');
            }}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function Envelope() {
  return (
    <svg className={s.envelope} viewBox="0 0 120 84" fill="none" aria-hidden="true">
      <rect x="2" y="12" width="116" height="70" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <path className={s.flap} d="M4 15 L60 52 L116 15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 80 L46 44 M116 80 L74 44" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
      <circle className={s.seal} cx="60" cy="52" r="6" fill="currentColor" />
    </svg>
  );
}

/* ───────────── 메인 섹션 ───────────── */

export default function ContactSection() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const [f, setF] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [sentAs, setSentAs] = useState<{ name: string; email: string; topic: string } | null>(null);
  const [website, setWebsite] = useState(''); // 허니팟
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // 작성 중인 내용 임시 저장(새로고침해도 유지)
  useEffect(() => {
    startedAt.current = Date.now();
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) setF({ ...EMPTY, ...JSON.parse(raw), consent: false });
    } catch {}
  }, []);
  useEffect(() => {
    if (status === 'sent') return;
    try {
      const { consent: _c, ...rest } = f;
      void _c;
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
    } catch {}
  }, [f, status]);

  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus();
  }, [status]);

  const errors = useMemo(() => validate(f), [f]);
  const show = (k: FieldKey) => (submitted || touched[k]) && errors[k];

  const set = <K extends FieldKey>(k: K, v: Fields[K]) => setF((p) => ({ ...p, [k]: v }));
  const blur = (k: FieldKey) => () => setTouched((p) => ({ ...p, [k]: true }));

  const topic = TOPICS.find((t) => t.id === f.topic);

  const submit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      if (status === 'sending') return;
      setSubmitted(true);
      if (Object.keys(errors).length) {
        // 첫 번째 오류 칸으로 이동
        const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (first?.querySelector('input') ?? first)?.focus?.({ preventScroll: true });
        return;
      }
      setStatus('sending');
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...f,
            website,
            elapsed: Date.now() - startedAt.current,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
        if (!res.ok || !data.ok) throw new Error('send_failed');
        setSentAs({ name: f.name.trim(), email: f.email.trim(), topic: f.topic });
        setStatus('sent');
        try {
          window.localStorage.removeItem(DRAFT_KEY);
        } catch {}
      } catch {
        setStatus('error');
      }
    },
    [errors, f, status, website],
  );

  const onMessageKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void submit();
  };

  const reset = () => {
    setF(EMPTY);
    setTouched({});
    setSubmitted(false);
    setStatus('idle');
    setSentAs(null);
    startedAt.current = Date.now();
  };

  // 질문 번호 01, 02 …
  let n = 0;
  const no = () => String(++n).padStart(2, '0');

  const fallbackMail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `[기획의 숲] ${topicLabel(f.topic)} · ${f.name}`,
  )}&body=${encodeURIComponent(f.message)}`;

  return (
    <section className={s.section} aria-labelledby={id('title')}>
      {/* ── 왼쪽: 인사 + 연락처 ── */}
      <div className={s.aside}>
        <div className={s.asideInner}>
          <p className={s.eyebrow} style={d(0)}>
            [ 03 ] — Contact
          </p>
          <h1 id={id('title')} className={s.h1} style={d(1)}>
            Let&apos;s build <em>together.</em>
          </h1>
          <p className={s.sub} style={d(2)}>
            무엇이든 제안해주세요.
            <br />
            긍정적으로 되게 만들어봅시다.
          </p>

          <a href="#letter" className={`${s.pill} ${s.mobileOnly}`} style={d(3)}>
            편지 쓰기 ↓
          </a>

          <dl className={s.meta} style={d(3)}>
            <div>
              <dt>지금</dt>
              <dd>
                <SeoulNow />
              </dd>
            </div>
            <div>
              <dt>답장</dt>
              <dd>보통 {REPLY_TIME} 안에 드려요</dd>
            </div>
            <div>
              <dt>메일</dt>
              <dd>
                <CopyEmail />
              </dd>
            </div>
          </dl>

          <ul className={s.socials} style={d(4)}>
            {SOCIALS.map((so) => (
              <li key={so.href}>
                <a href={so.href} target="_blank" rel="noopener noreferrer" className={s.social}>
                  <SocialIcon kind={so.kind} />
                  <span className={s.mono}>{so.label}</span>
                  <span className={`${s.mono} ${s.socialArrow}`} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 오른쪽: 편지 폼 ── */}
      <div id="letter" className={s.main} style={d(3)}>
        {status === 'sent' && sentAs ? (
          <div className={s.done} role="status">
            <div className={s.flight}>
              <Envelope />
            </div>
            <p className={s.eyebrow}>[ ✓ ] — Delivered</p>
            <h2 ref={doneRef} tabIndex={-1} className={s.doneTitle}>
              편지가 숲에 <em>닿았어요.</em>
            </h2>
            <p className={s.doneBody}>
              {sentAs.name}님, 보내주신 {topicLabel(sentAs.topic)} 이야기 잘 받았어요.
              <br />
              보통 {REPLY_TIME} 안에 <strong>{sentAs.email}</strong>로 답장드릴게요.
            </p>
            <button type="button" className={s.ghost} onClick={reset}>
              다른 이야기 보내기
            </button>
          </div>
        ) : (
          <form ref={formRef} className={s.form} onSubmit={submit} noValidate aria-describedby={id('formhint')}>
            <div className={s.formHead}>
              <p className={s.eyebrow}>[ Letter ] — 숲으로 보내는 편지</p>
              <p id={id('formhint')} className={s.formHint}>
                3분이면 충분해요. <span aria-hidden="true">*</span> 표시만 필수예요.
              </p>
            </div>

            {/* 01 유형 */}
            <fieldset className={s.row} data-err={show('topic') ? '' : undefined}>
              <legend className={s.q}>
                <span className={s.no}>{no()}</span>어떤 이야기인가요? <span className={s.req}>*</span>
              </legend>
              <Chips
                name="topic"
                options={TOPICS}
                value={f.topic}
                onChange={(v) => {
                  set('topic', v as TopicId);
                  setTouched((p) => ({ ...p, topic: true }));
                }}
                invalid={!!show('topic')}
                describedBy={show('topic') ? id('e-topic') : undefined}
              />
              {show('topic') && (
                <p id={id('e-topic')} className={s.err}>
                  {errors.topic}
                </p>
              )}
            </fieldset>

            {/* 02 이름 */}
            <div className={s.row} data-err={show('name') ? '' : undefined}>
              <label htmlFor={id('name')} className={s.q}>
                <span className={s.no}>{no()}</span>어떻게 불러드릴까요? <span className={s.req}>*</span>
              </label>
              <input
                id={id('name')}
                className={s.input}
                autoComplete="name"
                placeholder="이름 또는 닉네임"
                maxLength={LIMITS.name}
                value={f.name}
                onChange={(e) => set('name', e.target.value)}
                onBlur={blur('name')}
                aria-invalid={!!show('name') || undefined}
                aria-describedby={show('name') ? id('e-name') : undefined}
              />
              {show('name') && (
                <p id={id('e-name')} className={s.err}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* 03 이메일 */}
            <div className={s.row} data-err={show('email') ? '' : undefined}>
              <label htmlFor={id('email')} className={s.q}>
                <span className={s.no}>{no()}</span>답장 받으실 이메일 <span className={s.req}>*</span>
              </label>
              <input
                id={id('email')}
                className={s.input}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={LIMITS.email}
                value={f.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={blur('email')}
                aria-invalid={!!show('email') || undefined}
                aria-describedby={show('email') ? id('e-email') : undefined}
              />
              {show('email') && (
                <p id={id('e-email')} className={s.err}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* 04 소속 (선택) */}
            <div className={s.row}>
              <label htmlFor={id('org')} className={s.q}>
                <span className={s.no}>{no()}</span>소속 <span className={s.opt}>선택</span>
              </label>
              <input
                id={id('org')}
                className={s.input}
                autoComplete="organization"
                placeholder="회사 · 팀 · 학교"
                maxLength={LIMITS.org}
                value={f.org}
                onChange={(e) => set('org', e.target.value)}
              />
            </div>


            {/* 05 내용 */}
            <div className={s.row} data-err={show('message') ? '' : undefined}>
              <label htmlFor={id('message')} className={s.q}>
                <span className={s.no}>{no()}</span>하고 싶은 이야기 <span className={s.req}>*</span>
              </label>
              <textarea
                id={id('message')}
                className={`${s.input} ${s.textarea}`}
                rows={5}
                placeholder={topic?.placeholder ?? '먼저 위에서 어떤 이야기인지 골라주시면 무엇을 적으면 좋을지 알려드릴게요.'}
                maxLength={LIMITS.messageMax}
                value={f.message}
                onChange={(e) => set('message', e.target.value)}
                onBlur={blur('message')}
                onKeyDown={onMessageKey}
                aria-invalid={!!show('message') || undefined}
                aria-describedby={`${id('count')}${show('message') ? ` ${id('e-message')}` : ''}`}
              />
              <div className={s.under}>
                {show('message') ? (
                  <p id={id('e-message')} className={s.err}>
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span id={id('count')} className={s.count}>
                  {f.message.length.toLocaleString()} / {LIMITS.messageMax.toLocaleString()}
                </span>
              </div>
            </div>

            {/* 허니팟: 사람에게는 보이지 않는 칸. 봇이 채우면 서버가 걸러냄 */}
            <div className={s.hp} aria-hidden="true">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>

            {/* 동의 + 보내기 */}
            <div className={s.submitRow}>
              <label className={s.consent} data-err={show('consent') ? '' : undefined}>
                <input
                  type="checkbox"
                  checked={f.consent}
                  onChange={(e) => {
                    set('consent', e.target.checked);
                    setTouched((p) => ({ ...p, consent: true }));
                  }}
                  aria-invalid={!!show('consent') || undefined}
                />
                <span>
                  답장을 위해 이름·이메일을 수집하고, 답장 후 1년 뒤 지우는 데 동의해요.{' '}
                  <span className={s.req}>*</span>
                </span>
              </label>
              {show('consent') && <p className={s.err}>{errors.consent}</p>}

              {status === 'error' && (
                <div className={s.errorBox} role="alert">
                  <strong>편지가 길을 잃었어요.</strong> 적어주신 내용은 그대로 남아 있어요. 잠시 후 다시 보내주시거나{' '}
                  <a href={fallbackMail}>메일 앱으로 이어서 보내기</a>를 눌러주세요.
                </div>
              )}

              <div className={s.actions}>
                <button type="submit" className={`${s.pill} ${s.send}`} disabled={status === 'sending'}>
                  {status === 'sending' ? '보내는 중…' : '제안 보내기 →'}
                </button>
                <span className={s.kbd}>⌘ / Ctrl + Enter</span>
              </div>

              <p className={s.alt}>
                폼이 불편하시면 메일로 바로 보내셔도 돼요 · <CopyEmail compact />
              </p>
            </div>

          </form>
        )}
      </div>
    </section>
  );
}
