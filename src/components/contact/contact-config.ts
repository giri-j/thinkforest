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
    placeholder: '편하게 제안주세요.\n긍정적으로 검토할게요.\n프로젝트에 대한 설명 부탁드려요.',
  },
  {
    id: 'collab',
    label: '협업·제안',
    placeholder: '함께 해보고 싶은 일을 편하게 적어주세요.\n참고할 링크가 있다면 같이 붙여주세요.',
  },
  {
    id: 'hello',
    label: '아무거나',
    placeholder: '안부, 질문, 응원… 무엇이든 좋아요.',
  },
] as const;

export type TopicId = (typeof TOPICS)[number]['id'];


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
