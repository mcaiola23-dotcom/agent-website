import Link from 'next/link';

export default function GlobalFooter() {
    return (
        <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase">Contact</h3>
                        <ul className="mt-4 space-y-4">
                            <li className="text-base text-zinc-500 dark:text-zinc-400">
                                Matt Caiola
                            </li>
                            <li className="text-base text-zinc-500 dark:text-zinc-400">
                                (555) 123-4567
                            </li>
                            <li className="text-base text-zinc-500 dark:text-zinc-400">
                                matt.caiola@example.com
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase">Brokerage</h3>
                        <ul className="mt-4 space-y-4">
                            <li className="text-base text-zinc-500 dark:text-zinc-400 font-medium">
                                Higgins Group Private Brokerage
                            </li>
                            <li className="text-base text-zinc-500 dark:text-zinc-400">
                                123 Main Street, Fairfield, CT 06824
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/privacy" className="text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/fair-housing" className="text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300">
                                    Fair Housing
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-zinc-400 dark:text-zinc-500">
                        &copy; {new Date().getFullYear()} Fairfield Real Estate. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
