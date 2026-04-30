'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Copy, ChevronDown, Calendar as CalendarIcon, Heart, Share2, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import Head from 'next/head';

import Image from 'next/image';
import FireworksBackground from '@/components/wedding/Fireworks';

import MagicalFlowers from '@/components/wedding/MagicalFlowers';
import NaverMap from '@/components/wedding/NaverMap';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

// --- Components ---

const SectionTitle = ({ title, subtitle, titleClassName, subtitleClassName }: { title: string; subtitle?: string; titleClassName?: string; subtitleClassName?: string }) => (
  <div className="text-center mb-16 px-4">
    <p className={cn("tracking-[0.4em] text-[#8BA48B] uppercase mb-4 font-light", subtitleClassName || "text-[10px]")}>{subtitle}</p>
    <h2 className={cn("text-2xl md:text-3xl font-light tracking-[0.2em] text-[#5C6E5C] uppercase", titleClassName)}>{title}</h2>
    <div className="mt-4 flex justify-center">
      <div className="h-[1px] w-8 bg-[#D1B8A0] opacity-50"></div>
    </div>
  </div>
);

const Calendar = ({ date }: { date: Date }) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const month = 6; // June
  const year = 2026;
  const weddingDay = 28;
  
  // June 2026 starts on Monday (1)
  const firstDayOfMonth = 1; 
  const totalDays = 30;
  
  const calendarDays = Array.from({ length: totalDays + firstDayOfMonth }, (_, i) => {
    if (i < firstDayOfMonth) return null;
    return i - firstDayOfMonth + 1;
  });

  // Calculate D-Day
  const [dDay, setDDay] = useState<string>('');

  useEffect(() => {
    const target = new Date(year, month - 1, weddingDay);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) setDDay('D-Day');
    else if (diffDays > 0) setDDay(`D-${diffDays}`);
    else setDDay(`D+${Math.abs(diffDays)}`);
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white/50 backdrop-blur-sm py-6 px-8 rounded-3xl border border-[#F0EBE3] shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-xl font-light tracking-[0.2em] text-[#5C6E5C]">2026. 06</h3>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {days.map((day, idx) => (
          <div key={day} className={cn("text-[9px] font-bold tracking-widest mb-2", idx === 0 ? "text-[#D1B8A0]" : "text-[#A0A0A0]")}>
            {day}
          </div>
        ))}
        {calendarDays.map((day, idx) => (
          <div 
            key={idx} 
            className={cn(
              "relative h-9 flex items-center justify-center text-sm font-light transition-all",
              day === weddingDay ? "text-white z-10" : "text-[#6B705C]",
              idx % 7 === 0 ? "text-[#D1B8A0]" : ""
            )}
          >
            {day === weddingDay && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 m-auto flex items-center justify-center -z-10"
              >
                <Heart className="w-9 h-9 fill-[#E58C8C] text-[#E58C8C] opacity-80" />
              </motion.div>
            )}
            <span className={cn(day === weddingDay ? "text-white font-bold" : "")}>{day}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-5 border-t border-[#F0EBE3] text-center">
        <p className="text-[12.5px] font-light text-[#8BA48B] tracking-tight whitespace-nowrap">
          은길 ♥ 인아의 결혼식이 <span className="font-bold text-[#5C6E5C] text-base ml-0.5">{dDay}</span> 남았습니다
        </p>
      </div>
    </div>
  );
};



const AccountInfo = () => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copied, setCopied] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setShowToast(true);
    setTimeout(() => {
      setCopied(null);
      setShowToast(false);
    }, 1300);
  };

  const groomAccounts = [
    { name: '신랑 전은길', bank: '국민은행', number: '061702-04-140015' },
    { name: '신랑측 혼주 전경자', bank: '국민은행', number: '123-45-678901' },
  ];

  const brideAccounts = [
    { name: '신부 조인아', bank: '하나은행', number: '222-910235-10507' },
    { name: '신부측 혼주 조종섭', bank: '기업은행', number: '123-456-789012' },
    { name: '신부측 혼주 윤원흥', bank: '기업은행', number: '123-456-789012' },
  ];

  const currentAccounts = activeTab === 'groom' ? groomAccounts : brideAccounts;

  return (
    <div className="max-w-md mx-auto px-6 relative">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 text-[#5C6E5C] mb-8">
          <Heart size={20} className="text-[#D1B8A0] fill-[#D1B8A0] opacity-50" />
          <h3 className="text-lg font-medium tracking-widest uppercase">축하의 마음 전하기</h3>
        </div>
        
        <div className="flex gap-2 p-1.5 bg-[#F5F3EF] rounded-2xl">
          <button
            onClick={() => setActiveTab('groom')}
            className={cn(
              "flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-xl",
              activeTab === 'groom' 
                ? "bg-white text-[#8BA48B] shadow-sm" 
                : "text-[#A0A0A0] hover:text-[#8BA48B]/60"
            )}
          >
            신랑측
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            className={cn(
              "flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-xl",
              activeTab === 'bride' 
                ? "bg-white text-[#D1B8A0] shadow-sm" 
                : "text-[#A0A0A0] hover:text-[#D1B8A0]/60"
            )}
          >
            신부측
          </button>
        </div>
      </div>

      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 pb-10"
          >
            {currentAccounts.map((acc, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white border border-[#F0EBE3] rounded-2xl shadow-sm transition-all hover:border-[#8BA48B]/30">
                <div>
                  <p className="text-[10px] text-[#8BA48B] font-bold uppercase tracking-widest mb-1">{acc.bank}</p>
                  <p className="text-[14px] font-medium text-[#5C6E5C] mb-1">{acc.name}</p>
                  <p className="text-[12px] text-[#A0A0A0] tracking-tight">{acc.number}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(acc.number, acc.name)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                    copied === acc.name ? "bg-[#8BA48B] text-white" : "bg-[#FDFCF8] text-[#8BA48B] hover:bg-[#8BA48B]/10 border border-[#F0EBE3]"
                  )}
                >
                  {copied === acc.name ? 'Copied' : <><Copy size={12} /> Copy</>}
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-[100] px-6 py-3 bg-[#5C6E5C] text-white text-[12px] font-medium rounded-full shadow-xl whitespace-nowrap"
          >
            계좌번호가 복사되었습니다!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Gallery = () => {
  const images = [
    '/wedding/main.png',
    '/wedding/coming_soon.png',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto-rolling effect
  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="px-4 space-y-6">
      {/* Big Main Image */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-[#F0EBE3] group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover"
            alt={`Wedding Photo ${currentIndex + 1}`}
          />
        </AnimatePresence>

        {/* Navigation Overlays */}
        <div className="absolute inset-y-0 left-0 w-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={nextSlide}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Counter Indicator */}
        <div className="absolute bottom-6 right-6 px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Strip */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "relative flex-shrink-0 w-16 aspect-[3/4] rounded-xl overflow-hidden transition-all duration-500",
              currentIndex === idx 
                ? "ring-2 ring-[#8BA48B] ring-offset-2 scale-110 z-10" 
                : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
            )}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

const Information = () => {
  const [activeTab, setActiveTab] = useState<'meal' | 'parking'>('meal');

  const tabs = [
    { id: 'meal', label: '식사', title: '식사 안내', content: '식사권은 축의금 데스크에서 필요한 수량만큼 받아주세요.' },
    { id: 'parking', label: '주차', title: '주차 안내', content: '하객은 2시간 무료이며, 총 350대로 넉넉하게 주차 가능합니다.' },
  ];

  return (
    <div className="max-w-md mx-auto px-6">
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 py-3 text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300",
              activeTab === tab.id 
                ? "bg-[#8BA48B] text-white shadow-md" 
                : "bg-white text-[#8BA48B] border border-[#F0EBE3] hover:bg-[#8BA48B]/5"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-[#F0EBE3] min-h-[160px] flex flex-col justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-[12px] text-[#D1B8A0] font-bold tracking-[0.3em] uppercase mb-4">
              {tabs.find(t => t.id === activeTab)?.title}
            </h4>
            <p className="text-[14px] text-[#6B705C] leading-relaxed font-light">
              {tabs.find(t => t.id === activeTab)?.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Guestbook = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching messages:', error);
      // Fallback data if table doesn't exist yet
      if (messages.length === 0) {
         setMessages([
           { id: 1, name: '안내', content: 'Supabase DB 연결이 필요합니다. guestbook 테이블(id, name, content, created_at)을 생성해주세요.', date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, '') }
         ]);
      }
      return;
    }
    
    if (data) {
      setMessages(data.map(msg => ({
        id: msg.id,
        name: msg.name,
        content: msg.content,
        date: new Date(msg.created_at).toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
      })));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newContent || isLoading) return;
    
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: newName, content: newContent }])
      .select();
      
    if (error) {
      console.error('Error inserting message:', error);
      alert('메시지 등록에 실패했습니다. DB 설정을 확인해주세요.');
    } else if (data) {
      const insertedMsg = {
        id: data[0].id,
        name: data[0].name,
        content: data[0].content,
        date: new Date(data[0].created_at).toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
      };
      setMessages([insertedMsg, ...messages]);
      setNewName('');
      setNewContent('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-6">
      <div className="text-center mb-10 space-y-2">
        <p className="text-[13px] text-[#6B705C] font-light">두 사람의 시작을 함께 축복해주세요.</p>
        <p className="text-[13px] text-[#6B705C] font-light">오래 기억될 마음을 남겨주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#F0EBE3] shadow-sm mb-8 space-y-4">
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="이름" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-[#FDFCF8] border border-[#F0EBE3] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8BA48B]"
          />
        </div>
        <textarea 
          placeholder="축복의 메시지를 남겨주세요." 
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          disabled={isLoading}
          rows={3}
          className="w-full px-4 py-3 bg-[#FDFCF8] border border-[#F0EBE3] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8BA48B] resize-none"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-[#8BA48B] text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#5C6E5C] transition-all disabled:opacity-50"
        >
          {isLoading ? '등록 중...' : '축복 남기기'}
        </button>
      </form>

      <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar pb-10">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div 
              key={msg.id || i + msg.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-5 bg-[#FAF9F6] border border-[#F0EBE3] rounded-2xl"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-[#5C6E5C] uppercase tracking-wider">{msg.name}</span>
                <span className="text-[9px] text-[#A0A0A0]">{msg.date}</span>
              </div>
              <p className="text-[13px] text-[#6B705C] leading-relaxed font-light">{msg.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const RSVPModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [successSide, setSuccessSide] = useState<'groom' | 'bride' | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="rsvp-selection" className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-[#8BA48B]"></div>
            <h3 className="text-xl font-light text-[#5C6E5C] mb-6 tracking-wide">참석 여부 전달 안내</h3>
            <p className="text-[14px] text-[#6B705C] leading-[1.8] font-light mb-10 text-left">
              특별한 날 축하의 마음으로 참석해주시는 모든 분들을 한 분 한 분 더욱 귀하게 모실 수 있도록, 아래 버튼을 클릭하여 신랑, 신부에게 참석여부를 전달부탁드립니다.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                className="w-full py-4 bg-[#8BA48B] text-white text-xs font-bold tracking-widest uppercase rounded-2xl shadow-sm hover:opacity-90"
                onClick={() => { setSuccessSide('groom'); }}
              >
                신랑측 참석여부 전달
              </button>
              <button 
                className="w-full py-4 bg-[#D1B8A0] text-white text-xs font-bold tracking-widest uppercase rounded-2xl shadow-sm hover:opacity-90"
                onClick={() => { setSuccessSide('bride'); }}
              >
                신부측 참석여부 전달
              </button>
              <button 
                onClick={onClose}
                className="mt-4 text-[11px] text-[#A0A0A0] font-bold tracking-widest uppercase hover:text-[#5C6E5C]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {successSide && (
        <div key="rsvp-success-message" className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-xs bg-white rounded-[2rem] p-10 shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-[#FDFCF8] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#F0EBE3]">
              <Heart className="text-[#8BA48B] fill-[#8BA48B]/20" size={32} />
            </div>
            <h3 className="text-lg font-medium text-[#5C6E5C] mb-3 leading-relaxed">
              {successSide === 'groom' ? '신랑측' : '신부측'} 참석여부를<br />전달주셔서 감사합니다.
            </h3>
            <p className="text-sm text-[#8BA48B] font-light mb-8">
              더욱 귀하게 모시도록 하겠습니다.
            </p>
            <button 
              onClick={() => { setSuccessSide(null); onClose(); }}
              className="w-full py-3 bg-[#5C6E5C] text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-md"
            >
              확인
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Page Main ---

export default function WeddingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  
  const handleShare = () => {
    const shareData = {
      title: '전은길 ♥ 조인아 결혼식에 초대합니다',
      text: '전은길 ♥ 조인아의 결혼식에 초대합니다. 일시: 2026년 6월 28일',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('청첩장 주소가 복사되었습니다.');
      });
    }
  };

  const dollbowVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (dollbowVideoRef.current) {
      dollbowVideoRef.current.playbackRate = 1.5;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Initialize Sakura.js if available
    let sakuraInstance: any = null;
    const initSakura = () => {
      if ((window as any).Sakura) {
        sakuraInstance = new (window as any).Sakura('.sakura-frame', {
          delay: 103,
          fallSpeed: 4.2,
          colors: [
            {
              gradientColorStart: 'rgba(255, 183, 197, 0.9)',
              gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
              gradientColorDegree: 120,
            },
            {
              gradientColorStart: 'rgba(255, 189, 189, 0.9)',
              gradientColorEnd: 'rgba(227, 170, 181, 0.9)',
              gradientColorDegree: 120,
            },
          ],
        });
        (window as any).sakuraStarted = true;
      }
    };

    // If script is already loaded
    if ((window as any).Sakura) {
      initSakura();
    } else {
      // Wait for script to load (handled by onReady in Script component)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sakuraInstance) {
        // Sakura.js might not have a destroy method, but we can try to clean up if it does
        if (typeof sakuraInstance.stop === 'function') sakuraInstance.stop();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex justify-center">
      {/* External CSS for Sakura */}
      <link rel="stylesheet" href="/wedding/sakura/dist/sakura.min.css" />
      
      {/* Sakura JS Loader */}
      <Script 
        src="/wedding/sakura/dist/sakura.min.js" 
        strategy="afterInteractive"
        onReady={() => {
          if (!(window as any).sakuraStarted && (window as any).Sakura) {
            new (window as any).Sakura('.sakura-frame', {
              delay: 103,
              fallSpeed: 4.2,
            });
            (window as any).sakuraStarted = true;
          }
        }}
      />

      {/* Mobile Frame Container */}
      <div 
        style={{ width: '390px' }} 
        className="sakura-frame min-h-screen bg-[#FDFCF8] text-[#4A4A4A] selection:bg-[#E2D1C3] selection:text-white font-gowun shadow-2xl relative ring-1 ring-inset ring-[#E0E0E0] overflow-x-hidden flex flex-col"
      >
        
        {/* 1. Hero Cover Section */}
        <section className="relative h-[682px] flex flex-col items-center justify-center text-center px-4 overflow-hidden font-playfair">
          {/* Background Image with Parallax/Zoom */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image 
              src="/wedding/main.png" 
              alt="Wedding Main" 
              fill
              priority
              className="object-cover brightness-[0.9]"
            />
            {/* Soft Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
          </motion.div>

          {/* Animated Background Textures (Optional, kept for depth) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-1">
            <motion.div 
              style={{ y: scrollY * 0.2 }}
              className="absolute top-1/4 left-1/10 w-64 h-64 border border-white/30 rounded-full blur-3xl" 
            />
          </div>

          <div className="z-10 flex flex-col items-center text-white drop-shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="text-[65px] md:text-[86px] font-cherish mb-12 text-white/90 tracking-normal leading-[1.1] pt-16 pb-8 overflow-visible text-center"
              >
                <div className="overflow-visible" style={{ transform: 'rotate(-8deg)' }}>
                  {"We are getting".split("").map((char, i) => (
                    <motion.span
                      key={`married-text-line1-${i}`}
                      className="inline-block overflow-visible font-cherish"
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.8 + i * 0.05,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
                <div className="overflow-visible mt-[-10px] flex items-center justify-center gap-2" style={{ transform: 'rotate(-9deg)' }}>
                  {"Married".split("").map((char, i) => (
                    <motion.span
                      key={`married-text-line2-${i}`}
                      className="inline-block overflow-visible font-cherish"
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.8,
                        delay: 1.5 + i * 0.05,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.img 
                    src="/wedding/handheart.svg" 
                    alt="Heart"
                    initial={{ opacity: 0, scale: 0, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 2.2, duration: 0.8, type: "spring" }}
                    className="w-[62px] h-[62px] md:w-[83px] md:h-[83px] object-contain -mt-2 brightness-0 invert -translate-x-[20%]"
                  />
                </div>
              </motion.div>
              
              <div className="flex justify-between items-center w-full max-w-[280px] mx-auto mb-16 px-4">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[10px] tracking-[0.4em] text-white/70 font-aphrodite font-bold uppercase">Groom</p>
                  <h1 className="text-[40px] font-light tracking-tight font-cherish">EUNKIL</h1>
                </div>
                
                <div className="relative">
                   <span className="text-2xl font-aphrodite text-[#D1B8A0] italic">&</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="text-[10px] tracking-[0.4em] text-white/70 font-aphrodite font-bold uppercase">Bride</p>
                  <h1 className="text-[40px] font-light tracking-tight font-cherish">INA</h1>
                </div>
              </div>

              <div className="h-[1px] w-24 bg-white/40 mx-auto mb-12"></div>
              
              <div className="space-y-3">
                <p className="text-base font-light tracking-[0.25em] text-white/90 font-aphrodite">
                  2026. 06. 28. SUN AM 11:00
                </p>
                <p className="text-sm font-light text-white/70 tracking-widest uppercase italic font-aphrodite">
                  Luvel Wedding Hall
                </p>
              </div>
            </motion.div>
          </div>

          {/* Floating Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D1B8A0] to-transparent"></div>
          </motion.div>
        </section>

        {/* 2. Invitation Greeting Section */}
        <section className="bg-white py-24 pb-16 px-6 text-center overflow-hidden relative">
          <div className="max-w-[390px] mx-auto relative">
            {/* Background Animation Layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 4.0, ease: "easeOut" }}
              className="absolute top-[-160px] left-1/2 -translate-x-1/2 z-0"
            >
              <MagicalFlowers />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10 mt-20"
            >
              <SectionTitle title="INVITATION GREETING" subtitle="우리, 결혼합니다." subtitleClassName="text-[12px]" />
              
              <div className="space-y-6 leading-relaxed text-[15px] font-light text-[#6B705C] font-serif italic flex flex-col items-start w-fit mx-auto overflow-visible tracking-tight text-left">
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <span className="font-bold text-[#4A4A4A] text-lg">감</span> 사한 마음으로 돌아보면
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <span className="font-bold text-[#4A4A4A] text-lg">사</span> 소한 순간마다 함께해 주신 여러분 덕분에
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <span className="font-bold text-[#4A4A4A] text-lg">해</span> 처럼 따뜻한 이 순간을 맞이할 수 있었습니다.
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <span className="font-bold text-[#4A4A4A] text-lg">요</span> 청드립니다. 행복한 이 순간을 함께해 주세요.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-[#F0EBE3]/50">
                <p className="text-lg text-[#8BA48B] font-light tracking-wide italic mb-10">
                  신랑 <span className="font-gowun">전은길</span>, 신부 <span className="font-gowun">조인아</span> 드림
                </p>
                <video 
                  ref={dollbowVideoRef}
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="metadata"
                  className="w-[200px] mx-auto opacity-90 rounded-2xl"
                >
                  <source src="/wedding/dollbow.mov" type='video/quicktime; codecs="hvc1"' />
                  <source src="/wedding/dollbow.webm" type="video/webm" />
                </video>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2.5 Our Introduction Section */}
        <section className="pt-12 pb-24 px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <SectionTitle title="Introduction" subtitle="우리의 소개" subtitleClassName="text-[12px]" />
            
            <div className="flex justify-between items-start gap-4 mt-12">
              {/* Groom Profile */}
              <div className="flex-1 flex flex-col items-center gap-6">
                <div className="w-[155px] h-[155px] rounded-full overflow-hidden bg-[#EAE7E1] border border-[#F0EBE3] shadow-inner">
                   <img src="/wedding/groom.jpg" className="w-full h-full object-cover scale-x-[-1]" alt="Groom" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-[13px] text-[#6B705C] leading-relaxed font-gowun">
                    전안석 · 전경자의 차남<br />
                    <span className="text-[#4A4A4A] font-bold text-base font-gowun">전은길</span>
                    <div className="text-[12.5px] text-[#8BA48B] mt-1.5 font-medium tracking-wider">파워J 기획자</div>
                  </div>
                </div>
              </div>

              {/* Bride Profile */}
              <div className="flex-1 flex flex-col items-center gap-6">
                <div className="w-[155px] h-[155px] rounded-full overflow-hidden bg-[#EAE7E1] border border-[#F0EBE3] shadow-inner">
                   <img src="/wedding/bride.jpg" className="w-full h-full object-cover scale-x-[-1]" alt="Bride" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-[13px] text-[#6B705C] leading-relaxed font-gowun">
                    조종섭 · 윤원흥의 차녀<br />
                    <span className="text-[#4A4A4A] font-bold text-base font-gowun">조인아</span>
                    <div className="text-[12.5px] text-[#D1B8A0] mt-1.5 font-medium tracking-wider">내조의 여왕</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-20">
              <SectionTitle title="Gallery" subtitle="우리의 순간" subtitleClassName="text-[12px]" />
              <Gallery />
            </div>
          </motion.div>
        </section>

        {/* 3. Calendar & Schedule Section */}
        <section className="py-16 bg-[#FAF9F6]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <SectionTitle 
              title="The Wedding Day" 
              subtitle="예식 일정" 
              titleClassName="whitespace-nowrap text-[21px] md:text-[26px] tracking-[0.15em]" 
              subtitleClassName="text-[12px]"
            />
            
            <div className="text-center mb-12 flex flex-col items-center justify-center">
              <div className="text-[15px] font-light text-[#6B705C] tracking-wide mb-6">강동 루벨 35층</div>
              <div className="animate-neon text-[1.0rem] md:text-[1.3rem] font-bold text-[#FDF7FF] tracking-tight leading-none px-4">
                2026년 6월 28일 일요일 오전 11시
              </div>
            </div>

            <Calendar date={new Date('2026-06-28')} />
          </motion.div>
        </section>

        {/* 4. Location Section */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <SectionTitle title="Location" subtitle="오시는 길" subtitleClassName="text-[12px]" />
          
          <div className="bg-white rounded-[2rem] shadow-sm border border-[#F0EBE3] overflow-hidden mb-12">
            <div className="p-8 text-center">
              <h3 className="text-xl font-light mb-3 text-[#1C2E24]">강동 루벨</h3>
              <p className="text-[13px] text-[#8BA48B] font-light tracking-wide italic leading-relaxed">
                서울특별시 강동구 천호대로 1077,<br />
                이스트센트럴타워 35층
              </p>
            </div>
            
            <div className="aspect-[4/3] w-full bg-[#F5F3EF] relative group overflow-hidden">
              <NaverMap clientId="ywu8xzk12v" />
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#F0EBE3]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#8BA48B] flex items-center justify-center text-white text-[10px] font-bold">Sub</div>
                <h4 className="text-[13px] font-bold tracking-widest text-[#5C6E5C] uppercase">🚃 지하철</h4>
              </div>
              <p className="text-[13px] text-[#6B705C] leading-[1.8] font-light">
                <span className="font-bold text-[#8BA48B]">5호선 강동역 1번 출구</span>와 연결된 지하통로를<br />
                통해 이스트센트럴 타워 1층으로 올라와 엘리베이터 이용 (35층)
              </p>
            </div>
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#F0EBE3]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#8BA48B] flex items-center justify-center text-white text-[10px] font-bold">Car</div>
                <h4 className="text-[13px] font-bold tracking-widest text-[#5C6E5C] uppercase">🚘 자가용/주차</h4>
              </div>
              <p className="text-[13px] text-[#6B705C] leading-[1.8] font-light">
                내비게이션: <span className="font-bold text-[#8BA48B]">'루벨'</span> 검색<br />
                건물 내 지하 주차장 이용 (2시간 무료/350대)
              </p>
            </div>
          </div>
          </motion.div>
        </section>
        
        {/* 6.8 Guestbook Section */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <SectionTitle title="GUESTBOOK" subtitle="방명록" subtitleClassName="text-[12px]" />
            
            <div className="-mt-6 mb-8 overflow-hidden rounded-2xl aspect-[16/6]">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src="/wedding/sofalaughlow.mov" type='video/quicktime; codecs="hvc1"' />
                <source src="/wedding/sofalaughlow.webm" type="video/webm" />
              </video>
            </div>

            <Guestbook />
          </motion.div>
        </section>


        {/* 6. Giving Heart Section */}
        <section className="py-16 bg-[#FAF9F6]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <SectionTitle title="Giving Heart" subtitle="마음 전하실 곳" subtitleClassName="text-[12px]" />
          <p className="text-center text-xs font-light text-[#8BA48B] mb-12 px-8 leading-relaxed">
            축복해 주시는 마음 감사히 받겠습니다.<br />직접 축복을 전하지 못하는 분들을 위해<br />계좌 번호를 안내해 드립니다.
          </p>
            <AccountInfo />
          </motion.div>
        </section>

        {/* 6.5 Information Section */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <SectionTitle title="INFORMATION" subtitle="안내사항" subtitleClassName="text-[12px]" />
            <Information />
          </motion.div>
        </section>



        {/* 7. Shared Footer */}
        <section className="relative h-[600px] flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Finish Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/wedding/footer_photo_night.jpg" 
              alt="Wedding Finish" 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for Depth and Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60"></div>
            <FireworksBackground />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10 px-4"
          >
            <p className="mb-6 font-light tracking-[0.5em] uppercase text-[#D1B8A0] text-[10px]">Save our Date</p>
            <p className="text-6xl font-dancing mb-12 italic text-white drop-shadow-lg opacity-30">Thank You</p>
            <div className="h-[1px] w-16 bg-[#D1B8A0] mx-auto mb-12 opacity-50"></div>
            
            <div className="flex flex-col items-center gap-6">
              <p className="text-[11px] tracking-[0.4em] font-light text-white/80 uppercase">전은길 ♥ 조인아</p>
              <div className="flex flex-col items-center gap-3 w-full max-w-[200px]">
                <button 
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 text-[9px] font-bold tracking-[0.3em] uppercase px-8 py-3 border border-white/30 rounded-full text-white bg-white/5 backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <Share2 size={12} /> 공유하기
                </button>
                <button 
                  onClick={() => setIsRSVPModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 text-[9px] font-bold tracking-[0.3em] uppercase px-8 py-3 bg-[#D1B8A0] rounded-full text-white shadow-lg hover:bg-[#B89F87] transition-all"
                >
                  <Heart size={12} /> 참석여부 전달
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* RSVP Modal Rendering */}
        <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />

        {/* Fixed UI Elements - Constrained to 390px frame */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[390px] pointer-events-none z-40 px-6 flex justify-end">
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-[#8BA48B] border border-[#F0EBE3] hover:scale-110 transition-all active:scale-95 pointer-events-auto"
          >
            <Share2 size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
