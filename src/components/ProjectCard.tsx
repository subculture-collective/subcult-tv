import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import Tag from '@/components/ui/Tag';
import CoverArt from '@/components/effects/CoverArt';
import { DEFAULT_COVER_COLOR } from '@/lib/tokens';
import { statusColors, statusLabels } from '@/lib/project-utils';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasScreenshot = !!project.screenshot;

  const card = (
    <div
      className={`group flex flex-col h-full bg-ash border border-fog transition-all duration-200 ${
        hasScreenshot
          ? 'hover:border-signal hover:shadow-glow cursor-pointer'
          : 'opacity-50 grayscale pointer-events-none'
      }`}
    >
      {/* Cover */}
      <div className="relative h-40 w-full overflow-hidden">
        {hasScreenshot ? (
          <img
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <CoverArt
            color={project.coverColor || DEFAULT_COVER_COLOR}
            pattern={project.coverPattern || 'circuit'}
            name={project.name}
            className="h-full w-full"
          />
        )}
        {!hasScreenshot && (
          <div className="absolute inset-0 flex items-center justify-center bg-void/70">
            <span className="font-mono text-xs text-dust uppercase tracking-widest border border-fog px-3 py-1.5">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-lg uppercase tracking-wider text-glow group-hover:text-signal transition-colors">
            {project.name}
          </h3>
          <span className={`font-mono text-xs ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </div>

        <p className="text-sm text-bone mb-3 line-clamp-2 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.slice(0, 4).map((tech) => (
            <Tag key={tech} variant="tech">
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );

  if (!hasScreenshot) {
    return card;
  }

  return (
    <Link to={`/projects/${project.slug}`} className="no-underline">
      {card}
    </Link>
  );
}
