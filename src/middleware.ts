import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/api/webhooks/clerk",                 // your home page
  "/sign-in(.*)",      // Clerk sign-in UI
  "/sign-up(.*)",      // Clerk sign-up UI
  "/resources",
  "/",
  "/api/resources",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!publicRoutes(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // everything except _next/static, assets, etc.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // always include API/trpc
    '/(api|trpc)(.*)',
  ],
};
