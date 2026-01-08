import Link from "next/link";
import { getRecentPosts, getTownsForHomepage } from "./lib/sanity.queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [towns, posts] = await Promise.all([
    getTownsForHomepage(9),
    getRecentPosts(3),
  ]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-50 py-20 lg:py-32 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Fairfield County Real Estate Guidance
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional, data-driven insights to help you navigate buying, selling, and investing in Connecticut's Gold Coast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/home-value"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors text-lg"
            >
              Home Value Estimate
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold rounded-lg transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Towns */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Explore Towns</h2>
              <p className="text-slate-600">Discover the unique communities of Fairfield County.</p>
            </div>
            <Link href="/towns" className="hidden sm:inline-block text-blue-600 font-medium hover:underline">
              View all towns &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {towns.map((town) => (
              <Link
                key={town._id}
                href={`/towns/${town.slug}`}
                className="group block bg-slate-50 border border-slate-200 p-6 rounded-xl hover:shadow-lg transition-shadow hover:border-blue-300"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {town.name}
                </h3>
                {town.overviewShort && (
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {town.overviewShort}
                  </p>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/towns" className="text-blue-600 font-medium hover:underline">
              View all towns &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Latest Insights</h2>
              <p className="text-slate-600">Market trends and real estate news.</p>
            </div>
            <Link href="/insights" className="hidden sm:inline-block text-blue-600 font-medium hover:underline">
              View all insights &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/insights/${post.categorySlug}/${post.slug}`}
                className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3">
                    {post.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/insights" className="text-blue-600 font-medium hover:underline">
              View all insights &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make a move?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Whether you're curious about your home's value or ready to start touring, let's start the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/home-value"
              className="inline-block px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Get Home Estimate
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
