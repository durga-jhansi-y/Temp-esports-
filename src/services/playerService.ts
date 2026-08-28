import { apiFetch } from './apiClient';

export interface Player {
  id: number;
  gamerTag: string;
  displayName: string;
  game: string;
  teamName?: string | null;
  country?: string | null;
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
  active?: boolean;
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