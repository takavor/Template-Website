import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Protect routes under /dashboard
    if (!req.nextauth.token && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Prevent authenticated users from accessing /login and /register
    if (
      req.nextauth.token &&
      (pathname === "/login" || pathname === "/signup")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Allow middleware to run for all requests
    },
  }
);

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
