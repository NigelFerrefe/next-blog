import { NextRequest, NextResponse } from 'next/server';
import { serverGetPaginationPublic } from '@/lib/api/api.server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const { data, ok, status, error } = await serverGetPaginationPublic(
    `/api/blog/categories?${searchParams.toString()}`
  );

  if (ok) return NextResponse.json(data, { status: 200 });
  return NextResponse.json({ error: error ?? 'Failed to load categories' }, { status });
}