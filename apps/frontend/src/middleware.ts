import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that do not require authentication
const unprotectedRoutes = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Retrieve the token from cookies
  const token = req.cookies.get("token")?.value;
  console.log("Middleware token:", token); // Check token availability

  // Redirect unauthenticated users
  if (!token && !unprotectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users away from unprotected routes
  if (token && unprotectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If token exists, forward it as a custom header for secure client access
  const requestHeaders = new Headers(req.headers);
  if (token) {
    requestHeaders.set("x-auth-token", token); // Pass token as custom header
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Apply the middleware to protected routes
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/attendance/:path*",
    "/members/:path*",
    "/settings/:path*",
  ],
};
