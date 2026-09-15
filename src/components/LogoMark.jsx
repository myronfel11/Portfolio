import { content } from '../data/content.js'

// Placeholder mark until the real logo arrives. Swap the inner contents for an <img> or inline SVG.
export default function LogoMark({ size = 40 }) {
  return (
    <span
      className="logo-mark"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      aria-label="Logo placeholder"
    >
      {content.initials}
    </span>
  )
}
