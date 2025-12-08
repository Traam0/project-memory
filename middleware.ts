import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth as middleware } from "@/lib/auth";

export default middleware((req) => {
  const PUBLIC_PATHS = ["/", "/guide", "/terms", "/policy", "/login"];
  const { pathname } = req.nextUrl;

  // Allow all NextAuth routes (must not be protected)
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Allow public pages
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // If the user is not authenticated → redirect to /login
  if (!req.auth) {
    const login = new URL("/login", req.nextUrl.origin);
    login.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  // User is authenticated → continue
  return NextResponse.next();
});
export const runtime = "nodejs";
  
export const config = {
  matcher: [
    // Run middleware for everything EXCEPT:
    // 1) _next/static
    // 2) _next/image
    // 3) favicon.ico
    // BUT DO NOT EXCLUDE api/auth here (we already allow it above)
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
