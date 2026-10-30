import type { Section } from '../data/sections'
import './SectionHeading.css'

type Props = {
  section: Section
  /** Which highlight color the label block uses (--hl-1..3). */
  tone: 1 | 2 | 3
}

/** The "01 ABOUT" stamp at the top of each section. Its id is what the
    section's aria-labelledby points at. */
function SectionHeading({ section, tone }: Props) {
  return (
    <div className="section-heading">
      <span className="section-num" aria-hidden="true">
        {section.num}
      </span>
      <h2 id={`${section.id}-title`} className="section-title">
        <span className={`section-label hl-${tone}`}>{section.label}</span>
      </h2>
    </div>
  )
}

export default SectionHeading
