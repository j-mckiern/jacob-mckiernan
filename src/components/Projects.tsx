import { Link } from 'react-router'
import { hasMoreProjects, homepageProjects, projects } from '../data/projects'
import { sections } from '../data/sections'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'
import Shards from './Shards'
import './Projects.css'

const section = sections.find((s) => s.id === 'projects')!

function Projects() {
  return (
    <section id={section.id} className="projects has-shards" aria-labelledby={`${section.id}-title`}>
      <Shards section="projects" />

      <div className="projects-head">
        <SectionHeading section={section} tone={3} />
        {hasMoreProjects && (
          <Link className="projects-all reveal pop" to="/projects">
            All projects ({projects.length}) <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      <div className="projects-grid">
        {homepageProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

export default Projects
