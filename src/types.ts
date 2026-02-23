export type EffectLevel = 'clean' | 'mild' | 'full';

export const COVER_PATTERNS = ['circuit', 'grid', 'waves', 'dots', 'sigil'] as const;
export type CoverPattern = (typeof COVER_PATTERNS)[number];

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  whyItExists?: string;
  status: 'active' | 'incubating' | 'archived';
  type: ('software' | 'media' | 'tools')[] | 'software' | 'media' | 'tools';
  stack: string[];
  topics: string[];
  url?: string;
  repoUrl: string;
  homepage?: string;
  lastUpdated: string;
  stars?: number;
  coverColor?: string;
  coverPattern?: CoverPattern;
  screenshot?: string;
  featured?: boolean;
  order?: number;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author?: string;
  mdx?: () => Promise<{ default: React.ComponentType }>;
  series?: {
    name: string;
    week: number;
    total: number;
  };
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  archived: boolean;
  fork: boolean;
}
