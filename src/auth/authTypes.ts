export type UserRole = 'PLAYER' | 'ORGANIZER' | 'ADMIN';

export interface AuthUser {
  email: string;
  role: UserRole;
  displayName?: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
