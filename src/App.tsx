import { Navigate, Route, Routes, useLocation } from 'react-router'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Loader from './components/Loader'
import ProjectsPage from './components/ProjectsPage'
import { useBoot } from './hooks/useBoot'
import { useDepth } from './hooks/useDepth'
import { useReveal } from './hooks/useReveal'

function App() {
  const { booting, finishBoot } = useBoot()
  const { pathname } = useLocation()
  useDepth()
  useReveal(!booting, pathname)

  return (
    <>
      {booting && <Loader onDone={finishBoot} />}
      <Cursor />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      {/* tabIndex lets the skip link move keyboard focus here, not just scroll. */}
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
