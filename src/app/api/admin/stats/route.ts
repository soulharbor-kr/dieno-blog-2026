import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

export async function GET(request: NextRequest) {
  const pw = request.headers.get('x-admin-password') || '';

  if (!ADMIN_PASSWORD || pw !== ADMIN_PASSWORD) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    // 총 페이지뷰
    const { count: totalViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    // 고유 방문자
    const { data: visitors } = await supabase
      .from('page_views')
      .select('visitor_id')
      .limit(50000);
    const uniqueVisitors = new Set((visitors || []).map((v) => v.visitor_id)).size;

    // 날짜 필터 (KST 기준)
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const { count: viewsToday } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString());

    const { count: viewsThisWeek } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekStart.toISOString());

    const { count: viewsThisMonth } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthStart.toISOString());

    // 인기 페이지 Top 20 (최근 30일)
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const { data: recentViews } = await supabase
      .from('page_views')
      .select('path, referer, created_at')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .limit(50000);

    const pathCounts: Record<string, number> = {};
    const refererCounts: Record<string, number> = {};
    const dateCounts: Record<string, number> = {};

    (recentViews || []).forEach((v) => {
      pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;

      // 유입 경로 — 자사 도메인 제외
      let ref = v.referer || '';
      try {
        if (ref) {
          const host = new URL(ref).hostname;
          if (!host.includes('dieno.org')) {
            refererCounts[host] = (refererCounts[host] || 0) + 1;
          }
        }
      } catch {
        // invalid URL — skip
      }

      // 일별 집계
      const date = new Date(v.created_at).toISOString().slice(0, 10);
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    const topPaths = Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([path, count]) => ({ path, count }));

    const topReferers = Object.entries(refererCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([referer, count]) => ({ referer, count }));

    // 최근 30일 모든 날짜 채우기 (0 포함)
    const dailyViews: Array<{ date: string; count: number }> = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dailyViews.push({ date: key.slice(5), count: dateCounts[key] || 0 });
    }

    return Response.json({
      totalViews: totalViews || 0,
      uniqueVisitors,
      viewsToday: viewsToday || 0,
      viewsThisWeek: viewsThisWeek || 0,
      viewsThisMonth: viewsThisMonth || 0,
      topPaths,
      dailyViews,
      topReferers,
    });
  } catch (e) {
    console.error('[admin/stats] error:', e);
    return Response.json({ error: 'internal error' }, { status: 500 });
  }
}
