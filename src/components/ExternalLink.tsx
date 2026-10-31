/** A link that opens in a new tab, and says so to screen readers. */
function ExternalLink({ href, label, className }: { href: string; label: string; className: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {label} <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default ExternalLink
