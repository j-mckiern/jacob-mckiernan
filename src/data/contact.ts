export type Contact = {
  /** The poster's headline, split into its ransom-note tiles. */
  shout: { say: string; hi: string; bang: string }
}

export const contact: Contact = {
  shout: { say: 'SAY', hi: 'HI', bang: '!' },
}
