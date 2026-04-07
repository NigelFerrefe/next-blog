import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const access = req.cookies.get('access')?.value;

  if (!access) {
    return NextResponse.json(
      { error: 'User unauthorized to make this request' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const apiRes = await fetch(`${process.env.API_URL}/api/profile/upload_banner_picture/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
        'API-Key': `${process.env.BACKEND_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const text = await apiRes.text();
    const data = text ? JSON.parse(text) : {};

    if (apiRes.ok) {
      return NextResponse.json(data, { status: apiRes.status });
    }

    return NextResponse.json(
      { error: data?.error ?? data?.detail ?? 'Failed to upload banner picture' },
      { status: apiRes.status }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}