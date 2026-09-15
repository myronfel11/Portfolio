import { toolkit } from '../data/toolkit.js'

function Box({ tool }) {
  return (
    <li className="tool" title={tool.name}>
      <svg viewBox="0 0 24 24" role="img" aria-label={tool.name}>
        <path d={tool.icon.path} />
      </svg>
      <span className="tool-name">{tool.name}</span>
    </li>
  )
}

export default function Toolkit() {
  return (
    <div className="toolkit">
      <ul className="toolkit-row toolkit-featured">
        {toolkit.featured.map((t) => (
          <Box key={t.name} tool={t} />
        ))}
      </ul>
      <ul className="toolkit-row toolkit-more">
        {toolkit.more.map((t) => (
          <Box key={t.name} tool={t} />
        ))}
      </ul>
    </div>
  )
}
