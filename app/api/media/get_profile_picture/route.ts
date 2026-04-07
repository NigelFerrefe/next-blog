import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const access = req.cookies.get('access')?.value;

  if (!access) {
    return NextResponse.json(
      { error: 'User unauthorized to make this request' },
      { status: 401 }
    );
  }

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/profile/get_picture/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access}`,
        'API-Key': `${process.env.BACKEND_API_KEY}`,
      },
    });

    const text = await apiRes.text();
    const data = text ? JSON.parse(text) : {};

    if (apiRes.ok) {
      return NextResponse.json(data, { status: apiRes.status });
    }

    return NextResponse.json(
      { error: data?.error ?? data?.detail ?? 'Failed to fetch profile picture' },
      { status: apiRes.status }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}