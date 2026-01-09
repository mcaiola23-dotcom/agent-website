import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';

export default function GlobalFooter() {
    return (
        <footer className="bg-white border-t border-stone-200">
            <Container>
                <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="relative h-20 w-80 sm:h-24 sm:w-96 mb-4">
                            <Image
                                src="/brand/higgins-lockup.jpg"
                                alt="Higgins Group Private Brokerage"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-sm text-stone-500 max-w-xs">
                            Luxury real estate services ensuring you make the best move for your lifestyle and investment.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">Brokerage Office</h3>
                        <address className="mt-4 not-italic text-base text-stone-500 space-y-2">
                            <p className="font-medium text-stone-900">Higgins Group Private Brokerage</p>
                            <p>1055 Washington Blvd.</p>
                            <p>Stamford, CT 06901</p>
                            <p><a href="tel:2036588282" className="hover:text-stone-900">203-658-8282</a></p>
                        </address>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/privacy" className="text-base text-stone-500 hover:text-stone-900">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-base text-stone-500 hover:text-stone-900">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/fair-housing" className="text-base text-stone-500 hover:text-stone-900">
                                    Fair Housing
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="py-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-stone-400">
                        &copy; {new Date().getFullYear()} Fairfield Real Estate. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
