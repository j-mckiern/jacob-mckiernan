import { contact } from '../data/contact'
import { sections } from '../data/sections'
import { site } from '../data/site'
import ExternalLink from './ExternalLink'
import SectionHeading from './SectionHeading'
import Shards from './Shards'
import './Contact.css'

const section = sections.find((s) => s.id === 'contact')!

function Contact() {
  const { say, hi, bang } = contact.shout

  return (
    <section id={section.id} className="contact has-shards" aria-labelledby={`${section.id}-title`}>
      <SectionHeading section={section} tone={2} />

      {/* The shards live in here so they can measure from the poster's edges. */}
      <div className="contact-stage">
        <Shards section="contact" />

        {/* No data-tilt: tilting redraws the spinning rays in 3D on every pointer move,
            which cost about 20fps. The tiles drifting at their own depths replace it. */}
        <div className="contact-poster reveal">
          {/* The torn sheet, with its outline and shadow, behind everything else. */}
          <div className="contact-sheet" aria-hidden="true">
            <div className="contact-sheet-fill" />
          </div>

          {/* Manga focus lines. Their own layer, so spinning them never repaints the sheet. */}
          <div className="contact-rays" aria-hidden="true">
            <div className="contact-rays-spin" />
          </div>

          <div className="contact-body">
            {/* data-glitch: useReveal adds .is-glitching while it's on screen, which runs the idle motion. */}
            <p className="contact-shout" data-glitch>
              {/* Read once as a phrase, not tile by tile. */}
              <span className="sr-only">{`${say} ${hi}${bang}`}</span>
              <span className="contact-tile contact-tile-say" aria-hidden="true">
                {say}
              </span>
              <span className="contact-tile contact-tile-hi" aria-hidden="true">
                {hi}
              </span>
              <span className="contact-bang" aria-hidden="true">
                {bang}
              </span>
            </p>

            <ul className="contact-links">
              <li className="contact-links-email">
                <a className="contact-email pop" href={`mailto:${site.email}`}>
                  <span className="contact-email-address">{site.email}</span>
                  <span className="contact-email-arrow" aria-hidden="true">
                    <span>→</span>
                  </span>
                </a>
              </li>
              <li>
                <ExternalLink className="contact-link pop" href={site.github} label="GitHub" />
              </li>
              <li>
                <ExternalLink className="contact-link pop" href={site.linkedin} label="LinkedIn" />
              </li>
              {site.resumeUrl && (
                <li>
                  <ExternalLink className="contact-link pop" href={site.resumeUrl} label="Résumé" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
