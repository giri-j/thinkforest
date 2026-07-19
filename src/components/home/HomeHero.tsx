"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PARTICLES = [
  { left: "8%",  top: "70%", size: 5, delay: "0s",   duration: "11s" },
  { left: "15%", top: "82%", size: 4, delay: "2.5s", duration: "13s" },
  { left: "22%", top: "60%", size: 6, delay: "1s",   duration: "10s" },
  { left: "30%", top: "78%", size: 4, delay: "4s",   duration: "14s" },
  { left: "38%", top: "66%", size: 5, delay: "0.5s", duration: "12s" },
  { left: "47%", top: "84%", size: 4, delay: "3s",   duration: "11s" },
  { left: "55%", top: "62%", size: 6, delay: "5s",   duration: "13s" },
  { left: "63%", top: "76%", size: 4, delay: "1.5s", duration: "10s" },
  { left: "70%", top: "68%", size: 5, delay: "6s",   duration: "12s" },
  { left: "78%", top: "80%", size: 4, delay: "2s",   duration: "14s" },
  { left: "85%", top: "64%", size: 5, delay: "4.5s", duration: "11s" },
  { left: "92%", top: "74%", size: 4, delay: "0.8s", duration: "13s" },
];

export default function HomeHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);   // 300vh 스크롤 트랙
  const archRef = useRef<HTMLDivElement>(null);      // 아치문 레이어
  const videoWrapRef = useRef<HTMLDivElement>(null); // 영상 레이어
  const titleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduceMotion);
    if (reduceMotion) return;

    let rafId = 0;

    const tick = () => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        // 이 섹션 안에서 스크롤이 얼마나 진행됐는지 0~1로 계산
        const rect = wrapper.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = Math.min(Math.max(-rect.top / total, 0), 1);

        // easing: 처음엔 천천히, 뒤로 갈수록 빨려 들어가듯
        const eased = progress * progress * (3 - 2 * progress);

        // 아치문: 1배 → 4.5배 확대되며 통과, 후반부에 사라짐
        if (archRef.current) {
          const scale = 1 + eased * 3.5;
          const opacity = progress < 0.75 ? 1 : 1 - (progress - 0.75) / 0.25;
          archRef.current.style.transform = `scale(${scale.toFixed(3)})`;
          archRef.current.style.opacity = opacity.toFixed(3);
        }

        // 영상: 살짝만 확대해서 함께 전진하는 느낌
        if (videoWrapRef.current) {
          videoWrapRef.current.style.transform = `scale(${(1 + eased * 0.25).toFixed(3)})`;
        }

        // 타이틀: 통과 시작하면 위로 떠오르며 사라짐
        if (titleRef.current) {
          const tOpacity = Math.max(1 - progress * 2.2, 0);
          titleRef.current.style.opacity = tOpacity.toFixed(3);
          titleRef.current.style.transform = `translateY(${(-eased * 80).toFixed(1)}px) scale(${(1 + eased * 0.3).toFixed(3)})`;
        }

        // 스크롤 유도: 스크롤 시작하면 즉시 사라짐
        if (cueRef.current) {
          cueRef.current.style.opacity = Math.max(1 - progress * 5, 0).toFixed(3);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={wrapperRef} className="hero-track">
      <section className="hero-sticky">
        {/* 1. 배경 영상 */}
        <div ref={videoWrapRef} className="hero-video-wrap">
          {reduced || videoError ? (
            <Image
              src="/home_img/forest_poster.jpg"
              alt="숲 배경"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <video
              className="hero-video"
              src="/home_img/forest_loop.mp4"
              poster="/home_img/forest_poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
            />
          )}
        </div>

        {/* 2. 빛내림 */}
        <div className="hero-rays" aria-hidden="true">
          <span className="ray ray-1" />
          <span className="ray ray-2" />
          <span className="ray ray-3" />
        </div>

        {/* 3. 반딧불이 */}
        <div className="hero-particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        {/* 4. 타이틀 */}
        <div ref={titleRef} className="hero-title">
          <h1 className="font-gowun animate-fade-in-up">기획의 숲</h1>
          <p className="animate-fade-in-up">생각이 자라나는 곳, Think Forest</p>
        </div>

        {/* 5. 아치문 (가운데 투명 PNG) — 스크롤하면 이 문을 통과합니다 */}
        <div ref={archRef} className="hero-arch">
          <Image
            src="/home_img/arch_frame.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* 6. 통과 후 화면을 부드럽게 덮는 비네트 */}
        <div className="hero-vignette" aria-hidden="true" />

        {/* 7. 스크롤 유도 */}
        <div ref={cueRef} className="hero-scroll-cue" aria-hidden="true">
          <span className="hero-scroll-text">Enter the Forest</span>
          <span className="hero-scroll-line" />
        </div>
      </section>
    </div>
  );
}
