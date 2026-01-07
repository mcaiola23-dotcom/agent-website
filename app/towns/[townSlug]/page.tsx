import { notFound } from "next/navigation";
import Link from "next/link";
import { getTownBySlug, getNeighborhoodsByTown } from "../../lib/sanity.queries";
import { PortableText } from "@portabletext/react";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <Link href="/towns" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-4 inline-block">
                    &larr; Back to Towns
                </Link>
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">{town.name}</h1>
                {town.overviewLong && (
                    <div className="prose dark:prose-invert max-w-none">
                        <PortableText value={town.overviewLong as any} />
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Neighborhoods</h2>
                {neighborhoods.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {neighborhoods.map((neighborhood) => (
                            <Link
                                key={neighborhood._id}
                                href={`/towns/${townSlug}/${neighborhood.slug}`}
                                className="block p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                    {neighborhood.name}
                                </h3>
                                {neighborhood.overview && (
                                    <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
                                        {neighborhood.overview}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-zinc-600 dark:text-zinc-400">
                        No neighborhoods found for {town.name}.
                    </p>
                )}
            </div>
        </div>
    );
}
