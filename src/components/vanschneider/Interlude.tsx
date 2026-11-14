"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { interlude, site } from "@/content/forest-content";
import s from "./vanschneider.module.css";

gsap.registerPlugin(ScrollTrigger);

const X = [40, 130, 220, 310, 400];
const STEM_TOP = [80, 70, 60, 70, 80];
const FRUIT_Y = [74, 64, 52, 64, 74];
const FRUIT_R = [7, 8, 9, 8, 7];
const LINE = "#8c9c8b";
const MONO = "var(--vs-mono), monospace";
const KO = "Pretendard, var(--vs-sans), sans-serif";

function Diagram() {
  return (
    <svg
      viewBox="0 0 440 350"
      role="img"
      aria-label={`${interlude.root} → ${interlude.nodes.map((n) => n.en).join(", ")}`}
    >
      <g stroke={LINE} strokeWidth="1.2" fill="none">
        <path d="M220 46V80M40 80H400M40 80V120M130 80V120M220 80V120M310 80V120M400 80V120" />
        <path
          d="M40 150V190M130 150V190M220 150V190M310 150V190M400 150V190"
          strokeDasharray="2 4"
        />
      </g>
      <rect x="175" y="18" width="90" height="28" rx="4" fill={site.accent} />
      <text x="220" y="37" textAnchor="middle" fontFamily={KO} fontWeight="600" fontSize="13" fill={site.accentInk}>
        {interlude.root}
      </text>
      {interlude.nodes.map((n, i) => (
        <g key={n.en}>
          <rect x={X[i] - 38} y="120" width="76" height="30" rx="4" fill="#0b0f0c" stroke={LINE} />
          <text x={X[i]} y="139" textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill="#fff">
            {n.en}
          </text>
          <text x={X[i]} y="206" textAnchor="middle" fontFamily={KO} fontSize="11" fill="#93a592">
            {n.ko}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Tree() {
  return (
    <svg
      viewBox="0 0 440 350"
      role="img"
      aria-label={`${interlude.career.roots} / ${interlude.career.trunk} / ${interlude.career.branches}`}
    >
      <circle cx="220" cy="140" r="125" fill={site.accent} opacity="0.07" />
      <g stroke="#c9a66b" strokeWidth="1.6" fill="none">
        <path data-draw pathLength={1} d="M220 300V200" />
        <path data-draw pathLength={1} d="M220 200C220 180 40 190 40 150" />
        <path data-draw pathLength={1} d="M220 200C220 180 130 180 130 150" />
        <path data-draw pathLength={1} d="M220 200V150" />
        <path data-draw pathLength={1} d="M220 200C220 180 310 180 310 150" />
        <path data-draw pathLength={1} d="M220 200C220 190 400 190 400 150" />
        {X.map((x, i) => (
          <path key={x} data-draw pathLength={1} d={`M${x} 120V${STEM_TOP[i]}`} />
        ))}
        {/* roots */}
        <path data-draw pathLength={1} d="M220 300C200 310 180 312 150 318" />
        <path data-draw pathLength={1} d="M220 300C240 310 260 312 290 318" />
        <path data-draw pathLength={1} d="M220 300V322" />
      </g>
      <g fill="#0b0f0c" stroke={site.accent} strokeWidth="1.2">
        {X.map((x) => (
          <rect key={x} x={x - 24} y="120" width="48" height="16" rx="3" />
        ))}
      </g>
      <g fill={site.accent}>
        {X.map((x, i) => (
          <circle key={x} data-fruit cx={x} cy={FRUIT_Y[i]} r={FRUIT_R[i]} />
        ))}
      </g>
      <g fontFamily={KO} fontSize="9.5" fill="#93a592">
        <text x="220" y="28" textAnchor="middle" fill={site.accent}>
          {interlude.career.branches}
        </text>
        <text x="208" y="256" textAnchor="end">
          {interlude.career.trunk}
        </text>
        <text x="220" y="342" textAnchor="middle">
          {interlude.career.roots}
        </text>
      </g>
    </svg>
  );
}

export default function Interlude() {
  const wrap = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const diagram = useRef<HTMLDivElement>(null);
  const tree = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(false);

  /* decide once on the client: reduced motion or narrow screen → static layout */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (still || !wrap.current || !tree.current || !diagram.current) return;
    const draw = tree.current.querySelectorAll("[data-draw]");
    const fruits = tree.current.querySelectorAll("[data-fruit]");
    const ctx = gsap.context(() => {
      gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(fruits, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(tree.current, { opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: "+=1800",
            scrub: 0.6,
            pin: stage.current,
          },
        })
        .to(diagram.current, { rotateX: 180, duration: 0.45, ease: "power2.inOut" }, 0)
        .to(diagram.current, { opacity: 0, duration: 0.15 }, 0.32)
        .to(tree.current, { opacity: 1, duration: 0.15 }, 0.4)
        .to(draw, { strokeDashoffset: 0, duration: 0.35, stagger: 0.02, ease: "none" }, 0.45)
        .to(fruits, { scale: 1, duration: 0.12, stagger: 0.03, ease: "back.out(2)" }, 0.78);
    }, wrap);
    return () => ctx.revert();
  }, [still]);

  return (
    <section ref={wrap} className={s.interlude} aria-label={interlude.label}>
      <div ref={stage} className={s.interludeStage}>
        <div className={s.interludeHead}>
          <span>{interlude.label}</span>
          <p>
            {interlude.line1}
            <br />
            <em>{interlude.line2}</em>
          </p>
        </div>

        {still ? (
          <div className={s.interludeStatic}>
            <div>
              <Diagram />
            </div>
            <div>
              {/* static: show the finished tree */}
              <Tree />
            </div>
          </div>
        ) : (
          <div className={s.interludeFig}>
            <div ref={diagram} style={{ transformStyle: "preserve-3d" }}>
              <Diagram />
            </div>
            <div ref={tree} className={s.interludeTree}>
              <Tree />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
