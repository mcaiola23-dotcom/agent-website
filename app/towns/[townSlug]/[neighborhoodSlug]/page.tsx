import { notFound } from "next/navigation";
import Link from "next/link";
import { getNeighborhoodBySlug } from "../../../lib/sanity.queries";
import TownHero from "../../../components/TownHero";
import Container from "../../../components/Container";

export const dynamic = "force-dynamic";

export default async function NeighborhoodPage({
    params,
}: {
    params: Promise<{ townSlug: string; neighborhoodSlug: string }>;
}) {
    const { townSlug, neighborhoodSlug } = await params;
    const neighborhood = await getNeighborhoodBySlug(townSlug, neighborhoodSlug);

    if (!neighborhood) {
        notFound();
    }

    const townName = neighborhood.town?.name || "Town";

    return (
        <div className="bg-white min-h-screen">
            <TownHero
                title={neighborhood.name}
                subtitle={`A neighborhood in ${townName}`}
                imageSlug={neighborhoodSlug} // Will look for /visual/towns/{neighborhoodSlug}.jpg
                parentLink={{ href: `/towns/${townSlug}`, label: townName }}
            />

            <Container className="py-16">
                {/* Overview */}
                <section className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Overview</h2>
                    {neighborhood.overview ? (
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            {neighborhood.overview}
                        </p>
                    ) : (
                        <p className="text-slate-500 italic">Overview coming soon.</p>
                    )}
                </section>

                {/* Structured Data Placeholders */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">Housing Market</h3>
                        <p className="text-slate-600 mb-4">Current market trends for {neighborhood.name}.</p>
                        <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
                            <span className="text-stone-400 text-sm">Market data loading...</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">Highlights</h3>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Quiet residential streets</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Close to local parks</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Community atmosphere</li>
                        </ul>
                    </div>
                </section>

                {/* Listings Placeholder */}
                <section className="bg-stone-900 rounded-2xl p-12 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4 font-serif">Homes for Sale in {neighborhood.name}</h2>
                    <div className="inline-block px-6 py-3 border border-stone-700 bg-stone-800 rounded text-stone-400">
                        Active listings coming soon
                    </div>
                </section>
            </Container>
        </div>
    );
}
