import { NextRequest, NextResponse } from 'next/server';
import { serverGetPublic } from '@/lib/api/api.server';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const { data, ok, status, error } = await serverGetPublic(
    `/api/blog/post/${encodeURIComponent(slug)}`,
  );

  if (ok) return NextResponse.json(data, { status: 200 });

  return NextResponse.json({ error: error ?? 'Failed to load post detail' }, { status });
}
