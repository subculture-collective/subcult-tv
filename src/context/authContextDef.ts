import { createContext } from 'react';
import type { APIUser } from '@/lib/api';

export interface AuthContextValue {
  user: APIUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
