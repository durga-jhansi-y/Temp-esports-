import { apiFetch } from './apiClient';
import type { ApiResponse } from './apiResponse';
import { unwrapApiResponse } from './apiResponse';
import { isMockEsportsDataEnabled } from './dataMode';

export interface Team {
  id: number;
  name: string;
  game: string;
  region?: string | null;
  coach?: string | null;
  active: boolean;
}

export interface CreateTeamRequest {
  name: string;
  game: string;
  region?: string;
  coach?: string;
  active?: boolean;
}

export interface UpdateTeamRequest {
  name?: string;
  game?: string;
  region?: string;
  coach?: string;
  active?: boolean;
}

let mockTeams: Team[] = [
  { id: 1, name: 'Nova', game: 'Valorant', region: 'North America', coach: 'A. Rivera', active: true },
  { id: 2, name: 'Vanta GG', game: 'Valorant', region: 'North America', coach: 'M. Chen', active: true },
  { id: 3, name: 'Team Apex', game: 'CS2', region: 'Mid-Atlantic', coach: 'J. Patel', active: true },
  { id: 4, name: 'Riptide', game: 'Rocket League', region: 'East Coast', coach: 'K. Brooks', active: true },
  { id: 5, name: 'Eclipse', game: 'Valorant', region: 'East Coast', coach: null, active: true },
  { id: 6, name: 'Orion', game: 'Overwatch 2', region: 'North America', coach: 'S. Kim', active: false },
];

function clone<T>(value: T): T {
  return structuredClone(value);
}

export async function getTeams(): Promise<Team[]> {
  if (isMockEsportsDataEnabled()) {
    return clone(mockTeams);
  }

  const response = await apiFetch<ApiResponse<Team[]>>('/api/teams');
  return unwrapApiResponse(response);
}

export async function getTeam(id: number): Promise<Team> {
  if (isMockEsportsDataEnabled()) {
    const team = mockTeams.find((item) => item.id === id);
    if (!team) {
      throw new Error(`Mock team ${id} was not found.`);
    }
    return clone(team);
  }

  const response = await apiFetch<ApiResponse<Team>>(`/api/teams/${id}`);
  return unwrapApiResponse(response);
}

export async function createTeam(request: CreateTeamRequest): Promise<Team> {
  if (isMockEsportsDataEnabled()) {
    const team: Team = {
      id: Math.max(0, ...mockTeams.map((item) => item.id)) + 1,
      name: request.name,
      game: request.game,
      region: request.region ?? null,
      coach: request.coach ?? null,
      active: request.active ?? true,
    };
    mockTeams = [...mockTeams, team];
    return clone(team);
  }

  const response = await apiFetch<ApiResponse<Team>>('/api/teams', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return unwrapApiResponse(response);
}

export async function updateTeam(id: number, request: UpdateTeamRequest): Promise<Team> {
  if (isMockEsportsDataEnabled()) {
    const index = mockTeams.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new Error(`Mock team ${id} was not found.`);
    }

    const updated = { ...mockTeams[index], ...request };
    mockTeams = mockTeams.map((team) => (team.id === id ? updated : team));
    return clone(updated);
  }

  const response = await apiFetch<ApiResponse<Team>>(`/api/teams/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
  return unwrapApiResponse(response);
}

export async function deleteTeam(id: number): Promise<void> {
  if (isMockEsportsDataEnabled()) {
    mockTeams = mockTeams.filter((team) => team.id !== id);
    return;
  }

  await apiFetch<ApiResponse<void>>(`/api/teams/${id}`, { method: 'DELETE' });
}
