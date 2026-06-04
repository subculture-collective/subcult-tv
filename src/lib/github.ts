import projectCatalog from '@content/projects.json';
import type { Project } from '@/types';

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return (a.order ?? 999) - (b.order ?? 999);
  });
}

export const CURATED_PROJECTS: Project[] = sortProjects(
  Object.values(projectCatalog) as Project[],
);

export function getCuratedProjects(): Project[] {
  return CURATED_PROJECTS;
}

export function getCuratedProjectBySlug(slug: string | undefined): Project | null {
  if (!slug) return null;
  return CURATED_PROJECTS.find((project) => project.slug === slug) ?? null;
}
