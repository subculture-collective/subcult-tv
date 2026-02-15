import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { AuthContext } from './authContextDef';
import * as api from '@/lib/api';
import type { APIUser } from '@/lib/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<APIUser | null>(null);
  const [loading, setLoading] = useState(() => !!api.getToken());

  // Check for existing token on mount
  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api
        .getMe()
        .then(setUser)
        .catch(() => {
          api.clearToken();
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await api.login(username, password);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
