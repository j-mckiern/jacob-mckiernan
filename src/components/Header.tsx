import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { Link, useLocation } from 'react-router'
import { sections, type Section } from '../data/sections'
import { site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useMotion } from '../hooks/useMotion'
import { useTheme } from '../hooks/useTheme'
import { ModeToggle, MotionToggle, PalettePicker, PaletteSwatches } from './ThemeControls'
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

type SectionLinkProps = ComponentProps<'a'> & Pick<Section, 'id'> & { onHome: boolean }

/** On the homepage a plain #hash, so the browser scrolls and moves focus itself.
    On any other page, a router link back to the homepage's section. */
function SectionLink({ id, onHome, children, ...props }: SectionLinkProps) {
  return onHome ? (
    <a href={`#${id}`} {...props}>
      {children}
    </a>
  ) : (
    <Link to={`/#${id}`} {...props}>
      {children}
    </Link>
  )
}

function Header() {
  // The one place theme state lives; every control below reads from it.
  const { palette, setPalette, mode, toggleMode } = useTheme()
  const { paused, toggleMotion } = useMotion()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const spied = useActiveSection(observedIds, pathname)
  // The scroll-spy only applies to the homepage. /projects always lights Projects.
  const active = onHome ? spied : 'projects'
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
        <SectionLink
          id="top"
          onHome={onHome}
          className="logo"
          aria-label={onHome ? `${site.name}, back to top` : `${site.name}, home`}
        >
          {site.handle} <span className="logo-star" aria-hidden="true">✦</span>
        </SectionLink>

        <nav className="nav-desktop" aria-label="Primary">
          {sections.map((section) => (
            <SectionLink
              key={section.id}
              id={section.id}
              onHome={onHome}
              className="nav-link pop"
              aria-current={active === section.id ? 'location' : undefined}
            >
              <span aria-hidden="true">{section.num}</span> {section.label}
            </SectionLink>
          ))}
        </nav>

        <div className="header-controls">
          <div className="desktop-only">
            <PalettePicker palette={palette} onPick={setPalette} />
          </div>
          <ModeToggle mode={mode} onToggle={toggleMode} />
          <MotionToggle paused={paused} onToggle={toggleMotion} />
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
              <SectionLink
                key={section.id}
                id={section.id}
                onHome={onHome}
                className="mobile-nav-link"
                aria-current={active === section.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {section.label}
                <span className="mobile-nav-num" aria-hidden="true">
                  {section.num}
                </span>
              </SectionLink>
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
