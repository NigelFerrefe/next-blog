import { NextRequest, NextResponse } from 'next/server';
import {
  serverDel,
  serverGetPagination,
  serverPost,
  serverPut,
  unauthorizedResponse,
} from '@/lib/api/api.server';



export async function POST(req: NextRequest) {
  const access = req.cookies.get('access')?.value;
  if (!access) return unauthorizedResponse();

  const body = await req.json();
  const { data, ok, status, error } = await serverPost('/api/blog/post/author/', access, body);

  if (ok) {
    return NextResponse.json(data, { status });
  }

  return NextResponse.json({ error: error ?? 'Failed to create post' }, { status });
}

export async function PUT(req: NextRequest) {
  const access = req.cookies.get('access')?.value;
  if (!access) return unauthorizedResponse();

  const body = await req.json();

  const { data, ok, status, error } = await serverPut('/api/blog/post/author/', access, body);

  if (ok) return NextResponse.json(data, { status: 200 });

  return NextResponse.json({ error: error ?? 'Failed to update post' }, { status });
}

export async function GET(req: NextRequest) {
  const access = req.cookies.get('access')?.value;

  if (!access) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') ?? '1';

  const { data, ok, status, error } = await serverGetPagination(
    `/api/blog/post/author/?page=${page}`,
    access,
  );


  if (ok) return NextResponse.json(data, { status: 200 });
  return NextResponse.json({ error: error ?? 'Failed to load posts' }, { status });
}

export async function DELETE(req: NextRequest) {
  const access = req.cookies.get('access')?.value;

  if (!access) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }
  const { data, ok, status, error } = await serverDel(
    `/api/blog/post/author/?slug=${encodeURIComponent(slug)}`,
    access,
  );

  if (ok) return NextResponse.json(data, { status: 200 });
  return NextResponse.json({ error: error ?? 'Failed to delete posts' }, { status });
}
