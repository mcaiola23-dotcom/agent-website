import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getNeighborhoodBySlug } from "../../../lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import TownHero from "../../../components/TownHero";
import Container from "../../../components/Container";

// Data Modules
import { DataModuleGrid } from "../../../components/data/DataModule";
import { AtAGlanceModule } from "../../../components/data/AtAGlanceModule";
import { SchoolsModule } from "../../../components/data/SchoolsModule";
import { WalkScoreModule, WalkScoreModulePlaceholder } from "../../../components/data/WalkScoreModule";
import { PoisModule, PoisModulePlaceholder } from "../../../components/data/PoisModule";
import { TaxesModule } from "../../../components/data/TaxesModule";
import { ListingsModule } from "../../../components/data/ListingsModule";
import { getWalkScore } from "../../../lib/data/providers/walkscore.provider";
import { getPois } from "../../../lib/data/providers/places.provider";
import { TOWN_CENTERS } from "../../../lib/data/town-centers";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ townSlug: string; neighborhoodSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { townSlug, neighborhoodSlug } = await params;
    const neighborhood = await getNeighborhoodBySlug(townSlug, neighborhoodSlug);

    if (!neighborhood) {
        return {
            title: "Neighborhood Not Found",
            description: "The requested neighborhood could not be found.",
        };
    }

    const townName = neighborhood.town?.name || "Fairfield County";
    const title = `${neighborhood.name}, ${townName} CT | Neighborhood Guide`;
    const description =
        neighborhood.overview ||
        `Explore ${neighborhood.name} in ${townName}, Connecticut. Discover homes, market trends, and neighborhood highlights.`;

    // Use town image as fallback for neighborhoods
    const image = `/visual/towns/${townSlug}.jpg`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${neighborhood.name} neighborhood in ${townName}, Connecticut`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

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
    const townId = neighborhood.town?._id || "";
    const hasDescription =
        Array.isArray(neighborhood.description) && neighborhood.description.length > 0;
    const hasHighlights = Boolean(neighborhood.highlights && neighborhood.highlights.length > 0);

    // Determine coordinates - prefer neighborhood center, fallback to town center
    const center = neighborhood.center || neighborhood.town?.center;
    const hasCenterCoords = center?.lat && center?.lng;

    // Fetch Walk Score data if coordinates are available
    let walkScoreResult = null;
    if (hasCenterCoords) {
        walkScoreResult = await getWalkScore({
            townSlug,
            townId,
            townName,
            lat: center!.lat,
            lng: center!.lng,
            neighborhoodSlug,
            neighborhoodId: neighborhood._id,
            address: `${neighborhood.name}, ${townName}, CT`,
        });
    }

    // Fetch POIs data - combine neighborhood and town curated POIs
    const combinedCuratedPois = [
        ...(neighborhood.curatedPois || []),
        ...(neighborhood.town?.curatedPois || []),
    ];

    let poisResult = null;
    if (hasCenterCoords) {
        poisResult = await getPois({
            townSlug,
            townId,
            townName,
            lat: center!.lat,
            lng: center!.lng,
            curatedPois: combinedCuratedPois,
            neighborhoodSlug,
            neighborhoodId: neighborhood._id,
        });
    } else if (combinedCuratedPois.length > 0) {
        // Use curated POIs if no coordinates
        poisResult = await getPois({
            townSlug,
            townId,
            townName,
            lat: 0,
            lng: 0,
            curatedPois: combinedCuratedPois,
            neighborhoodSlug,
            neighborhoodId: neighborhood._id,
        });
    }

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

                {/* Description */}
                <section className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                        Living in {neighborhood.name}
                    </h2>
                    {hasDescription ? (
                        <div className="prose prose-stone max-w-none text-slate-600 leading-relaxed">
                            <PortableText value={neighborhood.description as any} />
                        </div>
                    ) : (
                        <p className="text-slate-500 italic">Description coming soon.</p>
                    )}
                </section>

                {/* Highlights Section */}
                {hasHighlights && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                            What Makes {neighborhood.name} Special
                        </h2>
                        <ul className="space-y-3">
                            {neighborhood.highlights!.map((highlight, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-blue-600 mr-3 flex-shrink-0">•</span>
                                    <span className="text-slate-600">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Demographics Section */}
                <section className="mb-16">
                    <AtAGlanceModule
                        townSlug={townSlug}
                        townName={townName}
                        isNeighborhoodContext={true}
                    />
                </section>

                {/* Nearby Schools Section */}
                <section className="mb-16">
                    <SchoolsModule
                        townSlug={townSlug}
                        townName={townName}
                        neighborhoodCenter={hasCenterCoords ? center : undefined}
                        isNeighborhoodContext={true}
                    />
                </section>

                {/* Property Taxes Section */}
                <section className="mb-16">
                    <div className="max-w-2xl">
                        <TaxesModule
                            townSlug={townSlug}
                            townName={townName}
                            isNeighborhoodContext={true}
                        />
                    </div>
                </section>

                {/* Walk Score & POIs Section */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Walk Score */}
                        {walkScoreResult ? (
                            <WalkScoreModule result={walkScoreResult} locationName={neighborhood.name} />
                        ) : (
                            <WalkScoreModulePlaceholder />
                        )}

                        {/* POIs */}
                        {poisResult && poisResult.pois.length > 0 ? (
                            <PoisModule result={poisResult} locationName={neighborhood.name} />
                        ) : (
                            <PoisModulePlaceholder locationName={neighborhood.name} />
                        )}
                    </div>
                </section>



                {/* Listings Section */}
                <section>
                    <ListingsModule
                        townSlug={townSlug}
                        townName={townName}
                        neighborhoodSlug={neighborhoodSlug}
                        neighborhoodName={neighborhood.name}
                        center={TOWN_CENTERS[townSlug]}
                    />
                </section>
            </Container>
        </div>
    );
}
