import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";

export const metadata: Metadata = {
  title: "Buy in Fairfield County CT | Buyer Representation",
  description:
    "Calm, data-driven buyer guidance across Fairfield County—relocation strategy, neighborhood insight, and contract-to-close support with Higgins Group Private Brokerage.",
};

export default function BuyPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200">
        <Container className="py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-stone-500 uppercase mb-4">
              Buyer Representation
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 leading-[1.05]">
              Buy with clarity in Fairfield County.
            </h1>
            <div className="w-14 h-px bg-stone-300 my-7" />
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
              Whether you’re relocating from NYC or moving town-to-town, you
              deserve calm guidance—neighborhood context, pricing perspective,
              and a process that feels organized from the first showing through
              closing.
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
                A premium buying experience—without the pressure.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Fairfield County is a market of micro-neighborhoods. The right
                decision depends on your lifestyle, commute, and long-term
                plans—not just the listing photos. My role is to help you
                compare options intelligently, avoid surprises, and move with
                confidence.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Relocation-ready strategy
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Shortlist towns and neighborhoods based on commute patterns,
                    lifestyle fit, and timing—so your search stays focused.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Neighborhood-level insight
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Understand what drives value street-by-street: condition,
                    location factors, and how pricing shifts by pocket.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Contract-to-close coordination
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Clear next steps, responsive scheduling, and support through
                    inspection, appraisal, and closing logistics.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  How we work
                </h2>
                <ol className="space-y-5">
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Define the target
                      </p>
                      <p className="text-slate-600">
                        A short consultation to align on towns, neighborhoods,
                        timing, and deal preferences.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Tour efficiently
                      </p>
                      <p className="text-slate-600">
                        We prioritize the right inventory and move quickly when
                        a home matches your criteria.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Offer with confidence
                      </p>
                      <p className="text-slate-600">
                        We build a strong position with clean terms and clear
                        expectations—no noise, no guesswork.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Navigate due diligence
                      </p>
                      <p className="text-slate-600">
                        Inspection and appraisal are handled with a structured
                        checklist and calm communication.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  Explore towns & neighborhoods
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Start with a town overview, then drill down to neighborhoods.
                </p>
                <div className="mt-5">
                  <Link
                    href="/towns"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Browse Towns
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Common starting points: Greenwich, New Canaan, Darien,
                  Westport, Fairfield, Stamford, Norwalk, Ridgefield.
                </p>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
                <h2 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  Start with a conversation
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Tell me what you’re looking for and your ideal timing. I’ll
                  reply with a clear next step and a plan for the search.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/home-value"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 text-stone-900 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Also selling? Get an estimate
                  </Link>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Home value results are an estimate and a starting point—not an
                  appraisal.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
