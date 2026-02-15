import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import Tag from '@/components/ui/Tag';
import CoverArt from '@/components/effects/CoverArt';

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<Project['status'], string> = {
  active: 'text-static',
  incubating: 'text-flicker',
  archived: 'text-dust',
};

const statusLabels: Record<Project['status'], string> = {
  active: '● LIVE',
  incubating: '◐ INCUBATING',
  archived: '○ ARCHIVED',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block bg-ash border border-fog hover:border-signal transition-all duration-200 hover:shadow-glow no-underline"
    >
      {/* Cover art */}
      <CoverArt
        color={project.coverColor || '#ff3333'}
        pattern={project.coverPattern || 'circuit'}
        name={project.name}
        className="h-40 w-full"
      />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-lg uppercase tracking-wider text-glow group-hover:text-signal transition-colors">
            {project.name}
          </h3>
          <span className={`font-mono text-xs ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </div>

        <p className="text-sm text-bone mb-3 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Tag key={tech} variant="tech">
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
