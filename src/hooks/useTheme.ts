import { useEffect, useState } from 'react'
import { DEFAULT_PALETTE, isPaletteId, type PaletteId } from '../data/palettes'

export type Mode = 'light' | 'dark'

// Same keys the inline script in index.html reads before first paint.
const PALETTE_KEY = 'theme-palette'
const MODE_KEY = 'theme-mode'

// localStorage can throw (private browsing, blocked storage), so never let it crash the page.
function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Theme still works for this visit; it just won't be remembered.
  }
}

export function useTheme() {
  const root = document.documentElement

  // Start from what the inline script already put on <html>, so React and the page agree.
  const [palette, setPaletteState] = useState<PaletteId>(() =>
    isPaletteId(root.dataset.palette) ? root.dataset.palette : DEFAULT_PALETTE,
  )
  const [mode, setMode] = useState<Mode>(() => (root.dataset.mode === 'light' ? 'light' : 'dark'))

  useEffect(() => {
    root.dataset.palette = palette
  }, [root, palette])

  useEffect(() => {
    root.dataset.mode = mode
  }, [root, mode])

  function setPalette(next: PaletteId) {
    setPaletteState(next)
    store(PALETTE_KEY, next)
  }

  function toggleMode() {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    store(MODE_KEY, next)
  }

  return { palette, setPalette, mode, toggleMode }
}
