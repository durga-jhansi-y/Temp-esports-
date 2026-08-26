import type { AuthSession, LoginCredentials, UserRole } from '../auth/authTypes';

const SESSION_KEY = 'esports-league-hub-session';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const DEMO_AUTH_ENABLED = import.meta.env.VITE_DEMO_AUTH === 'true';

const demoUsers = [
  {
    email: 'organizer@example.com',
    password: 'demo123',
    role: 'ORGANIZER' as UserRole,
    displayName: 'Demo Organizer',
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN' as UserRole,
    displayName: 'Demo Admin',
  },
];

function normalizeRole(value: unknown): UserRole {
  const raw = Array.isArray(value) ? value.join(' ') : String(value ?? '').toUpperCase();

  if (raw.includes('ADMIN')) return 'ADMIN';
  if (raw.includes('ORGANIZER') || raw.includes('MANAGER')) return 'ORGANIZER';
  return 'PLAYER';
}

function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const payload = token.split('.')[1];
    if (!payload) return {};

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    );

    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function buildSessionFromApiPayload(payload: any, requestedEmail: string): AuthSession {
  const data = payload?.data ?? payload ?? {};
  const token = data.token ?? data.accessToken ?? data.jwt ?? payload?.token;

  if (!token || typeof token !== 'string') {
    throw new Error('Login succeeded, but the backend response did not contain a JWT token.');
  }

  const claims = decodeJwtPayload(token);
  const role = normalizeRole(
    data.role ??
      data.user?.role ??
      data.roles ??
      claims.role ??
      claims.roles ??
      claims.authorities ??
      claims.scope,
  );

  return {
    token,
    user: {
      email: data.email ?? data.user?.email ?? String(claims.sub ?? requestedEmail),
      displayName: data.displayName ?? data.user?.displayName ?? data.user?.name,
      role,
    },
  };
}

async function loginWithDemo(credentials: LoginCredentials): Promise<AuthSession> {
  const match = demoUsers.find(
    (user) => user.email === credentials.email && user.password === credentials.password,
  );

  if (!match) {
    throw new Error('Invalid demo credentials.');
  }

  return {
    token: `demo-${match.role.toLowerCase()}-token`,
    user: {
      email: match.email,
      displayName: match.displayName,
      role: match.role,
    },
  };
}

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  if (DEMO_AUTH_ENABLED) {
    const session = await loginWithDemo(credentials);
    saveSession(session);
    return session;
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  let payload: any = null;
  try {
    payload = await response.json();
  } catch {
    // Leave payload null so the error below stays readable.
  }

  if (!response.ok) {
    throw new Error(payload?.message ?? payload?.error ?? 'Unable to sign in.');
  }

  const session = buildSessionFromApiPayload(payload, credentials.email);
  saveSession(session);
  return session;
}

export function saveSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getStoredSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getStoredToken(): string | null {
  return getStoredSession()?.token ?? null;
}
