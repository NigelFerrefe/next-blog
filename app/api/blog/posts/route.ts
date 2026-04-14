import { NextRequest, NextResponse } from 'next/server';
import { serverGetPaginationPublic } from '@/lib/api/api.server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') ?? '1';
  const author = searchParams.get('author');

  if (!author) {
    return NextResponse.json({ error: 'Author is required' }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.set('p', page);
  params.set('author', author);

  const { data, ok, status, error } = await serverGetPaginationPublic(
    `/api/blog/posts/?${params.toString()}`,
  );

  if (ok) return NextResponse.json(data, { status: 200 });

  return NextResponse.json(
    { error: error ?? 'Failed to load author posts' },
    { status }
  );
}