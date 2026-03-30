'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import BlogCard from '@/components/BlogCard';
import { getPosts } from '@/lib/supabase';
import { MOCK_POSTS } from '@/lib/mockData';
import { Post, CATEGORY_LABELS, Category } from '@/types';
import { useSearchParams } from 'next/navigation';

const CATEGORIES: Array<{ key: Category | 'all'; label: string }> = [
  { key: 'all', label: '전체' },
  { key: 'startup', label: '창업/스타트업' },
  { key: 'ai_tech', label: 'AI·테크' },
  { key: 'faith', label: '신앙·묵상' },
  { key: 'family', label: '육아·가족' },
  { key: 'learning', label: '학습·성장' },
  { key: 'sports', label: 'NBA·스포츠' },
];

function BlogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'all';
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data.length > 0 ? data : MOCK_POSTS))
      .catch(() => setPosts(MOCK_POSTS))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="mb-16 space-y-3">
          <span className="font-label text-xs tracking-[0.2em] font-semibold uppercase" style={{ color: '#7c572d' }}>
            아카이브
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight" style={{ color: '#012435' }}>
            에세이
          </h1>
          <p className="text-lg" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
            진정성 있는 글쓰기 — 주 1~2회 발행
          </p>
        </div>

        {/* 검색 */}
        <div className="relative mb-8 max-w-xl">
          <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-lg" style={{ color: '#72787c' }}>
            search
          </span>
          <input
            type="text"
            placeholder="글 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-underline pl-8"
          />
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className="px-5 py-2 rounded-sm text-sm font-semibold tracking-wide transition-all duration-[400ms]"
              style={
                selectedCategory === key
                  ? { backgroundColor: '#012435', color: 'white', fontFamily: 'Pretendard, sans-serif' }
                  : { backgroundColor: '#F4F4F2', color: '#42474C', fontFamily: 'Pretendard, sans-serif' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        <p className="font-label text-xs tracking-widest uppercase mb-8" style={{ color: '#72787c' }}>
          {filteredPosts.length}개의 에세이
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-sm animate-pulse" style={{ backgroundColor: '#F4F4F2', height: '380px' }} />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24" style={{ color: '#42474c' }}>
            <p className="font-headline text-4xl mb-4" style={{ color: '#012435' }}>검색 결과 없음</p>
            <p style={{ fontFamily: 'Pretendard, sans-serif' }}>다른 키워드로 검색해 보세요</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 max-w-7xl mx-auto px-8" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
        로딩 중...
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
