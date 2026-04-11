'use client';

import { useEffect, useState } from 'react';

/**
 * 홈페이지 공개 방문 카운터 (작은 텍스트).
 */
export default function VisitCounter() {
  const [stats, setStats] = useState<{ totalViews: number; uniqueVisitors: number } | null>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  if (!stats) return null;

  return (
    <div
      className="text-xs tracking-wide"
      style={{ color: '#7c572d', fontFamily: 'Pretendard, sans-serif' }}
    >
      누적 방문 {stats.totalViews.toLocaleString()}회 · 고유 방문자 {stats.uniqueVisitors.toLocaleString()}명
    </div>
  );
}
