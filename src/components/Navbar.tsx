'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  // Decide if we should show dark text (when scrolled OR on non-home pages)
  const showDarkText = isScrolled || !isHome

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12",
      showDarkText ? "bg-white/70 backdrop-blur-xl border-b border-border py-3" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 text-2xl font-bold tracking-tighter group font-maple transition-colors",
            showDarkText ? "text-brand-dark" : "text-white"
          )}
        >
          <img
            src="/favicon.svg"
            alt="Symbol"
            className={cn(
              "w-8 h-8 transition-all group-hover:rotate-12",
              !showDarkText && "brightness-0 invert"
            )}
          />
          <span>기획의<span className="italic">숲</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            link.name === 'Contact' ? (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-6 py-2 rounded-full font-bold transition-all active:scale-95 text-sm shadow-sm",
                  showDarkText
                    ? "bg-brand-dark text-white hover:bg-brand-dark/90"
                    : "bg-white text-brand-dark hover:bg-white/90"
                )}
              >
                {link.name}
              </Link>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-all hover:text-primary",
                  (pathname === link.href && showDarkText) ? "text-primary" : (showDarkText ? "text-brand-dark" : "text-white")
                )}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-border p-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-2xl font-bold",
                pathname === link.href ? "text-primary" : "text-brand-dark"
              )}
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-primary text-white w-full py-4 rounded-2xl font-bold text-lg">
            Contact
          </button>
        </div>
      )}
    </nav>
  )
}
