import { clerkMiddleware } from '@clerk/nextjs/server';

/**
 * Clerk Middleware
 * 
 * Uses clerkMiddleware() for flexible auth handling across all routes.
 * This makes auth state available throughout the app without
 * enforcing sign-in requirements on any specific routes.
 */
export default clerkMiddleware();

export const config = {
    // Match all routes except static files and Next.js internals
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|brand/|visual/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
