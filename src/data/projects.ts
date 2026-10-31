export type Project = {
  slug: string
  name: string
  /** The sticker on the card, e.g. 'In production'. */
  status: string
  /** Short bullets: what it is and what you built. */
  highlights: string[]
  stack: string[]
  /** null hides the button. */
  liveUrl: string | null
  codeUrl: string | null
  /** A silent looping clip that plays over the image, which is its poster. */
  video?: string
  /** A file in public/projects, or null until the screenshot exists. */
  image: {
    src: string
    /** Smaller copies, so the browser never has to shrink a big photo itself. */
    srcSet?: string
    /** How wide the image shows, for one wider than a normal card's. */
    sizes?: string
    alt: string
    /** The object-position to crop around. */
    focus?: string
    /** Shows the whole image, for one that makes no sense cropped. */
    contain?: boolean
  } | null
}

/** More than this and the homepage trims the list and links to /projects. */
const HOMEPAGE_LIMIT = 4

// Best first.
export const projects: Project[] = [
  {
    slug: 'aims',
    name: 'AIMS',
    status: 'In production',
    highlights: [
      'Computer vision tool tracking in live operating rooms at Orlando Health',
      'Approved for production by the Director of Robotic Surgery',
      'Built the real-time video pipeline, Java Swing UI and CSV log export',
    ],
    stack: ['Java', 'YOLO / ONNX Runtime', 'Java Swing', 'GitHub Actions'],
    liveUrl: 'https://tkjonesy.github.io/Artificial-Intelligence-Monitoring-For-Surgery/',
    codeUrl: 'https://github.com/tkjonesy/Artificial-Intelligence-Monitoring-For-Surgery',
    video: '/projects/aims-demo.mp4',
    image: {
      src: '/projects/aims-demo-poster.webp',
      alt: 'A recording of the AIMS app: a hand removes orange staple loads from a surgical drape, and the detection boxes and tracking log update in real time.',
      focus: '50% 50%',
    },
  },
  {
    slug: 'ufc-fight-analytics',
    name: 'UFC Fight Analytics',
    status: 'Side project',
    highlights: [
      'End-to-end fight predictor: about 71% accuracy and 0.80 AUC on held-out fights',
      'Web scraping pipeline for historical results, fighter profiles and per-fight stats',
      'In real-world testing against live UFC events',
    ],
    stack: ['Python', 'scikit-learn', 'pandas', 'Streamlit'],
    liveUrl: null,
    codeUrl: 'https://github.com/j-mckiern/ufc-fight-analytics',
    image: {
      src: '/projects/ufc-matchup-1120.webp',
      srcSet: '/projects/ufc-matchup-560.webp 560w, /projects/ufc-matchup-1120.webp 1120w',
      alt: 'The UFC Fight Analytics matchup predictor: Conor McGregor vs Max Holloway at welterweight, with Max Holloway as the predicted winner at 76.1% confidence.',
      focus: '50% 100%',
    },
  },
  {
    slug: 'home-server',
    name: 'Self-Hosted Smart Home Server',
    status: 'Side project',
    highlights: [
      'Containerized home automation on a Raspberry Pi 4, with lights exposed to Apple Home and Siri',
      'No open router ports: LAN-scoped firewall rules, and Tailscale ACLs limit remote users to one service',
      'Encrypted nightly backups to local storage and Google Drive, config in Git, and a Bash recovery script',
    ],
    stack: ['Docker Compose', 'Linux', 'Home Assistant', 'MQTT', 'Tailscale'],
    // The repo is private, so there's nothing to link to yet.
    liveUrl: null,
    codeUrl: null,
    image: {
      src: '/projects/home-server-dashboard-1120.webp',
      srcSet:
        '/projects/home-server-dashboard-560.webp 560w, /projects/home-server-dashboard-1120.webp 1120w, /projects/home-server-dashboard-1920.webp 1920w',
      sizes: '(max-width: 899px) calc(100vw - 72px), min(calc(100vw - 150px), 1140px)',
      alt: 'The Home Assistant dashboard: weather, Zigbee pairing and last backup status beside light controls grouped by room.',
      contain: true,
    },
  },
]

export const homepageProjects = projects.slice(0, HOMEPAGE_LIMIT)
export const hasMoreProjects = projects.length > HOMEPAGE_LIMIT
