'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 페이지 뷰 트래커 — 페이지 진입 시 /api/track으로 전송.
 * 같은 브라우저 세션 내 같은 경로 중복 카운트 방지 (sessionStorage).
 */
export default function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/admin')) return; // 관리자 페이지 제외

    const key = `visited:${pathname}`;
    if (typeof window !== 'undefined' && window.sessionStorage?.getItem(key)) {
      return;
    }

    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          referer: document.referrer || '',
        }),
        keepalive: true,
      }).catch(() => {});

      window.sessionStorage?.setItem(key, '1');
    } catch {
      // silent fail
    }
  }, [pathname]);

  return null;
}
