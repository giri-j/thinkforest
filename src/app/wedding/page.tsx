import React from 'react';

export const metadata = {
  title: '전은길 & 조인아 결혼합니다',
  description: '저희 두 사람이 사랑으로 만나 진실과 이해로써 하나를 이루려 합니다. 오셔서 축복해 주세요.',
};

export default function WeddingPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#4A4A4A] selection:bg-[#E2D1C3] selection:text-white overflow-hidden font-playfair">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 C30,20 70,20 100,0 L100,100 C70,80 30,80 0,100 Z" fill="#D4E2D4" />
          </svg>
        </div>
        
        <div className="z-10 animate-fade-in-up">
          <p className="text-sm md:text-lg tracking-[0.4em] mb-6 font-light uppercase text-[#8BA48B]">Wedding Invitation</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mb-8">
            <h1 className="text-6xl md:text-8xl font-light tracking-tight">전은길</h1>
            <span className="text-4xl md:text-5xl font-dancing text-[#D1B8A0] italic">&</span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight">조인아</h1>
          </div>
          <div className="h-[1px] w-24 bg-[#D1B8A0] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light tracking-[0.2em] text-[#6B705C]">
            2026. 06. 28. SUN AM 11:00
          </p>
          <p className="mt-4 text-lg font-light text-[#8BA48B] tracking-wide">루벨 (Luvel)</p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-[1px] h-12 bg-[#4A4A4A]"></div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-32 px-6 md:px-12 max-w-2xl mx-auto text-center border-t border-b border-[#F0EBE3] bg-white shadow-sm">
        <div className="mb-12">
           <svg className="w-12 h-12 mx-auto mb-6 text-[#D1B8A0] opacity-50" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
           </svg>
           <h2 className="text-3xl font-light mb-12 tracking-[0.3em] text-[#5C6E5C] uppercase">Invitation</h2>
        </div>
        <div className="space-y-8 leading-relaxed text-xl font-light text-[#6B705C] font-serif italic">
          <p>서로가 마주 보며 다진 약속을</p>
          <p>이제는 함께 같은 곳을 바라보며</p>
          <p>하나가 된 마음으로 걸어가려 합니다.</p>
          <p className="pt-6">저희 두 사람이 사랑으로 만나</p>
          <p>진실과 이해로써 하나를 이루려 합니다.</p>
          <p>이 기쁜 날, 함께해 주셔서</p>
          <p>자리를 빛내 주시면 감사하겠습니다.</p>
        </div>

        <div className="mt-20 pt-16 border-t border-[#F0EBE3]">
          <div className="flex justify-center items-center gap-16 text-xl">
            <div className="text-right">
              <p className="text-xs tracking-widest text-[#8BA48B] mb-2 uppercase">Groom</p>
              <p className="font-medium text-2xl">전은길</p>
            </div>
            <div className="w-[1px] h-12 bg-[#D1B8A0]"></div>
            <div className="text-left">
              <p className="text-xs tracking-widest text-[#8BA48B] mb-2 uppercase">Bride</p>
              <p className="font-medium text-2xl">조인아</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-3xl font-light mb-20 tracking-[0.3em] text-[#5C6E5C] uppercase">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="aspect-[3/4] bg-white shadow-md p-3 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-[#EAE7E1] animate-pulse"></div>
            </div>
            <div className="aspect-[3/4] bg-white shadow-md p-3 transform rotate-[3deg] hover:rotate-0 transition-transform duration-500 md:mt-12">
              <div className="w-full h-full bg-[#EAE7E1] animate-pulse"></div>
            </div>
            <div className="aspect-[3/4] bg-white shadow-md p-3 transform rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-[#EAE7E1] animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-light mb-16 tracking-[0.3em] text-[#5C6E5C] uppercase">Location</h2>
        <div className="mb-16">
          <h3 className="text-2xl font-light mb-3 text-[#4A4A4A]">루벨 (Luvel)</h3>
          <p className="text-[#8BA48B] font-light tracking-wide italic">서울특별시 강동구 천호대로 1077, 이스트센트럴타워 35층</p>
        </div>
        
        <div className="aspect-video bg-[#EAE7E1] mb-16 flex items-center justify-center text-[#8BA48B] shadow-inner rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
          <p className="text-sm tracking-widest">[ Map View ]</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 text-left max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#F0EBE3]">
            <h4 className="text-sm font-bold mb-4 tracking-widest text-[#8BA48B] uppercase">지하철</h4>
            <p className="text-base text-[#6B705C] leading-relaxed">5호선 강동역 1번 출구 연결 (지하 통로 이용)</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#F0EBE3]">
            <h4 className="text-sm font-bold mb-4 tracking-widest text-[#8BA48B] uppercase">내비게이션</h4>
            <p className="text-base text-[#6B705C] leading-relaxed">'루벨' 또는 '이스트센트럴타워' 검색 (강동역)</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-40 bg-[#1C2E24] text-[#FDFCF8] text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full"></div>
        </div>
        <p className="mb-12 font-light tracking-[0.5em] uppercase text-[#8BA48B] text-sm">Save our Date</p>
        <p className="text-5xl md:text-7xl font-dancing mb-16 italic">Thank You</p>
        <div className="h-[1px] w-12 bg-[#8BA48B] mx-auto mb-16"></div>
        <p className="text-xs tracking-[0.3em] font-light opacity-50 uppercase">© 2026 JEON & JO</p>
      </section>
    </div>
  );
}

