
export function saveLocalStorage(name: string, value: unknown): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function getLocalStorage(name: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(name);
}

export function removeLocalStorage(name: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(name);
}

export function removeAllLocalStorage(): void {
  if (typeof window === "undefined") return;
  window.localStorage.clear();
}
