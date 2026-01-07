import { notFound } from "next/navigation";
import Link from "next/link";
import { getNeighborhoodBySlug } from "../../../lib/sanity.queries";

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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
                href={`/towns/${townSlug}`}
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-4 inline-block"
            >
                &larr; Back to {neighborhood.town?.slug ? "Town" : "Town"}
            </Link>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">{neighborhood.name}</h1>

            <div className="prose dark:prose-invert max-w-none">
                {neighborhood.overview ? (
                    <p>{neighborhood.overview}</p>
                ) : (
                    <p className="text-zinc-500 italic">No overview available.</p>
                )}
            </div>
        </div>
    );
}
