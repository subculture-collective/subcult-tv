import { createContext } from 'react';
import type { EffectLevel } from '@/types';

export interface EffectsContextValue {
  effectLevel: EffectLevel;
  setEffectLevel: (level: EffectLevel) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

export const EffectsContext = createContext<EffectsContextValue | null>(null);
