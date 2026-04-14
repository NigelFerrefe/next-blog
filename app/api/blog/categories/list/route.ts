import { NextResponse } from 'next/server';
import { serverGetPublic, extractError } from '@/lib/api/api.server';

export async function GET() {
  const { data, status, ok, error } = await serverGetPublic(
    '/api/blog/categories/list/'
  );

  if (ok) return NextResponse.json(data, { status: 200 });

  return NextResponse.json(
    { error: extractError(data, error ?? 'Failed to load categories') },
    { status }
  );
}