import type { CSSProperties } from 'react'
import { hero } from '../data/hero'
import { site } from '../data/site'
import Mascot from './Mascot'
import Shards from './Shards'
import './Hero.css'

type Font = 'marker' | 'type' | 'graffiti' | 'display' | 'label' | 'hand'
/** Tile colors. Each one maps to a pair of tokens in Hero.css. */
type Tone = 'ink' | 'white' | 'paper' | 'pop-1' | 'pop-2' | 'black'
type Tile = { font: Font; tone: Tone; rot: number; size?: number }

// The first name gets big hand-picked tiles, one recipe per letter.
const firstTiles: Tile[] = [
  { font: 'marker', tone: 'ink', rot: -6, size: 1.04 },
  { font: 'type', tone: 'white', rot: 4, size: 0.96 },
  { font: 'graffiti', tone: 'pop-1', rot: -3, size: 1.08 },
  { font: 'display', tone: 'paper', rot: 6, size: 0.88 },
  { font: 'marker', tone: 'pop-2', rot: -4, size: 0.96 },
]

// The last name cycles through shorter lists. Their lengths (4, 6, 6) don't
// line up, so neighboring letters never repeat the same font + color combo.
const lastFonts: Font[] = ['type', 'label', 'hand', 'display']
const lastTones: Tone[] = ['ink', 'white', 'pop-1', 'pop-2', 'black', 'pop-1']
const lastRots = [-5, 4, -2, 6, -4, 3]

const lastTile = (i: number): Tile => ({
  font: lastFonts[i % lastFonts.length],
  tone: lastTones[i % lastTones.length],
  rot: lastRots[i % lastRots.length],
})

function LetterTiles({ word, tileFor }: { word: string; tileFor: (i: number) => Tile }) {
  return word.split('').map((ch, i) => {
    const tile = tileFor(i)
    // Custom properties carry the per-letter values into Hero.css.
    const style = {
      '--tile-font': `var(--font-${tile.font})`,
      '--tile-rot': `${tile.rot}deg`,
      '--tile-size': tile.size ?? 1,
    } as CSSProperties
    return (
      <span key={i} className={`tile tone-${tile.tone}`} style={style}>
        {ch}
      </span>
    )
  })
}

function ExternalLink({ href, label, className }: { href: string; label: string; className: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {label} <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

/** Staggers the blocks' entrance, in reading order. */
const revealOrder = (i: number) => ({ '--reveal-i': i }) as CSSProperties

function Hero() {
  const [first, ...rest] = site.name.split(' ')
  const last = rest.join(' ')

  return (
    <section id="top" className="hero has-shards" aria-labelledby="hero-title">
      <Shards section="hero" />

      <div className="hero-block hero-name reveal" data-tilt style={revealOrder(0)}>
        <div className="hero-name-inner">
          <p className="hero-kicker">
            {site.title} — {site.location}
          </p>

          <h1 id="hero-title" className="hero-title">
            {/* Read once as a name, not letter by letter. */}
            <span className="sr-only">{site.name}</span>
            <span className="name-row name-first" aria-hidden="true">
              <LetterTiles word={first.toUpperCase()} tileFor={(i) => firstTiles[i % firstTiles.length]} />
            </span>
            <span className="name-row name-last" aria-hidden="true">
              <LetterTiles word={last} tileFor={lastTile} />
            </span>
          </h1>

          <p className="hero-one-liner">{hero.oneLiner}</p>
        </div>
      </div>

      <div className="hero-block hero-stage reveal" data-tilt style={revealOrder(1)}>
        <Mascot />
      </div>

      <dl className="hero-block hero-status reveal" data-tilt style={revealOrder(2)}>
        <div className="status-item">
          <dt className="status-label status-label-a">Currently</dt>
          <dd className="status-value">{hero.currently}</dd>
        </div>
        <div className="status-item">
          <dt className="status-label status-label-b">
            Open to <span aria-hidden="true">✦</span>
          </dt>
          <dd className="status-value">{hero.openTo}</dd>
        </div>
      </dl>

      <div className="hero-block hero-find reveal" data-tilt style={revealOrder(3)}>
        <h2 className="find-title">Find me</h2>
        <ul className="find-links">
          <li>
            <ExternalLink className="find-link find-link-1 pop" href={site.github} label="GitHub" />
          </li>
          <li>
            <ExternalLink className="find-link find-link-2 pop" href={site.linkedin} label="LinkedIn" />
          </li>
          <li>
            <a className="find-link find-link-3 pop" href={`mailto:${site.email}`}>
              Email <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Hero
