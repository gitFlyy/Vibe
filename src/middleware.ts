import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Allow Clerk pages to be accessed without auth; your auth pages live under /home
const isPublicRoute = createRouteMatcher([
  '/home/sign-in(.*)',
  '/home/sign-up(.*)',
  '/api/inngest(.*)',
  '/',
  '/pricing'

])

export default clerkMiddleware(async (auth, req) => {
  // For protected routes, redirect to sign-in if not authenticated
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};