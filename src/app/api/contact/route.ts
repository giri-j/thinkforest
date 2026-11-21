// ─────────────────────────────────────────────────────────────
// POST /api/contact
// Contact 폼 내용을 받아 Resend로 기리 메일함에 보내는 서버 코드입니다.
// API 키는 서버에만 있어서 방문자 브라우저에 노출되지 않습니다.
// ─────────────────────────────────────────────────────────────
import { NextResponse } from 'next/server';
import {
  EMAIL_RE,
  LIMITS,
  TOPICS,
  topicLabel,
} from '@/components/contact/contact-config';

export const runtime = 'nodejs';

const MIN_FILL_MS = 2500; // 2.5초 안에 다 채운 제출은 봇으로 간주

type Payload = {
  topic?: unknown;
  name?: unknown;
  email?: unknown;
  org?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown; // 허니팟(사람 눈에는 안 보이는 칸)
  elapsed?: unknown;
};

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // 1) 봇 차단: 허니팟이 채워졌거나 너무 빨리 제출되면 조용히 "성공"인 척 끝냅니다.
  if (str(body.website)) return NextResponse.json({ ok: true });
  if (typeof body.elapsed === 'number' && body.elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  // 2) 입력값 검사 (브라우저에서 한 번 했어도 서버에서 다시 확인)
  const topic = str(body.topic);
  const name = str(body.name);
  const email = str(body.email);
  const org = str(body.org);
  const message = str(body.message);

  const valid =
    TOPICS.some((t) => t.id === topic) &&
    name.length > 0 &&
    name.length <= LIMITS.name &&
    EMAIL_RE.test(email) &&
    email.length <= LIMITS.email &&
    org.length <= LIMITS.org &&
    message.length >= LIMITS.messageMin &&
    message.length <= LIMITS.messageMax &&
    body.consent === true;

  if (!valid) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  // 3) 환경변수 확인 (Vercel > Settings > Environment Variables 에 넣는 값)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || '기획의 숲 <onboarding@resend.dev>';

  if (!apiKey || !to) {
    console.error('[contact] RESEND_API_KEY 또는 CONTACT_TO_EMAIL 환경변수가 없습니다.');
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 });
  }

  // 4) 메일 본문 만들기
  const label = topicLabel(topic);
  const rows: [string, string][] = [
    ['유형', label],
    ['이름', name],
    ['이메일', email],
    ...(org ? ([['소속', org]] as [string, string][]) : []),
  ];

  const html = `
  <div style="font-family:-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;max-width:560px;margin:0 auto;padding:28px;background:#0b0f0c;color:#f2ede3;border-radius:14px">
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:.24em;color:#e1b970;font-family:monospace">[ 기획의 숲 ] — NEW LETTER</p>
    <h1 style="margin:0 0 22px;font-size:22px;line-height:1.4">${esc(name)}님이 ${esc(label)} 편지를 보냈어요</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:22px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;color:rgba(242,237,227,.55);width:84px;border-bottom:1px solid rgba(242,237,227,.1)">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid rgba(242,237,227,.1)">${esc(v)}</td></tr>`,
        )
        .join('')}
    </table>
    <div style="white-space:pre-wrap;font-size:15px;line-height:1.75;padding:18px;border-radius:10px;background:rgba(242,237,227,.05)">${esc(message)}</div>
    <p style="margin:22px 0 0;font-size:12px;color:rgba(242,237,227,.5)">이 메일에서 바로 '답장'을 누르면 ${esc(email)} 로 회신됩니다.</p>
  </div>`;

  const text = [
    `[기획의 숲] ${label} 편지`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    message,
  ].join('\n');

  // 5) Resend로 발송
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email, // 받은 메일에서 '답장'을 누르면 문의자에게 바로 감
        subject: `[기획의 숲] ${label} · ${name}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      console.error('[contact] Resend 오류', res.status, await res.text());
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('[contact] 발송 중 예외', err);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
