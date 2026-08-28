import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from './authTypes';

import {
  AUTH_SESSION_CLEARED_EVENT,
  clearSession,
  getStoredSession,
  getTokenExpirationTime,
  login as loginRequest,
  register as registerRequest,
} from '../services/authService';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;

  isAuthenticated: boolean;
  isAdmin: boolean;

  login: (
    credentials: LoginCredentials,
  ) => Promise<AuthSession>;

  register: (
    credentials: RegisterCredentials,
  ) => Promise<AuthSession>;

  logout: () => void;
}

const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] =
    useState<AuthSession | null>(
      () => getStoredSession(),
    );

  /*
   * Listen for session-cleared events.
   *
   * apiClient.ts may clear the stored JWT when the backend
   * responds with HTTP 401.
   *
   * This keeps React authentication state synchronized with
   * localStorage.
   */
  useEffect(() => {
    const handleSessionCleared = () => {
      setSession(null);
    };

    window.addEventListener(
      AUTH_SESSION_CLEARED_EVENT,
      handleSessionCleared,
    );

    return () => {
      window.removeEventListener(
        AUTH_SESSION_CLEARED_EVENT,
        handleSessionCleared,
      );
    };
  }, []);

  /*
   * Automatically clear the user's session when
   * the JWT reaches its expiration time.
   */
  useEffect(() => {
    if (!session?.token) {
      return;
    }

    const expirationTime =
      getTokenExpirationTime(
        session.token,
      );

    /*
     * Demo tokens do not contain JWT expiration data,
     * so there is nothing to schedule.
     */
    if (expirationTime === null) {
      return;
    }

    const millisecondsUntilExpiration =
      expirationTime - Date.now();

    /*
     * Token already expired.
     */
    if (
      millisecondsUntilExpiration <= 0
    ) {
      clearSession();
      setSession(null);

      return;
    }

    /*
     * Schedule automatic logout for the JWT expiration time.
     */
    const timeoutId =
      window.setTimeout(() => {
        clearSession();
        setSession(null);
      }, millisecondsUntilExpiration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [session?.token]);

  /**
   * Login using either:
   *
   * - Demo authentication, or
   * - Spring Boot POST /api/auth/login
   *
   * authService decides which mode is active.
   */
  const login = async (
    credentials: LoginCredentials,
  ) => {
    const nextSession =
      await loginRequest(credentials);

    setSession(nextSession);

    return nextSession;
  };

  /**
   * Register using Spring Boot:
   *
   * POST /api/auth/register
   */
  const register = async (
    credentials: RegisterCredentials,
  ) => {
    const nextSession =
      await registerRequest(credentials);

    setSession(nextSession);

    return nextSession;
  };

  /**
   * Explicit logout.
   */
  const logout = () => {
    clearSession();
    setSession(null);
  };

  const value =
    useMemo<AuthContextValue>(
      () => ({
        user:
          session?.user ?? null,

        token:
          session?.token ?? null,

        isAuthenticated:
          Boolean(session?.token),

        isAdmin:
          session?.user.role ===
          'ADMIN',

        login,
        register,
        logout,
      }),
      [session],
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider.',
    );
  }

  return context;
}