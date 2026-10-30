import type { CSSProperties } from 'react'
import { shards, type ShardSection } from '../data/shards'
import './Shards.css'

/** The section's color shards. Decorative only, so screen readers skip them. */
function Shards({ section }: { section: ShardSection }) {
  return (
    <div className="shards" aria-hidden="true">
      {shards[section].map((shard, i) => {
        // Custom properties carry the per-shard drift values into Shards.css.
        const style = {
          top: shard.top,
          bottom: shard.bottom,
          height: shard.height,
          '--shard-depth': shard.depth,
          '--shard-rate': shard.rate,
        } as CSSProperties
        return (
          <div
            key={i}
            className={[
              'shard',
              shard.rail && `shard-rail shard-rail-${shard.rail}`,
              shard.outlined && `shard-outlined shard-outlined-${shard.tone}`,
            ]
              .filter(Boolean)
              .join(' ')}
            style={style}
          >
            {/* The clip lives on the innermost div so the outline's drop-shadow can follow
                the cut shape instead of being clipped by it. The filter sits one level
                inside the moving .shard, so it's drawn once and the result just slides. */}
            <div className="shard-art">
              <div className={`shard-fill shard-${shard.tone}`} style={{ clipPath: shard.points }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Shards
