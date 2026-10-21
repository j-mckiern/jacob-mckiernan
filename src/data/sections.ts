export type Section = {
  /** Used as the element id, so `#about` links scroll here. */
  id: string
  /** The zine-style number shown next to the heading, e.g. "01". */
  num: string
  label: string
}

// Order here is the order on the page and in the nav.
export const sections: Section[] = [
  { id: 'about', num: '01', label: 'About' },
  { id: 'projects', num: '02', label: 'Projects' },
  { id: 'toolkit', num: '03', label: 'Toolkit' },
  { id: 'contact', num: '04', label: 'Contact' },
]
