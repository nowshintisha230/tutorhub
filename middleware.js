import { NextResponse } from 'next/server'

const protectedRoutes = ['/add-tutor', '/my-tutors', '/my-bookings']

export async function middleware(request) {
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (!isProtected) return NextResponse.next()

  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
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