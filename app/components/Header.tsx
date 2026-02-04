"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Container from './Container';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-24 md:h-28">
          {/* Matt Caiola Logo - Primary */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-12 w-44 sm:h-14 sm:w-52 md:h-16 md:w-60">
                <Image
                  src="/brand/matt-caiola-logo.png"
                  alt="Matt Caiola Luxury Properties"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/services/buy" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              Buy
            </Link>
            <Link href="/home-search" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide whitespace-nowrap">
              Home Search
            </Link>
            <Link href="/services/sell" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              Sell
            </Link>
            <Link href="/services/investing" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              Investing
            </Link>
            <Link href="/towns" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              Towns
            </Link>
            <Link href="/insights" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              Insights
            </Link>
            <Link href="/about" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              Contact
            </Link>

            <div className="ml-2 pl-4 border-l border-stone-300">
              <Link
                href="/home-value"
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-800 shadow-sm transition-colors"
              >
                Home Value
              </Link>
            </div>
          </nav>

          {/* Higgins Group Logo - Secondary (Desktop only) */}
          <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-stone-200">
            <div className="relative h-10 w-28 xl:h-12 xl:w-32">
              <Image
                src="/brand/higgins-lockup.jpg"
                alt="Higgins Group Private Brokerage"
                fill
                className="object-contain object-right"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200">
          <Container>
            <div className="pt-2 pb-4 space-y-1">
              <Link href="/services/buy" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Buy</Link>
              <Link href="/home-search" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Home Search</Link>
              <Link href="/services/sell" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Sell</Link>
              <Link href="/services/investing" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Investing</Link>
              <Link href="/towns" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Towns</Link>
              <Link href="/insights" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Insights</Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <div className="pt-4 mt-4 border-t border-stone-200">
                <Link href="/home-value" className="block w-full text-center px-4 py-3 rounded-md font-bold text-white bg-stone-900 hover:bg-stone-800" onClick={() => setIsMenuOpen(false)}>
                  Home Value Estimate
                </Link>
              </div>
              {/* Higgins Group Logo in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-stone-200 flex justify-center">
                <div className="relative h-10 w-32">
                  <Image
                    src="/brand/higgins-lockup.jpg"
                    alt="Higgins Group Private Brokerage"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
