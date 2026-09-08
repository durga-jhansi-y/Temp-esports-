import { apiFetch } from './apiClient';
import { isMockEsportsDataEnabled } from './dataMode';

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

const mockLeagueNames: Record<number, string> = {
  1: 'Capital Esports League',
  2: 'Campus Championship Series',
};

let mockTournaments: Tournament[] = [
  {
    id: 1,
    name: 'Capital Clash Invitational',
    description: 'Regional invitational currently in playoff rounds.',
    game: 'Valorant',
    location: 'Washington, DC',
    startDate: '2026-09-05',
    endDate: '2026-09-12',
    status: 'ACTIVE',
    leagueId: 1,
    leagueName: mockLeagueNames[1],
  },
  {
    id: 2,
    name: 'Campus Series Fall Open',
    description: 'Open college competition with a seeded group stage.',
    game: 'Rocket League',
    location: 'Baltimore, MD',
    startDate: '2026-09-12',
    endDate: '2026-09-20',
    status: 'UPCOMING',
    leagueId: 2,
    leagueName: mockLeagueNames[2],
  },
  {
    id: 3,
    name: 'Mid-Atlantic Community Cup',
    description: 'Community tournament with public match results.',
    game: 'CS2',
    location: 'Richmond, VA',
    startDate: '2026-08-20',
    endDate: '2026-08-24',
    status: 'COMPLETED',
    leagueId: 1,
    leagueName: mockLeagueNames[1],
  },
];

function clone<T>(value: T): T {
  return structuredClone(value);
}

export async function getTournaments(): Promise<Tournament[]> {
  if (isMockEsportsDataEnabled()) {
    return clone(mockTournaments);
  }
  return apiFetch<Tournament[]>('/api/tournaments');
}

export async function getTournament(id: number): Promise<Tournament> {
  if (isMockEsportsDataEnabled()) {
    const tournament = mockTournaments.find((item) => item.id === id);
    if (!tournament) {
      throw new Error(`Mock tournament ${id} was not found.`);
    }
    return clone(tournament);
  }
  return apiFetch<Tournament>(`/api/tournaments/${id}`);
}

export async function createTournament(request: CreateTournamentRequest): Promise<Tournament> {
  if (isMockEsportsDataEnabled()) {
    const tournament: Tournament = {
      id: Math.max(0, ...mockTournaments.map((item) => item.id)) + 1,
      ...request,
      description: request.description ?? null,
      location: request.location ?? null,
      status: 'UPCOMING',
      leagueName: mockLeagueNames[request.leagueId] ?? `Mock League ${request.leagueId}`,
    };
    mockTournaments = [...mockTournaments, tournament];
    return clone(tournament);
  }

  return apiFetch<Tournament>('/api/tournaments', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export async function updateTournament(
  id: number,
  request: UpdateTournamentRequest,
): Promise<Tournament> {
  if (isMockEsportsDataEnabled()) {
    const index = mockTournaments.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new Error(`Mock tournament ${id} was not found.`);
    }

    const leagueId = request.leagueId ?? mockTournaments[index].leagueId;
    const updated: Tournament = {
      ...mockTournaments[index],
      ...request,
      leagueId,
      leagueName: mockLeagueNames[leagueId] ?? `Mock League ${leagueId}`,
    };
    mockTournaments = mockTournaments.map((item) => (item.id === id ? updated : item));
    return clone(updated);
  }

  return apiFetch<Tournament>(`/api/tournaments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
}

export async function deleteTournament(id: number): Promise<void> {
  if (isMockEsportsDataEnabled()) {
    mockTournaments = mockTournaments.filter((item) => item.id !== id);
    return;
  }
  await apiFetch<void>(`/api/tournaments/${id}`, { method: 'DELETE' });
}