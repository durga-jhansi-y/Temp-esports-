import type {
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
  UserRole,
} from '../auth/authTypes';

const SESSION_KEY = 'esports-league-hub-session';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

const DEMO_AUTH_ENABLED =
  import.meta.env.VITE_DEMO_AUTH === 'true';

export const AUTH_SESSION_CLEARED_EVENT =
  'esports-auth-session-cleared';

/*
 * Demo authentication
 *
 * Keep your existing demo-user configuration here if you still
 * want to use VITE_DEMO_AUTH=true.
 *
 * For the Spring Boot + H2 connectivity test, demo auth should
 * be disabled, so none of the demo credentials are used.
 */
const demoUsers = [
  {
    email: import.meta.env.VITE_DEMO_ORGANIZER_EMAIL ?? '',
    password:
      import.meta.env.VITE_DEMO_ORGANIZER_PASSWORD ?? '',
    role: 'ORGANIZER' as UserRole,
    displayName: 'Demo Organizer',
  },
  {
    email: import.meta.env.VITE_DEMO_ADMIN_EMAIL ?? '',
    password:
      import.meta.env.VITE_DEMO_ADMIN_PASSWORD ?? '',
    role: 'ADMIN' as UserRole,
    displayName: 'Demo Admin',
  },
];

/**
 * Converts backend roles into the roles used by the React frontend.
 *
 * Current Spring Boot roles:
 * - USER
 * - ADMIN
 *
 * Current React roles:
 * - PLAYER
 * - ORGANIZER
 * - ADMIN
 *
 * Backend USER therefore becomes frontend PLAYER.
 */
function normalizeRole(value: unknown): UserRole {
  const raw = Array.isArray(value)
    ? value.join(' ')
    : String(value ?? '').toUpperCase();

  if (raw.includes('ADMIN')) {
    return 'ADMIN';
  }

  if (
    raw.includes('ORGANIZER') ||
    raw.includes('MANAGER')
  ) {
    return 'ORGANIZER';
  }

  return 'PLAYER';
}

/**
 * Reads the payload section of a JWT.
 *
 * This is used only for client-side session information such as
 * role and expiration time.
 *
 * Spring Boot remains responsible for validating the JWT.
 */
function decodeJwtPayload(
  token: string,
): Record<string, unknown> {
  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return {};
    }

    const normalized = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const padded = normalized.padEnd(
      Math.ceil(normalized.length / 4) * 4,
      '=',
    );

    const decoded = decodeURIComponent(
      atob(padded)
        .split('')
        .map(
          (char) =>
            `%${char
              .charCodeAt(0)
              .toString(16)
              .padStart(2, '0')}`,
        )
        .join(''),
    );

    return JSON.parse(decoded) as Record<
      string,
      unknown
    >;
  } catch {
    return {};
  }
}

/**
 * Handles API responses that may either return:
 *
 * {
 *   token: ...
 * }
 *
 * or:
 *
 * {
 *   data: {
 *     token: ...
 *   }
 * }
 */
function getPayloadData(
  payload: unknown,
): Record<string, any> {
  if (!payload || typeof payload !== 'object') {
    return {};
  }

  const record = payload as Record<string, any>;

  if (
    record.data &&
    typeof record.data === 'object'
  ) {
    return record.data;
  }

  return record;
}

/**
 * Converts a successful Spring Boot authentication response
 * into the AuthSession used by React.
 */
function buildSessionFromApiPayload(
  payload: unknown,
  requestedEmail: string,
): AuthSession {
  const data = getPayloadData(payload);

  const token =
    data.token ??
    data.accessToken ??
    data.jwt;

  if (!token || typeof token !== 'string') {
    throw new Error(
      'Authentication succeeded, but the backend response did not contain a JWT token.',
    );
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
      email:
        data.email ??
        data.user?.email ??
        String(claims.sub ?? requestedEmail),

      displayName:
        data.displayName ??
        data.username ??
        data.user?.displayName ??
        data.user?.username ??
        data.user?.name,

      role,
    },
  };
}

/**
 * Safely attempts to read JSON from a response.
 */
async function readJson(
  response: Response,
): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Extracts a readable backend error message.
 */
function getErrorMessage(
  payload: unknown,
  fallback: string,
): string {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const record = payload as Record<string, any>;

  return (
    record.message ??
    record.error ??
    fallback
  );
}

/**
 * Shared authentication request for login and registration.
 */
async function requestAuth(
  path:
    | '/api/auth/login'
    | '/api/auth/register',
  body:
    | LoginCredentials
    | RegisterCredentials,
  requestedEmail: string,
): Promise<AuthSession> {
  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(body),
    },
  );

  const payload = await readJson(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(
        payload,
        'Authentication request failed.',
      ),
    );
  }

  const session =
    buildSessionFromApiPayload(
      payload,
      requestedEmail,
    );

  saveSession(session);

  return session;
}

/**
 * Existing demo authentication behavior.
 *
 * This is only used when:
 *
 * VITE_DEMO_AUTH=true
 */
async function loginWithDemo(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const match = demoUsers.find(
    (user) =>
      user.email === credentials.email &&
      user.password === credentials.password,
  );

  if (!match) {
    throw new Error(
      'Invalid demo credentials.',
    );
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

/**
 * Login
 *
 * Demo mode:
 *   Uses existing demo authentication.
 *
 * Backend mode:
 *   POST http://localhost:8080/api/auth/login
 */
export async function login(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  if (DEMO_AUTH_ENABLED) {
    const session =
      await loginWithDemo(credentials);

    saveSession(session);

    return session;
  }

  return requestAuth(
    '/api/auth/login',
    credentials,
    credentials.email,
  );
}

/**
 * Registration
 *
 * Registration is connected directly to Spring Boot.
 *
 * POST /api/auth/register
 */
export async function register(
  credentials: RegisterCredentials,
): Promise<AuthSession> {
  if (DEMO_AUTH_ENABLED) {
    throw new Error(
      'Registration uses the Spring Boot backend. Set VITE_DEMO_AUTH=false to register.',
    );
  }

  return requestAuth(
    '/api/auth/register',
    credentials,
    credentials.email,
  );
}

/**
 * Store authenticated session.
 */
export function saveSession(
  session: AuthSession,
): void {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session),
  );
}

/**
 * Returns JWT expiration time in milliseconds.
 *
 * Demo tokens intentionally do not expire.
 */
export function getTokenExpirationTime(
  token: string,
): number | null {
  if (token.startsWith('demo-')) {
    return null;
  }

  const expiration =
    decodeJwtPayload(token).exp;

  return typeof expiration === 'number'
    ? expiration * 1000
    : null;
}

/**
 * Determines whether a stored session should still be used.
 */
function isStoredSessionValid(
  session: AuthSession,
): boolean {
  if (
    !session?.token ||
    !session.user?.email ||
    !session.user?.role
  ) {
    return false;
  }

  /*
   * Do not restore old demo sessions after switching
   * from demo auth to the real Spring Boot backend.
   */
  if (session.token.startsWith('demo-')) {
    return DEMO_AUTH_ENABLED;
  }

  const expirationTime =
    getTokenExpirationTime(session.token);

  return (
    expirationTime !== null &&
    expirationTime > Date.now()
  );
}

/**
 * Restore a session from localStorage.
 *
 * Expired or malformed sessions are automatically removed.
 */
export function getStoredSession():
  | AuthSession
  | null {
  const raw =
    localStorage.getItem(SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    const session =
      JSON.parse(raw) as AuthSession;

    if (!isStoredSessionValid(session)) {
      localStorage.removeItem(
        SESSION_KEY,
      );

      return null;
    }

    return session;
  } catch {
    localStorage.removeItem(
      SESSION_KEY,
    );

    return null;
  }
}

/**
 * Removes the authentication session.
 *
 * The custom event allows AuthContext to immediately react
 * when another service, such as apiClient.ts, clears the JWT
 * after receiving a 401 response.
 */
export function clearSession(): void {
  localStorage.removeItem(
    SESSION_KEY,
  );

  window.dispatchEvent(
    new Event(
      AUTH_SESSION_CLEARED_EVENT,
    ),
  );
}

/**
 * Returns the currently stored JWT token.
 */
export function getStoredToken():
  | string
  | null {
  return (
    getStoredSession()?.token ??
    null
  );
}