import { useMemo, useState } from 'react';
import SEOHead from '@/components/SEOHead';
import ProjectCard from '@/components/ProjectCard';
import { getCuratedProjects, getFeaturedProjects, getToolProjects } from '@/lib/github';

type FilterType = 'all' | 'software' | 'media' | 'tools' | 'social';
type FilterStatus = 'all' | 'active' | 'incubating' | 'archived';

export default function Projects() {
  const projects = getCuratedProjects();
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const hasFilters = typeFilter !== 'all' || statusFilter !== 'all';

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (typeFilter !== 'all') {
          const types = Array.isArray(p.type) ? p.type : [p.type];
          if (!types.includes(typeFilter)) return false;
        }
        if (statusFilter !== 'all' && p.status !== statusFilter) return false;
        return true;
      }),
    [projects, typeFilter, statusFilter],
  );

  const featuredProjects = getFeaturedProjects(projects);
  const toolProjects = getToolProjects(projects);

  return (
    <>
      <SEOHead
        title="Projects"
        description="Featured projects and tools in the SUBCULT catalog, curated by hand from self-hosted Gitea."
        path="/projects"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-dust mb-3">&gt; ls -la /projects/</p>
          <h1 className="mb-4">Projects</h1>
          <p className="text-bone max-w-2xl">
            Everything here is curated by hand from the SUBCULT catalog. Featured projects sit
            alongside tools &amp; infrastructure — every repo ships with intent.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-fog">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-dust">TYPE:</span>
            {(['all', 'software', 'media', 'tools', 'social'] as FilterType[]).map((t) => (
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

        {hasFilters ? (
          <>
            {/* Results count */}
            <p className="font-mono text-xs text-dust mb-6">
              {`> ${filtered.length} project${filtered.length !== 1 ? 's' : ''} found`}
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="font-mono text-dust">
                  &gt; no projects match current filters
                  <br />
                  &gt; try adjusting parameters
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-16">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2>
                  <span className="text-dust font-mono text-sm mr-3">//</span>
                  Featured Projects
                </h2>
                <p className="font-mono text-xs text-dust">flagships // active</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2>
                  <span className="text-dust font-mono text-sm mr-3">//</span>
                  Tools &amp; Infrastructure
                </h2>
                <p className="font-mono text-xs text-dust">utilities // support systems</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>

              {toolProjects.length === 0 && (
                <p className="font-mono text-xs text-dust mt-6">&gt; no tools indexed yet</p>
              )}
            </section>
          </div>
        )}
      </div>
    </>
  );
}
