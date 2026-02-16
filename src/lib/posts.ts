import type { Post } from '@/types';

// Static post registry - maps slugs to MDX imports and metadata
export const posts: Post[] = [
  {
    slug: 'subcvlt-manifesto',
    title: 'SUBCULT Manifesto',
    date: '2026-01-15',
    excerpt:
      'We are the signal in the noise. A declaration of intent, operational parameters, and the refusal to be optimized.',
    tags: ['manifesto', 'mission', 'founding'],
    author: 'SUBCULT',
  },
  {
    slug: 'release-log-field-notes',
    title: 'Release Log // Field Notes',
    date: '2026-02-01',
    excerpt:
      'Changelog fragments from the workshop. What shipped, what broke, what we learned in the static.',
    tags: ['releases', 'changelog', 'dev'],
    author: 'SUBCULT',
  },
  {
    slug: 'how-we-build',
    title: 'How We Build: Tools, Servers, Rituals',
    date: '2026-02-08',
    excerpt:
      'Our stack is a séance. Linux boxes, terminal multiplexers, self-hosted everything. This is how we work.',
    tags: ['process', 'tools', 'infrastructure'],
    author: 'SUBCULT',
  },
];

// Lazy MDX loaders
const MDX_MODULES: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'subcvlt-manifesto': () => import('@content/posts/subcvlt-manifesto.mdx'),
  'release-log-field-notes': () => import('@content/posts/release-log-field-notes.mdx'),
  'how-we-build': () => import('@content/posts/how-we-build.mdx'),
};

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostMDX(slug: string) {
  return MDX_MODULES[slug];
}

export function getLatestPosts(count: number = 3): Post[] {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
