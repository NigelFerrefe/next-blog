import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const access = request.cookies.get('access')?.value;

  // Protected route that require authentication
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/profile');
//If you need more than 1 route
  /* const pathname = request.nextUrl.pathname;

const protectedRoutes = ['/profile', '/settings'];

const isProtectedRoute = protectedRoutes.some((route) =>
  pathname.startsWith(route) 
);*/

  if (isProtectedRoute) {
    if (!access) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const res = await fetch(`${process.env.API_URL}/auth/jwt/verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: access }),
      });

      if (res.status !== 200) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};
