import type { GameState } from "./types";

const KEY = "ripple:save:v1";

export function saveGame(g: GameState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(g));
  } catch {}
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function hasSave(): boolean {
  try {
    return !!localStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export function deleteSave() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
