import { useState, useEffect, useMemo } from 'react';
import SEOHead from '@/components/SEOHead';
import ProjectCard from '@/components/ProjectCard';
import { fetchGitHubRepos, mergeWithOverrides, FALLBACK_PROJECTS } from '@/lib/github';
import type { Project } from '@/types';

type FilterType = 'all' | 'software' | 'media' | 'tools';
type FilterStatus = 'all' | 'active' | 'incubating' | 'archived';

export default function Projects() {
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

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (typeFilter !== 'all' && p.type !== typeFilter) return false;
        if (statusFilter !== 'all' && p.status !== statusFilter) return false;
        return true;
      }),
    [projects, typeFilter, statusFilter],
  );

  return (
    <>
      <SEOHead
        title="Projects"
        description="Open source tools, media projects, and infrastructure built by SUBCULT."
        path="/projects"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-dust mb-3">&gt; ls -la /projects/</p>
          <h1 className="mb-4">Projects</h1>
          <p className="text-bone max-w-2xl">
            Everything we build is open source. Tools, media, infrastructure — every repo ships with
            intent.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-fog">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-dust">TYPE:</span>
            {(['all', 'software', 'media', 'tools'] as FilterType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`font-mono text-xs px-2 py-1 border transition-colors cursor-pointer ${
                  typeFilter === t
                    ? 'border-signal text-signal'
                    : 'border-fog text-dust hover:text-bone'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-dust">STATUS:</span>
            {(['all', 'active', 'incubating', 'archived'] as FilterStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`font-mono text-xs px-2 py-1 border transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'border-static text-static'
                    : 'border-fog text-dust hover:text-bone'
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="font-mono text-xs text-dust mb-6">
          {loading
            ? '> scanning repositories...'
            : `> ${filtered.length} project${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="font-mono text-dust">
              &gt; no projects match current filters
              <br />
              &gt; try adjusting parameters
            </p>
          </div>
        )}
      </div>
    </>
  );
}
