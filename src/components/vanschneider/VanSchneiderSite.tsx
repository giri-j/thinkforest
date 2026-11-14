"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  site,
  menu,
  hero,
  marquee,
  intro,
  projects,
  essays,
  closing,
  footer,
} from "@/content/forest-content";
import Interlude from "./Interlude";
import s from "./vanschneider.module.css";

gsap.registerPlugin(ScrollTrigger);

/** '#id' → plain anchor, everything else → next/link */
function A({
  href,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith("#")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

function LeafIcon() {
  return (
    <span className={s.leaf} aria-hidden>
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M10 18V9M10 11C6 11 4 7 4 5c3 0 6 2 6 6zM10 9c0-4 3-6 6-6 0 3-2 6-6 6z" />
      </svg>
    </span>
  );
}

/* a column of small "seeds" — replaces the original arch pattern */
function Seeds() {
  const dots = Array.from({ length: 9 });
  return (
    <svg width="110" height="400" viewBox="0 0 110 400" aria-hidden>
      {dots.map((_, i) => (
        <circle
          key={i}
          cx="55"
          cy={20 + i * 44}
          r={Math.max(1.2, 3.4 - i * 0.22)}
          fill="#fff"
          opacity={1 - i * 0.1}
        />
      ))}
    </svg>
  );
}

export default function VanSchneiderSite() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ---------- page-wide motion ---------- */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const heroBlock = q("[data-hero]")[0] as HTMLElement | undefined;
      const h1 = q("[data-hero] h1")[0] as HTMLElement | undefined;
      const after = q("[data-after]");

      if (reduce) {
        gsap.set([heroBlock, ...after], { opacity: 1 });
      } else if (heroBlock && h1) {
        gsap.set(after, { filter: "blur(10px)", y: -20 });

        const start = () => {
          if (cancelled) return;
          const NS = "http://www.w3.org/2000/svg";
          const lines = Array.from(h1.querySelectorAll("span")) as HTMLElement[];
          const svg = document.createElementNS(NS, "svg");
          svg.setAttribute("class", s.hairline);
          svg.setAttribute("aria-hidden", "true");
          h1.appendChild(svg);

          const texts = lines.map((line) => {
            const t = document.createElementNS(NS, "text");
            t.textContent = line.textContent;
            t.setAttribute("fill", "#fff");
            t.setAttribute("fill-opacity", "0");
            t.setAttribute("stroke", "#fff");
            t.setAttribute("stroke-width", "1");
            svg.appendChild(t);
            return t as SVGTextElement;
          });

          const dashes: number[] = [];
          const place = () => {
            const hr = h1.getBoundingClientRect();
            svg.setAttribute("width", String(Math.ceil(hr.width)));
            svg.setAttribute("height", String(Math.ceil(hr.height)));
            lines.forEach((line, i) => {
              const probe = document.createElement("span");
              probe.style.cssText =
                "display:inline-block;width:0;height:0;vertical-align:baseline";
              line.appendChild(probe);
              const sr = line.getBoundingClientRect();
              const base = probe.getBoundingClientRect().top;
              line.removeChild(probe);
              const cs = getComputedStyle(line);
              const t = texts[i];
              t.style.fontFamily = cs.fontFamily;
              t.style.fontSize = cs.fontSize;
              t.style.fontWeight = cs.fontWeight;
              t.style.letterSpacing = cs.letterSpacing;
              t.setAttribute("x", (sr.left - hr.left).toFixed(2));
              t.setAttribute("y", (base - hr.top).toFixed(2));
              const dash = parseFloat(cs.fontSize) * 11;
              dashes[i] = dash;
              t.style.strokeDasharray = String(dash);
            });
          };
          place();
          texts.forEach((t, i) => (t.style.strokeDashoffset = String(dashes[i])));
          lines.forEach((l) => (l.style.color = "transparent"));
          gsap.set(heroBlock, { opacity: 1 });

          window.addEventListener("resize", place);
          const done = () => {
            window.removeEventListener("resize", place);
            lines.forEach((l) => (l.style.color = ""));
            svg.remove();
          };

          const DRAW = 1.8;
          gsap
            .timeline({ delay: 0.25, onComplete: done })
            .to(texts, { strokeDashoffset: 0, duration: DRAW, ease: "power2.inOut", stagger: 0.18 }, 0)
            .to(texts, { attr: { "fill-opacity": 1 }, duration: 0.9, ease: "power1.inOut", stagger: 0.18 }, DRAW - 0.55)
            .to(texts, { attr: { "stroke-opacity": 0 }, duration: 0.6, ease: "power1.out", stagger: 0.18 }, DRAW + 0.1)
            .to(after, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }, DRAW + 0.4);
        };

        if (document.fonts?.ready) document.fonts.ready.then(start);
        else start();
      }

      /* parallax seed rows */
      const rows = q("[data-row]") as HTMLElement[];
      const speeds = [0.3, -0.24, 0.18];
      const onScroll = () => {
        const y = window.scrollY;
        rows.forEach((r, i) => (r.style.transform = `translateX(${y * speeds[i]}px)`));
      };
      if (!reduce) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      }

      if (reduce) return () => window.removeEventListener("scroll", onScroll);

      /* scroll reveals */
      q("[data-reveal]").forEach((node) => {
        gsap.from(node, {
          y: 60,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: node, start: "top 85%" },
        });
      });

      /* project media: clip-path wipe + inner parallax */
      q("[data-media]").forEach((node) => {
        const inner = node.querySelector("[data-inner]");
        gsap.fromTo(
          node,
          { clipPath: "inset(12% 8% 12% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: node, start: "top 95%", end: "top 40%", scrub: true },
          }
        );
        if (inner) {
          gsap.fromTo(
            inner,
            { yPercent: -8, scale: 1.15 },
            {
              yPercent: 8,
              scale: 1.05,
              ease: "none",
              scrollTrigger: { trigger: node, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });

      /* big outlined watermark drifting sideways */
      q("[data-drift]").forEach((node, i) => {
        gsap.fromTo(
          node,
          { xPercent: i % 2 ? 12 : -12 },
          {
            xPercent: i % 2 ? -12 : 12,
            ease: "none",
            scrollTrigger: { trigger: node, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      /* marquee */
      const track = q("[data-marquee]")[0];
      if (track) {
        gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
      }

      return () => window.removeEventListener("scroll", onScroll);
    }, el);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  /* ---------- menu overlay ---------- */
  useEffect(() => {
    const m = menuRef.current;
    if (!m) return;
    const items = m.querySelectorAll("[data-menu-item]");
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      gsap.to(m, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.out" });
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.05, delay: 0.2 }
      );
    } else {
      gsap.to(m, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut" });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const marqueeText = marquee.items.join("  ·  ") + "  ·  ";

  return (
    <div
      ref={root}
      className={s.page}
      style={
        {
          "--accent": site.accent,
          "--ink": site.accentInk,
        } as React.CSSProperties
      }
    >
      {/* header */}
      <header className={s.header}>
        <a className={s.brand} href="#top">
          <LeafIcon />
          {site.brand}
        </a>
        <span className={s.loc}>{site.location}</span>
        <button
          className={s.menuBtn}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span>{menuOpen ? "×" : site.menuLabel}</span>
          <i />
        </button>
      </header>

      {/* menu overlay */}
      <div ref={menuRef} className={s.menu} aria-hidden={!menuOpen}>
        {menu.map((g) => (
          <div key={g.group} className={s.menuGroup} data-menu-item>
            <span>{g.group}</span>
            {g.links.map((l) => (
              <A key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </A>
            ))}
          </div>
        ))}
      </div>

      {/* hero */}
      <section id="top" className={s.hero}>
        <div className={s.patternWrap} aria-hidden>
          {[0, 1, 2].map((r) => (
            <div key={r} className={s.patternRow} data-row>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={s.shape}>
                  <Seeds />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={s.heroInner}>
          <div data-hero className={s.heroBlock} style={{ opacity: 0 }}>
            <h1 className={s.h1}>
              {hero.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </h1>
          </div>
          <p data-after className={`${s.subtitle} ${s.ko}`} style={{ opacity: 0 }}>
            {hero.subtitleKo}
          </p>
          <p data-after className={s.est} style={{ opacity: 0 }}>
            {hero.meta}
          </p>
          <p data-after className={s.sig} style={{ opacity: 0 }}>
            {hero.role}
          </p>
        </div>

        <span className={s.scrollHint}>{hero.scrollLabel} ↓</span>
      </section>

      {/* marquee */}
      <div className={s.marquee}>
        <A href={marquee.href}>
          <div className={s.marqueeTrack} data-marquee>
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                <i className={s.badge}>{marquee.badge}</i>
                {marqueeText}
              </span>
            ))}
          </div>
        </A>
      </div>

      {/* intro */}
      <section id="intro" className={s.intro}>
        <p data-reveal>
          {intro.primary.before}
          <mark>✣ {intro.primary.highlight}</mark>
          {intro.primary.after}
        </p>
        <p data-reveal className={s.dim}>
          {intro.secondary}
        </p>
        <A data-reveal className={s.take} href={intro.link.href}>
          {intro.link.label}
        </A>
      </section>

      {/* projects */}
      <div id="work">
        {projects.map((p, idx) => (
          <section key={p.watermark} id={p.watermark.toLowerCase()} className={s.project}>
            <div className={s.drift} data-drift aria-hidden>
              {p.watermark}
            </div>

            <div className={s.projectHead} data-reveal>
              <span className={s.index}>{p.no}</span>
              <h2>
                <b>{p.name}</b> — {p.tagline}
              </h2>
              <small className={`${s.labelRow} ${s.ko}`}>
                <span>{p.label}</span>
                <span className={s.stage}>{p.stage}</span>
              </small>
            </div>

            <div className={s.projectBody}>
              <p data-reveal>{p.description}</p>
              <A data-reveal className={s.cta} href={p.cta.href}>
                {p.cta.label} <span>→</span>
              </A>
            </div>

            <div className={s.mediaGrid}>
              {p.images.map((img, i) => (
                <figure key={img.caption} className={i % 2 === 1 ? s.offset : undefined}>
                  <div className={s.media} data-media>
                    {img.src ? (
                      <div data-inner className={s.mediaInner} style={{ position: "relative" }}>
                        <Image
                          src={img.src}
                          alt={img.alt ?? img.caption}
                          fill
                          sizes="(max-width: 543px) 100vw, 50vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div
                        data-inner
                        className={s.mediaInner}
                        style={{
                          background: `radial-gradient(120% 90% at ${
                            i % 2 ? "80% 20%" : "20% 80%"
                          }, ${p.tone.glow}, ${p.tone.mid} 45%, ${p.tone.base} 85%)`,
                        }}
                      />
                    )}
                  </div>
                  <figcaption data-reveal>{img.caption}</figcaption>
                </figure>
              ))}
            </div>

            {idx === 2 && (
              <div className={s.essays} data-reveal>
                <header>
                  <span>{essays.label}</span>
                  <em>{essays.sublabel}</em>
                </header>
                <ul>
                  {essays.items.map((e) => (
                    <li key={e.title}>
                      <A href={e.href}>
                        <span>{e.title}</span>
                        <i>→</i>
                      </A>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* interlude: diagram → tree */}
      <Interlude />

      {/* closing */}
      <section id="closing" className={s.closing}>
        <h2 data-reveal>
          {closing.lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <div className={s.closingActions} data-reveal>
          <A className={s.pill} href={closing.cta.href}>
            {closing.cta.label}
          </A>
          {closing.secondary.map((l) => (
            <A key={l.label} className={s.secondaryLink} href={l.href}>
              {l.label}
            </A>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className={s.footer}>
        <div>
          <span className={s.ko}>{footer.left}</span>
          <span className={s.ko}>{footer.right}</span>
        </div>
      </footer>
    </div>
  );
}
