import { apiFetch } from './apiClient';
import type { ApiResponse } from './apiResponse';
import { unwrapApiResponse } from './apiResponse';
import { withEsportsDataMode } from './dataMode';

export type MatchStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Match {
  id: number;
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
  game: string;
  tournamentId?: number | null;
  tournamentName?: string | null;
  scheduledAt: string;
  venue?: string | null;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
}

export interface CreateMatchRequest {
  homeTeamId: number;
  awayTeamId: number;
  tournamentId?: number;
  scheduledAt: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
}

export interface UpdateMatchRequest {
  homeTeamId?: number;
  awayTeamId?: number;
  tournamentId?: number;
  scheduledAt?: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
  status?: MatchStatus;
}

export async function getMatches(): Promise<Match[]> {
  const response = await apiFetch<ApiResponse<Match[]>>(
    withEsportsDataMode('/api/matches'),
  );
  return unwrapApiResponse(response);
}

export async function getMatch(id: number): Promise<Match> {
  const response = await apiFetch<ApiResponse<Match>>(
    withEsportsDataMode(`/api/matches/${id}`),
  );
  return unwrapApiResponse(response);
}

export async function getMatchesByTeamId(teamId: number): Promise<Match[]> {
  const response = await apiFetch<ApiResponse<Match[]>>(
    withEsportsDataMode(`/api/matches/team/${teamId}`),
  );
  return unwrapApiResponse(response);
}

export async function createMatch(request: CreateMatchRequest): Promise<Match> {
  const response = await apiFetch<ApiResponse<Match>>('/api/matches', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return unwrapApiResponse(response);
}

export async function updateMatch(id: number, request: UpdateMatchRequest): Promise<Match> {
  const response = await apiFetch<ApiResponse<Match>>(`/api/matches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
  return unwrapApiResponse(response);
}

export async function deleteMatch(id: number): Promise<void> {
  await apiFetch<ApiResponse<void>>(`/api/matches/${id}`, { method: 'DELETE' });
}