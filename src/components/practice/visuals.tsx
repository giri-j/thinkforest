import type { CSSProperties, ReactNode } from 'react'
import type { SceneKind, Shot } from './content'
import styles from './practice.module.css'

export const G = '#1F3326'
const IV = '#E8E1D0'
export const MONO = "var(--font-tf-mono), 'IBM Plex Mono', monospace"
export const SERIF = "var(--font-tf-serif), 'Noto Serif KR', serif"

/** 결정적 난수 — 서버/클라이언트 렌더 결과가 같도록 */
export function prng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 페이지에 한 번만 렌더하는 공통 그레인 필터 */
export function GrainDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <filter id="tf-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </svg>
  )
}

export function Grain({ opacity = 0.22 }: { opacity?: number }) {
  return (
    <svg aria-hidden="true" className={styles.grain} style={{ opacity }}>
      <rect width="100%" height="100%" filter="url(#tf-grain)" />
    </svg>
  )
}

/** 실제 이미지가 오기 전까지 쓰는 듀오톤 플레이스홀더 장면 */
export function Scene({ kind }: { kind: SceneKind }) {
  let body: ReactNode = null
  switch (kind) {
    case 'people':
      body = (<>
        <rect x="0" y="62" width="160" height="38" fill={G} opacity="0.18" />
        <g fill={G} opacity="0.55"><circle cx="40" cy="40" r="9" /><path d="M24 80c0-14 7-24 16-24s16 10 16 24z" /><circle cx="82" cy="36" r="10" /><path d="M64 80c0-16 8-26 18-26s18 10 18 26z" /><circle cx="122" cy="42" r="8" /><path d="M108 80c0-12 6-22 14-22s14 10 14 22z" /></g>
        <g fill={IV} opacity="0.6"><circle cx="40" cy="40" r="6" /><circle cx="82" cy="36" r="7" /><circle cx="122" cy="42" r="5" /></g>
      </>)
      break
    case 'store':
      body = (<>
        <g fill={G} opacity="0.35"><rect x="10" y="20" width="60" height="6" /><rect x="10" y="44" width="60" height="6" /><rect x="10" y="68" width="60" height="6" /><rect x="90" y="20" width="60" height="6" /><rect x="90" y="44" width="60" height="6" /><rect x="90" y="68" width="60" height="6" /></g>
        <g fill={G} opacity="0.6"><rect x="14" y="10" width="8" height="10" /><rect x="26" y="12" width="8" height="8" /><rect x="40" y="34" width="10" height="10" /><rect x="96" y="58" width="8" height="10" /><rect x="120" y="10" width="10" height="10" /></g>
      </>)
      break
    case 'note':
      body = (<>
        <rect x="30" y="8" width="100" height="84" fill="#F7F2E6" stroke={G} strokeOpacity="0.3" />
        <g stroke={G} strokeOpacity="0.4" strokeWidth="0.6"><path d="M38 24h70M38 34h80M38 44h56M38 54h76M38 64h62M38 74h70" /></g>
        <path d="M36 50c20-6 40 8 60-2" stroke="#9A4F12" strokeWidth="1" fill="none" />
      </>)
      break
    case 'app':
      body = (<>
        <rect x="58" y="6" width="44" height="88" rx="6" fill={G} opacity="0.85" />
        <rect x="62" y="14" width="36" height="72" rx="2" fill="#F7F2E6" />
        <g fill={G} opacity="0.5"><rect x="66" y="20" width="28" height="6" /><rect x="66" y="32" width="28" height="12" /><rect x="66" y="48" width="12" height="12" /><rect x="82" y="48" width="12" height="12" /><rect x="66" y="64" width="28" height="4" /></g>
      </>)
      break
    case 'map':
      body = (<>
        <path d="M12 70 C40 30 60 80 88 46 S130 30 148 60" stroke={G} strokeWidth="1.4" fill="none" strokeDasharray="3 3" />
        <g fill={G}><circle cx="12" cy="70" r="4" /><circle cx="52" cy="56" r="4" /><circle cx="88" cy="46" r="4" /><circle cx="120" cy="38" r="4" /><circle cx="148" cy="60" r="4" /></g>
        <g fontSize="5.5" fill={G} textAnchor="middle"><text x="12" y="82">출근</text><text x="52" y="68">입고</text><text x="88" y="58">체크</text><text x="120" y="30">픽업</text><text x="148" y="72">마감</text></g>
      </>)
      break
    case 'matrix': {
      const ops = [0.15, 0.5, 0.3, 0.7, 0.2]
      const cells: ReactNode[] = []
      for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) cells.push(<rect key={`${r}-${c}`} x={12 + c * 17} y={12 + r * 12} width="14" height="9" opacity={ops[(r * 3 + c) % 5]} />)
      body = <g fill={G}>{cells}</g>
      break
    }
    case 'tree':
      body = (<>
        <g stroke={G} strokeWidth="1" fill="none"><path d="M80 22V40M30 40H130M30 40V56M80 40V56M130 40V56" /></g>
        <rect x="62" y="12" width="36" height="12" rx="2" fill={G} />
        <g fill="#F7F2E6" stroke={G}><rect x="12" y="56" width="36" height="14" rx="2" /><rect x="62" y="56" width="36" height="14" rx="2" /><rect x="112" y="56" width="36" height="14" rx="2" /></g>
        <g fontSize="5" textAnchor="middle" fill={G}><text x="30" y="65">승인</text><text x="80" y="65">과금</text><text x="130" y="65">로그</text></g>
        <text x="80" y="20" fontSize="5" textAnchor="middle" fill="#F7F2E6">통합 구조</text>
      </>)
      break
    case 'dash':
      body = (<>
        <rect x="10" y="10" width="140" height="80" fill="#F7F2E6" /><rect x="10" y="10" width="28" height="80" fill={G} opacity="0.8" />
        <g fill={G} opacity="0.45"><rect x="46" y="18" width="30" height="16" /><rect x="82" y="18" width="30" height="16" /><rect x="118" y="18" width="26" height="16" /></g>
        <path d="M46 80 L62 64 L78 70 L96 50 L114 56 L144 40" stroke="#9A4F12" strokeWidth="1.4" fill="none" />
      </>)
      break
    case 'screen':
      body = (<>
        <rect x="10" y="10" width="140" height="80" fill="#F7F2E6" /><rect x="10" y="10" width="140" height="10" fill={G} opacity="0.8" />
        <g fill={G} opacity="0.4"><rect x="18" y="28" width="60" height="38" /><rect x="86" y="28" width="56" height="8" /><rect x="86" y="42" width="44" height="6" /><rect x="86" y="54" width="50" height="6" /><rect x="18" y="72" width="124" height="10" /></g>
      </>)
      break
    case 'blur':
      body = (<>
        <g fill={G} opacity="0.25"><rect x="10" y="12" width="40" height="76" /><rect x="60" y="12" width="40" height="76" /><rect x="110" y="12" width="40" height="76" /></g>
        <g fill={G} opacity="0.5"><rect x="14" y="18" width="32" height="10" /><rect x="14" y="32" width="32" height="10" /><rect x="64" y="18" width="32" height="10" /><rect x="114" y="18" width="32" height="10" /><rect x="114" y="32" width="32" height="10" /></g>
      </>)
      break
    case 'product':
      body = (<>
        <ellipse cx="80" cy="86" rx="46" ry="6" fill={G} opacity="0.2" />
        <path d="M52 30 L68 22 L92 22 L108 30 L100 44 L96 40 L96 84 L64 84 L64 40 L60 44 Z" fill={G} opacity="0.7" />
        <circle cx="80" cy="52" r="8" fill="#E1B970" />
      </>)
      break
    case 'fair':
      body = (<>
        <g fill={G} opacity="0.35"><rect x="8" y="20" width="44" height="56" /><rect x="58" y="14" width="44" height="62" /><rect x="108" y="22" width="44" height="54" /></g>
        <g fill={G} opacity="0.6"><circle cx="30" cy="84" r="5" /><circle cx="76" cy="86" r="5" /><circle cx="122" cy="84" r="5" /></g>
      </>)
      break
    case 'drop':
      body = (<>
        <rect width="160" height="100" fill={G} />
        <circle cx="110" cy="38" r="20" fill="#E1B970" opacity="0.85" />
        <path d="M0 100 L0 70 Q40 58 80 66 T160 60 L160 100 Z" fill="#0F1A13" />
        <text x="20" y="40" fontWeight="900" fontSize="14" fill={IV}>FIRST DROP</text>
      </>)
      break
  }
  return (
    <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={styles.fill}>
      <rect width="160" height="100" fill={IV} />
      {body}
    </svg>
  )
}

/** 16:10 고정 프레임 — 실제 이미지(src)가 있으면 듀오톤 처리, capture 는 컬러 유지 */
export function Frame({ shot, showLabel = true, style }: { shot: Shot; showLabel?: boolean; style?: CSSProperties }) {
  return (
    <div className={styles.frame} style={style}>
      {shot.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={shot.src} alt={`${shot.label} — ${shot.why}`} className={shot.capture ? styles.img : `${styles.img} ${styles.duotone}`} />
      ) : (
        <Scene kind={shot.kind} />
      )}
      {!shot.capture && shot.src && <span aria-hidden="true" className={styles.duotoneTint} />}
      <Grain />
      {showLabel && <span className={styles.chip}>{shot.label}</span>}
    </div>
  )
}

/** 챕터별 성장 단계 라인 일러스트 */
export function GrowthIcon({ stage, color, label }: { stage: 'seed' | 'sprout' | 'sapling' | 'tree' | 'forest'; color: string; label: string }) {
  const ground = <path d="M10 104 H110" strokeDasharray="2 4" />
  const paths: Record<typeof stage, ReactNode> = {
    seed: (<><ellipse cx="60" cy="88" rx="16" ry="10" transform="rotate(-20 60 88)" /><path d="M52 90 C58 84 64 86 68 82" />{ground}<path d="M60 78 C60 70 62 64 66 60" opacity="0.5" /></>),
    sprout: (<><path d="M60 104 V62" /><path d="M60 74 C44 74 34 62 34 50 C48 50 60 58 60 74Z" /><path d="M60 66 C76 66 86 54 86 42 C72 42 60 50 60 66Z" />{ground}</>),
    sapling: (<><path d="M60 104 V34" /><path d="M60 82 C46 82 38 72 38 62 C50 62 60 70 60 82Z" /><path d="M60 70 C74 70 82 60 82 50 C70 50 60 58 60 70Z" /><path d="M60 56 C48 56 42 46 42 38 C52 38 60 44 60 56Z" /><path d="M60 46 C70 46 76 38 76 30 C68 30 60 36 60 46Z" />{ground}</>),
    tree: (<><path d="M60 104 V58 M60 72 L46 58 M60 66 L74 52" /><circle cx="60" cy="40" r="22" /><circle cx="40" cy="52" r="14" /><circle cx="80" cy="50" r="15" /><path d="M60 104 C52 108 44 110 36 112 M60 104 C68 108 76 110 84 112" opacity="0.6" />{ground}</>),
    forest: (<><path d="M22 104 V78" /><path d="M22 52 L8 82 H36Z" /><path d="M60 104 V70" /><circle cx="60" cy="50" r="22" /><path d="M98 104 V80" /><path d="M98 50 L84 84 H112Z" /><path d="M42 104 V90 M42 74 L34 92 H50Z" opacity="0.6" /><path d="M80 104 V92 M80 78 L73 94 H87Z" opacity="0.6" /><path d="M4 104 H116" /></>),
  }
  return (
    <svg width="128" height="120" viewBox="0 0 120 116" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={`성장 단계 ${label}`}>
      {paths[stage]}
    </svg>
  )
}

function treeline(base: number, amp: number, step: number, color: string, seed: number) {
  const r = prng(seed)
  let d = 'M0 480 '
  for (let x = 0; x <= 1120; x += step) d += `L${x} ${base} L${x + step / 2} ${base - Math.round(amp / 2 + r() * amp / 2)} `
  d += `L1120 ${base} L1120 480 Z`
  return <path d={d} fill={color} />
}

const heroRand = prng(7)
const HERO_STARS = Array.from({ length: 30 }, () => ({ x: Math.round(heroRand() * 1100) + 10, y: Math.round(heroRand() * 144) + 6, r: [0.8, 1, 1.3][Math.floor(heroRand() * 3)], o: [0.4, 0.6, 0.8][Math.floor(heroRand() * 3)] }))
const HERO_SEEDS = Array.from({ length: 22 }, () => ({ x: Math.round(heroRand() * 880) + 120, y: Math.round(heroRand() * 70) + 400, r: [1.6, 2, 2.4, 2.8][Math.floor(heroRand() * 4)], dur: 7 + heroRand() * 5, delay: -heroRand() * 12 }))

/** 히어로: 씨앗이 떠올라 빛나는 나무에 모이고, 숲이 펼쳐지는 장면 */
export function HeroScene() {
  return (
    <svg viewBox="0 0 1120 480" preserveAspectRatio="xMidYMax slice" role="img" aria-label="씨앗들이 떠올라 빛나는 한 그루의 나무에 모이고, 그 아래로 숲이 펼쳐진 풍경" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <defs>
        <radialGradient id="tf-hglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#E1B970" stopOpacity="0.35" /><stop offset="0.6" stopColor="#E1B970" stopOpacity="0.06" /><stop offset="1" stopColor="#E1B970" stopOpacity="0" /></radialGradient>
      </defs>
      {HERO_STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#EDE7DA" opacity={s.o} />)}
      <circle cx="560" cy="210" r="250" fill="url(#tf-hglow)" data-hero-glow />
      {treeline(400, 70, 46, '#132119', 1)}
      {treeline(430, 60, 38, '#0E1913', 2)}
      <g stroke="#D9B26A" fill="none" strokeLinecap="round" data-hero-tree>
        <path d="M560 470 V300" strokeWidth="5" />
        <path d="M560 330 C560 290 470 280 430 220" strokeWidth="3" /><path d="M560 320 C560 260 540 220 540 160" strokeWidth="3" /><path d="M560 315 C570 260 620 240 660 190" strokeWidth="3" /><path d="M560 340 C590 300 690 300 720 260" strokeWidth="2.4" /><path d="M560 345 C530 310 430 315 395 280" strokeWidth="2.4" />
        <path d="M430 220 C415 195 395 185 380 170 M430 220 C432 190 445 172 455 156 M540 160 C530 135 515 122 505 105 M540 160 C552 132 568 118 580 104 M660 190 C662 162 672 145 686 130 M660 190 C690 178 715 172 740 170 M720 260 C740 245 760 240 780 238 M395 280 C375 268 355 262 335 262" strokeWidth="1.6" />
      </g>
      <g fill="#0E1712" stroke="#E1B970" strokeWidth="1.4"><rect x="534" y="318" width="52" height="20" rx="4" /><rect x="408" y="208" width="44" height="16" rx="3" /><rect x="518" y="150" width="44" height="16" rx="3" /><rect x="638" y="180" width="44" height="16" rx="3" /></g>
      <g fill="#F2D49A" data-hero-fruits>
        {[[380, 168, 7], [455, 152, 8], [505, 102, 7], [580, 100, 9], [686, 127, 8], [740, 168, 7], [780, 236, 6], [335, 261, 6]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
      </g>
      <g fill="#F2D49A" opacity="0.25"><circle cx="380" cy="168" r="16" /><circle cx="580" cy="100" r="20" /><circle cx="686" cy="127" r="17" /></g>
      {HERO_SEEDS.map((s, i) => (
        <circle key={i} className={styles.seed} cx={s.x} cy={s.y} r={s.r} fill="#E1B970" style={{ animationDuration: `${s.dur.toFixed(1)}s`, animationDelay: `${s.delay.toFixed(1)}s` }} />
      ))}
      {treeline(460, 48, 30, '#08100B', 3)}
      <path d="M0 480 L0 470 Q280 458 560 466 T1120 462 L1120 480 Z" fill="#050806" />
      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2" fill="#8C9C8B"><text x="40" y="455">SEED</text><text x="1080" y="455" textAnchor="end">FOREST</text></g>
    </svg>
  )
}

const consRand = prng(11)
const CONS_DOTS = (() => {
  const dots: { x: number; y: number; r: number; o: number; soil?: boolean }[] = []
  while (dots.length < 120) {
    const x = 10 + consRand() * 180
    const y = 6 + consRand() * 144
    const inCrown = y < 110 && ((x - 100) ** 2) / 78 ** 2 + ((y - 60) ** 2) / 54 ** 2 <= 1
    const inTrunk = x >= 92 && x <= 108 && y >= 100 && y <= 150
    if (inCrown || inTrunk) dots.push({ x, y, r: [1.2, 1.6, 2, 2.4][Math.floor(consRand() * 4)], o: [0.35, 0.55, 0.8][Math.floor(consRand() * 3)] })
  }
  for (let i = 0; i < 14; i++) dots.push({ x: consRand() * 200, y: 150 + consRand() * 22, r: 1.4, o: 0.6, soil: true })
  return dots
})()

/** 프롤로그: 흩어진 씨앗이 모여 나무 모양을 이루는 점묘 */
export function SeedConstellation() {
  return (
    <svg viewBox="0 0 200 175" role="img" aria-label="흩어진 씨앗 점들이 모여 나무 모양을 이룬 그림" style={{ width: 180, height: 'auto' }}>
      {CONS_DOTS.map((d, i) => <circle key={i} data-seed-dot cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r} fill={d.soil ? '#9A4F12' : G} opacity={d.o} />)}
    </svg>
  )
}

/** Chapter II 고정 시퀀스 도식 */
export function Diagram({ type }: { type: 'funnel' | 'allocation' | 'graph' }) {
  const common = { viewBox: '0 0 160 100', className: styles.fill, role: 'img' as const }
  if (type === 'funnel')
    return (
      <svg {...common} aria-label="깔때기: 주문 100만 건, 취소 15%, 결품 3%">
        <rect width="160" height="100" fill={IV} />
        <path d="M16 14H144L132 36H28Z" fill={G} opacity="0.25" /><path d="M32 42H128L114 64H46Z" fill={G} opacity="0.5" /><path d="M50 70H110L98 90H62Z" fill={G} />
        <g fontSize="6.5" textAnchor="middle"><text x="80" y="27" fill={G}>주문 100만 건</text><text x="80" y="55" fill={G}>취소 15%</text><text x="80" y="83" fill={IV} fontWeight="700">결품 3%</text></g>
        <g fontSize="5.5" fill="#9A4F12"><path d="M112 80 H126" stroke="#9A4F12" strokeWidth="0.6" /><text x="128" y="82">통제 가능</text></g>
      </svg>
    )
  if (type === 'allocation')
    return (
      <svg {...common} aria-label="배송 할당 정책 1+1+1과 2+1 비교">
        <rect width="160" height="100" fill={IV} />
        <line x1="80" y1="14" x2="80" y2="88" stroke={G} strokeOpacity="0.3" />
        <g fontFamily="IBM Plex Mono, monospace" fontSize="7" textAnchor="middle" fill={G}><text x="40" y="20">1 + 1 + 1</text><text x="120" y="20">2 + 1</text></g>
        <g fill={G} opacity="0.5"><rect x="16" y="34" width="14" height="14" /><rect x="34" y="34" width="14" height="14" /><rect x="52" y="34" width="14" height="14" /></g>
        <g fill={G}><rect x="96" y="34" width="30" height="14" /><rect x="130" y="34" width="14" height="14" /></g>
        <g stroke={G} strokeWidth="0.8" fill="none"><path d="M23 52v14M41 52v14M59 52v14" /><path d="M111 52v14M137 52v14" /></g>
        <g fontSize="5.5" textAnchor="middle" fill={G}><text x="41" y="76">[할당 방식 A 설명]</text><text x="120" y="76">[할당 방식 B 설명]</text></g>
      </svg>
    )
  return (
    <svg {...common} aria-label="교육 효과 0.5%p와 구조 효과 1%p 비교 막대그래프">
      <rect width="160" height="100" fill={IV} />
      <line x1="24" y1="84" x2="140" y2="84" stroke={G} strokeOpacity="0.5" />
      <rect x="40" y="58" width="28" height="26" fill={G} opacity="0.35" /><rect x="96" y="32" width="28" height="52" fill={G} />
      <g fontFamily="IBM Plex Mono, monospace" fontSize="7" textAnchor="middle" fill={G}><text x="54" y="53">+0.5%p</text><text x="110" y="27">+1%p</text></g>
      <g fontSize="6" textAnchor="middle" fill={G}><text x="54" y="93">교육</text><text x="110" y="93">구조</text></g>
    </svg>
  )
}
