import { useEffect } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const TILT_DEGREES = 3
// Before a section arrives, shards sit lower than their rest position. Capping
// this keeps them from sliding down behind text while it scrolls up the screen.
const MAX_SCROLL_BEFORE = -200
const MAX_LEAN_DEGREES = 3

/**
  Feeds pointer and scroll position to CSS, which does the drawing:
    --pointer-x/y   -1 to 1, on <html>: hard shadows and shards drift against it.
    --shard-scroll  on each .shards: px scrolled past that section's top.
    --shard-lean    on <html>: degrees the shards skew, from how fast you're scrolling.
    --tilt-x/y      on the hovered [data-tilt] block: leans it toward the pointer.
  Touch screens only get the scroll part, and reduced motion gets none of it.
*/
export function useDepth() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    const goal = { x: 0, y: 0 }
    const now = { x: 0, y: 0 }
    let lastScroll = window.scrollY
    let lean = 0
    let raf = 0
    let tilted: HTMLElement | null = null

    // Runs only while something is still moving.
    const step = () => {
      now.x += (goal.x - now.x) * 0.08
      now.y += (goal.y - now.y) * 0.08
      root.style.setProperty('--pointer-x', now.x.toFixed(3))
      root.style.setProperty('--pointer-y', now.y.toFixed(3))
      const speed = window.scrollY - lastScroll
      lastScroll = window.scrollY
      const leanGoal = Math.max(-MAX_LEAN_DEGREES, Math.min(MAX_LEAN_DEGREES, speed * 0.06))
      lean += (leanGoal - lean) * 0.12
      root.style.setProperty('--shard-lean', lean.toFixed(3))
      document.querySelectorAll<HTMLElement>('.shards').forEach((el) => {
        const scrolled = Math.max(MAX_SCROLL_BEFORE, -el.getBoundingClientRect().top)
        el.style.setProperty('--shard-scroll', scrolled.toFixed(0))
      })
      const settled = Math.abs(goal.x - now.x) + Math.abs(goal.y - now.y) + Math.abs(lean) < 0.002
      raf = settled ? 0 : requestAnimationFrame(step)
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step)
    }

    const clearTilt = () => {
      tilted?.style.removeProperty('--tilt-x')
      tilted?.style.removeProperty('--tilt-y')
      tilted = null
    }

    const onMove = (event: PointerEvent) => {
      goal.x = (event.clientX / innerWidth) * 2 - 1
      goal.y = (event.clientY / innerHeight) * 2 - 1
      kick()

      const block = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-tilt]') : null
      if (block !== tilted) clearTilt()
      if (!block) return
      tilted = block
      const r = block.getBoundingClientRect()
      const x = (event.clientX - r.left) / r.width - 0.5
      const y = (event.clientY - r.top) / r.height - 0.5
      block.style.setProperty('--tilt-x', (y * -TILT_DEGREES).toFixed(2))
      block.style.setProperty('--tilt-y', (x * TILT_DEGREES).toFixed(2))
    }

    const fine = window.matchMedia(FINE_POINTER).matches
    if (fine) window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick, { passive: true })
    kick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      clearTilt()
    }
  }, [])
}
