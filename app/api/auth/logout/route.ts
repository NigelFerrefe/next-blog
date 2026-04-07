import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logout successful.' }, { status: 200 });

  response.cookies.set('access', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  response.cookies.set('refresh', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return response;
}
