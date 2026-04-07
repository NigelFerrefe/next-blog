import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await fetch(`${process.env.API_URL}/api/authentication/send_otp_login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'API-Key': `${process.env.BACKEND_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}