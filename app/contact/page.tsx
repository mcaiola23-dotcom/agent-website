import ContactForm from "../components/ContactForm";

export const metadata = {
    title: "Contact Us | Fairfield Real Estate",
    description: "Get in touch with our expert real estate team.",
};

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
                        <p className="text-lg text-slate-600">
                            Have questions about buying, selling, or the local market? We're here to help.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                        <ContactForm />
                    </div>

                    <div className="mt-12 text-center text-slate-500">
                        <p className="mb-2">Or prefer to email us directly?</p>
                        <a href="mailto:hello@example.com" className="text-blue-600 font-medium hover:underline">hello@example.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
