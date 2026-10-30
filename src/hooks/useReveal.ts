import { useEffect } from 'react'

/**
  Marks each `.reveal` element with `.is-in` the first time it reaches the
  screen, which starts its entrance animation (effects.css). Waits for `ready`
  so the hero doesn't play its entrance behind the loader. `route` re-runs the
  search after a page change, since the new page brings new elements.
*/
export function useReveal(ready: boolean, route: string) {
  useEffect(() => {
    if (!ready) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ready, route])
}
