/* 숲의 책상에서 쓰는 장식. DESK의 seal / knot / cherubs에 해당한다. */

export function Seal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden {...props}>
      <circle cx="32" cy="32" r="30" />
      <circle cx="32" cy="32" r="25" strokeDasharray="1.5 2.5" />
      <path d="M32 44c-7-6-9-12-5-19 3-5 9-7 14-6-1 9-3 17-9 25z" />
      <path d="M32 44c4-8 6-14 9-25" />
      <path d="M22 22l20 20" strokeWidth=".6" strokeDasharray="1 2" />
    </svg>
  )
}

export function Leaf(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden {...props}>
      <path d="M4 20c0-9 5-15 16-16-1 11-7 16-16 16z" />
      <path d="M4 20c4-5 8-8 12-11" />
    </svg>
  )
}

export function Apple(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden {...props}>
      <path d="M12 7.5c2-1.6 4.6-1.6 6.2.4 2.2 2.8 1 8.6-1.6 11.3-1.3 1.3-2.9 1.3-4.6.5-1.7.8-3.3.8-4.6-.5C4.8 16.5 3.6 10.7 5.8 7.9c1.6-2 4.2-2 6.2-.4z" />
      <path d="M12 7.5c0-2 1-3.6 3-4.5" />
      <path d="M12 7.5c-1-1.2-2.5-1.6-4-1.3" />
    </svg>
  )
}

export function Divider({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <i /><Apple /><i />
    </div>
  )
}
