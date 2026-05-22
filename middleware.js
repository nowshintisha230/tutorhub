import { NextResponse } from 'next/server'

export function middleware(request) {
  const protectedRoutes = ['/add-tutor', '/my-tutors', '/my-bookings']

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (!isProtected) return NextResponse.next()

  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value

  if (!sessionToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/add-tutor',
    '/my-tutors',
    '/my-tutors/:path*',
    '/my-bookings',
    '/my-bookings/:path*',
  ],
}