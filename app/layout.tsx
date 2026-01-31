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
  title: {
    default: "Fairfield County CT Luxury Real Estate | Higgins Group Private Brokerage",
    template: "%s | Fairfield County Luxury Real Estate",
  },
  description:
    "Expert real estate guidance in Fairfield County, Connecticut. Serving Greenwich, Stamford, Darien, New Canaan, Westport, Fairfield, Norwalk, and surrounding towns.",
  metadataBase: new URL("https://example.com"), // Placeholder — update before launch
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fairfield County Luxury Real Estate",
    title: "Fairfield County CT Luxury Real Estate | Higgins Group Private Brokerage",
    description:
      "Expert real estate guidance in Fairfield County, Connecticut. Serving Greenwich, Stamford, Darien, New Canaan, Westport, Fairfield, Norwalk, and surrounding towns.",
    images: [
      {
        url: "/visual/home/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Fairfield County Connecticut luxury real estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fairfield County CT Luxury Real Estate | Higgins Group Private Brokerage",
    description:
      "Expert real estate guidance in Fairfield County, Connecticut. Serving Greenwich, Stamford, Darien, New Canaan, Westport, and surrounding towns.",
    images: ["/visual/home/hero-1.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Higgins Group Private Brokerage",
  image: "https://example.com/visual/home/hero-1.jpg", // Placeholder domain
  description:
    "Expert luxury real estate services in Fairfield County, Connecticut. Serving Greenwich, Stamford, Darien, New Canaan, Westport, Fairfield, Norwalk, and surrounding towns.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1055 Washington Blvd.",
    addressLocality: "Stamford",
    addressRegion: "CT",
    postalCode: "06901",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0534,
    longitude: -73.5387,
  },
  url: "https://example.com", // Placeholder — update before launch
  telephone: "+1-203-658-8282",
  priceRange: "$$$",
  areaServed: [
    { "@type": "City", name: "Greenwich", addressRegion: "CT" },
    { "@type": "City", name: "Stamford", addressRegion: "CT" },
    { "@type": "City", name: "Darien", addressRegion: "CT" },
    { "@type": "City", name: "New Canaan", addressRegion: "CT" },
    { "@type": "City", name: "Westport", addressRegion: "CT" },
    { "@type": "City", name: "Fairfield", addressRegion: "CT" },
    { "@type": "City", name: "Norwalk", addressRegion: "CT" },
    { "@type": "City", name: "Wilton", addressRegion: "CT" },
    { "@type": "City", name: "Ridgefield", addressRegion: "CT" },
  ],
  sameAs: [
    "https://higginsgroup.com/", // Brokerage website
  ],
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
