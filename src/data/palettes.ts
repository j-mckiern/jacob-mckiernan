// Ids must match the [data-palette='…'] blocks in src/styles/tokens.css.
export const palettes = [
  { id: 'sour-patch', label: 'Sour Patch' },
  { id: 'overdrive', label: 'Overdrive' },
  { id: 'pop-art', label: 'Pop Art' },
  { id: 'lily-pad', label: 'Lily Pad' },
  { id: 'slate', label: 'Slate' },
] as const

export type PaletteId = (typeof palettes)[number]['id']

export const DEFAULT_PALETTE: PaletteId = 'sour-patch'

export function isPaletteId(value: unknown): value is PaletteId {
  return palettes.some((p) => p.id === value)
}
