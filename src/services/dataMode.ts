export type EsportsDataMode = 'backend' | 'backend-sample';

const STORAGE_KEY = 'esports-data-mode';
const DEFAULT_MODE: EsportsDataMode = 'backend-sample';

export function getEsportsDataMode(): EsportsDataMode {
  if (typeof window === 'undefined') {
    return DEFAULT_MODE;
  }

  const storedMode = window.localStorage.getItem(STORAGE_KEY);
  if (storedMode === 'api') return 'backend';
  if (storedMode === 'mock') return 'backend-sample';

  return storedMode === 'backend' || storedMode === 'backend-sample'
    ? storedMode
    : DEFAULT_MODE;
}

export function setEsportsDataMode(mode: EsportsDataMode): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, mode);
    window.dispatchEvent(new CustomEvent('esports-data-mode-changed', { detail: mode }));
  }
}

export function shouldIncludeBackendSampleData(): boolean {
  return getEsportsDataMode() === 'backend-sample';
}

export function withEsportsDataMode(path: string): string {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}includeDemo=${shouldIncludeBackendSampleData()}`;
}