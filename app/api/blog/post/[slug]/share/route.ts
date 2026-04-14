import { NextRequest, NextResponse } from 'next/server';
import { serverPostPublic } from '@/lib/api/api.server';

type Params = { params: Promise<{ slug: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;

  const body = await req.json().catch(() => ({}));

  const { data, ok, status, error } = await serverPostPublic(
    `/api/blog/post/${slug}/share/`,
    body,
    true
  );

  if (ok) return NextResponse.json(data, { status: 200 });

  return NextResponse.json(
    { error: error ?? 'Failed to share post' },
    { status }
  );
}