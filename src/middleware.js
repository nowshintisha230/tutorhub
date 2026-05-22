// middleware.js (root-এ)
import { NextResponse } from "next/server";

const protectedRoutes = ["/my-tutors", "/add-tutor"];

export async function middleware(request) {
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  // better-auth cookie — "better-auth.session_token"
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-tutors/:path*", "/add-tutor/:path*"],
};