import { useEffect, type RefObject } from 'react'

const MIN_GAP_MS = 900
const MAX_GAP_MS = 1800

/**
  Every second or so, adds `className` to 2 or 3 random `selector` elements inside
  `root`, and takes it off when its animation ends. The CSS owns how that looks. Only
  runs while `root` is on screen, and not at all with reduced motion.
*/
export function useRandomGlitch(root: RefObject<HTMLElement | null>, selector: string, className: string) {
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer = 0
    let last: Element[] = []

    const glitch = () => {
      // Skips the last round's picks, so one never fires twice in a row, and the
      // hovered one, which is already busy.
      const pool = [...el.querySelectorAll<HTMLElement>(selector)].filter(
        (item) => !last.includes(item) && !item.matches(':hover'),
      )
      const count = Math.random() < 0.5 ? 2 : 3
      const picks: HTMLElement[] = []
      while (picks.length < count && pool.length > 0) {
        picks.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
      }
      picks.forEach((item) => {
        // A small random delay, so a round doesn't fire in perfect unison.
        item.style.animationDelay = `${Math.random() * 220}ms`
        item.classList.add(className)
        item.addEventListener('animationend', () => item.classList.remove(className), { once: true })
      })
      last = picks
      timer = window.setTimeout(glitch, MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS))
    }

    const observer = new IntersectionObserver(([entry]) => {
      window.clearTimeout(timer)
      if (entry.isIntersecting) glitch()
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [root, selector, className])
}
