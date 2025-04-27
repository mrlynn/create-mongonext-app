import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAdmin = token?.user?.role === 'admin';
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');

  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Protect admin routes
  if (isAdminPage && !isAdmin) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
}; 