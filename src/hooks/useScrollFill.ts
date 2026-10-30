import { useEffect, type RefObject } from 'react'

// The fill's tip follows a line this far down the screen, so you can watch it.
const REACH = 0.85
// When the whole list fits after a nav jump, the fill catches up to full over
// this many pixels of scrolling, so the bar always lands complete.
const FINISH_STRETCH = 90

/**
 * Fills a timeline as it scrolls past a line near the bottom of the screen.
 * Writes `--fill` (0–1) on `root`, and adds `is-lit` to each child of `list` the
 * fill has reached. Writes straight to the DOM because scroll events fire far too
 * often to re-render React on each one.
 */
export function useScrollFill(
  root: RefObject<HTMLElement | null>,
  list: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const rootEl = root.current
    const listEl = list.current
    if (!rootEl || !listEl) return

    // Nothing moves for these visitors: the timeline just starts fully lit.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rootEl.style.setProperty('--fill', '1')
      Array.from(listEl.children).forEach((item) => item.classList.add('is-lit'))
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const screen = window.innerHeight
      const reach = screen * REACH
      const rect = listEl.getBoundingClientRect()
      const section = listEl.closest('section')!.getBoundingClientRect()
      const navOffset = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-offset'),
      )
      // Where the list's top sits once a nav jump has landed on the section.
      const landedTop = rect.top - section.top + navOffset
      const landedFill = (reach - landedTop) / rect.height
      const fitsOnLanding = landedTop + rect.height <= screen

      let fill = (reach - rect.top) / rect.height
      if (fitsOnLanding && landedFill < 1) {
        const pastStretch = 1 - (rect.top - landedTop) / FINISH_STRETCH
        fill += (1 - landedFill) * Math.min(1, Math.max(0, pastStretch))
      }
      fill = Math.min(1, Math.max(0, fill))
      rootEl.style.setProperty('--fill', String(fill))
      // Read fresh each time: React can replace a row, and a saved list would
      // keep lighting the old element. A row lights when the fill reaches it.
      Array.from(listEl.children).forEach((item) => {
        const position = (item.getBoundingClientRect().top - rect.top) / rect.height
        item.classList.toggle('is-lit', fill > 0 && fill >= position)
      })
    }
    // At most one measurement per painted frame, however many events fire.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [root, list])
}
