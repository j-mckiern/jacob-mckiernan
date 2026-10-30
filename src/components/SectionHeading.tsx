import type { Section } from '../data/sections'
import './SectionHeading.css'

type Props = {
  section: Section
  /** Which highlight color the label block uses (--hl-1..3). */
  tone: 1 | 2 | 3
  /** 1 when this heading titles a whole page instead of a section. */
  level?: 1 | 2
}

/** The "01 ABOUT" stamp at the top of each section. Its id is what the
    section's aria-labelledby points at. */
function SectionHeading({ section, tone, level = 2 }: Props) {
  const Title = level === 1 ? 'h1' : 'h2'

  return (
    <div className="section-heading reveal">
      <span className="section-num" aria-hidden="true">
        {section.num}
      </span>
      <Title id={`${section.id}-title`} className="section-title">
        <span className={`section-label hl-${tone}`}>{section.label}</span>
      </Title>
    </div>
  )
}

export default SectionHeading
