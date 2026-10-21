import ThemeControls from './components/ThemeControls'
import { sections } from './data/sections'

function App() {
  return (
    <>
      {/* Temporary home until the header lands in session 3. */}
      <header>
        <ThemeControls />
      </header>

      <main>
        <section id="top" aria-labelledby="hero-title">
          <h1 id="hero-title">Jacob McKiernan</h1>
          <p>Scaffold is up. Sections land one session at a time.</p>
        </section>

        {sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
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
