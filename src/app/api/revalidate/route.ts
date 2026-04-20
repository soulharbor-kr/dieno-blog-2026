import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { path } = await request.json().catch(() => ({ path: null }));

  if (path) {
    revalidatePath(path);
  } else {
    revalidatePath('/', 'layout');
  }

  return Response.json({ revalidated: true, path: path || '/' });
}
