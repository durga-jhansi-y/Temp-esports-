export type EsportsDataMode = 'api' | 'mock';

const STORAGE_KEY = 'esports-data-mode';

function getDefaultMode(): EsportsDataMode {
  return import.meta.env.VITE_USE_MOCK_ESPORTS_DATA === 'true' ? 'mock' : 'api';
}

export function getEsportsDataMode(): EsportsDataMode {
  if (typeof window === 'undefined') {
    return getDefaultMode();
  }

  const storedMode = window.localStorage.getItem(STORAGE_KEY);
  return storedMode === 'api' || storedMode === 'mock'
    ? storedMode
    : getDefaultMode();
}

export function setEsportsDataMode(mode: EsportsDataMode): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }
}

export function isMockEsportsDataEnabled(): boolean {
  return getEsportsDataMode() === 'mock';
}