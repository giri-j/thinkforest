import ForestFrame from '@/components/forest/ForestFrame'
import DeskHeader from '@/components/blog/desk/DeskHeader'

/* 홈 · About · Contact와 같은 프레임. 컬럼 안의 내용만 블로그다. */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <ForestFrame header={<DeskHeader />}>{children}</ForestFrame>
}
