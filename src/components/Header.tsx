'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/blog', label: '블로그' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/dream', label: '꿈' },
  { href: '/contact', label: '연락' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <div className="reading-progress-track">
        <div className="reading-progress-bar" id="reading-progress" />
      </div>

      <nav
        className="fixed top-0 w-full z-50 shadow-sm"
        style={{
          backgroundColor: 'rgba(249,249,247,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          marginTop: '1px',
        }}
      >
        <div className="flex justify-between items-center w-full px-6 sm:px-8 py-4 max-w-7xl mx-auto relative">
          {/* 로고 */}
          <Link
            href="/"
            className="font-headline text-2xl font-bold tracking-tighter"
            style={{ color: '#012435' }}
          >
            DieNo
          </Link>

          {/* 데스크탑 네비 */}
          <div className="hidden md:flex items-center space-x-8 text-base tracking-tight" style={{ fontFamily: 'Pretendard, sans-serif' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-all duration-[400ms] ease-in-out pb-1 font-medium"
                style={
                  isActive(item.href)
                    ? { color: '#7C572D', borderBottom: '2px solid #7C572D', fontWeight: 600 }
                    : { color: '#42474C' }
                }
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) (e.currentTarget as HTMLElement).style.color = '#012435';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) (e.currentTarget as HTMLElement).style.color = '#42474C';
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 아이콘 */}
          <div className="flex items-center space-x-2">
            <button className="p-2 ink-bleed-hover" style={{ color: '#012435' }} aria-label="검색">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>search</span>
            </button>
            <button
              className="md:hidden p-2"
              style={{ color: '#012435' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="메뉴"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ backgroundColor: '#F4F4F2', opacity: 0.15 }}
          />
        </div>

        {/* 모바일 메뉴 */}
        {mobileOpen && (
          <div style={{ backgroundColor: 'rgba(249,249,247,0.97)', borderTop: '1px solid rgba(194,199,204,0.15)' }}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium"
                  style={isActive(item.href) ? { color: '#7C572D', fontWeight: 600 } : { color: '#42474C' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
