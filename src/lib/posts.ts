import type { Post } from '@/types';

// ── Post Registry ───────────────────────────────────────────
// One entry per post. Order = series order (oldest first).
// To publish a new post: add its entry here with an `mdx` loader.
// Posts without `mdx` are listed in metadata but not yet navigable.

export const posts: Post[] = [
  {
    slug: 'boot-sequence',
    title: 'Boot Sequence: Why We\u2019re Building Subculture Collective',
    date: '2026-02-17',
    excerpt:
      'There are already too many places to post. What the internet lacks is durable infrastructure for culture.',
    tags: ['foundations', 'mission', 'infrastructure'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/boot-sequence.mdx'),
    series: { name: 'Foundations', week: 1, total: 8 },
  },
  {
    slug: 'against-metrics',
    title: 'Against Metrics',
    date: '2026-02-24',
    excerpt:
      'Measurement is necessary. Metrics are dangerous. Why the numbers we worship quietly reshape culture.',
    tags: ['foundations', 'metrics', 'culture'],
    author: 'SUBCULT',
    series: { name: 'Foundations', week: 2, total: 8 },
  },
  {
    slug: 'the-feed-without-the-feed',
    title: 'The Feed Without the Feed: Reclaiming Discovery',
    date: '2026-03-03',
    excerpt:
      'The infinite scroll promises discovery but delivers retention. What happens when we build for retrieval instead?',
    tags: ['foundations', 'discovery', 'clipper'],
    author: 'SUBCULT',
    series: { name: 'Foundations', week: 3, total: 8 },
  },
  {
    slug: 'search-is-governance',
    title: 'Search Is Governance',
    date: '2026-03-10',
    excerpt:
      'The order of search results encodes judgment. Search is governance by algorithm.',
    tags: ['foundations', 'search', 'governance'],
    author: 'SUBCULT',
    series: { name: 'Foundations', week: 4, total: 8 },
  },
  {
    slug: 'moderation-is-infrastructure',
    title: 'Moderation Is Infrastructure',
    date: '2026-03-17',
    excerpt:
      'Moderation is not a patch. It is architecture. Every system encodes assumptions about behavior.',
    tags: ['foundations', 'moderation', 'community'],
    author: 'SUBCULT',
    series: { name: 'Foundations', week: 5, total: 8 },
  },
  {
    slug: 'digital-zines-as-resistance',
    title: 'Digital Zines as Resistance',
    date: '2026-03-24',
    excerpt:
      'Before algorithmic feeds, there were zines. They were not optimized. They were intentional.',
    tags: ['foundations', 'zines', 'publishing'],
    author: 'SUBCULT',
    series: { name: 'Foundations', week: 6, total: 8 },
  },
  {
    slug: 'how-we-work-without-burning-out',
    title: 'How We Work Without Burning Out',
    date: '2026-03-31',
    excerpt:
      'Most collaborative projects fail because of exhaustion. Sustainability is a design constraint.',
    tags: ['foundations', 'process', 'sustainability'],
    author: 'SUBCULT',
    series: { name: 'Foundations', week: 7, total: 8 },
  },
  {
    slug: 'the-shape-of-a-community',
    title: 'The Shape of a Community',
    date: '2026-04-07',
    excerpt:
      'Every community has a shape. These shapes determine how information travels, how conflict spreads, and how innovation emerges.',
    tags: ['foundations', 'community', 'graphmap'],
    author: 'SUBCULT',
    series: { name: 'Foundations', week: 8, total: 8 },
  },
];

// ── Helpers ──────────────────────────────────────────────────

/** Only posts with an `mdx` loader are considered published. */
export function getPublishedPosts(): Post[] {
  return posts.filter((p) => p.mdx);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && p.mdx);
}

export function getPostMDX(slug: string) {
  const post = posts.find((p) => p.slug === slug);
  return post?.mdx;
}

export function getLatestPosts(count: number = 3): Post[] {
  return getPublishedPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

/** Returns the next post in the same series (by week), or undefined. */
export function getNextInSeries(slug: string): Post | undefined {
  const current = posts.find((p) => p.slug === slug);
  if (!current?.series) return undefined;
  const idx = posts.indexOf(current);
  const next = posts[idx + 1];
  if (next?.series?.name === current.series.name) return next;
  return undefined;
}
