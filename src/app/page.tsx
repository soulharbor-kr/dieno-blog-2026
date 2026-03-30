import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard';
import { getPosts } from '@/lib/supabase';
import { MOCK_POSTS } from '@/lib/mockData';

async function getRecentPosts() {
  try {
    const posts = await getPosts({ limit: 3 });
    return posts.length > 0 ? posts : MOCK_POSTS.slice(0, 3);
  } catch {
    return MOCK_POSTS.slice(0, 3);
  }
}

export default async function HomePage() {
  const recentPosts = await getRecentPosts();

  return (
    <main className="pt-24">
      {/* ── 히어로 ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-8">
          <span
            className="font-label text-xs tracking-[0.2em] font-semibold uppercase"
            style={{ color: '#7c572d' }}
          >
            Est. 2024 · 현대적 아카이비스트
          </span>

          <h1
            className="font-headline text-5xl md:text-7xl leading-[1.1] font-bold tracking-tight"
            style={{ color: '#012435' }}
          >
            DieNo:{' '}
            <span className="italic font-normal" style={{ color: '#7c572d' }}>삶은 소중하다.</span>
          </h1>

          <p
            className="text-xl max-w-2xl leading-relaxed"
            style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}
          >
            학문적 깊이와 기업가 정신이 교차하는 자리. 교육의 미래,
            신앙의 깊이, 기술의 맥박을 탐구하는 큐레이션된 생각의 아카이브.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6">
            <Link
              href="/blog"
              className="px-8 py-4 rounded-sm font-semibold tracking-wide transition-all duration-[400ms] hover:bg-[#1b3a4b]"
              style={{ backgroundColor: '#012435', color: 'white', fontFamily: 'Pretendard, sans-serif' }}
            >
              최근 글 읽기
            </Link>
            <Link
              href="/about"
              className="font-semibold pb-1 hover:text-[#7c572d] transition-all duration-[400ms]"
              style={{ color: '#012435', borderBottom: '2px solid #7c572d', fontFamily: 'Pretendard, sans-serif' }}
            >
              나의 이야기
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <div
            className="aspect-[4/5] overflow-hidden rounded-sm relative z-10"
            style={{ backgroundColor: '#F4F4F2', boxShadow: '0 20px 40px rgba(26,28,27,0.12)' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="DieNo — Sungwan"
              fill
              className="object-cover"
              style={{ filter: 'grayscale(0.15) contrast(1.05)' }}
              priority
            />
          </div>
          <div
            className="absolute -bottom-6 -left-6 w-full h-full rounded-sm -z-10"
            style={{ backgroundColor: '#e8e8e6' }}
          />
        </div>
      </section>

      {/* ── 프로필 요약 ── */}
      <section style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
              alt="대학 창업지원"
              width={600}
              height={450}
              className="w-full h-auto rounded-sm"
              style={{ filter: 'grayscale(0.1)' }}
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="font-headline text-4xl leading-tight" style={{ color: '#012435' }}>
              MBA·박사의 여정: 대학 창업지원에서 미래 교육까지.
            </h2>
            <div className="w-12 h-1" style={{ backgroundColor: '#7c572d' }} />
            <p className="text-lg leading-relaxed" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
              경제학/통계학(학부) → MBA → 교육행정 박사. 20년간 대학 창업지원 현장에서
              교원창업과 학생창업을 이끌었습니다. DieNo는 그 모든 세계가 만나는 공간입니다.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
              신앙의 깊이부터 세 아들과의 소소한 일상까지,
              모든 경험은 배움의 기회입니다.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center font-bold transition-all duration-[400ms] hover:text-[#012435]"
              style={{ color: '#7c572d', fontFamily: 'Pretendard, sans-serif' }}
            >
              전체 프로필 보기
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 최근 글 ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
              최근 인사이트
            </span>
            <h2 className="font-headline text-4xl font-bold" style={{ color: '#012435' }}>
              최근 에세이
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:block font-semibold pb-1 transition-colors duration-[400ms] hover:text-[#7c572d]"
            style={{ color: '#012435', borderBottom: '2px solid #7c572d', fontFamily: 'Pretendard, sans-serif' }}
          >
            전체 보기
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* ── 뉴스레터 ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-24 text-center">
        <h2 className="font-headline text-3xl mb-8" style={{ color: '#012435' }}>
          아카이브 구독하기
        </h2>
        <form className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 w-full">
            <input type="email" placeholder="이메일 주소" className="input-underline" />
          </div>
          <button
            type="submit"
            className="px-10 py-4 rounded-sm font-semibold whitespace-nowrap transition-all duration-[400ms] hover:bg-[#1b3a4b]"
            style={{ backgroundColor: '#012435', color: 'white', fontFamily: 'Pretendard, sans-serif' }}
          >
            구독하기
          </button>
        </form>
        <p className="mt-6 text-sm" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
          소중한 시간을 존중합니다. 깊이 있는 생각만, 가끔씩 전달됩니다.
        </p>
      </section>
    </main>
  );
}
