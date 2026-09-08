import { apiFetch } from './apiClient';
import type { ApiResponse } from './apiResponse';
import { unwrapApiResponse } from './apiResponse';
import { withEsportsDataMode } from './dataMode';

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

export async function getTeams(): Promise<Team[]> {
  const response = await apiFetch<ApiResponse<Team[]>>(
    withEsportsDataMode('/api/teams'),
  );
  return unwrapApiResponse(response);
}

export async function getTeam(id: number): Promise<Team> {
  const response = await apiFetch<ApiResponse<Team>>(
    withEsportsDataMode(`/api/teams/${id}`),
  );
  return unwrapApiResponse(response);
}

export async function createTeam(request: CreateTeamRequest): Promise<Team> {
  const response = await apiFetch<ApiResponse<Team>>('/api/teams', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return unwrapApiResponse(response);
}

export async function updateTeam(id: number, request: UpdateTeamRequest): Promise<Team> {
  const response = await apiFetch<ApiResponse<Team>>(`/api/teams/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
  return unwrapApiResponse(response);
}

export async function deleteTeam(id: number): Promise<void> {
  await apiFetch<ApiResponse<void>>(`/api/teams/${id}`, { method: 'DELETE' });
}