import { useEffect } from 'react'

/* The sticky header covers this much of the top of the screen. */
const HEADER_COVER = 80

/**
  Marks each `.reveal` element with `.is-in` the first time it reaches the
  screen, which starts its entrance animation (effects.css). Waits for `ready`
  so the hero doesn't play its entrance behind the loader. `route` re-runs the
  search after a page change, since the new page brings new elements.

  `[data-glitch]` elements also get `.is-glitching` on every arrival. It comes
  off once they're fully out of sight, which re-arms the animation for next time.
  Behind the header counts as out of sight, so the glitch is never hidden by it.
*/
export function useReveal(ready: boolean, route: string) {
  useEffect(() => {
    if (!ready) return
    const entrance = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          entrance.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
    const glitch = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.15) entry.target.classList.add('is-glitching')
          else if (!entry.isIntersecting) entry.target.classList.remove('is-glitching')
        }
      },
      { threshold: [0, 0.15], rootMargin: `-${HEADER_COVER}px 0px 0px` },
    )
    document.querySelectorAll('.reveal').forEach((el) => entrance.observe(el))
    document.querySelectorAll('[data-glitch]').forEach((el) => glitch.observe(el))
    return () => {
      entrance.disconnect()
      glitch.disconnect()
    }
  }, [ready, route])
}
