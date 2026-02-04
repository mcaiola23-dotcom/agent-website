import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/app/components/Container";

export const metadata: Metadata = {
  title: "Investing & Commercial Real Estate | Fairfield County CT",
  description:
    "Investment and commercial real estate guidance in Fairfield County—multifamily focus, disciplined underwriting, and discreet execution. Licensed with Higgins Group Private Brokerage.",
};

export default function InvestingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <Image
          src="/visual/services/investing-hero.png"
          alt="Commercial real estate in Fairfield County"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/70 uppercase mb-4">
              Investing & Commercial
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.05]">
              Investment and commercial real estate, guided with discipline.
            </h1>
            <div className="w-14 h-px bg-white/40 my-7" />
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-3xl">
              Focused on multifamily with experience across commercial property
              types. Clear underwriting, discreet execution, and a process that
              respects your goals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
              >
                Discuss an opportunity
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Share your buy box
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                A partner for buyers, sellers, landlords, and tenants.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                My core focus is medium and large multifamily, supported by
                experience across a range of commercial property types. Whether
                you are acquiring, selling, or leasing, I bring a disciplined,
                analytical approach and a calm process that prioritizes clarity
                over hype.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Acquisition strategy
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Define a clear buy box, screen opportunities efficiently,
                    and move decisively when the fit is right.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Underwriting support
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Review income, expenses, capex, and sensitivities to keep
                    decisions grounded in real assumptions.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Due diligence coordination
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Organize materials, inspections, and timelines so you can
                    evaluate risk with confidence.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Disposition planning
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Position assets thoughtfully with pricing guidance and a
                    targeted go-to-market approach.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Leasing representation
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Landlord and tenant representation with market context, term
                    strategy, and clean negotiation.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-stone-900 mb-2">
                    Relationship-driven outreach
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Tap into trusted relationships that can surface
                    opportunities when available and aligned.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                    For investors
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Tell me your buy box—asset type, size, geography, return
                    profile, and timeline. I will help you evaluate
                    opportunities and prioritize the ones that make sense.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
                    >
                      Share your buy box
                    </Link>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                    For owners considering a sale
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    If you are exploring a sale, we can start with a quick,
                    no-obligation consultation. I will walk you through
                    positioning, timing, and the likely buyer universe without
                    pressure.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-5 py-2 rounded-lg border border-stone-300 text-stone-900 font-semibold hover:bg-white transition-colors"
                    >
                      Request a consultation
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  Commercial real estate (select focus)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  While multifamily is the core focus, I also support select
                  commercial transactions and leasing engagements. If you are
                  evaluating office, retail, mixed-use, or other commercial
                  scenarios, I can help you assess fit, risk, and next steps.
                </p>
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
                        Align on goals
                      </p>
                      <p className="text-slate-600">
                        We define your buy box or disposition objectives,
                        timelines, and constraints.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Evaluate opportunities
                      </p>
                      <p className="text-slate-600">
                        We screen quickly, then underwrite deeper where the fit
                        is right.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Execute professionally
                      </p>
                      <p className="text-slate-600">
                        Diligence, financing, negotiation, and coordination
                        handled with clear communication.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">
                        Close and transition
                      </p>
                      <p className="text-slate-600">
                        Support through closing with continuity for leasing or
                        management introductions when needed.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  Free underwriting models (coming soon)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  I am building a set of underwriting templates to help
                  investors evaluate opportunities faster and with more clarity.
                  These will be available for free download when ready.
                </p>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                  <li className="border border-slate-200 rounded-lg px-4 py-3">
                    Single Family Flip
                  </li>
                  <li className="border border-slate-200 rounded-lg px-4 py-3">
                    Small Multi Flip
                  </li>
                  <li className="border border-slate-200 rounded-lg px-4 py-3">
                    Multifamily
                  </li>
                  <li className="border border-slate-200 rounded-lg px-4 py-3">
                    Retail
                  </li>
                  <li className="border border-slate-200 rounded-lg px-4 py-3">
                    Development
                  </li>
                  <li className="border border-slate-200 rounded-lg px-4 py-3">
                    Industrial
                  </li>
                </ul>
                <p className="mt-4 text-xs text-slate-500">
                  Templates will be released in phases. If you want early access,
                  let me know.
                </p>
                <div className="mt-5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-lg border border-stone-300 text-stone-900 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Request early access
                  </Link>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  Insights on investing & commercial real estate
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Market observations, underwriting frameworks, and strategy
                  notes focused on multifamily and commercial decision-making.
                </p>
                <div className="mt-5">
                  <Link
                    href="/insights"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
                  >
                    View Insights
                  </Link>
                </div>
              </div>

              <p className="mt-10 text-xs text-slate-500">
                Information provided is for general guidance only and is not
                tax, legal, or financial advice. Outcomes vary by asset and
                market conditions. I am happy to coordinate with your attorney,
                CPA, or other advisors.
              </p>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
                <h2 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  Start with a conversation
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Have a commercial or investment property you are considering
                  selling? I can offer a quick, no-obligation consultation and a
                  clear view of next steps.
                </p>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  For investors, we can discuss your buy box and the type of
                  opportunities that align with your goals.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Request a consultation
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 text-stone-900 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Share your buy box
                  </Link>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Off-market opportunities may be available depending on fit and
                  timing.
                </p>
              </div>

              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-7">
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide mb-3">
                  Service area
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Fairfield County, Connecticut, with access to New York metro
                  buyers and regional capital.
                </p>
                <div className="mt-4">
                  <Link
                    href="/towns"
                    className="text-sm font-medium text-stone-900 hover:underline"
                  >
                    Explore towns →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 border-t border-slate-200">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-lg text-stone-900 font-medium">
              If you are considering a sale or evaluating your next acquisition,
              I am happy to talk through it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 text-stone-900 font-semibold hover:bg-white transition-colors"
              >
                Share your buy box
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
