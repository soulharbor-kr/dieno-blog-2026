import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getRelatedPosts } from '@/lib/supabase';
import { MOCK_POSTS } from '@/lib/mockData';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/types';
import BlogCard from '@/components/BlogCard';

// 1시간마다 페이지 재생성 (ISR)
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  let relatedPosts;

  try {
    post = await getPostBySlug(slug);
    relatedPosts = await getRelatedPosts(post.category, slug);
  } catch {
    // Fallback to mock data
    post = MOCK_POSTS.find((p) => p.slug === slug);
    if (!post) notFound();
    relatedPosts = MOCK_POSTS.filter((p) => p.category === post!.category && p.slug !== slug).slice(0, 3);
  }

  if (!post) notFound();

  const categoryLabel = CATEGORY_LABELS[post.category];
  const categoryColor = CATEGORY_COLORS[post.category];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="max-w-3xl mx-auto">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-sm mb-10" style={{ color: '#72787c', fontFamily: 'Pretendard, sans-serif' }}>
          <Link href="/" className="hover:underline transition-colors duration-[400ms] hover:text-[#7c572d]">홈</Link>
          <span>/</span>
          <Link href="/blog" className="hover:underline transition-colors duration-[400ms] hover:text-[#7c572d]">블로그</Link>
          <span>/</span>
          <span className="truncate">{post.title}</span>
        </div>

        {/* 카테고리 + 메타 */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span
            className="font-label text-[10px] tracking-widest font-bold uppercase px-3 py-1 rounded-sm"
            style={{ backgroundColor: '#F4F4F2', color: '#7C572D' }}
          >
            {categoryLabel}
          </span>
          <span className="text-sm" style={{ color: '#72787c', fontFamily: 'Inter, sans-serif' }}>
            {new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-sm" style={{ color: '#72787c', fontFamily: 'Inter, sans-serif' }}>
            읽기 {post.reading_time}분
          </span>
        </div>

        {/* 제목 */}
        <h1
          className="font-headline text-3xl sm:text-4xl font-bold mb-8 leading-tight"
          style={{ color: '#012435' }}
        >
          {post.title}
        </h1>

        {/* 커버 이미지 */}
        {post.cover_image && (
          <div className="relative h-64 sm:h-80 rounded-sm overflow-hidden mb-12">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* 본문 */}
        <article className="prose mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="font-headline text-3xl font-bold mt-8 mb-4" style={{ color: '#012435' }}>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-headline text-xl font-bold mt-6 mb-3" style={{ color: '#012435' }}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-headline text-lg font-semibold mt-5 mb-2" style={{ color: '#012435' }}>{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed" style={{ color: '#1a1c1b', fontFamily: 'Pretendard, sans-serif' }}>{children}</p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="underline underline-offset-2 transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#7c572d' }}
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold" style={{ color: '#012435' }}>{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 pl-5 py-2 my-6 italic" style={{ borderColor: '#D4A574', color: '#42474c' }}>
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-1" style={{ color: '#1a1c1b', fontFamily: 'Pretendard, sans-serif' }}>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-1" style={{ color: '#1a1c1b', fontFamily: 'Pretendard, sans-serif' }}>{children}</ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              hr: () => <hr className="my-8" style={{ borderColor: 'rgba(194,199,204,0.3)' }} />,
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm" style={{ fontFamily: 'Pretendard, sans-serif' }}>{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead style={{ backgroundColor: '#F4F4F2', color: '#012435' }}>{children}</thead>
              ),
              th: ({ children }) => (
                <th className="text-left p-3 font-semibold" style={{ borderBottom: '1px solid #e0e0e0' }}>{children}</th>
              ),
              td: ({ children }) => (
                <td className="p-3" style={{ borderBottom: '1px solid #e8e8e8' }}>{children}</td>
              ),
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: '#F4F4F2', color: '#7c572d' }}>{children}</code>
              ),
            }}
          >
            {post.content || ''}
          </ReactMarkdown>
        </article>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-8 pt-6" style={{ borderTop: '1px solid rgba(194,199,204,0.2)' }}>
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 rounded-sm"
              style={{ backgroundColor: '#F4F4F2', color: '#7c572d', fontFamily: 'Pretendard, sans-serif' }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 공유 */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-sm font-medium" style={{ color: '#72787c', fontFamily: 'Pretendard, sans-serif' }}>공유하기:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-sm font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#1DA1F2', color: 'white', fontFamily: 'Pretendard, sans-serif' }}
          >
            X (트위터)
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-sm font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#0077B5', color: 'white', fontFamily: 'Pretendard, sans-serif' }}
          >
            LinkedIn
          </a>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium ink-bleed-hover"
          style={{ color: '#012435', fontFamily: 'Pretendard, sans-serif' }}
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          목록으로 돌아가기
        </Link>
      </div>

      {/* 관련 글 */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="mt-20 pt-10" style={{ borderTop: '1px solid rgba(194,199,204,0.15)' }}>
          <div className="mb-8">
            <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>관련 에세이</span>
            <h2 className="font-headline text-3xl font-bold mt-2" style={{ color: '#012435' }}>같은 주제의 글</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
