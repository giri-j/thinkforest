import type { Metadata } from 'next'
import ForestFrame from '@/components/forest/ForestFrame'
import PageChrome from '@/components/forest/PageChrome'
import ContactForest from '@/components/forest/ContactForest'

export const metadata: Metadata = {
    title: 'Contact — 기획의 숲',
    description: '기획, 협업, 사업 이야기 모두 환영합니다.',
}

export default function ContactPage() {
    return (
        <ForestFrame header={<PageChrome over section="Contact — 기획자 기리" right={['Say hello', '답장은 보통', '2~3일 안에 드립니다.']} />}>
            <ContactForest />
        </ForestFrame>
    )
}
