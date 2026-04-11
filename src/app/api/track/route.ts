import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

// 간단한 IP 해시 — 개인정보 저장 회피 + 동일 방문자 24시간 내 중복 카운트 방지용
async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path: string = body.path || '/';
    const referer: string = body.referer || '';

    // IP 추출 (Railway/Vercel 프록시 고려)
    const forwarded = request.headers.get('x-forwarded-for') || '';
    const ip = forwarded.split(',')[0].trim() || request.headers.get('x-real-ip') || '';
    const ua = request.headers.get('user-agent') || '';

    // 봇 차단 (간단 휴리스틱)
    if (/bot|crawler|spider|curl|wget|facebookexternalhit|slurp|headlesschrome/i.test(ua)) {
      return Response.json({ ok: true, bot: true });
    }

    const visitor_id = await hashString(`${ip}:${ua}`);

    const { error } = await supabase.from('page_views').insert({
      path,
      visitor_id,
      user_agent: ua.slice(0, 500),
      referer: referer.slice(0, 500),
    });

    if (error) {
      console.error('[track] supabase insert error:', error.message);
      return Response.json({ ok: false, error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('[track] error:', e);
    return Response.json({ ok: false }, { status: 500 });
  }
}
