import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostByCategoryLabelAndSlug } from "../../../lib/sanity.queries";
import RichText from "../../../components/RichText";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{
        categorySlug: string;
        postSlug: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { categorySlug, postSlug } = await params;
    const post = await getPostByCategoryLabelAndSlug(categorySlug, postSlug);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The requested article could not be found.",
        };
    }

    const title = `${post.title} | Fairfield County Insights`;
    const description = `Read ${post.title} - expert insights on Fairfield County real estate from a local market perspective.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: post.publishedAt,
            authors: post.author ? [post.author] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function InsightsPostPage(props: Props) {
    const params = await props.params;
    const { categorySlug, postSlug } = params;

    const post = await getPostByCategoryLabelAndSlug(categorySlug, postSlug);

    if (!post) {
        notFound();
    }

    // BlogPosting structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: post.author
            ? {
                  "@type": "Person",
                  name: post.author,
              }
            : undefined,
        publisher: {
            "@type": "RealEstateAgent",
            name: "Higgins Group Private Brokerage",
            url: "https://example.com", // Placeholder
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://example.com/insights/${categorySlug}/${postSlug}`,
        },
        articleSection: post.categoryLabel,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <Link href={`/insights/${categorySlug}`} className="text-blue-600 hover:underline mb-4 inline-block capitalize">
                    &larr; Back to {post.categoryLabel}
                </Link>

                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                            {post.categoryLabel}
                        </span>
                        <time className="text-slate-500 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</time>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                        {post.title}
                    </h1>
                    {post.author && (
                        <p className="text-slate-600 mt-4">By {post.author}</p>
                    )}
                </header>
            </div>

            <div className="prose prose-slate max-w-none">
                {post.body ? (
                    <RichText value={post.body} />
                ) : (
                    <p className="text-slate-500 italic">No content available for this post.</p>
                )}
            </div>
        </article>
        </>
    );
}
