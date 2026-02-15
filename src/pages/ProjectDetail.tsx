import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import CoverArt from '@/components/effects/CoverArt';
import TerminalPanel from '@/components/effects/TerminalPanel';
import { fetchGitHubRepos, mergeWithOverrides, FALLBACK_PROJECTS } from '@/lib/github';
import type { Project } from '@/types';

const statusLabels: Record<Project['status'], string> = {
  active: '● LIVE',
  incubating: '◐ INCUBATING',
  archived: '○ ARCHIVED',
};

const statusColors: Record<Project['status'], string> = {
  active: 'text-static',
  incubating: 'text-flicker',
  archived: 'text-dust',
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
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
        <p className="font-mono text-dust">
          &gt; loading project data...
          <span className="cursor-blink" />
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SEOHead title="Project Not Found" path={`/projects/${slug}`} />
        <p className="font-mono text-signal mb-4">&gt; ERROR 404: project not found</p>
        <p className="text-bone mb-6">
          The signal was lost. This project doesn't exist or has been archived into the void.
        </p>
        <Button as="link" to="/projects" variant="secondary">
          ← Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={project.name}
        description={project.description}
        path={`/projects/${project.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Breadcrumb */}
        <nav className="font-mono text-xs text-dust mb-8" aria-label="Breadcrumb">
          <Link to="/projects" className="hover:text-bone transition-colors">
            projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-bone">{project.slug}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Cover */}
            <CoverArt
              color={project.coverColor || '#ff3333'}
              pattern={project.coverPattern || 'circuit'}
              name={project.name}
              className="h-56 w-full mb-8"
            />

            <h1 className="mb-4">{project.name}</h1>

            <p className="text-lg text-bone leading-relaxed mb-6">
              {project.longDescription || project.description}
            </p>

            {project.whyItExists && (
              <div className="mb-8">
                <h3 className="text-sm font-mono text-dust uppercase mb-3">// Why It Exists</h3>
                <blockquote className="border-l-3 border-signal pl-4 text-bone italic">
                  {project.whyItExists}
                </blockquote>
              </div>
            )}

            {/* Terminal info block */}
            <TerminalPanel title={`${project.slug}.info`} className="mb-8">
              <div>
                <span className="text-dust">name: </span>
                <span className="text-chalk">{project.name}</span>
                <br />
                <span className="text-dust">type: </span>
                <span className="text-cyan">{project.type}</span>
                <br />
                <span className="text-dust">status: </span>
                <span className={statusColors[project.status]}>
                  {statusLabels[project.status]}
                </span>
                <br />
                <span className="text-dust">stack: </span>
                <span className="text-flicker">{project.stack.join(', ')}</span>
                <br />
                <span className="text-dust">updated: </span>
                <span className="text-bone">
                  {new Date(project.lastUpdated).toLocaleDateString()}
                </span>
                {project.stars !== undefined && (
                  <>
                    <br />
                    <span className="text-dust">stars: </span>
                    <span className="text-flicker">{project.stars}</span>
                  </>
                )}
              </div>
            </TerminalPanel>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-ash border border-fog p-6">
              <h4 className="font-mono text-xs text-dust uppercase mb-4">// Actions</h4>
              <div className="space-y-3">
                <Button
                  as="a"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="w-full"
                >
                  View on GitHub ↗
                </Button>
                {project.homepage && (
                  <Button
                    as="a"
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    className="w-full"
                  >
                    Live Demo ↗
                  </Button>
                )}
                <Button
                  as="a"
                  href="https://www.patreon.com/cw/subcult"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="signal"
                  className="w-full"
                >
                  Support This Project ↗
                </Button>
              </div>
            </div>

            {/* Stack */}
            <div className="bg-ash border border-fog p-6">
              <h4 className="font-mono text-xs text-dust uppercase mb-4">// Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech} variant="tech">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Topics */}
            {project.topics.length > 0 && (
              <div className="bg-ash border border-fog p-6">
                <h4 className="font-mono text-xs text-dust uppercase mb-4">// Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {project.topics.map((topic) => (
                    <Tag key={topic}>{topic}</Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-fog">
          <Link
            to="/projects"
            className="font-mono text-sm text-bone hover:text-signal transition-colors"
          >
            ← Back to all projects
          </Link>
        </div>
      </div>
    </>
  );
}
