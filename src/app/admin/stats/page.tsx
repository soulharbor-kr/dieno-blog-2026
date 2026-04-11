'use client';

import { useEffect, useState } from 'react';

type StatsData = {
  totalViews: number;
  uniqueVisitors: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  topPaths: Array<{ path: string; count: number }>;
  dailyViews: Array<{ date: string; count: number }>;
  topReferers: Array<{ referer: string; count: number }>;
};

export default function AdminStatsPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw');
    if (saved) {
      setPassword(saved);
      fetchStats(saved);
    }
  }, []);

  async function fetchStats(pw: string) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'x-admin-password': pw },
      });
      if (!res.ok) {
        if (res.status === 401) {
          setError('비밀번호가 올바르지 않습니다.');
          sessionStorage.removeItem('admin_pw');
          setAuthed(false);
        } else {
          setError('통계 조회 실패');
        }
        return;
      }
      const data = await res.json();
      setStats(data);
      setAuthed(true);
      sessionStorage.setItem('admin_pw', pw);
    } catch {
      setError('네트워크 오류');
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchStats(password);
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_pw');
    setAuthed(false);
    setStats(null);
    setPassword('');
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 pt-24">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6 p-8 rounded-sm"
          style={{ backgroundColor: '#F4F4F2' }}
        >
          <h1 className="font-headline text-2xl font-bold" style={{ color: '#012435' }}>
            관리자 통계
          </h1>
          <p className="text-sm" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
            비밀번호를 입력하세요.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-sm border border-gray-300"
            placeholder="관리자 비밀번호"
            autoFocus
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-sm font-semibold"
            style={{ backgroundColor: '#012435', color: 'white' }}
          >
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </main>
    );
  }

  if (!stats) {
    return (
      <main className="min-h-screen pt-32 px-6 text-center">
        <p>통계 로딩 중...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl font-bold" style={{ color: '#012435' }}>
          방문자 통계
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm underline"
          style={{ color: '#7c572d' }}
        >
          로그아웃
        </button>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        <StatCard label="누적 페이지뷰" value={stats.totalViews} />
        <StatCard label="고유 방문자" value={stats.uniqueVisitors} />
        <StatCard label="오늘" value={stats.viewsToday} />
        <StatCard label="이번 주" value={stats.viewsThisWeek} />
        <StatCard label="이번 달" value={stats.viewsThisMonth} />
      </div>

      {/* 일별 차트 */}
      <section className="mb-12">
        <h2 className="font-headline text-2xl font-bold mb-6" style={{ color: '#012435' }}>
          최근 30일 방문 추이
        </h2>
        <DailyChart data={stats.dailyViews} />
      </section>

      {/* 인기 페이지 */}
      <section className="mb-12">
        <h2 className="font-headline text-2xl font-bold mb-6" style={{ color: '#012435' }}>
          인기 페이지 Top 20
        </h2>
        <div className="rounded-sm overflow-hidden" style={{ backgroundColor: '#F4F4F2' }}>
          {stats.topPaths.length === 0 ? (
            <p className="p-4 text-sm">데이터 없음</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th className="text-left p-3">경로</th>
                  <th className="text-right p-3">뷰</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPaths.map((p) => (
                  <tr key={p.path} style={{ borderBottom: '1px solid #e8e8e8' }}>
                    <td className="p-3">
                      <a
                        href={p.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                        style={{ color: '#012435' }}
                      >
                        {p.path}
                      </a>
                    </td>
                    <td className="text-right p-3 font-semibold">{p.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* 유입 경로 */}
      <section>
        <h2 className="font-headline text-2xl font-bold mb-6" style={{ color: '#012435' }}>
          유입 경로 Top 10
        </h2>
        <div className="rounded-sm overflow-hidden" style={{ backgroundColor: '#F4F4F2' }}>
          {stats.topReferers.length === 0 ? (
            <p className="p-4 text-sm">직접 방문만 있음</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th className="text-left p-3">출처</th>
                  <th className="text-right p-3">유입</th>
                </tr>
              </thead>
              <tbody>
                {stats.topReferers.map((r) => (
                  <tr key={r.referer} style={{ borderBottom: '1px solid #e8e8e8' }}>
                    <td className="p-3 break-all">{r.referer || '(직접 방문)'}</td>
                    <td className="text-right p-3 font-semibold">{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-5 rounded-sm" style={{ backgroundColor: '#F4F4F2' }}>
      <div
        className="text-xs uppercase tracking-widest mb-2"
        style={{ color: '#7c572d', fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </div>
      <div className="font-headline text-3xl font-bold" style={{ color: '#012435' }}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}

function DailyChart({ data }: { data: Array<{ date: string; count: number }> }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1 h-48 p-4 rounded-sm" style={{ backgroundColor: '#F4F4F2' }}>
      {data.map((d) => {
        const height = (d.count / max) * 100;
        return (
          <div
            key={d.date}
            className="flex-1 flex flex-col items-center group relative"
            title={`${d.date}: ${d.count}회`}
          >
            <div
              className="w-full transition-all"
              style={{
                height: `${height}%`,
                backgroundColor: '#7c572d',
                minHeight: d.count > 0 ? '2px' : '0',
              }}
            />
            <div
              className="absolute -top-8 opacity-0 group-hover:opacity-100 text-xs px-2 py-1 rounded bg-black text-white whitespace-nowrap pointer-events-none z-10"
            >
              {d.date}: {d.count}
            </div>
          </div>
        );
      })}
    </div>
  );
}
