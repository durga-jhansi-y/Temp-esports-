import { apiFetch } from './apiClient';

export type RosterRole = 'CAPTAIN' | 'STARTER' | 'BENCH';

export interface Player {
  id: number;
  gamerTag: string;
  displayName: string;
  game: string;
  teamName?: string | null;
  country?: string | null;
  rosterRole: RosterRole;
  eligibilityVerified: boolean;
  active: boolean;
}

export interface CreatePlayerRequest {
  gamerTag: string;
  displayName: string;
  game: string;
  teamName?: string;
  country?: string;
  active?: boolean;
}

export interface UpdatePlayerRequest {
  gamerTag?: string;
  displayName?: string;
  game?: string;
  teamName?: string;
  country?: string;
  rosterRole?: RosterRole;
  eligibilityVerified?: boolean;
  active?: boolean;
}

export interface PlayerShowcase {
  rating: number;
  wins: number;
  losses: number;
  matches: number;
  winRate: number;
  mvps: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  achievements: string[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getPlayers(): Promise<Player[]> {
  const response = await apiFetch<ApiResponse<Player[]>>('/api/players');
  return response.data;
}

export async function getPlayer(id: number): Promise<Player> {
  const response = await apiFetch<ApiResponse<Player>>(`/api/players/${id}`);
  return response.data;
}

export async function createPlayer(
  request: CreatePlayerRequest,
): Promise<Player> {
  const response = await apiFetch<ApiResponse<Player>>('/api/players', {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return response.data;
}

export async function updatePlayer(
  id: number,
  request: UpdatePlayerRequest,
): Promise<Player> {
  const response = await apiFetch<ApiResponse<Player>>(`/api/players/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });

  return response.data;
}

/**
 * The current Player entity does not store individual match statistics yet.
 * This deterministic showcase layer gives the public profile/gamification UI
 * stable demo metrics while the real identity, team, game, role, and eligibility
 * fields continue to come from the backend.
 */
export function getPlayerShowcase(player: Player): PlayerShowcase {
  const seed = Math.max(1, player.id);
  const wins = 18 + ((seed * 7) % 29);
  const losses = 7 + ((seed * 5) % 14);
  const matches = wins + losses;
  const winRate = Math.round((wins / matches) * 100);
  const rating = 1500 + ((seed * 137) % 401);
  const mvps = 2 + ((seed * 3) % 11);
  const level = 18 + ((seed * 5) % 17);
  const currentLevelXp = 240 + ((seed * 379) % 760);
  const nextLevelXp = 1000;
  const xp = level * nextLevelXp + currentLevelXp;

  const achievements = [
    player.rosterRole === 'CAPTAIN' ? '🏆 Tournament Champion' : (winRate >= 65 ? '🔥 Five-Win Streak' : '⚡ Fastest Victory'),
    rating >= 1700 ? '🎯 Top 10 Ranked' : '⭐ Rising Star',
    matches >= 45 ? '💯 50 Match Club' : '🎮 Match Grinder',
  ];

  if (player.rosterRole === 'CAPTAIN') {
    achievements.unshift('👑 Team Captain');
  }
  if (mvps >= 8) {
    achievements.push('⭐ Tournament MVP');
  }

  return {
    rating,
    wins,
    losses,
    matches,
    winRate,
    mvps,
    level,
    xp,
    nextLevelXp,
    achievements: achievements.slice(0, 4),
  };
}