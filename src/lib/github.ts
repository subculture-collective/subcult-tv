import type { GitHubRepo, Project } from '@/types';
import projectOverrides from '@content/projects.json';

const GITHUB_ORG = 'subculture-collective';
const CACHE_KEY = 'subcvlt-github-repos';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

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
    const filtered = repos.filter((r) => !r.fork);

    // Cache the results
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), repos: filtered }),
      );
    } catch {
      // Storage full, no big deal
    }

    return filtered;
  } catch (err) {
    console.warn('[SUBCVLT] GitHub API fetch failed, using fallback data:', err);
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

const COVER_COLORS = [
  '#ff3333',
  '#6633ff',
  '#00ff88',
  '#ffcc00',
  '#00ccff',
  '#e040fb',
  '#ff6600',
  '#00cc99',
];

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
  const overrides = (projectOverrides as Record<string, Partial<Project>>);

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
      stack: override.stack || [repo.language].filter(Boolean) as string[],
      topics: repo.topics,
      repoUrl: repo.html_url,
      homepage: repo.homepage || undefined,
      lastUpdated: repo.updated_at,
      stars: repo.stargazers_count,
      coverColor: override.coverColor || COVER_COLORS[idx % COVER_COLORS.length],
      coverPattern: override.coverPattern || COVER_PATTERNS[idx % COVER_PATTERNS.length],
      featured: override.featured || false,
      order: override.order ?? idx,
    };
  });

  return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

// Fallback projects when GitHub API is unavailable
export const FALLBACK_PROJECTS: Project[] = [
  {
    slug: 'subcult-tv',
    name: 'subcult.tv',
    description: 'The hub. This very site. Built with Vite, React, TypeScript, and Tailwind.',
    status: 'active',
    type: 'software',
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    topics: ['website', 'portfolio', 'react'],
    repoUrl: 'https://github.com/subculture-collective/subcult-tv',
    lastUpdated: new Date().toISOString(),
    coverColor: '#ff3333',
    coverPattern: 'circuit',
    featured: true,
    order: 0,
  },
  {
    slug: 'signal-noise',
    name: 'Signal // Noise',
    description: 'Audio processing toolkit for lo-fi and glitch aesthetics. Feed it clean audio, get back static.',
    status: 'incubating',
    type: 'tools',
    stack: ['Rust', 'WASM'],
    topics: ['audio', 'glitch', 'tool'],
    repoUrl: 'https://github.com/subculture-collective',
    lastUpdated: new Date().toISOString(),
    coverColor: '#00ff88',
    coverPattern: 'waves',
    featured: true,
    order: 1,
  },
  {
    slug: 'dead-letter-drop',
    name: 'Dead Letter Drop',
    description: 'Ephemeral encrypted messaging. Messages self-destruct. No accounts. No logs. No masters.',
    status: 'active',
    type: 'software',
    stack: ['Go', 'TypeScript'],
    topics: ['privacy', 'encryption', 'messaging'],
    repoUrl: 'https://github.com/subculture-collective',
    lastUpdated: new Date().toISOString(),
    coverColor: '#6633ff',
    coverPattern: 'sigil',
    featured: true,
    order: 2,
  },
  {
    slug: 'phosphor-grid',
    name: 'Phosphor Grid',
    description: 'Retro terminal UI component library. CRT phosphor glow, scanlines, amber/green themes.',
    status: 'active',
    type: 'tools',
    stack: ['TypeScript', 'CSS'],
    topics: ['ui', 'retro', 'terminal', 'components'],
    repoUrl: 'https://github.com/subculture-collective',
    lastUpdated: new Date().toISOString(),
    coverColor: '#ffcc00',
    coverPattern: 'grid',
    featured: true,
    order: 3,
  },
  {
    slug: 'zine-press',
    name: 'Zine Press',
    description: 'Markdown-to-zine generator. Outputs print-ready PDFs with punk layouts, torn edges, and halftone.',
    status: 'incubating',
    type: 'media',
    stack: ['Node.js', 'Puppeteer'],
    topics: ['zine', 'publishing', 'pdf'],
    repoUrl: 'https://github.com/subculture-collective',
    lastUpdated: new Date().toISOString(),
    coverColor: '#e040fb',
    coverPattern: 'dots',
    featured: true,
    order: 4,
  },
  {
    slug: 'blackout-radio',
    name: 'Blackout Radio',
    description: 'Self-hosted internet radio with auto-DJ. Streams from your library. No algorithms. No ads.',
    status: 'incubating',
    type: 'media',
    stack: ['Go', 'Icecast'],
    topics: ['radio', 'streaming', 'self-hosted'],
    repoUrl: 'https://github.com/subculture-collective',
    lastUpdated: new Date().toISOString(),
    coverColor: '#00ccff',
    coverPattern: 'circuit',
    featured: false,
    order: 5,
  },
];
