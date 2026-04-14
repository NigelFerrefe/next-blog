import { NextRequest, NextResponse } from 'next/server';
import { serverPost, serverDel, unauthorizedResponse } from '@/lib/api/api.server';

type Params = { params: Promise<{ slug: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const access = req.cookies.get('access')?.value;
  if (!access) return unauthorizedResponse();

  const { slug } = await params;
  const { data, ok, status, error } = await serverPost(
    `/api/blog/post/${slug}/like/`,
    access,
    {},
    true
  );

  if (ok) return NextResponse.json(data, { status: 200 });
  return NextResponse.json({ error: error ?? 'Failed to like post' }, { status });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const access = req.cookies.get('access')?.value;
  if (!access) return unauthorizedResponse();

  const { slug } = await params;
  const { data, ok, status, error } = await serverDel(
    `/api/blog/post/${slug}/like/`,
    access,
    true
  );

  if (ok) return NextResponse.json(data, { status: 200 });
  return NextResponse.json({ error: error ?? 'Failed to unlike post' }, { status });
}