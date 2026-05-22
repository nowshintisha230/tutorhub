import { NextResponse } from "next/server";

const protectedRoutes = ["/my-tutor", "/add-tutor", "/my-bookings"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log("MIDDLEWARE RUNNING:", pathname);

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const allCookies = request.cookies.getAll();
    console.log("ALL COOKIES:", JSON.stringify(allCookies));

    const sessionCookie = request.cookies.get(
      "__Secure-better-auth.session_data"
    );

    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};