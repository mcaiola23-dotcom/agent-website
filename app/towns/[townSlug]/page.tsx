import { notFound } from "next/navigation";
import Link from "next/link";
import { getTownBySlug, getNeighborhoodsByTown } from "../../lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import TownHero from "../../components/TownHero";
import Container from "../../components/Container";

export const dynamic = "force-dynamic";

export default async function TownPage({
    params,
}: {
    params: Promise<{ townSlug: string }>;
}) {
    const { townSlug } = await params;
    const town = await getTownBySlug(townSlug);

    if (!town) {
        notFound();
    }

    const neighborhoods = await getNeighborhoodsByTown(townSlug);

    return (
        <div className="bg-white min-h-screen">
            <TownHero
                title={town.name}
                subtitle={town.overviewShort || `Discover the charm of ${town.name}`}
                imageSlug={townSlug}
                parentLink={{ href: "/towns", label: "Towns" }}
            />

            {/* Overview Section */}
            <section className="py-16 border-b border-stone-100">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">About {town.name}</h2>
                        {town.overviewLong ? (
                            <div className="prose prose-stone max-w-none text-slate-600 leading-relaxed">
                                <PortableText value={town.overviewLong as any} />
                            </div>
                        ) : (
                            <p className="text-slate-500 italic">Description coming soon.</p>
                        )}
                    </div>
                </Container>
            </section>

            {/* Structured Info Grid */}
            <section className="py-16 bg-stone-50">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Highlights */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">Highlights</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span className="text-slate-600">Coastal lifestyle with beach access</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span className="text-slate-600">Vibrant downtown and dining</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span className="text-slate-600">Easy commute to NYC</span>
                                </li>
                            </ul>
                        </div>
                        {/* Schools */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">Schools</h3>
                            <p className="text-slate-600 mb-4">Top-rated public and private school options available.</p>
                            <div className="bg-white p-4 rounded-lg border border-stone-200 text-center text-sm text-stone-500">
                                School data snapshot coming soon
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Neighborhoods */}
            <section className="py-16 border-b border-stone-100">
                <Container>
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif text-center">Neighborhoods</h2>
                    {neighborhoods.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {neighborhoods.map((neighborhood) => (
                                <Link
                                    key={neighborhood._id}
                                    href={`/towns/${townSlug}/${neighborhood.slug}`}
                                    className="group block p-6 bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-lg transition-all hover:border-blue-300"
                                >
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {neighborhood.name}
                                    </h3>
                                    {neighborhood.overview && (
                                        <p className="text-slate-600 line-clamp-3 text-sm">
                                            {neighborhood.overview}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-stone-50 rounded-lg">
                            <p className="text-slate-500">Neighborhood guides coming soon for {town.name}.</p>
                        </div>
                    )}
                </Container>
            </section>

            {/* Listings Placeholder */}
            <section className="py-20 bg-stone-900 text-white text-center">
                <Container>
                    <h2 className="text-3xl font-bold mb-6 font-serif">Homes for Sale in {town.name}</h2>
                    <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
                        Browse the latest luxury listings in this area.
                    </p>
                    <div className="inline-block px-8 py-4 border border-stone-700 bg-stone-800 rounded-lg text-stone-400">
                        Active listings coming soon
                    </div>
                </Container>
            </section>
        </div>
    );
}
