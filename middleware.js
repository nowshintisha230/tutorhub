import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request) {
  const protectedRoutes = ['/add-tutor', '/my-tutors', '/my-bookings']

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (!isProtected) return NextResponse.next()

  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user) {
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