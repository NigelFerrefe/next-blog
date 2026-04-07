import { NextRequest, NextResponse } from 'next/server';
import { serverGet, serverPatch, serverPost, unauthorizedResponse, extractError } from '@/lib/api/api.server';

type Data = {
  name?: string;
  error?: string;
};

export async function GET(req: NextRequest) {
  const access = req.cookies.get('access')?.value;
  if (!access) return unauthorizedResponse();

  const { data, status, ok, error } = await serverGet<{ user: unknown }>('/auth/users/me/', access);

  if (ok) return NextResponse.json({ user: data }, { status: 200 });
  return NextResponse.json({ error: extractError(data, error ?? 'Failed to load user') }, { status });
}

export async function PATCH(req: NextRequest) {
  const access = req.cookies.get('access')?.value;
  if (!access) return unauthorizedResponse();

  const body = await req.json();
  const { data, status, ok, error } = await serverPatch('/api/authentication/update_user/', access, body, true);

  if (ok) return NextResponse.json(data, { status });
  return NextResponse.json({ error: extractError(data, error ?? 'Failed to update user') }, { status });
}

export async function POST(req: NextRequest) {
  const access = req.cookies.get('access')?.value;
  if (!access) return unauthorizedResponse();

  const body = await req.json();
  const { status, error } = await serverPost('/auth/users/set_password/', access, body, true);

  if (status === 204) return NextResponse.json<Data>({ name: 'Password changed successfully' }, { status: 200 });
  return NextResponse.json<Data>({ error: error ?? 'Password reset confirmation failed' }, { status });
}