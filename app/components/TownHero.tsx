"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

interface TownHeroProps {
    title: string;
    subtitle?: string;
    imageSlug: string; // Used to construct /visual/towns/{slug}.jpg
    parentLink?: {
        href: string;
        label: string;
    };
}

export default function TownHero({
    title,
    subtitle,
    imageSlug,
    parentLink,
}: TownHeroProps) {
    return (
        <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                {/* Fallback Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-stone-900" />

                <Image
                    src={`/visual/towns/${imageSlug}.jpg`}
                    alt=""
                    fill
                    className="object-cover opacity-60"
                    priority
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none'; // Hide broken image to show gradient fallback
                    }}
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content Layer */}
            <Container className="relative z-10 text-center text-white">
                {parentLink && (
                    <Link
                        href={parentLink.href}
                        className="inline-block mb-4 text-sm font-medium tracking-wider uppercase text-white/80 hover:text-white transition-colors"
                    >
                        &larr; Back to {parentLink.label}
                    </Link>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight font-serif">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
                        {subtitle}
                    </p>
                )}
            </Container>
        </section>
    );
}
