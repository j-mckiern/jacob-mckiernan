import { useSyncExternalStore } from 'react'

// Same key the inline script in index.html reads before first paint.
const MOTION_KEY = 'motion'

const root = document.documentElement
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function isPaused() {
  return root.dataset.motion === 'paused'
}

function toggleMotion() {
  const next = !isPaused()
  if (next) root.dataset.motion = 'paused'
  else delete root.dataset.motion
  try {
    localStorage.setItem(MOTION_KEY, next ? 'paused' : 'playing')
  } catch {
    // Still pauses for this visit; it just won't be remembered.
  }
  listeners.forEach((listener) => listener())
}

/** Shared by the header's button and the project video, so <html> is the one source of truth. */
export function useMotion() {
  const paused = useSyncExternalStore(subscribe, isPaused)
  return { paused, toggleMotion }
}
