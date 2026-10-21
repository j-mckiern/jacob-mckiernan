import { palettes } from '../data/palettes'
import { useTheme } from '../hooks/useTheme'
import './ThemeControls.css'

function ThemeControls() {
  const { palette, setPalette, mode, toggleMode } = useTheme()
  const current = palettes.find((p) => p.id === palette)
  const isDark = mode === 'dark'

  return (
    <div className="theme-controls">
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
            onClick={() => setPalette(p.id)}
          />
        ))}
        <span className="swatches-name" aria-hidden="true">
          {current?.label}
        </span>
      </div>

      <button type="button" className="mode-toggle" onClick={toggleMode}>
        <span aria-hidden="true">{isDark ? '☾' : '☀'}</span> {isDark ? 'Dark' : 'Bright'}
        <span className="sr-only"> mode, switch to {isDark ? 'bright' : 'dark'}</span>
      </button>
    </div>
  )
}

export default ThemeControls
