import { NextRequest, NextResponse } from 'next/server';
import { serverGet, unauthorizedResponse } from '@/lib/api/api.server';

export async function GET(req: NextRequest) {
  const access = req.cookies.get('access')?.value;
  if (!access) return unauthorizedResponse();

  const slug = req.nextUrl.searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const { data, ok, status, error } = await serverGet(
    `/api/blog/post/author/detail/?slug=${encodeURIComponent(slug)}`,
    access
  );

  if (ok) return NextResponse.json(data, { status: 200 });

  return NextResponse.json(
    { error: error ?? 'Failed to load post detail' },
    { status }
  );
}