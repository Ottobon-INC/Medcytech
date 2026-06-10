"use client";

import React, { useRef, useState } from "react";



interface InteractiveBackgroundProps {
    children: React.ReactNode;
    className?: string;
    exclusionArea?: {
        width: string;
        height: string;
        top?: string;
        left?: string;
    };
    backgroundColor?: string;
}

export default function InteractiveBackground({
    children,
    className = "",
    exclusionArea,
    backgroundColor = "#CFE8E5"
}: InteractiveBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        if (!isHovered) setIsHovered(true);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                if (containerRef.current) {
                    containerRef.current.style.setProperty('--mouse-x', `-1000px`);
                    containerRef.current.style.setProperty('--mouse-y', `-1000px`);
                }
            }}
            className={`relative overflow-hidden flex flex-col ${className}`}
            style={{
                backgroundColor,
                '--mouse-x': '-1000px',
                '--mouse-y': '-1000px'
            } as any}
        >
            <style>{`
                @keyframes slow-spin-pattern {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            {/* Base Faint Pattern Layer */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
                style={{ mixBlendMode: 'multiply' }}
            >
                <svg className="w-full h-full">
                    <defs>
                        <pattern id="spinning-lotus-base" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <g style={{ transformOrigin: '30px 30px', animation: 'slow-spin-pattern 25s linear infinite' }}>
                                <image href="/lotus_icon_transparent.png" x="0" y="0" width="60" height="60" />
                            </g>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#spinning-lotus-base)" />
                </svg>
            </div>

            {/* Spotlight Reveal Pattern Layer */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    opacity: isHovered ? 0.4 : 0,
                    transition: 'opacity 0.5s ease',
                    WebkitMaskImage: 'radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
                    maskImage: 'radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
                }}
            >
                <svg className="w-full h-full">
                    <defs>
                        <pattern id="spinning-lotus-spotlight" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <g style={{ transformOrigin: '30px 30px', animation: 'slow-spin-pattern 25s linear infinite' }}>
                                <image href="/lotus_icon_transparent.png" x="0" y="0" width="60" height="60" />
                            </g>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#spinning-lotus-spotlight)" />
                </svg>
            </div>

            {/* Optional Exclusion Mask */}
            {exclusionArea && (
                <div
                    className="absolute z-[1]"
                    style={{
                        width: exclusionArea.width,
                        maxWidth: '100%',
                        height: exclusionArea.height,
                        backgroundColor,
                        left: exclusionArea.left || '50%',
                        top: exclusionArea.top || '45%',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none'
                    }}
                />
            )}

            <div className="relative z-10 w-full">
                {children}
            </div>
        </section>
    );
}
