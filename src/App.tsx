import Header from './components/Header'
import Hero from './components/Hero'
import { sections } from './data/sections'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      {/* tabIndex lets the skip link move keyboard focus here, not just scroll. */}
      <main id="main" tabIndex={-1}>
        <Hero />

        {sections.map((section) => (
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
      </main>

      <footer>
        <a href="#top">back to top ↑</a>
      </footer>
    </>
  )
}

export default App
