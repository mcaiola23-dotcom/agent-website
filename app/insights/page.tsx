import type { Metadata } from "next";
import Link from "next/link";
import { getRecentPosts } from "../lib/sanity.queries";

export const metadata: Metadata = {
  title: "Insights | Fairfield County Real Estate Market News & Tips",
  description:
    "Expert analysis, market updates, and community news for Fairfield County real estate. Stay informed about trends, tips, and local developments.",
};

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
    const posts = await getRecentPosts();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">Insights</h1>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl">
                Expert analysis, market updates, and community news for Fairfield County real estate.
            </p>

            {/* Categories Links (Optional helper for user navigation) */}
            <div className="flex gap-4 mb-12 flex-wrap">
                {['market-update', 'community', 'real-estate-tips', 'news'].map((cat) => (
                    <Link key={cat} href={`/insights/${cat}`} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-medium capitalize transition-colors">
                        {cat.replace(/-/g, ' ')}
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link
                        key={post._id}
                        href={`/insights/${post.categorySlug}/${post.slug}`}
                        className="group block border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                                {post.categoryLabel}
                            </span>
                            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-slate-500 text-sm">
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {posts.length === 0 && (
                <p className="text-slate-500">No recent posts found.</p>
            )}
        </div>
    );
}
