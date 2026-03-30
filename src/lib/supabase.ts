import { createClient } from '@supabase/supabase-js';
import { Post, ContactMessage } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Posts ──────────────────────────────────────────

export async function getPosts(options?: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from('posts')
    .select('*')
    .eq('published', true)
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
  return data as Post[];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) throw error;
  return data as Post;
}

export async function getRelatedPosts(category: string, excludeSlug: string, limit = 3) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, category, cover_image, created_at, reading_time')
    .eq('published', true)
    .eq('category', category)
    .neq('slug', excludeSlug)
    .limit(limit);

  if (error) throw error;
  return data as Partial<Post>[];
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
