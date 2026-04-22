export type Category =
  | 'startup'
  | 'ai_tech'
  | 'korea_life'
  | 'faith'
  | 'family'
  | 'learning'
  | 'sports'
  | 'skku_ai_edu'
  | 'skku_ai_startup';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  tags: string[];
  cover_image?: string;
  featured_image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  reading_time: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  startup: '창업/스타트업',
  ai_tech: 'AI·테크',
  korea_life: 'Korea Life',
  faith: '신앙·묵상',
  family: '육아·가족',
  learning: '학습·성장',
  sports: 'NBA·스포츠',
  skku_ai_edu: '대학·AI교육',
  skku_ai_startup: '대학·AI창업',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  startup: 'badge-startup',
  ai_tech: 'badge-ai_tech',
  korea_life: 'badge-ai_tech',
  faith: 'badge-faith',
  family: 'badge-family',
  learning: 'badge-learning',
  sports: 'badge-sports',
  skku_ai_edu: 'badge-learning',
  skku_ai_startup: 'badge-startup',
};
