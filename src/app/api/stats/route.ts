import { supabase } from '@/lib/supabase';

// 공개 통계: 총 페이지뷰 + 고유 방문자 수
export async function GET() {
  try {
    const { count: totalViews, error: e1 } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    if (e1) throw e1;

    // 고유 방문자: distinct visitor_id (최대 10k 샘플링)
    const { data: visitors, error: e2 } = await supabase
      .from('page_views')
      .select('visitor_id')
      .limit(10000);

    if (e2) throw e2;

    const uniqueVisitors = new Set((visitors || []).map((v) => v.visitor_id)).size;

    return Response.json({
      totalViews: totalViews || 0,
      uniqueVisitors,
    });
  } catch (e) {
    console.error('[stats] error:', e);
    return Response.json({ totalViews: 0, uniqueVisitors: 0 });
  }
}
