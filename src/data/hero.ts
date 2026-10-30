export type Hero = {
  /** One sentence under the name: what you build and where you're headed. */
  oneLiner: string
  currently: string
  openTo: string
  mascot: {
    /** Screen-reader name for the poke button. */
    label: string
    /** Caption under the mascot. Touch screens get the "tap" version. */
    idle: string
    idleTouch: string
    hurt: string
  }
}

export const hero: Hero = {
  oneLiner:
    'If I can imagine it, I can make it. Turning ideas into reality is what I enjoy.',
  currently: 'Full-stack engineer @ Sitebolts',
  openTo: 'Full-time · Contract',
  mascot: {
    label: 'Poke the mascot',
    idle: 'hi ✦ click me',
    idleTouch: 'hi ✦ tap me',
    hurt: '✕✕ ouch',
  },
}
