import { useEffect, useState } from 'react'
import { loader } from '../data/loader'
import './Loader.css'

const COUNT_MS = 1300
// Hold at 99% for slow fonts, but never longer than this past the count.
const FONT_WAIT_MS = 1500
const SHUTTER_MS = 480
const SEGMENTS = 24

/** The boot screen. Purely decorative, so any click or key skips it. */
function Loader({ onDone }: { onDone: () => void }) {
  const [percent, setPercent] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const start = performance.now()
    let frame = 0
    let timer = 0
    let fontsReady = false
    document.fonts.ready.then(() => {
      fontsReady = true
    })

    const leave = () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointerdown', leave)
      window.removeEventListener('keydown', leave)
      setPercent(100)
      setLeaving(true)
      timer = window.setTimeout(onDone, SHUTTER_MS)
    }

    const tick = (now: number) => {
      const elapsed = now - start
      if (elapsed >= COUNT_MS && (fontsReady || elapsed >= COUNT_MS + FONT_WAIT_MS)) {
        leave()
        return
      }
      setPercent(Math.min(99, Math.round((elapsed / COUNT_MS) * 100)))
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    window.addEventListener('pointerdown', leave)
    window.addEventListener('keydown', leave)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      window.removeEventListener('pointerdown', leave)
      window.removeEventListener('keydown', leave)
    }
  }, [onDone])

  return (
    <div className={`loader${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="loader-shutter loader-shutter-top" />
      <div className="loader-shutter loader-shutter-bottom" />
      <div className="loader-card">
        <p className="loader-title">{loader.title}</p>
        <div className="loader-row">
          <p className="loader-count">
            {percent}
            <span>%</span>
          </p>
          <ul className="loader-lines">
            {loader.lines.map((line, i) => (
              <li key={line}>
                ▸ {line} <b>{percent > ((i + 1) * 100) / (loader.lines.length + 1) ? 'OK' : '...'}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className="loader-bar">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <i key={i} className={(i / SEGMENTS) * 100 < percent ? 'is-on' : ''} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader
