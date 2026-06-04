# Manual Gitea Projects Implementation Plan

> **For agentic workers:** Execute this plan task-by-task. Recommended path:
> dispatch a fresh subagent per task, review each result with `review-quality`,
> then continue. For complex multi-agent splits, use
> `parallel-feature-development`, `team-composition-patterns`, and
> `team-communication-protocols`. Steps use checkbox (`- [ ]`) syntax for
> tracking.

**Goal:** Stop project auto-population from GitHub and make the projects section a manually curated, Gitea-ready portfolio.

**Architecture:** Replace the client-side GitHub API fetch/cache path with a local static project catalog derived from `content/projects.json`. Pages should synchronously read that catalog, so no external repo provider can auto-fill the site. Gitea is represented only by manually entered `repoUrl` values until exact repo URLs are supplied.

**Tech Stack:** Vite, React 19, TypeScript, React Router, local JSON imports, ESLint, TypeScript build checks.

---

## User-Approved Scope

- Remove GitHub auto-population for projects.
- Use a manual curated project source.
- Add Gitea-ready placeholder-style entries with complete valid fields, not API sync.
- Update obvious GitHub-facing copy/docs so the site no longer advertises GitHub as the source of truth.
- Do not add Gitea API fetching.
- Do not change zine/MDX post publishing; it is already local/static.

## Complexity Assessment

- **Logic depth:** Medium — localized data-flow rewrite across three pages and one library.
- **Contract sensitivity:** Low — public presentation changes only; no API/schema/auth change.
- **Context span:** Medium — coordinated frontend, content, and docs edits.
- **Discovery need:** Medium — existing GitHub assumptions were mapped before this plan.
- **Failure cost:** Low — errors are visible in project listings/details and caught by type/build checks.
- **Concern coupling:** Medium — project data flow and public copy need to stay aligned.

**Route:** Lightweight written plan, persisted as a repo plan artifact. Persistence mode selected by user: `hybrid`.

## File Map

- Modify `src/lib/github.ts` — convert this GitHub-specific module into a compatibility wrapper over curated local project data, or rename later if desired. This plan keeps the file path to avoid broad import churn.
- Modify `src/pages/Home.tsx` — remove `useState`/`useEffect` GitHub loading and use static curated projects.
- Modify `src/pages/Projects.tsx` — remove async loading state and render filters against static curated projects.
- Modify `src/pages/ProjectDetail.tsx` — remove async lookup/loading state and synchronously resolve from static curated projects.
- Modify `content/projects.json` — add complete manual project objects with `repoUrl`, `lastUpdated`, and Gitea-ready URLs.
- Modify `src/types.ts` — remove `GitHubRepo` only after all imports are gone.
- Modify `README.md`, `.env.example`, `docs/CONTENT_CHECKLIST.md`, `src/pages/About.tsx`, and `src/pages/Links.tsx` — remove/update GitHub-source language and add Gitea/manual curation language.

## Task 1: Replace GitHub Fetching With Curated Project Catalog

**Files:**
- Modify: `src/lib/github.ts`
- Modify: `content/projects.json`

- [ ] **Step 1: Replace `content/projects.json` with complete curated project records**

Use complete `Project` fields so the site does not need repository API data. Keep existing real projects and add Gitea-ready entries that can be edited later by changing `repoUrl`, `url`, copy, and screenshots.

```json
{
  "subcult-tv": {
    "slug": "subcult-tv",
    "name": "subcult.tv",
    "description": "The hub. This very site. Portfolio, manifesto, signal broadcast.",
    "longDescription": "subcult.tv is the central node of the Subculture Collective network. It serves as our business homepage, project portfolio, zine archive, and Patreon funnel. Built with Vite, React, TypeScript, and Tailwind CSS with a VHS/punk/gothic aesthetic.",
    "whyItExists": "Every collective needs a signal tower. This is ours.",
    "status": "active",
    "type": ["software"],
    "stack": ["TypeScript", "React", "Tailwind CSS", "Vite"],
    "topics": ["website", "portfolio", "react"],
    "url": "https://subcult.tv",
    "repoUrl": "https://gitea.subcult.tv/subcult/subcult-tv",
    "lastUpdated": "2026-06-04T00:00:00Z",
    "screenshot": "/screenshots/subcult.png",
    "featured": false,
    "order": 0,
    "coverColor": "#ff3333",
    "coverPattern": "circuit"
  },
  "clipper": {
    "slug": "clipper",
    "name": "clpr",
    "description": "A modern Twitch clip curation platform. Discover, organize, and share your favorite clips.",
    "longDescription": "clpr is a Twitch clip curation platform that lets users discover trending clips, build curated collections, and share highlights across the community.",
    "whyItExists": "Twitch clips deserve better discovery. We built the frontend Twitch won't.",
    "status": "active",
    "type": ["software", "media"],
    "stack": ["TypeScript", "React", "Twitch API", "Go", "OpenSearch"],
    "topics": ["twitch", "clips", "curation"],
    "url": "https://clpr.tv",
    "repoUrl": "https://gitea.subcult.tv/subcult/clipper",
    "lastUpdated": "2026-06-04T00:00:00Z",
    "screenshot": "/screenshots/clpr.png",
    "featured": true,
    "order": 1,
    "coverColor": "#9146ff",
    "coverPattern": "grid"
  },
  "cutroom": {
    "slug": "cutroom",
    "name": "Cutroom",
    "description": "Collaborative AI video production pipeline. Multi-agent content creation with attribution tracking.",
    "longDescription": "Cutroom is a collaborative AI video production pipeline where multiple specialized agents work together to create short-form video content. Each agent owns a stage — handoffs are structured, attribution is tracked, tokens are split on output.",
    "whyItExists": "Video production shouldn't require a studio. We built the assembly line.",
    "status": "incubating",
    "type": ["media", "software"],
    "stack": ["TypeScript", "Next.js", "AI Agents", "Remotion API"],
    "topics": ["video", "ai", "pipeline"],
    "url": "https://cutroom.subcult.tv",
    "repoUrl": "https://gitea.subcult.tv/subcult/cutroom",
    "lastUpdated": "2026-06-04T00:00:00Z",
    "screenshot": "/screenshots/cutroom.png",
    "featured": true,
    "order": 2,
    "coverColor": "#ff6b35",
    "coverPattern": "waves"
  },
  "subcult-corp": {
    "slug": "subcult-corp",
    "name": "Subcorp",
    "description": "Self-sustaining collective of six AI agents running autonomous workflows — proposals, debates, missions, and memory.",
    "longDescription": "Subcorp is a self-hosted multi-agent system — 6 AI agents with native tool execution, autonomous workflows, roundtable conversations, and semantic memory. Built with Next.js, PostgreSQL + pgvector, and OpenRouter.",
    "whyItExists": "We wanted AI that collaborates like a collective, not a chatbot.",
    "status": "active",
    "type": ["software", "tools"],
    "stack": ["Next.js", "PostgreSQL", "pgvector", "OpenRouter"],
    "topics": ["agents", "memory", "automation"],
    "url": "https://subcorp.subcult.tv",
    "repoUrl": "https://gitea.subcult.tv/subcult/subcult-corp",
    "lastUpdated": "2026-06-04T00:00:00Z",
    "screenshot": "/screenshots/subcorp.png",
    "featured": true,
    "order": 3,
    "coverColor": "#00ff88",
    "coverPattern": "sigil"
  },
  "reddit-cluster-map": {
    "slug": "reddit-cluster-map",
    "name": "clustr",
    "description": "Interactive visualization of Reddit community relationships. Explore subreddit clusters and cross-posting patterns.",
    "longDescription": "clustr maps the hidden topology of Reddit — visualizing how communities connect through shared users, cross-posts, and semantic overlap. Navigate the social graph, discover related subreddits, and see patterns in how communities form and fragment.",
    "whyItExists": "Reddit's structure is invisible by design. We made it legible.",
    "status": "incubating",
    "type": ["software", "tools"],
    "stack": ["TypeScript", "React", "D3.js", "Reddit API"],
    "topics": ["reddit", "visualization", "graphs"],
    "url": "https://clustr.subcult.tv",
    "repoUrl": "https://gitea.subcult.tv/subcult/reddit-cluster-map",
    "lastUpdated": "2026-06-04T00:00:00Z",
    "screenshot": "/screenshots/clustr.png",
    "featured": true,
    "order": 4,
    "coverColor": "#ff4500",
    "coverPattern": "grid"
  },
  "field-notes": {
    "slug": "field-notes",
    "name": "Field Notes",
    "description": "A Gitea-ready project slot for new SUBCULT work that should be curated by hand before launch.",
    "longDescription": "Field Notes is a manually curated entry reserved for new SUBCULT work. Replace this copy, repository URL, stack, topics, and image once the exact Gitea repository is ready to publish.",
    "whyItExists": "New work should be staged deliberately, not pulled into the site by an API crawler.",
    "status": "incubating",
    "type": ["media", "tools"],
    "stack": ["Manual Curation", "Gitea"],
    "topics": ["curated", "gitea", "new-work"],
    "repoUrl": "https://gitea.subcult.tv/subcult/field-notes",
    "lastUpdated": "2026-06-04T00:00:00Z",
    "featured": false,
    "order": 5,
    "coverColor": "#7c3aed",
    "coverPattern": "dots"
  }
}
```

- [ ] **Step 2: Replace `src/lib/github.ts` implementation with static exports**

```ts
import type { Project } from '@/types';
import projectCatalog from '@content/projects.json';

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return (a.order ?? 999) - (b.order ?? 999);
  });
}

export const CURATED_PROJECTS: Project[] = sortProjects(Object.values(projectCatalog) as Project[]);

export function getCuratedProjects(): Project[] {
  return CURATED_PROJECTS;
}

export function getCuratedProjectBySlug(slug: string | undefined): Project | null {
  if (!slug) return null;
  return CURATED_PROJECTS.find((project) => project.slug === slug) ?? null;
}
```

- [ ] **Step 3: Run TypeScript check and fix JSON/type errors**

Run: `npm run typecheck`

Expected: PASS. If it fails because JSON import values are too loosely typed, keep the explicit `as Project[]` cast from Step 2 and verify each JSON entry has `slug`, `name`, `description`, `status`, `type`, `stack`, `topics`, `repoUrl`, and `lastUpdated`.

## Task 2: Remove Async Project Loading From Public Pages

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/Projects.tsx`
- Modify: `src/pages/ProjectDetail.tsx`

- [ ] **Step 1: Update `src/pages/Home.tsx` imports and project source**

Replace:

```ts
import { useState, useEffect } from 'react';
import { fetchGitHubRepos, mergeWithOverrides, FALLBACK_PROJECTS } from '@/lib/github';
import type { Project } from '@/types';
```

with:

```ts
import { getCuratedProjects } from '@/lib/github';
```

Replace the state/effect block:

```ts
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const { effectLevel } = useEffects();
  const latestPosts = getLatestPosts(3);

  useEffect(() => {
    fetchGitHubRepos().then((repos) => {
      if (repos.length > 0) {
        setProjects(mergeWithOverrides(repos));
      }
    });
  }, []);
```

with:

```ts
  const projects = getCuratedProjects();
  const { effectLevel } = useEffects();
  const latestPosts = getLatestPosts(3);
```

- [ ] **Step 2: Update `src/pages/Projects.tsx` imports and loading behavior**

Replace:

```ts
import { useState, useEffect, useMemo } from 'react';
import { fetchGitHubRepos, mergeWithOverrides, FALLBACK_PROJECTS } from '@/lib/github';
import type { Project } from '@/types';
```

with:

```ts
import { useState, useMemo } from 'react';
import { getCuratedProjects } from '@/lib/github';
```

Replace:

```ts
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos()
      .then((repos) => {
        if (repos.length > 0) {
          setProjects(mergeWithOverrides(repos));
        }
      })
      .finally(() => setLoading(false));
  }, []);
```

with:

```ts
  const projects = getCuratedProjects();
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
```

Then remove the loading branch if present later in the file:

```tsx
{loading ? (
  <p className="font-mono text-dust">&gt; syncing repositories...</p>
) : (
  ...
)}
```

Render the project grid directly against `filtered`.

- [ ] **Step 3: Update `src/pages/ProjectDetail.tsx` imports and lookup**

Replace:

```ts
import { useState, useEffect } from 'react';
import { fetchGitHubRepos, mergeWithOverrides, FALLBACK_PROJECTS } from '@/lib/github';
import type { Project } from '@/types';
```

with:

```ts
import { getCuratedProjectBySlug } from '@/lib/github';
```

Replace:

```ts
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findProject = async () => {
      // Try GitHub first
      const repos = await fetchGitHubRepos();
      const allProjects = repos.length > 0 ? mergeWithOverrides(repos) : FALLBACK_PROJECTS;
      const found = allProjects.find((p) => p.slug === slug);
      setProject(found || null);
      setLoading(false);
    };
    findProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="font-mono text-bone">
          &gt; loading project data...
          <span className="cursor-blink" />
        </p>
      </div>
    );
  }
```

with:

```ts
  const project = getCuratedProjectBySlug(slug);
```

- [ ] **Step 4: Run checks**

Run: `npm run typecheck`
Expected: PASS.

Run: `npm run lint`
Expected: PASS or only pre-existing unrelated lint failures. Any unused imports from this task must be fixed.

## Task 3: Remove GitHub Types and Update Provider-Facing Copy

**Files:**
- Modify: `src/types.ts`
- Modify: `README.md`
- Modify: `.env.example`
- Modify: `docs/CONTENT_CHECKLIST.md`
- Modify: `src/pages/About.tsx`
- Modify: `src/pages/Links.tsx`

- [ ] **Step 1: Remove obsolete `GitHubRepo` type**

In `src/types.ts`, delete:

```ts
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
```

- [ ] **Step 2: Search for GitHub auto-population references**

Run: `rg "GitHub|github|VITE_GITHUB_TOKEN|fetchGitHubRepos|mergeWithOverrides|FALLBACK_PROJECTS|api.github.com" README.md .env.example docs src content`

Expected remaining references after edits:
- Historical references only if intentionally retained.
- No `fetchGitHubRepos`, `mergeWithOverrides`, `FALLBACK_PROJECTS`, `VITE_GITHUB_TOKEN`, or `api.github.com` references.

- [ ] **Step 3: Update docs/copy with specific replacement language**

Use these replacements where matching text exists:

```md
Projects are curated manually from `content/projects.json`. Repository links may point to Gitea, but the frontend does not fetch or sync repositories from any provider.
```

```md
To add work, add a complete project entry to `content/projects.json`, including `slug`, `repoUrl`, `lastUpdated`, `topics`, `stack`, `status`, and `order`.
```

```ts
// About copy replacement idea:
"git (self-hosted Gitea)"
```

```ts
// CI/deployment copy replacement idea:
"self-hosted git + custom scripts"
```

For `src/pages/Links.tsx`, if a GitHub social link is present and no exact Gitea public profile URL is known, change the label to `Gitea` and the URL to `https://gitea.subcult.tv/subcult`.

- [ ] **Step 4: Run final frontend checks**

Run: `npm run typecheck`
Expected: PASS.

Run: `npm run lint`
Expected: PASS or documented pre-existing unrelated failures.

Run: `npm run build`
Expected: PASS, including RSS generation and Vite production build.

## Task 4: Manual QA Acceptance Pass

**Files:**
- No code edits unless checks reveal issues.

- [ ] **Step 1: Start local dev server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite serves on port `5175` unless already occupied.

- [ ] **Step 2: Verify project list behavior**

Open `/projects` and confirm:
- The browser Network panel shows no calls to `api.github.com`.
- Project cards render from `content/projects.json`.
- Filters still work for `all`, `software`, `media`, `tools`, `active`, `incubating`, and `archived`.
- No `syncing repositories` or `loading project data` messaging appears for normal static project loading.

- [ ] **Step 3: Verify detail routes**

Open these routes and confirm each displays the curated entry:
- `/projects/subcult-tv`
- `/projects/clipper`
- `/projects/field-notes`

Expected: Each page renders title, description, tags, stack, repository link, and status without waiting for network fetches.

- [ ] **Step 4: Stop dev server**

Stop the Vite process with `Ctrl+C` in the terminal where it is running.

## Self-Review

- Spec coverage: The plan removes auto-population, keeps projects manual, points repo links toward Gitea-ready URLs, and updates public/docs copy. It intentionally does not add Gitea API fetching because the approved source is manual curated list.
- Placeholder scan: The plan includes one intentionally editable `field-notes` manual entry with complete fields. There are no missing required fields or `TBD` values.
- Type consistency: `Project` fields match `src/types.ts`; project pages consume `getCuratedProjects()` and `getCuratedProjectBySlug()` from the existing library path.
