import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in the middle of the screen, or null.
 * Include the hero's id in `ids` so scrolling back to the top clears the highlight.
 * `route` re-finds the elements after a page change, since the old ones are gone.
 */
export function useActiveSection(ids: readonly string[], route: string) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // rootMargin shrinks the "viewport" to a thin band across the middle of the
    // screen, so whichever section crosses that band counts as the current one.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, route])

  return active
}
