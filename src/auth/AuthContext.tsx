import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AuthSession, AuthUser, LoginCredentials } from './authTypes';
import {
  clearSession,
  getStoredSession,
  login as loginRequest,
} from '../services/authService';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthSession>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => getStoredSession());

  const login = async (credentials: LoginCredentials) => {
    const nextSession = await loginRequest(credentials);
    setSession(nextSession);
    return nextSession;
  };

  const logout = () => {
    clearSession();
    setSession(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      isAdmin: session?.user.role === 'ADMIN',
      login,
      logout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}
