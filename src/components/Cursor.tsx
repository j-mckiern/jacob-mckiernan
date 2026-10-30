import { useEffect, useRef } from 'react'
import './Cursor.css'

const TARGETS = 'a, button'
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/** What the tag beside the brackets says for a link or button. */
function labelFor(el: Element): string {
  if (el.classList.contains('mascot-poke')) return 'POKE ✕✕'
  const href = el.getAttribute('href') ?? ''
  if (href.startsWith('mailto:')) return 'EMAIL ↗'
  if (href.startsWith('#')) return 'JUMP ▸'
  if (href) return 'OPEN ↗'
  return 'CLICK ▸'
}

/**
  A diamond pointer, plus brackets that trail it and snap around links and
  buttons. Mouse only: touch screens never see it, and the system cursor stays
  until the first mouse move, so it can't leave anyone with no pointer at all.
*/
function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    const core = coreRef.current
    const frame = frameRef.current
    const tag = tagRef.current
    if (!root || !dot || !core || !frame || !tag) return
    if (!window.matchMedia(FINE_POINTER).matches) return

    const html = document.documentElement
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = calm ? 1 : 0.24
    const pointer = { x: -100, y: -100 }
    const box = { x: -100, y: -100, w: 30, h: 30 }
    let hovered: Element | null = null
    let raf = 0

    const setHovered = (next: Element | null) => {
      if (next === hovered) return
      hovered = next
      const label = next ? labelFor(next) : ''
      tag.textContent = label
      tag.classList.toggle('is-on', Boolean(label))
      root.classList.toggle('is-hover', Boolean(next))
    }

    // Runs only while the brackets still have somewhere to go.
    const step = () => {
      let goal = { x: pointer.x - 15, y: pointer.y - 15, w: 30, h: 30 }
      if (hovered) {
        const r = hovered.getBoundingClientRect()
        goal = { x: r.left - 7, y: r.top - 7, w: r.width + 14, h: r.height + 14 }
      }
      box.x += (goal.x - box.x) * ease
      box.y += (goal.y - box.y) * ease
      box.w += (goal.w - box.w) * ease
      box.h += (goal.h - box.h) * ease
      dot.style.transform = `translate(${pointer.x}px, ${pointer.y}px)`
      frame.style.transform = `translate(${box.x}px, ${box.y}px)`
      frame.style.width = `${box.w}px`
      frame.style.height = `${box.h}px`
      tag.style.transform = `translate(${Math.min(box.x, innerWidth - 110)}px, ${Math.max(box.y - 30, 4)}px)`

      const settled = Math.abs(goal.x - box.x) + Math.abs(goal.y - box.y) + Math.abs(goal.w - box.w) < 0.5
      raf = settled ? 0 : requestAnimationFrame(step)
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step)
    }

    const hide = () => {
      root.classList.remove('is-live')
      delete html.dataset.cursor
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        hide()
        return
      }
      pointer.x = event.clientX
      pointer.y = event.clientY
      root.classList.add('is-live')
      html.dataset.cursor = 'custom'
      setHovered(event.target instanceof Element ? event.target.closest(TARGETS) : null)
      kick()
    }

    // Scrolling moves the page under a still pointer.
    const onScroll = () => {
      if (!root.classList.contains('is-live')) return
      setHovered(document.elementFromPoint(pointer.x, pointer.y)?.closest(TARGETS) ?? null)
      kick()
    }

    const onDown = () => {
      if (calm) return
      core.animate(
        [{ transform: 'rotate(45deg) scale(1)' }, { transform: 'rotate(45deg) scale(2.8)', opacity: 0.4 }, { transform: 'rotate(45deg) scale(1)' }],
        { duration: 260, easing: 'steps(5)' },
      )
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    html.addEventListener('mouseleave', hide)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('scroll', onScroll)
      html.removeEventListener('mouseleave', hide)
      delete html.dataset.cursor
    }
  }, [])

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <div className="cursor-frame" ref={frameRef}>
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="cursor-tag" ref={tagRef} />
      <div className="cursor-dot" ref={dotRef}>
        <b ref={coreRef} />
      </div>
    </div>
  )
}

export default Cursor
