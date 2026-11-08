/* Architecture strip: a row of system components joined by arrows.
   `live` sends a quiet signal down the pipeline (disabled for reduced motion). */

import type React from "react"

type Props = {
  nodes: string[]
  highlight?: number
  size?: "sm" | "lg" | "stack"
  live?: boolean
}

export function Pipeline({ nodes, highlight, size = "sm", live = false }: Props) {
  return (
    <ol
      className={`pipe pipe--${size}${live ? " pipe--live" : ""}`}
      role="list"
      aria-label={`Architecture: ${nodes.join(", then ")}`}
    >
      {nodes.map((node, i) => (
        <li
          key={node}
          className="pipe-node"
          data-highlight={i === highlight ? "" : undefined}
          style={{ "--i": i } as React.CSSProperties}
        >
          {node}
        </li>
      ))}
    </ol>
  )
}
