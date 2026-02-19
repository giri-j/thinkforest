'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function HomeHero() {
    const [showContent, setShowContent] = useState(false)

    const introRef = useRef<HTMLDivElement>(null)
    const introTextRef = useRef<HTMLDivElement>(null)

    const mainContentRef = useRef<HTMLDivElement>(null)
    const layerTextRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setShowContent(true)
        })

        // 1. Intro Animation (Black screen + scale & rotate settling)
        tl.fromTo(introTextRef.current,
            { scale: 4, opacity: 0, rotate: 15 },
            { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out" }
        )
            .to(introRef.current, {
                opacity: 0,
                duration: 0.4,
                delay: 0.2,
                ease: "power2.inOut"
            })

        // 2. Main Content Fade In (Entire group at once to solve flickering)
        tl.fromTo(mainContentRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "none" },
            "-=0.4"
        )
            // Extra rise animation for the text inside the group
            .fromTo(layerTextRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                "-=0.8"
            )

        return () => {
            tl.kill()
        }
    }, [])

    // Mouse Move Parallax Logic
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e
        const xMove = (clientX / window.innerWidth - 0.5)
        const yMove = (clientY / window.innerHeight - 0.5)

        const layers = mainContentRef.current?.querySelectorAll('.parallax-layer')
        if (layers) {
            gsap.to(layers[1], { x: xMove * 10, y: yMove * 5, duration: 2, ease: "power2.out" }) // cloud1
            gsap.to(layers[2], { x: xMove * -15, y: yMove * 8, duration: 2.2, ease: "power2.out" }) // cloud2
            gsap.to(layers[4], { x: xMove * 20, y: yMove * 12, duration: 1.5, ease: "power2.out" }) // object
        }
        gsap.to(layerTextRef.current, { x: xMove * 4, y: yMove * 2, duration: 2.5, ease: "power3.out" })
    }

    return (
        <div className="home-container" onMouseMove={handleMouseMove}>
            {/* 1. Intro Overlay */}
            <div ref={introRef} className="intro-overlay">
                <div className="-translate-y-32">
                    <div ref={introTextRef} className="font-somi text-white text-4xl md:text-6xl tracking-tighter">
                        기획의 숲
                    </div>
                </div>
            </div>

            {/* 2. Unified Content Group - Solves all flicker/gap issues */}
            <div ref={mainContentRef} className="absolute inset-0 opacity-0 will-change-opacity">

                {/* Layer 1: Background (Z-1) */}
                <div className="absolute inset-0 z-[1] parallax-layer">
                    <Image
                        src="/home_img/introbg_all.png"
                        alt="Forest Background"
                        fill
                        priority
                        loading="eager"
                        className="object-cover"
                    />
                </div>

                {/* Layer 2: Cloud 1 (Z-2) */}
                <div className="absolute inset-0 z-[2] parallax-layer">
                    <Image
                        src="/home_img/introbg_cloud1.png"
                        alt="Cloud 1"
                        fill
                        priority
                        loading="eager"
                        className="object-cover"
                    />
                </div>

                {/* Layer 3: Cloud 2 (Z-3) */}
                <div className="absolute inset-0 z-[3] parallax-layer">
                    <Image
                        src="/home_img/introbg_cloud2.png"
                        alt="Cloud 2"
                        fill
                        priority
                        loading="eager"
                        className="object-cover"
                    />
                </div>

                {/* Layer 4: Text Wrapper (Z-4) - Dynamic height applied here */}
                <div
                    ref={layerTextRef}
                    className="absolute inset-0 flex items-center justify-center z-[4] pointer-events-none parallax-layer"
                >
                    <div className="-translate-y-32 text-center">
                        <span className="font-somi text-white text-6xl md:text-9xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                            기획의 숲
                        </span>
                    </div>
                </div>

                {/* Layer 5: Topmost Object (Z-5) */}
                <div className="absolute inset-0 z-[5] parallax-layer">
                    <Image
                        src="/home_img/introbg_object.png"
                        alt="Foreground Object"
                        fill
                        priority
                        loading="eager"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Scroll indicator */}
            {showContent && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <div className="w-[1px] h-16 bg-white/30" />
                </div>
            )}
        </div>
    )
}
