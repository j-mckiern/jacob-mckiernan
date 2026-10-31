import { useRef } from 'react'
import { sections } from '../data/sections'
import { toolGroups } from '../data/toolkit'
import { useRandomGlitch } from '../hooks/useRandomGlitch'
import SectionHeading from './SectionHeading'
import Shards from './Shards'
import './Toolkit.css'

const section = sections.find((s) => s.id === 'toolkit')!

function Toolkit() {
  const slab = useRef<HTMLDListElement>(null)
  useRandomGlitch(slab, '.toolkit-chip', 'chip-glitch')

  return (
    <section id={section.id} className="toolkit has-shards" aria-labelledby={`${section.id}-title`}>
      <SectionHeading section={section} tone={1} />

      {/* The shards live in here so they can measure from the slab's edges. */}
      <div className="toolkit-stage">
        <Shards section="toolkit" />

        {/* A <dl> pairs each category with its tools for screen readers. */}
        <dl className="toolkit-slab reveal" data-tilt ref={slab}>
          {toolGroups.map((group) => (
            <div key={group.name} className={`toolkit-row toolkit-tone-${group.tone}`}>
              <dt className="toolkit-label">{group.name}</dt>
              <dd className="toolkit-tools">
                <ul className="toolkit-list">
                  {group.tools.map((tool) => (
                    <li key={tool} className="toolkit-chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Toolkit
