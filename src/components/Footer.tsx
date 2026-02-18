import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-white border-t border-border py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-brand-dark">
                        기획의<span className="text-primary italic">숲</span>
                    </Link>
                    <p className="mt-4 text-secondary-foreground max-w-sm leading-relaxed">
                        생각이 뿌리 내리고 가치가 자라나는 공간.
                        단순함 속에 깊이를 담는 기획을 지향합니다.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-brand-dark mb-6">Explore</h4>
                    <ul className="space-y-4 text-sm text-secondary-foreground font-medium">
                        <li><Link href="/" className="hover:text-primary transition-colors">Portfolio</Link></li>
                        <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-brand-dark mb-6">Contact</h4>
                    <ul className="space-y-4 text-sm text-secondary-foreground font-medium">
                        <li><a href="mailto:jek5797@naver.com" className="hover:text-primary transition-colors">Email</a></li>
                        <li><a href="https://www.youtube.com/@iamgil_Official" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Youtube</a></li>
                        <li><a href="https://www.instagram.com/gianteunkil/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-secondary-foreground">© 2024 Think Forest. All rights reserved.</p>
                <p className="text-xs text-secondary-foreground">Designed with intent for growth.</p>
            </div>
        </footer>
    )
}
