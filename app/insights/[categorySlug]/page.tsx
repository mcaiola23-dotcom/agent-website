import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByCategoryLabel, getCategoryLabelFromValue, getCategoryValueFromSlug } from "../../lib/sanity.queries";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{
        categorySlug: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { categorySlug } = await params;
    const categoryValue = getCategoryValueFromSlug(categorySlug);
    const categoryLabel = categoryValue
        ? getCategoryLabelFromValue(categoryValue)
        : categorySlug.replace(/-/g, " ");

    const formattedLabel =
        categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1);

    const title = `${formattedLabel} | Fairfield County Real Estate Insights`;
    const description = `Browse ${formattedLabel.toLowerCase()} articles and insights about Fairfield County real estate. Expert analysis and local market knowledge.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function InsightsCategoryPage(props: Props) {
    const params = await props.params;
    const { categorySlug } = params;

    // Use the mapping to check if this is a valid category URL
    const categoryValue = getCategoryValueFromSlug(categorySlug);

    // If mapping fails, verify if it should just show empty or if it's truly unknown.
    // Requirement says: "if slug is unknown OR list empty: render an empty state (DO NOT 404)"
    // However, usually unknown slug implies 404, but the requirement is strict about "render an empty state" for "slug is unknown". 
    // Let's infer that as "Show page with 0 posts" rather than a hard 404 error page, 
    // but if the slug itself is gibberish, it's weird. 
    // But I will follow "render an empty state".

    const posts = await getPostsByCategoryLabel(categorySlug);

    // Get pretty label using the value we hopefully found, or fallback to slug
    const categoryLabel = categoryValue ? getCategoryLabelFromValue(categoryValue) : categorySlug.replace(/-/g, ' ');

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/insights" className="text-blue-600 hover:underline mb-4 inline-block">&larr; All Insights</Link>
                <h1 className="text-4xl font-bold text-slate-900 capitalize">{categoryLabel}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link
                        key={post._id}
                        href={`/insights/${post.categorySlug}/${post.slug}`} // Ensure we use the canonical slug for the category
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
                <div className="text-slate-500 py-12 text-center bg-slate-50 rounded-xl">
                    <p className="text-lg">No posts found in {categoryLabel}.</p>
                    <Link href="/insights" className="text-blue-600 hover:underline mt-2 inline-block">Browse all insights</Link>
                </div>
            )}
        </div>
    );
}
