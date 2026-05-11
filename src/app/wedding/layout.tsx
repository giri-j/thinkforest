import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전은길 ❤️ 조인아',
  description: '전은길과 조인아의 결혼식에 초대합니다.',
  openGraph: {
    title: '전은길 ❤️ 조인아',
    description: '전은길과 조인아의 결혼식에 초대합니다.',
    images: ['/wedding/gallery_6.jpg'],
  },
};

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
