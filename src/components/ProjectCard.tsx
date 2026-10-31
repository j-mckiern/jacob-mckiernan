import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Project } from '../data/projects'
import { useMotion } from '../hooks/useMotion'
import './ProjectCard.css'

type Props = {
  project: Project
  /** Position in the list: sets the color and the entrance delay. */
  index: number
}

// With reduced motion, a video stays on its still poster.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Downloads only once it's near the screen, and only plays while it's there. */
function ProjectVideo({ src, image }: { src: string; image: NonNullable<Project['image']> }) {
  const video = useRef<HTMLVideoElement>(null)
  const { paused } = useMotion()
  const [near, setNear] = useState(false)

  useEffect(() => {
    if (!video.current || reduceMotion) return
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '200px' })
    observer.observe(video.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = video.current
    if (!element) return
    if (near && !paused) {
      // Set by hand, not as a prop, so it stays once loaded and the poster shows until then.
      if (!element.getAttribute('src')) element.src = src
      // Rejects if a pause lands first, or the browser blocks autoplay. The poster stays.
      element.play().catch(() => {})
    } else {
      element.pause()
    }
  }, [near, paused, src])

  return (
    <video
      ref={video}
      className="project-image"
      poster={image.src}
      aria-label={image.alt}
      muted
      loop
      playsInline
      style={{ objectPosition: image.focus }}
    />
  )
}

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
          <ProjectVideo src={project.video} image={project.image} />
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
