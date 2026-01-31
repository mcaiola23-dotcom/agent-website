import type { Metadata } from "next";
import Link from "next/link";
import { getAllTowns, Town } from "../lib/sanity.queries";

export const metadata: Metadata = {
  title: "Fairfield County Towns | Explore CT Communities",
  description:
    "Discover towns across Fairfield County, Connecticut. Browse Greenwich, Stamford, Darien, New Canaan, Westport, Fairfield, Norwalk, Ridgefield, and more.",
};

export const dynamic = "force-dynamic";

export default async function TownsPage() {
    const towns = await getAllTowns();

    if (!towns || towns.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    Our Towns
                </h1>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                    No towns found (check Sanity publishing and API access).
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
                Our Towns
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {towns.map((town) => (
                    <Link
                        key={town._id}
                        href={`/towns/${town.slug}`}
                        className="block p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                            {town.name}
                        </h2>

                        {town.overviewShort ? (
                            <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
                                {town.overviewShort}
                            </p>
                        ) : (
                            <p className="text-zinc-600 dark:text-zinc-400">
                                View town overview
                            </p>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
