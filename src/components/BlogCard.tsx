import Link from 'next/link';
import Image from 'next/image';
import { Post, CATEGORY_LABELS } from '@/types';

interface BlogCardProps {
  post: Partial<Post>;
}

export default function BlogCard({ post }: BlogCardProps) {
  const categoryLabel = post.category ? CATEGORY_LABELS[post.category] : '';

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="card-lift rounded-sm overflow-hidden h-full flex flex-col">
        {/* 커버 이미지 */}
        <div className="aspect-[16/10] overflow-hidden">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title || ''}
              width={800}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#E8E8E6' }}>
              <span className="text-4xl opacity-30">✍</span>
            </div>
          )}
        </div>

        {/* 내용 */}
        <div className="p-8 space-y-4 flex flex-col flex-1">
          {/* 카테고리 + 읽기 시간 */}
          <div
            className="flex items-center justify-between font-label text-[10px] tracking-widest font-bold uppercase"
            style={{ color: '#7C572D' }}
          >
            <span>{categoryLabel}</span>
            {post.reading_time && <span>{post.reading_time}분 읽기</span>}
          </div>

          {/* 제목 */}
          <h3
            className="font-headline text-2xl leading-snug transition-colors duration-[400ms] group-hover:text-[#7C572D]"
            style={{ color: '#012435' }}
          >
            {post.title}
          </h3>

          {/* 요약 */}
          <p
            className="text-sm leading-relaxed line-clamp-3 flex-1"
            style={{ color: '#42474C', fontFamily: 'Pretendard, sans-serif' }}
          >
            {post.excerpt}
          </p>

          {/* 날짜 */}
          <div className="pt-4">
            <span className="text-xs font-medium" style={{ color: '#72787c', fontFamily: 'Inter, sans-serif' }}>
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
