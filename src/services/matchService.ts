import { apiFetch } from './apiClient';
import type { ApiResponse } from './apiResponse';
import { unwrapApiResponse } from './apiResponse';
import { isMockEsportsDataEnabled } from './dataMode';

export type MatchStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Match {
  id: number;
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
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

let mockMatches: Match[] = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamName: 'Nova',
    awayTeamId: 2,
    awayTeamName: 'Vanta GG',
    tournamentId: 1,
    tournamentName: 'Capital Clash Invitational',
    scheduledAt: '2026-09-08T19:30:00',
    venue: 'Main Stage',
    homeScore: 2,
    awayScore: 1,
    status: 'IN_PROGRESS',
  },
  {
    id: 2,
    homeTeamId: 3,
    homeTeamName: 'Team Apex',
    awayTeamId: 5,
    awayTeamName: 'Eclipse',
    tournamentId: 1,
    tournamentName: 'Capital Clash Invitational',
    scheduledAt: '2026-09-08T21:00:00',
    venue: 'Main Stage',
    homeScore: 0,
    awayScore: 0,
    status: 'SCHEDULED',
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamName: 'Riptide',
    awayTeamId: 6,
    awayTeamName: 'Orion',
    tournamentId: 2,
    tournamentName: 'Campus Series Fall Open',
    scheduledAt: '2026-09-13T18:00:00',
    venue: 'Campus Arena',
    homeScore: 0,
    awayScore: 0,
    status: 'SCHEDULED',
  },
  {
    id: 4,
    homeTeamId: 3,
    homeTeamName: 'Team Apex',
    awayTeamId: 1,
    awayTeamName: 'Nova',
    tournamentId: 1,
    tournamentName: 'Capital Clash Invitational',
    scheduledAt: '2026-09-07T19:00:00',
    venue: 'Main Stage',
    homeScore: 1,
    awayScore: 2,
    status: 'COMPLETED',
  },
];

function clone<T>(value: T): T {
  return structuredClone(value);
}

export async function getMatches(): Promise<Match[]> {
  if (isMockEsportsDataEnabled()) {
    return clone(mockMatches);
  }
  const response = await apiFetch<ApiResponse<Match[]>>('/api/matches');
  return unwrapApiResponse(response);
}

export async function getMatch(id: number): Promise<Match> {
  if (isMockEsportsDataEnabled()) {
    const match = mockMatches.find((item) => item.id === id);
    if (!match) {
      throw new Error(`Mock match ${id} was not found.`);
    }
    return clone(match);
  }
  const response = await apiFetch<ApiResponse<Match>>(`/api/matches/${id}`);
  return unwrapApiResponse(response);
}

export async function getMatchesByTeamId(teamId: number): Promise<Match[]> {
  if (isMockEsportsDataEnabled()) {
    return clone(
      mockMatches.filter(
        (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
      ),
    );
  }
  const response = await apiFetch<ApiResponse<Match[]>>(`/api/matches/team/${teamId}`);
  return unwrapApiResponse(response);
}

export async function createMatch(request: CreateMatchRequest): Promise<Match> {
  if (isMockEsportsDataEnabled()) {
    const match: Match = {
      id: Math.max(0, ...mockMatches.map((item) => item.id)) + 1,
      homeTeamId: request.homeTeamId,
      homeTeamName: `Team ${request.homeTeamId}`,
      awayTeamId: request.awayTeamId,
      awayTeamName: `Team ${request.awayTeamId}`,
      tournamentId: request.tournamentId ?? null,
      tournamentName: request.tournamentId ? `Tournament ${request.tournamentId}` : null,
      scheduledAt: request.scheduledAt,
      venue: request.venue ?? null,
      homeScore: request.homeScore ?? 0,
      awayScore: request.awayScore ?? 0,
      status: 'SCHEDULED',
    };
    mockMatches = [...mockMatches, match];
    return clone(match);
  }

  const response = await apiFetch<ApiResponse<Match>>('/api/matches', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return unwrapApiResponse(response);
}

export async function updateMatch(id: number, request: UpdateMatchRequest): Promise<Match> {
  if (isMockEsportsDataEnabled()) {
    const index = mockMatches.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new Error(`Mock match ${id} was not found.`);
    }
    const updated = { ...mockMatches[index], ...request };
    mockMatches = mockMatches.map((item) => (item.id === id ? updated : item));
    return clone(updated);
  }

  const response = await apiFetch<ApiResponse<Match>>(`/api/matches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
  return unwrapApiResponse(response);
}

export async function deleteMatch(id: number): Promise<void> {
  if (isMockEsportsDataEnabled()) {
    mockMatches = mockMatches.filter((item) => item.id !== id);
    return;
  }
  await apiFetch<ApiResponse<void>>(`/api/matches/${id}`, { method: 'DELETE' });
}