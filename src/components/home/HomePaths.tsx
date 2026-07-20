"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PATHS = [
  {
    no: "01",
    title: "Planning",
    desc: "복잡함 속에서 본질을 찾는 기록",
    href: "/blog/category/Planning",
    color: "#7FD1AE", // 청록 — 숲의 이끼
  },
  {
    no: "02",
    title: "Reverse Engineering",
    desc: "서비스의 구조를 해부하다",
    href: "/blog/category/Reverse Engineering",
    color: "#8FA8E8", // 남보라 — 새벽 안개
  },
  {
    no: "03",
    title: "Journey",
    desc: "경험이 기획이 되는 순간",
    href: "/blog/category/Journey",
    color: "#E8C07F", // 호박색 — 빛내림
  },
  {
    no: "04",
    title: "Cutlet Lab",
    desc: "일상의 구조를 탐구하다",
    href: "/blog/category/Cutlet Lab",
    color: "#D99B7C", // 따뜻한 갈색 — 나무껍질
  },
];

// 반딧불이 (하이드레이션 에러 방지를 위해 고정값 사용)
const EMBERS = [
  { left: "6%",  top: "22%", size: 4, delay: "0s",   duration: "13s" },
  { left: "18%", top: "68%", size: 5, delay: "3s",   duration: "11s" },
  { left: "31%", top: "40%", size: 4, delay: "1.5s", duration: "15s" },
  { left: "44%", top: "78%", size: 5, delay: "5s",   duration: "12s" },
  { left: "58%", top: "30%", size: 4, delay: "2s",   duration: "14s" },
  { left: "71%", top: "62%", size: 5, delay: "6s",   duration: "11s" },
  { left: "84%", top: "36%", size: 4, delay: "4s",   duration: "13s" },
  { left: "94%", top: "72%", size: 4, delay: "0.5s", duration: "15s" },
];

export default function HomePaths() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 화면에 20% 이상 들어오면 등장 애니메이션 시작
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="paths-root">
      {/* 1. 숲 배경 — 히어로와 같은 이미지를 어둡게 깔아 공간을 잇습니다 */}
      <div className="paths-bg" aria-hidden="true">
        <Image
          src="/home_img/forest_poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="paths-veil" aria-hidden="true" />

      {/* 2. 반딧불이 */}
      <div className="paths-embers" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: e.left,
              top: e.top,
              width: `${e.size}px`,
              height: `${e.size}px`,
              animationDelay: e.delay,
              animationDuration: e.duration,
            }}
          />
        ))}
      </div>

      {/* 3. 본문 */}
      <div className="paths-inner">
        <header className={`paths-head ${visible ? "is-in" : ""}`}>
          <span className="paths-eyebrow">Four Paths</span>
          <h2 className="font-gowun">
            네 갈래 길 앞에 섰습니다
          </h2>
        </header>

        <div className="paths-grid">
          {PATHS.map((path) => (
            <Link
              href={path.href}
              key={path.title}
              className={`path-card ${visible ? "is-in" : ""}`}
              style={{ "--path-color": path.color } as React.CSSProperties}
            >
              {/* 왼쪽 세로선 */}
              <div className="path-line" />
              
              <span className="path-no">{path.no}</span>
              <h3 className="path-title">{path.title}</h3>
              <p className="path-desc">{path.desc}</p>
              
              <div className="path-more">
                <span>자세히 보기</span>
                <span className="path-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
