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
        <div className="flex justify-between items-center h-28">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-20 w-80 sm:h-24 sm:w-96">
                <Image
                  src="/brand/higgins-lockup.jpg"
                  alt="Higgins Group Private Brokerage"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services/buy" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              Buy
            </Link>
            <Link href="/services/sell" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-wide">
              Sell
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

            <div className="ml-4 pl-4 border-l border-stone-300">
              <Link
                href="/home-value"
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-800 shadow-sm transition-colors"
              >
                Home Value
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
        <div className="md:hidden bg-white border-t border-stone-200">
          <Container>
            <div className="pt-2 pb-4 space-y-1">
              <Link href="/services/buy" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Buy</Link>
              <Link href="/services/sell" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Sell</Link>
              <Link href="/towns" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Towns</Link>
              <Link href="/insights" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Insights</Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <div className="pt-4 mt-4 border-t border-stone-200">
                <Link href="/home-value" className="block w-full text-center px-4 py-3 rounded-md font-bold text-white bg-stone-900 hover:bg-stone-800" onClick={() => setIsMenuOpen(false)}>
                  Home Value Estimate
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
