import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Investment Services | Fairfield County CT",
  description:
    "Explore investment opportunities in Fairfield County real estate. Expert guidance on rental properties, multi-family investments, and market analysis.",
};

export default function InvestPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Investment Services</h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                Discover lucrative real estate investment opportunities.
            </p>
        </div>
    );
}
