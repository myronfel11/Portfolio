// Tech logos come from simple-icons (https://simpleicons.org). Search the site for a slug,
// then import it as `si` + PascalCase slug, e.g. "next.js" -> siNextdotjs, "tailwind css" -> siTailwindcss.
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siGreensock,
  siFramer,
  siTailwindcss,
  siVite,
  siVercel,
  siFigma,
} from 'simple-icons'

// TODO — replace with your real tools. `featured` is the large top row, `more` the smaller row.
export const toolkit = {
  featured: [
    { name: 'React', icon: siReact },
    { name: 'Next.js', icon: siNextdotjs },
    { name: 'TypeScript', icon: siTypescript },
  ],
  more: [
    { name: 'GSAP', icon: siGreensock },
    { name: 'Framer Motion', icon: siFramer },
    { name: 'Tailwind CSS', icon: siTailwindcss },
    { name: 'Vite', icon: siVite },
    { name: 'Vercel', icon: siVercel },
    { name: 'Figma', icon: siFigma },
  ],
}
