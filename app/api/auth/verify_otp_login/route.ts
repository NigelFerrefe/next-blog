import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await fetch(`${process.env.API_URL}/api/authentication/verify_otp_login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'API-Key': `${process.env.BACKEND_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await apiRes.json();

    if (apiRes.status === 200) {
      const { access, refresh } = data;
      const isProduction = process.env.NODE_ENV === 'production';
      const response = NextResponse.json(data, { status: 200 });

      response.cookies.set('access', access, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, 
      });

      response.cookies.set('refresh', refresh, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 60, 
      });

      return response;
    }

    return NextResponse.json(data, { status: apiRes.status });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}