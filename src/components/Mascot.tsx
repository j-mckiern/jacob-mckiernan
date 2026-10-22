import { useEffect, useRef, useState } from 'react'
import { hero } from '../data/hero'
import './Mascot.css'

// Eye geometry in the SVG's 200×200 viewBox.
const EYE_L = 91
const EYE_R = 109
const EYE_Y = 76
// The furthest the eyes can slide from center, sideways and up/down.
const REACH_X = 10
const REACH_Y = 8

const HURT_MS = 2000

const SHAKE: Keyframe[] = [
  { transform: 'translate(0, 0) rotate(0)' },
  { transform: 'translate(-14px, 4px) rotate(-7deg)', offset: 0.12 },
  { transform: 'translate(12px, -6px) rotate(6deg)', offset: 0.25 },
  { transform: 'translate(-10px, 6px) rotate(-5deg)', offset: 0.38 },
  { transform: 'translate(8px, -3px) rotate(4deg)', offset: 0.52 },
  { transform: 'translate(-5px, 2px) rotate(-2deg)', offset: 0.66 },
  { transform: 'translate(3px, -1px) rotate(1deg)', offset: 0.8 },
  { transform: 'translate(0, 0) rotate(0)' },
]

/** One ✕ centered on (cx, EYE_Y). */
const cross = (cx: number) =>
  `M${cx - 6} ${EYE_Y - 6} L${cx + 6} ${EYE_Y + 6} M${cx + 6} ${EYE_Y - 6} L${cx - 6} ${EYE_Y + 6}`

function Mascot() {
  const [hurt, setHurt] = useState(false)
  const shakerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const eyesRef = useRef<SVGGElement>(null)
  const hurtTimer = useRef<number | undefined>(undefined)

  // Eyes follow the pointer anywhere on the page. This runs on every pointer
  // move, so it writes the transform straight to the DOM instead of through
  // React state, and only once per frame.
  useEffect(() => {
    let frame = 0
    let last: PointerEvent | null = null

    const update = () => {
      frame = 0
      const svg = svgRef.current
      const eyes = eyesRef.current
      if (!svg || !eyes || !last) return

      const box = svg.getBoundingClientRect()
      // Aim from the head (36% down the disc), not the disc's center.
      const dx = last.clientX - (box.left + box.width * 0.5)
      const dy = last.clientY - (box.top + box.height * 0.36)
      const dist = Math.hypot(dx, dy) || 1
      // Full reach once the pointer is ~1.2 mascot-widths away; less up close.
      const pull = Math.min(1, dist / (box.width * 1.2))
      const x = (dx / dist) * REACH_X * pull
      const y = (dy / dist) * REACH_Y * pull
      // CSS px inside an SVG are viewBox units, so this matches the geometry above.
      eyes.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
    }

    const onPointer = (event: PointerEvent) => {
      last = event
      if (!frame) frame = requestAnimationFrame(update)
    }

    // pointerdown too, so on touch screens a tap anywhere gets a look.
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerdown', onPointer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => () => window.clearTimeout(hurtTimer.current), [])

  const poke = () => {
    setHurt(true)
    // Each poke restarts the 2s countdown.
    window.clearTimeout(hurtTimer.current)
    hurtTimer.current = window.setTimeout(() => setHurt(false), HURT_MS)

    // .animate() restarts cleanly on every poke without remounting the
    // button, which would drop keyboard focus.
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!calm) {
      shakerRef.current?.animate(SHAKE, { duration: 550, easing: 'cubic-bezier(.36, .07, .19, .97)' })
    }
  }

  return (
    <div className="mascot">
      <div className="mascot-figure">
        <div ref={shakerRef}>
          <button type="button" className="mascot-poke" onClick={poke} aria-label={hero.mascot.label}>
            <svg ref={svgRef} className="mascot-svg" viewBox="0 0 200 200" aria-hidden="true">
              <circle className="m-disc" cx="100" cy="100" r="100" />
              <path className="m-body" d="M30 204 C34 150 62 124 100 124 C138 124 166 150 170 204 Z" />
              <path className="m-shine" d="M58 170 C70 150 86 142 100 141" opacity=".55" />
              <circle className="m-head" cx="100" cy="78" r="34" />
              <path className="m-shine m-shine-head" d="M81 60 C87 52 96 49 104 50" />
              <g ref={eyesRef} className="m-eyes">
                {hurt ? (
                  <path className="m-eye m-eye-x" d={`${cross(EYE_L)} ${cross(EYE_R)}`} />
                ) : (
                  <>
                    <line className="m-eye" x1={EYE_L} y1={EYE_Y - 7} x2={EYE_L} y2={EYE_Y + 7} />
                    <line className="m-eye" x1={EYE_R} y1={EYE_Y - 7} x2={EYE_R} y2={EYE_Y + 7} />
                  </>
                )}
              </g>
            </svg>
          </button>
        </div>
        {hurt && (
          <span className="mascot-pop" aria-hidden="true">
            !!
          </span>
        )}
      </div>

      <p className="mascot-caption" aria-hidden="true">
        {hurt ? (
          hero.mascot.hurt
        ) : (
          <>
            <span className="caption-mouse">{hero.mascot.idle}</span>
            <span className="caption-touch">{hero.mascot.idleTouch}</span>
          </>
        )}
      </p>
    </div>
  )
}

export default Mascot
