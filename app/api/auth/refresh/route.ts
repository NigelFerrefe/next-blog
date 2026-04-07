import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const refresh = req.cookies.get('refresh')?.value;

  if (!refresh) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  try {
    const apiRes = await fetch(`${process.env.API_URL}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    const data = await apiRes.json();

    if (apiRes.status === 200) {
      const response = NextResponse.json({ success: true }, { status: 200 });

      response.cookies.set('access', data.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
      response.cookies.set('refresh', data.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 60, 
      });

      return response;
    }

    return NextResponse.json(
      { error: data?.detail ?? 'Refresh failed' },
      { status: apiRes.status },
    );
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
