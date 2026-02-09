import type { Metadata } from "next";
import Link from "next/link";
import { getRecentPosts, getTownsForHomepage } from "./lib/sanity.queries";
import HeroBackgroundCrossfade from "./components/HeroBackgroundCrossfade";
import ExploreTownsSection from "./components/ExploreTownsSection";
import SellBuySection from "./components/SellBuySection";
import MortgageCalculator from "./components/MortgageCalculator";
import AgentIntroSection from "./components/AgentIntroSection";
import EmailSignupSection from "./components/EmailSignupSection";

export const metadata: Metadata = {
  title: {
    absolute: "Matt Caiola | Luxury Real Estate | Fairfield County CT",
  },
  description:
    "Matt Caiola offers personalized luxury real estate guidance in Fairfield County, Connecticut. Serving Greenwich, Stamford, Darien, New Canaan, Westport, Fairfield, Norwalk, and surrounding towns. Licensed with Higgins Group Private Brokerage.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const [towns, posts] = await Promise.all([
    getTownsForHomepage(9),
    getRecentPosts(3),
  ]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-50 py-16 lg:py-24 border-b border-slate-200 overflow-hidden">
        <HeroBackgroundCrossfade />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto pt-0 pb-16 -mt-8">
            <p className="text-sm md:text-base font-semibold tracking-[0.25em] text-stone-100 uppercase mb-5 opacity-100 drop-shadow-md">
              Matt Caiola Luxury Properties
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight leading-[0.95] font-serif drop-shadow-lg">
              Fairfield County<br className="hidden md:block" /> Real Estate
            </h1>
            <div className="w-12 h-px bg-stone-400 mx-auto mb-8"></div>
            <p className="font-sans text-lg md:text-xl text-stone-100 mb-10 max-w-3xl mx-auto leading-relaxed tracking-wide font-light drop-shadow-md">
              Personal, data-driven insights and white-glove service guiding you through buying, selling, and investing in Connecticut&apos;s Gold Coast.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/home-search"
                className="inline-block px-[42px] py-3 bg-transparent hover:bg-white/10 text-white font-medium rounded-none border-[3px] border-white transition-colors text-lg"
              >
                Home Search
              </Link>
              <Link
                href="/home-value"
                className="inline-block px-8 py-3 bg-transparent hover:bg-white/10 text-white border-[3px] border-white font-medium rounded-none transition-colors text-lg"
              >
                Home Valuation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sell/Buy Split Section */}
      <SellBuySection />

      {/* Explore Towns */}
      <ExploreTownsSection towns={towns} />

      {/* Mortgage Calculator */}
      <MortgageCalculator />

      {/* Latest Insights */}
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">Latest Insights</h2>
              <p className="text-stone-600">Market trends and real estate news.</p>
            </div>
            <Link href="/insights" className="hidden sm:inline-block text-stone-900 font-medium hover:underline decoration-stone-400 underline-offset-4">
              View all insights &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/insights/${post.categorySlug}/${post.slug}`}
                className="group block bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-semibold mb-3">
                    {post.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-stone-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-stone-400 text-sm">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/insights" className="text-stone-900 font-medium hover:underline decoration-stone-400 underline-offset-4">
              View all insights &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Agent Intro */}
      <AgentIntroSection />

      {/* Footer CTA */}
      <section className="relative py-20 text-white text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/visual/home/hero-2.jpg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-stone-900/85" />

        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make a move?</h2>
          <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto">
            Whether you&apos;re curious about your home&apos;s value or ready to start touring, I&apos;m here to help you take the next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/home-value"
              className="inline-block px-8 py-3 bg-transparent hover:bg-white/10 text-white font-medium rounded-none border-[3px] border-white transition-colors text-lg"
            >
              Get Home Estimate
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-transparent hover:bg-white/10 text-white font-medium rounded-none border-[3px] border-white transition-colors text-lg"
            >
              Contact Matt
            </Link>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <EmailSignupSection />
    </div>
  );
}
