export type Site = {
  name: string
  /** Lowercase handle used in the logo and footer. */
  handle: string
  title: string
  location: string
  email: string
  github: string
  linkedin: string
  /** Set to '/resume.pdf' once public/resume.pdf exists; every résumé link appears then. */
  resumeUrl: string | null
}

export const site: Site = {
  name: 'Jacob McKiernan',
  handle: 'jacob',
  title: 'Full-Stack Engineer',
  location: 'Orlando, FL',
  email: 'jacob.b.mckiernan@gmail.com',
  github: 'https://github.com/j-mckiern',
  linkedin: 'https://www.linkedin.com/in/j-mckiern/',
  resumeUrl: null,
}
