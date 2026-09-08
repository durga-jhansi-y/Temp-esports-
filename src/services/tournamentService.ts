import { apiFetch } from './apiClient';
import { withEsportsDataMode } from './dataMode';

export type TournamentStatus = 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface Tournament {
  id: number;
  name: string;
  description?: string | null;
  game: string;
  location?: string | null;
  startDate: string;
  endDate: string;
  status: TournamentStatus;
  leagueId: number;
  leagueName: string;
}

export interface CreateTournamentRequest {
  name: string;
  description?: string;
  game: string;
  location?: string;
  startDate: string;
  endDate: string;
  leagueId: number;
}

export interface UpdateTournamentRequest {
  name?: string;
  description?: string;
  game?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  status?: TournamentStatus;
  leagueId?: number;
}

export async function getTournaments(): Promise<Tournament[]> {
  return apiFetch<Tournament[]>(withEsportsDataMode('/api/tournaments'));
}

export async function getTournament(id: number): Promise<Tournament> {
  return apiFetch<Tournament>(withEsportsDataMode(`/api/tournaments/${id}`));
}

export async function createTournament(request: CreateTournamentRequest): Promise<Tournament> {
  return apiFetch<Tournament>('/api/tournaments', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export async function updateTournament(
  id: number,
  request: UpdateTournamentRequest,
): Promise<Tournament> {
  return apiFetch<Tournament>(`/api/tournaments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
}

export async function deleteTournament(id: number): Promise<void> {
  await apiFetch<void>(`/api/tournaments/${id}`, { method: 'DELETE' });
}