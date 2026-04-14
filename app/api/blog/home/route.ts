import { NextRequest, NextResponse } from 'next/server';
import { serverGetPaginationPublic } from '@/lib/api/api.server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = searchParams.get('page') ?? '1';
  const search = searchParams.get('search');
  const sorting = searchParams.get('sorting');
  const ordering = searchParams.get('ordering');
  const author = searchParams.get('author');
  const is_featured = searchParams.get('is_featured');
  const categories = searchParams.getAll('category');

  const params = new URLSearchParams();
  params.set('p', page);

  if (search) params.set('search', search);
  if (sorting) params.set('sorting', sorting);
  if (ordering) params.set('ordering', ordering);
  if (author) params.set('author', author);
  if (is_featured) params.set('is_featured', is_featured);

  for (const category of categories) {
    params.append('category', category);
  }

  const { data, ok, status, error } = await serverGetPaginationPublic(
    `/api/blog/posts/?${params.toString()}`
  );

  if (ok) {
    return NextResponse.json(data, { status: 200 });
  }

  return NextResponse.json(
    { error: error ?? 'Failed to load posts' },
    { status }
  );
}