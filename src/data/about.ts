export type Job = {
  start: string
  /** 'Now' for the current role. */
  end: string
  role: string
  org: string
  /** Short bullets: what you built and shipped. */
  highlights: string[]
}

export type About = {
  /** The one-line intro, set in the caption box. */
  lead: string
  /** Newest first. The timeline flips this to read oldest to newest. */
  experience: Job[]
}

export const about: About = {
  lead: "I'm a full-stack engineer in Orlando and a 2025 UCF computer science grad.",
  experience: [
    {
      start: '2025',
      end: 'Now',
      role: 'Full-Stack Engineer',
      org: 'Sitebolts',
      highlights: [
        'Ship features for a multi-tenant client platform',
        'Design APIs and databases, and help plan system architecture',
        'Review PRs and maintain CI/CD pipelines',
      ],
    },
    {
      start: '2022',
      end: '2025',
      role: 'B.S. Computer Science',
      org: 'University of Central Florida',
      highlights: [
        'Senior design: Scrum Master and developer on AIMS, computer vision software that tracks surgical tools, used at Orlando Health',
      ],
    },
  ],
}
