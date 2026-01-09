"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroBackgroundCrossfadeProps {
    images?: string[];
    intervalMs?: number;
}

export default function HeroBackgroundCrossfade({
    images = [
        "/visual/home/hero-1.jpg",
        "/visual/home/hero-2.jpg",
        "/visual/home/hero-3.jpg",
    ],
    intervalMs = 5000,
}: HeroBackgroundCrossfadeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(images.length).fill(false));

    useEffect(() => {
        // Respect prefers-reduced-motion
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) return;

        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [images.length, intervalMs]);

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-100">
            {/* Neutral Gradient Fallback */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200" />

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/10 z-10" />

            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        priority={index === 0}
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
                            // If image fails, conceal it
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
