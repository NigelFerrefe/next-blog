import { NextRequest, NextResponse } from 'next/server';

type Data = {
  name?: string;
  error?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await fetch(`${process.env.API_URL}/auth/jwt/create/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await apiRes.text();
    const data = text ? JSON.parse(text) : {};

    if (apiRes.status === 200) {
      const { access, refresh } = data;

      const response = NextResponse.json<Data>(
        { name: 'Login successful' },
        { status: 200 }
      );

      response.cookies.set('access', access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      response.cookies.set('refresh', refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 60, // 60 days
      });

      return response;
    }

    if (apiRes.status === 401 || apiRes.status === 403) {
      return NextResponse.json<Data>(
        { error: data?.detail ?? 'Authentication failed.' },
        { status: apiRes.status }
      );
    }

    return NextResponse.json<Data>(
      { error: 'Server error.' },
      { status: apiRes.status }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.json<Data>(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}