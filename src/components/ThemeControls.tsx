import { useEffect, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../data/palettes'
import type { Mode } from '../hooks/useTheme'
import './ThemeControls.css'

// These are display-only: the parent owns the theme state (one useTheme call)
// and passes it down, so every copy of the controls stays in sync.

type PaletteSwatchesProps = {
  palette: PaletteId
  onPick: (id: PaletteId) => void
}

export function PaletteSwatches({ palette, onPick }: PaletteSwatchesProps) {
  const current = palettes.find((p) => p.id === palette)

  return (
    <div className="swatches" role="group" aria-label="Color palette">
      {palettes.map((p) => (
        <button
          key={p.id}
          type="button"
          className="swatch"
          // Scopes this palette's --a/--b to the button, so it previews its own colors.
          data-palette={p.id}
          aria-pressed={p.id === palette}
          aria-label={`Use the ${p.label} palette`}
          title={p.label}
          onClick={() => onPick(p.id)}
        />
      ))}
      <span className="swatches-name" aria-hidden="true">
        {current?.label}
      </span>
    </div>
  )
}

/** One swatch button (the current palette) that opens a popover with all five. */
export function PalettePicker({ palette, onPick }: PaletteSwatchesProps) {
  const [open, setOpen] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const current = palettes.find((p) => p.id === palette)

  // While open: a click anywhere outside, or Escape, closes it.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="palette-picker" ref={wrapper}>
      <button
        ref={button}
        type="button"
        className="swatch"
        data-palette={palette}
        aria-label={`Color palette: ${current?.label}`}
        aria-expanded={open}
        aria-controls="palette-popover"
        onClick={() => setOpen((isOpen) => !isOpen)}
      />
      {open && (
        <div id="palette-popover" className="palette-popover">
          <PaletteSwatches palette={palette} onPick={onPick} />
        </div>
      )}
    </div>
  )
}

type ModeToggleProps = {
  mode: Mode
  onToggle: () => void
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  const isDark = mode === 'dark'

  return (
    <button
      type="button"
      className="mode-toggle"
      aria-label={`Switch to ${isDark ? 'bright' : 'dark'} mode`}
      title={isDark ? 'Dark mode' : 'Bright mode'}
      onClick={onToggle}
    >
      <span aria-hidden="true">{isDark ? '☾' : '☀'}</span>
    </button>
  )
}
