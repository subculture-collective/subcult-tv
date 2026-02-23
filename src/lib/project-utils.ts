import type { Project } from '@/types';

export const statusColors: Record<Project['status'], string> = {
  active: 'text-static',
  incubating: 'text-flicker',
  archived: 'text-dust',
};

export const statusLabels: Record<Project['status'], string> = {
  active: '● LIVE',
  incubating: '◐ INCUBATING',
  archived: '○ ARCHIVED',
};
