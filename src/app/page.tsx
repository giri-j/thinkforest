import HomeHero from "@/components/home/HomeHero";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white">
      <HomeHero />

      {/* Latest Stories Teaser */}
      <section className="py-24 px-6 md:px-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Selected Insights</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-dark mt-2">최근 생각의 기록들</h2>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
            >
              모든 글 보기 <MoveRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group bg-white p-8 rounded-3xl border border-border hover:shadow-2xl transition-all hover:-translate-y-2">
                <span className="text-secondary-foreground text-sm font-medium">2024.02.18 · 5 min read</span>
                <h3 className="text-2xl font-bold text-brand-dark mt-4 mb-4 group-hover:text-primary transition-colors">
                  기획자의 시선: 문제를 정의하는 기술 #{i}
                </h3>
                <p className="text-secondary-foreground leading-relaxed mb-6 line-clamp-2">
                  좋은 기획은 해결책을 제시하는 것보다 올바른 질문을 던지는 것으로부터 시작됩니다.
                  우리가 진짜 해결해야 할 문제는 무엇일까요?
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 bg-secondary rounded-md font-bold text-primary">STRATEGY</span>
                  <span className="text-[10px] px-2 py-1 bg-secondary rounded-md font-bold text-primary">PRODUCT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-32 px-6 bg-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-8 leading-tight">
            "복잡함 속에서 길을 찾는 기획,<br />
            본질에 집중하는 성장을 꿈꿉니다."
          </h2>
          <p className="text-xl text-secondary-foreground mb-12 font-medium">
            기리(Giri)는 7년 차 제품 기획자이자 스토리텔러입니다.<br />
            사용자의 마음을 움직이는 디테일과 비즈니스 성장을 돕는 전략을 설계합니다.
          </p>
          <Link
            href="/about"
            className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            기획의 숲에 대하여
          </Link>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </section>
    </main>
  );
}
