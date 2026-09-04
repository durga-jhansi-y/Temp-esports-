import { apiFetch } from './apiClient';

export type LeagueStatus = 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface League {
  id: number;
  name: string;
  description?: string | null;
  game: string;
  region: string;
  startDate: string;
  endDate: string;
  status: LeagueStatus;
  tournamentCount: number;
}

export interface CreateLeagueRequest {
  name: string;
  description?: string;
  game: string;
  region: string;
  startDate: string;
  endDate: string;
}

export interface UpdateLeagueRequest {
  name?: string;
  description?: string;
  game?: string;
  region?: string;
  startDate?: string;
  endDate?: string;
  status?: LeagueStatus;
}

export async function getLeagues(): Promise<League[]> {
  return apiFetch<League[]>('/api/leagues');
}

export async function getLeague(id: number): Promise<League> {
  return apiFetch<League>(`/api/leagues/${id}`);
}

export async function createLeague(
  request: CreateLeagueRequest,
): Promise<League> {
  return apiFetch<League>('/api/leagues', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export async function updateLeague(
  id: number,
  request: UpdateLeagueRequest,
): Promise<League> {
  return apiFetch<League>(`/api/leagues/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
}

export async function deleteLeague(id: number): Promise<void> {
  await apiFetch<void>(`/api/leagues/${id}`, {
    method: 'DELETE',
  });
}