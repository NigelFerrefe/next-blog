import { NextRequest, NextResponse } from 'next/server';
import { serverPostPublic } from '@/lib/api/api.server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, ok, status, error } = await serverPostPublic('/api/newsletter/contact-us/', body);

  if (ok) return NextResponse.json(data, { status: 201 });
  return NextResponse.json({ error: error ?? 'Failed to send message' }, { status });
}