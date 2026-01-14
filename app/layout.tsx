import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import GlobalFooter from "./components/GlobalFooter";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fairfield Real Estate Agent",
  description: "Your trusted partner for buying, selling, and investing in Fairfield County real estate.",
  metadataBase: new URL('https://example.com'), // Placeholder
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Higgins Group Private Brokerage",
  "image": "https://example.com/logo.png", // Placeholder
  "description": "Expert real estate services in Fairfield County.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1055 Washington Blvd.",
    "addressLocality": "Stamford",
    "addressRegion": "CT",
    "postalCode": "06901",
    "addressCountry": "US"
  },
  "url": "https://example.com",
  "telephone": "+12036588282",
  "priceRange": "$$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <GlobalFooter />
      </body>
    </html>
  );
}
