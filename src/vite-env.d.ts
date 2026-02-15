/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
}

declare module '@content/projects.json' {
  import type { Project } from '@/types';
  const value: Record<string, Partial<Project>>;
  export default value;
}
