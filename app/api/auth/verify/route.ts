import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const access = req.cookies.get('access')?.value;

  if (!access) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  try {
    const apiRes = await fetch(`${process.env.API_URL}/auth/jwt/verify/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: access }), 
    });

    if (apiRes.status === 200) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

