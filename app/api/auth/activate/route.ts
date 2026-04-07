import { NextRequest, NextResponse } from 'next/server';

type Data = {
  name?: string;
  error?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await fetch(`${process.env.API_URL}/auth/users/activation/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (apiRes.status === 204) {
      return NextResponse.json<Data>(
        { name: 'Activation successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json<Data>(
      { error: 'Activation failed' },
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