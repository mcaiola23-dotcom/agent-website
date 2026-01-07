import ValuationForm from "../components/ValuationForm";

export const metadata = {
    title: "Home Value Estimate | Fairfield Real Estate",
    description: "Get a free instant home value estimate for your property in Fairfield County.",
};

export default function HomeValuePage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        What's Your Home Worth?
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Get a preliminary estimate in seconds. Or for a pinpoint valuation, our team can provide a comprehensive market analysis.
                    </p>
                </div>

                <ValuationForm />
            </div>
        </div>
    );
}
