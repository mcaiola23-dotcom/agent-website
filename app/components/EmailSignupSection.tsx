"use client";

import { useState } from "react";

export default function EmailSignupSection() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStatus("success");
        setEmail("");

        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <section className="py-12 bg-stone-200">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">
                        Stay Updated
                    </h3>
                    <p className="text-stone-600 mb-6">
                        Get the latest market insights and new listings delivered to your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-white border border-stone-300 text-stone-900 placeholder-stone-400 rounded-none focus:outline-none focus:border-stone-900 transition-colors"
                            required
                            disabled={status === "loading" || status === "success"}
                        />
                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className={`px-6 py-3 font-medium rounded-none transition-colors ${status === "success"
                                    ? "bg-green-600 text-white"
                                    : "bg-stone-900 text-white hover:bg-stone-800"
                                }`}
                        >
                            {status === "loading" && "Subscribing..."}
                            {status === "success" && "Subscribed!"}
                            {(status === "idle" || status === "error") && "Subscribe"}
                        </button>
                    </form>

                    <p className="text-xs text-stone-500 mt-4">
                        No spam, unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
