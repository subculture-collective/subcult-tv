import type { GitHubRepo, Project } from '@/types';
import projectOverrides from '@content/projects.json';
import { COVER_COLOR_ROTATION } from '@/lib/tokens';

const GITHUB_ORG = 'subculture-collective';
const CACHE_KEY = 'subcult-github-repos';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

// Repos to exclude from display
const EXCLUDED_REPOS = ['.github', 'subculture-collective.github.io', 'mandalay'];

interface CachedData {
  timestamp: number;
  repos: GitHubRepo[];
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  // Check cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CachedData = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_TTL) {
        return data.repos;
      }
    }
  } catch {
    // Cache miss or corrupt
  }

  try {
    const res = await fetch(
      `https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const repos: GitHubRepo[] = await res.json();
    const filtered = repos.filter((r) => !r.fork && !EXCLUDED_REPOS.includes(r.name));

    // Cache the results
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), repos: filtered }));
    } catch {
      // Storage full, no big deal
    }

    return filtered;
  } catch (err) {
    console.warn('[SUBCULT] GitHub API fetch failed, using fallback data:', err);
    return [];
  }
}

const COVER_PATTERNS: Array<Project['coverPattern']> = [
  'circuit',
  'grid',
  'waves',
  'dots',
  'sigil',
];

const COVER_COLORS = COVER_COLOR_ROTATION;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function inferType(topics: string[]): Project['type'] {
  if (topics.some((t) => ['media', 'video', 'audio', 'art', 'music', 'zine'].includes(t)))
    return 'media';
  if (topics.some((t) => ['tool', 'cli', 'utility', 'devtool', 'infra'].includes(t)))
    return 'tools';
  return 'software';
}

function inferStatus(repo: GitHubRepo): Project['status'] {
  if (repo.archived) return 'archived';
  const lastUpdate = new Date(repo.updated_at);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  if (lastUpdate < sixMonthsAgo) return 'incubating';
  return 'active';
}

export function mergeWithOverrides(repos: GitHubRepo[]): Project[] {
  const overrides = projectOverrides as Record<string, Partial<Project>>;

  const projects: Project[] = repos.map((repo, idx) => {
    const slug = slugify(repo.name);
    const override = overrides[slug] || {};

    return {
      slug,
      name: override.name || repo.name.replace(/[-_]/g, ' '),
      description: override.description || repo.description || 'No description available.',
      longDescription: override.longDescription,
      whyItExists: override.whyItExists,
      status: override.status || inferStatus(repo),
      type: override.type || inferType(repo.topics),
      stack: override.stack || ([repo.language].filter(Boolean) as string[]),
      topics: repo.topics,
      repoUrl: repo.html_url,
      homepage: repo.homepage || undefined,
      lastUpdated: repo.updated_at,
      stars: repo.stargazers_count,
      coverColor: override.coverColor || COVER_COLORS[idx % COVER_COLORS.length],
      coverPattern: override.coverPattern || COVER_PATTERNS[idx % COVER_PATTERNS.length],
      screenshot: override.screenshot,
      featured: override.featured || false,
      order: override.order ?? idx,
    };
  });

  return projects.sort((a, b) => {
    // Active projects first
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return (a.order ?? 999) - (b.order ?? 999);
  });
}

// Fallback projects when GitHub API is unavailable
export const FALLBACK_PROJECTS: Project[] = [
  {
    slug: 'subcult-tv',
    name: 'subcult.tv',
    description: 'The hub. This very site. Portfolio, manifesto, signal broadcast.',
    status: 'active',
    type: 'software',
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    topics: ['website', 'portfolio', 'react'],
    repoUrl: 'https://github.com/subculture-collective/subcult-tv',
    lastUpdated: new Date().toISOString(),
    screenshot: '/screenshots/subcult.png',
    coverColor: '#ff3333',
    coverPattern: 'circuit',
    featured: true,
    order: 0,
  },
  {
    slug: 'clipper',
    name: 'clpr',
    description:
      'A modern Twitch clip curation platform. Discover, organize, and share your favorite clips.',
    status: 'active',
    type: 'software',
    stack: ['TypeScript', 'React', 'Twitch API'],
    topics: ['twitch', 'clips', 'curation'],
    repoUrl: 'https://github.com/subculture-collective/clipper',
    lastUpdated: new Date().toISOString(),
    screenshot: '/screenshots/clpr.png',
    coverColor: '#9146ff',
    coverPattern: 'grid',
    featured: true,
    order: 1,
  },
  {
    slug: 'cutroom',
    name: 'Cutroom',
    description:
      'Collaborative AI video production pipeline. Multi-agent content creation with attribution tracking.',
    status: 'active',
    type: 'media',
    stack: ['TypeScript', 'Next.js', 'AI Agents'],
    topics: ['video', 'ai', 'pipeline'],
    repoUrl: 'https://github.com/subculture-collective/cutroom',
    lastUpdated: new Date().toISOString(),
    screenshot: '/screenshots/cutroom.png',
    coverColor: '#ff6b35',
    coverPattern: 'waves',
    featured: true,
    order: 2,
  },
  {
    slug: 'subcult-corp',
    name: 'Subcorp',
    description:
      'Self-sustaining collective of six AI agents running autonomous workflows — proposals, debates, missions, and memory.',
    status: 'active',
    type: 'software',
    stack: ['Next.js', 'PostgreSQL', 'pgvector', 'OpenRouter'],
    topics: ['ai', 'agents', 'autonomous'],
    repoUrl: 'https://github.com/subculture-collective/subcult-corp',
    lastUpdated: new Date().toISOString(),
    screenshot: '/screenshots/subcorp.png',
    coverColor: '#00ff88',
    coverPattern: 'sigil',
    featured: true,
    order: 3,
  },
  {
    slug: 'internet-id',
    name: 'Internet ID',
    description:
      'Prove "this is really mine" on the internet — without uploading originals or trusting a gatekeeper.',
    status: 'active',
    type: 'tools',
    stack: ['TypeScript'],
    topics: ['identity', 'verification', 'creators'],
    repoUrl: 'https://github.com/subculture-collective/internet-id',
    lastUpdated: new Date().toISOString(),
    coverColor: COVER_COLOR_ROTATION[2],
    coverPattern: 'sigil',
    featured: false,
    order: 10,
  },
  {
    slug: 'soundhash',
    name: 'Soundhash',
    description: 'Audio fingerprinting system for matching clips across social media platforms.',
    status: 'active',
    type: 'tools',
    stack: ['Python', 'PostgreSQL'],
    topics: ['audio', 'fingerprinting', 'matching'],
    repoUrl: 'https://github.com/subculture-collective/soundhash',
    lastUpdated: new Date().toISOString(),
    coverColor: COVER_COLOR_ROTATION[3],
    coverPattern: 'waves',
    featured: false,
    order: 11,
  },
];
