"use client";

import { useState } from "react";
import Link from "next/link";
import TownsHoverBackground from "./TownsHoverBackground";

interface Town {
    _id: string;
    name: string;
    slug: string;
    overviewShort?: string;
}

// Replicating the subset of Town type we need
interface ExploreTownsSectionProps {
    towns: Town[];
}

export default function ExploreTownsSection({ towns }: ExploreTownsSectionProps) {
    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Layer */}
            <TownsHoverBackground towns={towns} hoveredSlug={hoveredSlug} />

            {/* Content Layer */}
            <div className="relative z-10 container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Explore Towns</h2>
                        <p className="text-slate-600">Discover the unique communities of Fairfield County.</p>
                    </div>
                    <Link href="/towns" className="hidden sm:inline-block text-blue-600 font-medium hover:underline">
                        View all towns &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {towns.map((town) => (
                        <Link
                            key={town._id}
                            href={`/towns/${town.slug}`}
                            className="group block bg-white/90 backdrop-blur-sm border border-slate-200 p-6 rounded-xl hover:shadow-lg transition-all hover:border-blue-300 hover:bg-white"
                            onMouseEnter={() => setHoveredSlug(town.slug)}
                            onMouseLeave={() => setHoveredSlug(null)}
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {town.name}
                            </h3>
                            {town.overviewShort && (
                                <p className="text-slate-600 text-sm line-clamp-2">
                                    {town.overviewShort}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
                <div className="mt-8 text-center sm:hidden">
                    <Link href="/towns" className="text-blue-600 font-medium hover:underline">
                        View all towns &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
