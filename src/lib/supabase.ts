import { createClient } from '@supabase/supabase-js';
import { Post, ContactMessage } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 외부 경로(n8n 등)로 들어온 URL이 <https://...> 형태로 저장돼 이미지가 깨지는 사례 방어.
function cleanUrl(u?: string | null): string | null {
  if (!u) return u ?? null;
  return u.replace(/[<>]/g, '').trim();
}

function sanitizePost<T extends Partial<Post>>(p: T): T {
  if (p.cover_image) p.cover_image = cleanUrl(p.cover_image) ?? undefined;
  if (p.featured_image_url) p.featured_image_url = cleanUrl(p.featured_image_url) ?? undefined;
  return p;
}

// ── Posts ──────────────────────────────────────────

export async function getPosts(options?: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  // 미래 날짜로 예약된 포스트(created_at > now)는 발행 시각 도달 전까지 목록에서 숨김
  let query = supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .lte('created_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.search) {
    query = query.or(`title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%`);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, (options.offset + (options?.limit || 10)) - 1);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as Post[]).map(sanitizePost);
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) throw error;
  return sanitizePost(data as Post);
}

export async function getRelatedPosts(category: string, excludeSlug: string, limit = 3) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, category, cover_image, created_at, reading_time')
    .eq('published', true)
    .eq('category', category)
    .neq('slug', excludeSlug)
    .lte('created_at', new Date().toISOString())
    .limit(limit);

  if (error) throw error;
  return (data as Partial<Post>[]).map(sanitizePost);
}

// ── Contact ────────────────────────────────────────

export async function submitContact(data: ContactMessage) {
  const { error } = await supabase.from('contacts').insert(data);
  if (error) throw error;
}

// ── Newsletter ─────────────────────────────────────

export async function subscribeNewsletter(email: string) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email, active: true }, { onConflict: 'email' });
  if (error) throw error;
}
