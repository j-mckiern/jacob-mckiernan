/*
  The jagged color shards behind a section, listed back to front. `points` is a
  clip-path polygon in percent of the shard's box, which runs edge to edge across
  the screen (a rail's box is just the margin). This file only holds geometry;
  colors come from the theme tokens through `tone`.

  Rule: shards never sit behind plain text. About's stay in the heading band
  (where every label is an opaque box) or in the screen's outer edges.
*/

export type ShardSection = 'hero' | 'about'

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
}
