export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
  timestamp?: string;
}

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || response.data === undefined) {
    throw new Error(response.message || 'The API returned an unsuccessful response.');
  }

  return response.data;
}