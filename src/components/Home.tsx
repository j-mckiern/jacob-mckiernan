import { useEffect } from 'react'
import About from './About'
import Contact from './Contact'
import Hero from './Hero'
import Projects from './Projects'
import Toolkit from './Toolkit'

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
      <Contact />
    </>
  )
}

export default Home
