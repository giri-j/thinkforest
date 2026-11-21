// ─────────────────────────────────────────────────────────────
// Contact 설정 파일
// 문구·선택지·이메일은 여기서만 고치면 화면과 메일에 함께 반영됩니다.
// (화면 컴포넌트와 서버 API가 같이 읽는 파일이라 'use client'를 넣지 않습니다.)
// ─────────────────────────────────────────────────────────────

export const CONTACT_EMAIL = 'jek5797@naver.com';
export const REPLY_TIME = '2~3일';

export const SOCIALS = [
  { kind: 'instagram', label: '@gianteunkil', href: 'https://www.instagram.com/gianteunkil/' },
  { kind: 'youtube', label: '@iamgil_Official', href: 'https://www.youtube.com/@iamgil_Official' },
] as const;

export const TOPICS = [
  {
    id: 'project',
    label: '프로젝트 의뢰',
    placeholder:
      '어떤 서비스를 준비 중이신가요?\n지금 단계(아이디어·기획·개발 중)와 가장 고민되는 점을 적어주시면 첫 답장이 훨씬 구체적이에요.',
  },
  {
    id: 'collab',
    label: '협업·제안',
    placeholder: '함께 해보고 싶은 일을 편하게 적어주세요.\n참고할 링크가 있다면 같이 붙여주세요.',
  },
  {
    id: 'edu',
    label: '강의·교육',
    placeholder: '대상, 주제, 희망 일정과 시간을 알려주세요.',
  },
  {
    id: 'hello',
    label: '그냥 인사',
    placeholder: '안부, 질문, 응원… 무엇이든 좋아요.',
  },
] as const;

export type TopicId = (typeof TOPICS)[number]['id'];

// '프로젝트 의뢰'를 골랐을 때만 보이는 선택 항목 (둘 다 선택 사항)
export const TIMELINES = ['한 달 안', '1~3개월', '3개월 이후', '아직 미정'] as const;
export const BUDGETS = ['500만 원 미만', '500만~2,000만 원', '2,000만 원 이상', '아직 미정'] as const;

export const LIMITS = {
  name: 40,
  email: 120,
  org: 80,
  messageMin: 10,
  messageMax: 2000,
} as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function topicLabel(id: string): string {
  return TOPICS.find((t) => t.id === id)?.label ?? '문의';
}
