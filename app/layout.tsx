import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import GlobalFooter from "./components/GlobalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fairfield Real Estate Agent",
  description: "Your trusted partner for buying, selling, and investing in Fairfield County real estate.",
  metadataBase: new URL('https://example.com'), // Placeholder
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Fairfield Real Estate Agent",
  "image": "https://example.com/logo.png", // Placeholder
  "description": "Expert real estate services in Fairfield County.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Fairfield",
    "addressRegion": "CT",
    "postalCode": "06824",
    "addressCountry": "US"
  },
  "url": "https://example.com",
  "telephone": "+12035550123", // Placeholder
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
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
