export default function SplitChars({ text, className = '' }) {
  return (
    <span className={className} aria-label={text} role="text">
      {text.split('').map((ch, i) => (
        <span key={i} className="char-wrap" aria-hidden>
          <span className="char">{ch === ' ' ? ' ' : ch}</span>
        </span>
      ))}
    </span>
  )
}
