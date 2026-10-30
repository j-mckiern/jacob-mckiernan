import type { CSSProperties } from 'react'
import type { Project } from '../data/projects'
import './ProjectCard.css'

type Props = {
  project: Project
  /** Position in the list: sets the color and the entrance delay. */
  index: number
}

// With reduced motion, a video stays on its still poster.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ProjectCard({ project, index }: Props) {
  // Rotates through hl-1, hl-2, hl-3 so neighbors never match.
  const tone = (index % 3) + 1

  return (
    <article
      className={`project-card project-tone-${tone} reveal`}
      data-tilt
      style={{ '--reveal-i': index } as CSSProperties}
    >
      <div className="project-media">
        {project.video && project.image ? (
          <video
            className="project-image"
            src={project.video}
            poster={project.image.src}
            aria-label={project.image.alt}
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ objectPosition: project.image.focus }}
          />
        ) : project.image ? (
          <img
            className="project-image"
            src={project.image.src}
            srcSet={project.image.srcSet}
            // How wide the slot is, so the browser can pick a file before layout runs.
            sizes="(max-width: 899px) calc(100vw - 72px), 540px"
            alt={project.image.alt}
            loading="lazy"
            style={{ objectPosition: project.image.focus }}
          />
        ) : (
          <span className="project-placeholder" aria-hidden="true">
            [SCREENSHOT]
          </span>
        )}
        <p className="project-status">{project.status}</p>
      </div>

      <div className="project-body">
        <h3 className="project-name">{project.name}</h3>
        <ul className="project-points">
          {project.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="project-foot">
          <ul className="project-stack" aria-label="Built with">
            {project.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <div className="project-links">
            {project.liveUrl && (
              <a className="project-link project-link-live pop" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live<span className="sr-only"> site for {project.name}, opens in a new tab</span>{' '}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.codeUrl && (
              <a className="project-link project-link-code pop" href={project.codeUrl} target="_blank" rel="noreferrer">
                Code<span className="sr-only"> for {project.name}, opens in a new tab</span>{' '}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
