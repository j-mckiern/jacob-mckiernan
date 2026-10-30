/*
  The jagged color shards behind a section, listed back to front. `points` is a
  clip-path polygon in percent of the shard's box, which runs edge to edge across
  the screen (a rail's box is just the margin). This file only holds geometry;
  colors come from the theme tokens through `tone`.

  Rule: shards never sit behind plain text. About's stay in the heading band
  (where every label is an opaque box) or in the screen's outer edges.
*/

export type ShardSection = 'hero' | 'about' | 'projects' | 'toolkit'

export type Shard = {
  tone: 'hl-1' | 'hl-2' | 'hl-3' | 'ink'
  points: string
  /** Box edges, relative to the section. */
  top: string
  bottom?: string
  height?: string
  /** How far it drifts with the pointer. Bigger reads as closer. */
  depth: number
  /** How fast it drifts with scrolling. Bigger reads as closer. */
  rate: number
  /** Hugs one edge of the screen and fills the margin there. Only on screens
      with spare room at the sides (1100px and up). */
  rail?: 'left' | 'right'
  /** Adds the panels' black outline and hard shadow. */
  outlined?: boolean
}

// Stops above the nav offset, so a jump to About shows no sliver of the hero.
const heroBox = { top: '-90px', bottom: '126px' }
const aboutBand = { top: '-44px', height: '250px' }
const aboutSide = { top: '170px', bottom: '0' }
// Everything in Projects is an opaque box, so these can cross behind the cards.
// Stops above the nav offset, and the cap keeps them from stretching down a long
// /projects page.
const projectsBox = { top: '-44px', height: 'min(calc(100% - 82px), 1300px)' }
// Toolkit's shards sit in a wrapper around the slab, so these measure from its edges.
// Both ribbons share --ribbon-h (Toolkit.css) and slide the same distance behind it.
const RIBBON_TUCK = '36px'
const ribbonHigh = { top: `calc(${RIBBON_TUCK} - var(--ribbon-h))`, height: 'var(--ribbon-h)' }
const ribbonLow = { top: `calc(100% - ${RIBBON_TUCK})`, height: 'var(--ribbon-h)' }

/** One ribbon's slanted strips, all rising or all falling. A ribbon is one layer of
    each in two colors, which is what makes it look folded. `x` is its left edge in
    percent of the box. A zero-width line joins the strips into a single clip-path. */
function ribbon(x: number, strips: 'rising' | 'falling', count: number) {
  const shape =
    strips === 'rising'
      ? [[0, 100], [5.13, 100], [10.9, 0], [5.77, 0]]
      : [[5.77, 0], [10.9, 0], [16.03, 100], [10.9, 100]]
  const points: string[] = []
  for (let fold = 0; fold < count; fold++) {
    const left = x + fold * 10.9
    const strip = shape.map(([px, py]) => `${(left + px).toFixed(2)}% ${py}%`)
    points.push(...strip, strip[0], `${x + shape[0][0]}% ${shape[0][1]}%`)
  }
  return `polygon(${points.join(', ')})`
}

export const shards: Record<ShardSection, Shard[]> = {
  hero: [
    { ...heroBox, tone: 'ink', depth: 6, rate: 0.03, points: 'polygon(0 58%, 13% 44%, 27% 63%, 41% 49%, 63% 72%, 79% 52%, 100% 64%, 100% 95%, 81% 100%, 58% 94%, 33% 100%, 14% 95%, 0 100%)' },
    { ...heroBox, tone: 'hl-2', depth: 16, rate: 0.1, points: 'polygon(0 3%, 19% 0, 31% 8%, 46% 2%, 39% 25%, 49% 42%, 28% 39%, 21% 60%, 11% 46%, 0 56%)' },
    { ...heroBox, tone: 'hl-1', depth: 26, rate: 0.17, points: 'polygon(100% 12%, 82% 19%, 71% 11%, 62% 30%, 70% 49%, 57% 58%, 68% 74%, 80% 67%, 88% 88%, 100% 76%)' },
  ],
  about: [
    { ...aboutSide, tone: 'hl-1', depth: 8, rate: 0.03, rail: 'left', outlined: true, points: 'polygon(0 0, 62% 8%, 30% 20%, 78% 36%, 40% 54%, 88% 72%, 25% 90%, 0 100%)' },
    { ...aboutSide, tone: 'hl-2', depth: 8, rate: 0.03, rail: 'right', outlined: true, points: 'polygon(100% 0, 40% 7%, 70% 22%, 18% 38%, 58% 54%, 12% 73%, 62% 88%, 100% 100%)' },
    { ...aboutBand, tone: 'hl-3', depth: 16, rate: 0.06, outlined: true, points: 'polygon(100% 0, 58% 0, 49% 22%, 56% 35%, 44% 62%, 61% 54%, 70% 100%, 81% 72%, 90% 92%, 100% 66%)' },
  ],
  // Folded ribbons, with their colors swapped so the lower one isn't a plain copy.
  // Each runs in from off screen and ends behind the slab, so no end ever shows.
  // They drift less than other shards, so they never pull out from behind it.
  toolkit: [
    { ...ribbonHigh, tone: 'hl-2', depth: 8, rate: 0.03, outlined: true, points: ribbon(51.28, 'rising', 4) },
    { ...ribbonHigh, tone: 'hl-3', depth: 12, rate: 0.05, outlined: true, points: ribbon(51.28, 'falling', 4) },
    { ...ribbonLow, tone: 'hl-3', depth: 8, rate: 0.03, outlined: true, points: ribbon(-2, 'rising', 5) },
    { ...ribbonLow, tone: 'hl-2', depth: 12, rate: 0.05, outlined: true, points: ribbon(-2, 'falling', 4) },
  ],
  // Small fragments that stay in the side margins and the strip beside the heading.
  projects: [
    { ...projectsBox, tone: 'hl-1', depth: 16, rate: 0.08, outlined: true, points: 'polygon(76.8% 13%, 72% 14.5%, 68.2% 12.6%, 71% 7.2%, 73.9% 4.7%)' },
    { ...projectsBox, tone: 'hl-2', depth: 24, rate: 0.12, outlined: true, points: 'polygon(84.6% 14.9%, 82.6% 9.5%, 82% 4.1%, 84.5% 5.8%, 86.3% 8.7%)' },
    { ...projectsBox, tone: 'hl-3', depth: 16, rate: 0.08, outlined: true, points: 'polygon(88.6% 18.1%, 90.6% 11.6%, 93.2% 8.1%, 93.4% 14.2%, 92.6% 19.1%)' },
    { ...projectsBox, tone: 'hl-2', depth: 24, rate: 0.12, outlined: true, points: 'polygon(63.6% 19.1%, 61.4% 16.9%, 60% 13.9%, 62% 13.2%, 63.6% 13.8%)' },
    { ...projectsBox, tone: 'hl-1', depth: 16, rate: 0.08, outlined: true, points: 'polygon(3% 40.9%, 3.2% 33.2%, 4.7% 27.6%, 6.3% 32.9%, 6.7% 37.9%)' },
    { ...projectsBox, tone: 'hl-3', depth: 24, rate: 0.12, outlined: true, points: 'polygon(10.8% 54.3%, 7.9% 54.7%, 5.7% 53.1%, 7.5% 50.2%, 9.3% 49.1%)' },
    { ...projectsBox, tone: 'hl-2', depth: 16, rate: 0.08, outlined: true, points: 'polygon(5.6% 78.4%, 2.4% 72.6%, 1% 66.1%, 4.4% 67%, 6.9% 69.7%)' },
    { ...projectsBox, tone: 'hl-1', depth: 24, rate: 0.12, outlined: true, points: 'polygon(5% 88.2%, 7.5% 85.5%, 9.9% 85%, 8.9% 89.2%, 7.5% 91.8%)' },
    { ...projectsBox, tone: 'hl-1', depth: 24, rate: 0.12, outlined: true, points: 'polygon(99.1% 41.2%, 95.3% 39.3%, 92.8% 35.5%, 95.7% 33.3%, 98.2% 33.3%)' },
    { ...projectsBox, tone: 'hl-2', depth: 16, rate: 0.08, outlined: true, points: 'polygon(91% 61.7%, 90.7% 56%, 91.3% 51.4%, 92.9% 54.8%, 93.6% 58.3%)' },
    { ...projectsBox, tone: 'hl-3', depth: 24, rate: 0.12, outlined: true, points: 'polygon(92.8% 77%, 95.8% 70.8%, 99% 68.1%, 98.5% 74.9%, 97.1% 79.8%)' },
    { ...projectsBox, tone: 'hl-1', depth: 16, rate: 0.08, outlined: true, points: 'polygon(95.9% 93.2%, 93.2% 94.7%, 90.8% 94%, 92.3% 90.5%, 94% 88.6%)' },
  ],
}
