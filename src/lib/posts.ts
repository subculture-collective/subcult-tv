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
    mdx: () => import('@content/posts/against-metrics.mdx'),
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
    mdx: () => import('@content/posts/the-feed-without-the-feed.mdx'),
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
    mdx: () => import('@content/posts/search-is-governance.mdx'),
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
    mdx: () => import('@content/posts/moderation-is-infrastructure.mdx'),
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
    mdx: () => import('@content/posts/digital-zines-as-resistance.mdx'),
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
    mdx: () => import('@content/posts/how-we-work-without-burning-out.mdx'),
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
    mdx: () => import('@content/posts/the-shape-of-a-community.mdx'),
    series: { name: 'Foundations', week: 8, total: 8 },
  },
  {
    slug: 'the-signal-tower',
    title: 'The Signal Tower: Why Every Collective Needs a Place to Broadcast From',
    date: '2026-06-04',
    excerpt:
      'A website is not just a brochure. It is where a collective decides what persists, what gets framed, and what refuses to disappear into the feed.',
    tags: ['field-systems', 'homepage', 'archives'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/the-signal-tower.mdx'),
    series: { name: 'Field Systems', week: 1, total: 8 },
  },
  {
    slug: 'maps-without-leaderboards',
    title: 'Maps Without Leaderboards: Making Communities Legible Without Ranking Them',
    date: '2026-06-11',
    excerpt:
      'Community analytics usually become status machines. The harder and more interesting problem is making structure visible without turning people into scores.',
    tags: ['field-systems', 'community', 'mapping'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/maps-without-leaderboards.mdx'),
    series: { name: 'Field Systems', week: 2, total: 8 },
  },
  {
    slug: 'search-is-a-memory-machine',
    title: 'Search Is a Memory Machine: Clips, Transcripts, Fingerprints, and the Fight Against Amnesia',
    date: '2026-06-18',
    excerpt:
      'Discovery is usually treated as convenience. For cultural work, it is closer to memory: the ability to find the artifact after the platform has stopped caring.',
    tags: ['field-systems', 'search', 'memory'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/search-is-a-memory-machine.mdx'),
    series: { name: 'Field Systems', week: 3, total: 8 },
  },
  {
    slug: 'mutual-aid-has-a-backend',
    title: 'Mutual Aid Has a Backend: Trust, Moderation, and the Infrastructure Beneath Care',
    date: '2026-06-25',
    excerpt:
      'Mutual aid is often described as emotion and intention. At scale, it also needs schemas, search, moderation, and procedures that protect people without turning care into bureaucracy.',
    tags: ['field-systems', 'mutual-aid', 'moderation'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/mutual-aid-has-a-backend.mdx'),
    series: { name: 'Field Systems', week: 4, total: 8 },
  },
  {
    slug: 'argument-machines',
    title: 'Argument Machines: Markets, Courts, and the Usefulness of Structured Disagreement',
    date: '2026-07-02',
    excerpt:
      'Autonomous systems fail when they collapse debate into execution. Sometimes the safest path forward is to make disagreement procedural before action is allowed.',
    tags: ['field-systems', 'governance', 'ai'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/argument-machines.mdx'),
    series: { name: 'Field Systems', week: 5, total: 8 },
  },
  {
    slug: 'tiny-worlds-for-real-life',
    title: 'Tiny Worlds for Real Life: Place, Memory, and Simulation as Interfaces',
    date: '2026-07-09',
    excerpt:
      'Not every interface should be a dashboard. Sometimes the better representation of a life, a place, or a community is a world that changes over time.',
    tags: ['field-systems', 'simulation', 'memory'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/tiny-worlds-for-real-life.mdx'),
    series: { name: 'Field Systems', week: 6, total: 8 },
  },
  {
    slug: 'media-without-a-studio',
    title: 'Media Without a Studio: Small-Crew Production in the Age of Assembly Lines',
    date: '2026-07-16',
    excerpt:
      'The future of independent media is not one creator doing everything alone. It is small teams and agentic pipelines that make production legible without turning art into factory work.',
    tags: ['field-systems', 'media', 'production'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/media-without-a-studio.mdx'),
    series: { name: 'Field Systems', week: 7, total: 8 },
  },
  {
    slug: 'the-workshop-after-the-manifesto',
    title: 'The Workshop After the Manifesto: Building a Collective Without Becoming a Platform',
    date: '2026-07-23',
    excerpt:
      'The hard part is not declaring values. The hard part is encoding them into tools, templates, queues, archives, defaults, and the small operations that decide what the collective becomes.',
    tags: ['field-systems', 'operations', 'infrastructure'],
    author: 'SUBCULT',
    mdx: () => import('@content/posts/the-workshop-after-the-manifesto.mdx'),
    series: { name: 'Field Systems', week: 8, total: 8 },
  },
];

// ── Helpers ──────────────────────────────────────────────────

/** A post is published when it has an `mdx` loader and its date is today or earlier. */
export function isPublished(post: Post): boolean {
  if (!post.mdx) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(post.date + 'T00:00:00') <= today;
}

export function getPublishedPosts(): Post[] {
  return posts.filter(isPublished);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && isPublished(p));
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
  if (next?.series?.name === current.series.name && isPublished(next)) return next;
  return undefined;
}
