import { content } from '../data/content.js'

export default function LogoMark({ variant = 'mark' }) {
  const wordmark = variant === 'wordmark'
  return (
    <img
      className="logo-img"
      src={wordmark ? content.wordmark : content.logo}
      alt={wordmark ? content.name : `${content.name} logo`}
      draggable={false}
    />
  )
}
