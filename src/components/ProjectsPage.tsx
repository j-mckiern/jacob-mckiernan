import { useEffect } from 'react'
import { Link, Navigate } from 'react-router'
import { hasMoreProjects, projects } from '../data/projects'
import { sections } from '../data/sections'
import { site } from '../data/site'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'
import Shards from './Shards'
import './Projects.css'

const section = sections.find((s) => s.id === 'projects')!

function ProjectsPage() {
  // A route change keeps the old scroll position unless told otherwise. 'instant'
  // skips the page's smooth scrolling, so it doesn't visibly roll up the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const title = document.title
    document.title = `Projects | ${site.name}`
    return () => {
      document.title = title
    }
  }, [])

  // The homepage already shows every project, so this page would add nothing.
  if (!hasMoreProjects) return <Navigate to="/#projects" replace />

  return (
    <section id="top" className="projects has-shards projects-page" aria-labelledby={`${section.id}-title`}>
      <Shards section="projects" />

      <div className="projects-head">
        <SectionHeading section={section} tone={3} level={1} />
        <Link className="projects-back reveal pop" to="/#projects">
          <span aria-hidden="true">←</span> Back to home
        </Link>
      </div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage
