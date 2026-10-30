import { useEffect } from 'react'
import { sections } from '../data/sections'
import About from './About'
import Hero from './Hero'
import Projects from './Projects'
import Toolkit from './Toolkit'

const built = ['about', 'projects', 'toolkit']

function Home() {
  // The browser only jumps to a #hash when the page loads, before React has drawn
  // the sections. This covers refreshes and arriving from /projects.
  useEffect(() => {
    const target = window.location.hash.slice(1)
    if (target) document.getElementById(target)?.scrollIntoView()
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Toolkit />

      {/* Placeholders for the sections not built yet. */}
      {sections.filter((section) => !built.includes(section.id)).map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="placeholder"
          aria-labelledby={`${section.id}-title`}
        >
          <h2 id={`${section.id}-title`}>
            {section.num} {section.label}
          </h2>
        </section>
      ))}
    </>
  )
}

export default Home
