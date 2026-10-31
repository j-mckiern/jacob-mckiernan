import { site } from '../data/site'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {site.handle} <span aria-hidden="true">✦</span>
      </span>
      <a className="footer-top" href="#top">
        back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  )
}

export default Footer
