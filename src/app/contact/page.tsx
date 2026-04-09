'use client';

import { useState } from 'react';
import { submitContact, subscribeNewsletter } from '@/lib/supabase';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [newsletter, setNewsletter] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitContact(form);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribeNewsletter(newsletter);
      setNewsletterStatus('done');
    } catch {
      setNewsletterStatus('error');
    }
  };

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="mb-20 space-y-3">
          <span className="font-label text-xs tracking-[0.2em] font-semibold uppercase" style={{ color: '#7c572d' }}>
            연락하기
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight" style={{ color: '#012435' }}>
            Contact
          </h1>
          <p className="text-lg" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
            생각을 나눠주세요. 함께 배우고 성장하겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* 연락 폼 */}
          <div>
            {status === 'sent' ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-5xl">✉️</p>
                <h3 className="font-headline text-3xl font-bold" style={{ color: '#012435' }}>
                  메시지가 전달되었습니다
                </h3>
                <p className="text-base" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
                  소중한 연락 감사합니다. 곧 답장 드리겠습니다.
                </p>
                <button
                  onClick={() => { setForm({ name: '', email: '', message: '' }); setStatus('idle'); }}
                  className="mt-6 font-semibold pb-1 transition-colors duration-[400ms]"
                  style={{ color: '#7c572d', borderBottom: '2px solid #7c572d', fontFamily: 'Pretendard, sans-serif' }}
                >
                  다시 보내기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#42474c', fontFamily: 'Inter, sans-serif' }}>
                    이름
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="이름"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-underline"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#42474c', fontFamily: 'Inter, sans-serif' }}>
                    이메일
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="hello@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-underline"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#42474c', fontFamily: 'Inter, sans-serif' }}>
                    메시지
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="전하고 싶은 이야기를 적어주세요..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-underline resize-none"
                    style={{ minHeight: '120px' }}
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm" style={{ color: '#ba1a1a', fontFamily: 'Pretendard, sans-serif' }}>
                    전송 중 오류가 발생했습니다. 다시 시도해 주세요.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-10 py-4 rounded-sm font-semibold transition-all duration-[400ms] hover:bg-[#1b3a4b] disabled:opacity-50"
                  style={{ backgroundColor: '#012435', color: 'white', fontFamily: 'Pretendard, sans-serif' }}
                >
                  {status === 'sending' ? '전송 중...' : '메시지 보내기'}
                </button>
              </form>
            )}
          </div>

          {/* 연락처 정보 */}
          <div className="space-y-12 lg:pt-4">
            <div>
              <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>직접 연락</span>
              <div className="mt-4 space-y-4">
                <a
                  href="mailto:soulharbor.dj@gmail.com"
                  className="flex items-center gap-3 text-base ink-bleed-hover"
                  style={{ color: '#012435', fontFamily: 'Pretendard, sans-serif' }}
                >
                  <span className="material-symbols-outlined text-xl">mail</span>
                  soulharbor.dj@gmail.com
                </a>
              </div>
            </div>

            <div>
              <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>소셜 미디어</span>
              <div className="mt-4 space-y-4">
                {[
                  { icon: 'link', label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EC%84%B1%EC%99%84-%ED%99%8D-5945198b/recent-activity/all/' },
                  { icon: 'rss_feed', label: '네이버 블로그', href: '#' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-base ink-bleed-hover"
                    style={{ color: '#012435', fontFamily: 'Pretendard, sans-serif' }}
                  >
                    <span className="material-symbols-outlined text-xl">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* 뉴스레터 */}
            <div className="p-8 rounded-sm" style={{ backgroundColor: '#F4F4F2' }}>
              <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>뉴스레터</span>
              <h3 className="font-headline text-2xl font-bold mt-2 mb-3" style={{ color: '#012435' }}>
                아카이브 구독
              </h3>
              <p className="text-sm mb-6" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
                소중한 시간을 존중합니다.<br />깊이 있는 생각만, 가끔씩 전달됩니다.
              </p>
              {newsletterStatus === 'done' ? (
                <p className="text-sm font-semibold" style={{ color: '#7c572d', fontFamily: 'Pretendard, sans-serif' }}>
                  구독해 주셔서 감사합니다! ✓
                </p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-4 items-end">
                  <input
                    type="email"
                    required
                    placeholder="이메일 주소"
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    className="input-underline flex-1"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-sm font-semibold text-sm transition-all duration-[400ms] hover:bg-[#1b3a4b] shrink-0"
                    style={{ backgroundColor: '#012435', color: 'white', fontFamily: 'Pretendard, sans-serif' }}
                  >
                    구독
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
