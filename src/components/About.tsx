import { useRef } from 'react'
import { about } from '../data/about'
import { sections } from '../data/sections'
import { useScrollFill } from '../hooks/useScrollFill'
import SectionHeading from './SectionHeading'
import './About.css'

const section = sections.find((s) => s.id === 'about')!

// The data is newest first; the journey reads oldest to newest. Copied first
// because .reverse() would otherwise flip the shared array in place.
const journey = [...about.experience].reverse()
const newest = journey[journey.length - 1]

function About() {
  const root = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLOListElement>(null)
  useScrollFill(root, list)

  return (
    <section id={section.id} className="about" aria-labelledby={`${section.id}-title`}>
      <SectionHeading section={section} tone={2} />

      <div className="about-caption">
        <p className="about-lead">{about.lead}</p>
      </div>

      <div className="journey" ref={root}>
        <span className="journey-rail" aria-hidden="true" />
        <span className="journey-rail journey-rail-lit" aria-hidden="true" />

        <h3 className="sr-only">Experience and education</h3>
        <ol className="journey-list" ref={list}>
          {journey.map((job) => (
            <li
              key={`${job.role}-${job.org}`}
              className={`journey-stop${job === newest ? ' journey-stop-now' : ''}`}
            >
              <p className="journey-when">
                {job.start} — {job.end}
              </p>
              <span className="journey-node" aria-hidden="true" />
              <div className="journey-body">
                <p className="journey-org">{job.org}</p>
                <h4 className="journey-role">{job.role}</h4>
                <ul className="journey-points">
                  {job.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default About
