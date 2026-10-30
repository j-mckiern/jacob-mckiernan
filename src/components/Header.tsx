import { useEffect, useRef, useState } from 'react'
import { sections } from '../data/sections'
import { site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { ModeToggle, PalettePicker, PaletteSwatches } from './ThemeControls'
import './Header.css'

// Module-level so the array keeps the same identity between renders
// (useActiveSection re-subscribes whenever this array changes).
const observedIds = ['top', ...sections.map((s) => s.id)]

function ResumeLink({ className }: { className: string }) {
  if (!site.resumeUrl) return null
  return (
    <a className={className} href={site.resumeUrl} target="_blank" rel="noreferrer">
      Résumé <span aria-hidden="true">↗</span>
      <span className="sr-only"> (PDF, opens in a new tab)</span>
    </a>
  )
}

function Header() {
  // The one place theme state lives; every control below reads from it.
  const { palette, setPalette, mode, toggleMode } = useTheme()
  const active = useActiveSection(observedIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  // Escape closes the menu and puts focus back on the button that opened it.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-bar">
        <a className="logo" href="#top" aria-label={`${site.name}, back to top`}>
          {site.handle} <span className="logo-star" aria-hidden="true">✦</span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="nav-link pop"
              aria-current={active === section.id ? 'location' : undefined}
            >
              <span aria-hidden="true">{section.num}</span> {section.label}
            </a>
          ))}
        </nav>

        <div className="header-controls">
          <div className="desktop-only">
            <PalettePicker palette={palette} onPick={setPalette} />
          </div>
          <ModeToggle mode={mode} onToggle={toggleMode} />
          <ResumeLink className="resume-link desktop-only pop" />
          <button
            ref={menuButton}
            type="button"
            className="menu-button mobile-only"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu mobile-only">
          <nav className="mobile-nav" aria-label="Primary">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="mobile-nav-link"
                aria-current={active === section.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {section.label}
                <span className="mobile-nav-num" aria-hidden="true">
                  {section.num}
                </span>
              </a>
            ))}
          </nav>
          <PaletteSwatches palette={palette} onPick={setPalette} />
          <ResumeLink className="resume-link resume-link--block" />
        </div>
      )}
    </header>
  )
}

export default Header
