import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";

export const metadata: Metadata = {
  title: "Sell Your Home in Fairfield County CT | Listing Representation",
  description:
    "Strategic seller representation in Fairfield County—accurate pricing, professional marketing, and skilled negotiation with Higgins Group Private Brokerage.",
};

export default function SellPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200">
        <Container className="py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-stone-500 uppercase mb-4">
              Seller Representation
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 leading-[1.05]">
              Sell strategically in Fairfield County.
            </h1>
            <div className="w-14 h-px bg-stone-300 my-7" />
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
              Every home sale is different. Whether you need to move quickly or
              want to maximize value with careful timing, you deserve a plan
              built around your goals—not a templated approach.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                Pricing with perspective.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Fairfield County pricing is hyper-local. A few streets can mean
                a meaningful difference in value. I combine comparable sales
                analysis with neighborhood-level context to arrive at a pricing
                strategy that positions your home competitively—without leaving
                money on the table.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Looking for a preliminary sense of value?{" "}
                <Link
                  href="/home-value"
                  className="text-stone-900 font-medium underline hover:no-underline"
                >
                  Get an instant estimate
                </Link>{" "}
                as a starting point—not an appraisal, but a data-informed range
                to frame our conversation.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Accurate pricing strategy
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A clear-eyed view of your home relative to recent sales,
                    current competition, and buyer expectations.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Professional presentation
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Photography, staging guidance, and marketing materials that
                    reflect the caliber of your property.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Skilled negotiation
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Calm, professional negotiation focused on terms, timing, and
                    protecting your interests through closing.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  How we work together
                </h2>
                <ol className="space-y-5">
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Initial consultation
                      </p>
                      <p className="text-slate-600">
                        Walk me through your home, timeline, and goals. I will
                        share preliminary pricing perspective and outline next
                        steps.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Pricing & preparation
                      </p>
                      <p className="text-slate-600">
                        We finalize list price, coordinate any prep work or
                        staging, and schedule professional photography.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Marketing & showings
                      </p>
                      <p className="text-slate-600">
                        Your listing is promoted across MLS, syndicated
                        platforms, and targeted channels. Showings and open
                        houses are managed to minimize disruption.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Negotiation & closing
                      </p>
                      <p className="text-slate-600">
                        We evaluate offers together, negotiate terms, and
                        coordinate through inspection, appraisal, and closing.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  Confidentiality & discretion
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Some sellers prefer privacy. If you want to explore your
                  options before going public, I can discuss off-market
                  strategies and quiet networking within the brokerage and agent
                  community.
                </p>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
                <h2 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  Start with an estimate
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Get a preliminary sense of your home&apos;s value in seconds.
                  This is a starting point—not an appraisal—but it can help
                  frame our conversation.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/home-value"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Home Value Estimate
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 text-stone-900 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Schedule a consultation
                  </Link>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  The estimate is data-informed but not a substitute for a
                  formal appraisal or in-person consultation.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
