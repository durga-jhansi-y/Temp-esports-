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

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}