import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";

export const metadata: Metadata = {
  title: "About | Fairfield County Real Estate",
  description:
    "Local expertise and a calm, data-driven approach to buying and selling in Fairfield County, CT. Affiliated with Higgins Group Private Brokerage.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200">
        <Container className="py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-stone-500 uppercase mb-4">
              About
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 leading-[1.05]">
              Real estate guidance rooted in Fairfield County.
            </h1>
            <div className="w-14 h-px bg-stone-300 my-7" />
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
              I help buyers and sellers navigate Fairfield County with clarity,
              local knowledge, and a process that respects your time.
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
                Local knowledge, personal approach.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                I have spent my entire adult life in Fairfield County—getting to
                know the neighborhoods, the people, and the nuances that make
                each town distinct. That firsthand perspective shapes the advice
                I give clients every day.
              </p>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                I bring a disciplined, analytical approach to pricing and market
                strategy—but I never lose sight of the fact that real estate is
                personal. Every transaction involves real decisions, real
                timelines, and real emotions. My role is to provide clarity and
                confidence while making the experience feel seamless and,
                frankly, enjoyable. Whether you&apos;re buying your first home,
                selling a long-held property, or relocating from out of state, I
                am here to listen, guide, and deliver results you can trust.
              </p>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  How I work
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-stone-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-stone-900">
                        Honest pricing perspective
                      </p>
                      <p className="text-slate-600">
                        I give you a clear-eyed view of value—not an inflated
                        number to win your listing or a lowball to close
                        quickly.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-stone-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-stone-900">
                        Responsive communication
                      </p>
                      <p className="text-slate-600">
                        You will hear from me promptly. I keep you informed
                        without overwhelming your inbox.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-stone-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-stone-900">
                        Process clarity
                      </p>
                      <p className="text-slate-600">
                        I explain each step before it happens so you always know
                        what to expect and when.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-stone-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-stone-900">
                        Negotiation without drama
                      </p>
                      <p className="text-slate-600">
                        I advocate firmly for your interests while keeping
                        transactions professional and on track.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
                  Higgins Group Private Brokerage
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  I am proud to be affiliated with{" "}
                  <span className="font-medium text-stone-900">
                    Higgins Group Private Brokerage
                  </span>
                  , one of Connecticut&apos;s premier real estate firms with nearly
                  30 years of success and over 400 agents across ten offices.
                  The Higgins family has been in real estate for over 125
                  years—and the culture they&apos;ve built reflects that legacy.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  The firm operates on four guiding principles: family comes
                  first, everyone is treated as an equal, treat others as
                  you&apos;d like to be treated, and above all—be kind. Buying or
                  selling a home is emotional, and Higgins Group believes in
                  patience and compassion throughout the process. It&apos;s a
                  brokerage that genuinely feels like a family, and that
                  philosophy aligns with how I work.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Higgins Group is also the exclusive{" "}
                  <span className="font-medium text-stone-900">
                    Forbes Global Properties
                  </span>{" "}
                  representative for Fairfield and New Haven Counties—giving
                  clients powerful global reach when it matters.
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Higgins Group Private Brokerage
                  <br />
                  1055 Washington Blvd., Stamford, CT 06901
                  <br />
                  <a
                    href="tel:2036588282"
                    className="hover:text-stone-900 transition-colors"
                  >
                    203-658-8282
                  </a>
                  <br />
                  <a
                    href="https://higginsgroup.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-stone-900 transition-colors"
                  >
                    higginsgroup.com
                  </a>
                </p>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
                <h2 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  Let&apos;s talk
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Whether you have questions about a specific property, want to
                  discuss your home&apos;s value, or are just starting to explore
                  your options—I&apos;m happy to help.
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
                    Home Value Estimate
                  </Link>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-7">
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide mb-3">
                  Service Areas
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Greenwich, Stamford, Darien, New Canaan, Westport, Fairfield,
                  Norwalk, Wilton, Ridgefield, and surrounding Fairfield County
                  towns.
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
    </div>
  );
}
