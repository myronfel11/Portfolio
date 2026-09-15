// Single source of truth for all editable copy. Replace the TODO values with real content.

export const content = {
  name: 'Myron Feliciano',
  initials: 'MF',
  location: 'Calgary, Alberta',
  // Downscaled from the originals in /public (Gold_logo.png, Gold_Wordmark.png)
  logo: '/logo-mark.png',
  wordmark: '/logo-wordmark.png',
  // Drop your photo into /public and set the path, e.g. '/headshot.jpg'. Leave empty for the placeholder.
  headshot: '', // TODO
  tagline:
    'I design, build and direct digital experiences that feel like the people behind them.', // TODO

  roles: ['Web Designer', 'Developer', 'Creative Director'],
  // Hero headline, one entry per line
  titleLines: ['Web Designer.', 'Developer.', 'Creative', 'Director.'],

  bio: [
    // TODO — replace with your real bio paragraphs
    'I sit at the intersection of design, code and direction. That means I can take an idea from a napkin sketch to a shipped product without it losing its soul along the way.',
    'I care about work that is honest — modern without chasing trends, playful without being loud, and grounded in what actually matters to the people using it.',
  ],

  brandWords: [
    { word: 'Grounded', line: 'Rooted in strategy, not just aesthetics.' },
    { word: 'Modern', line: 'Clean systems, current tools, no fluff.' },
    { word: 'Creative', line: 'Ideas with a point of view and a pulse.' },
  ],

  projects: [
    // TODO — replace with real projects. `tone` controls card color: 'caramel' | 'silver' | 'green'
    {
      title: 'Project One',
      category: 'Brand & Web',
      year: '2026',
      blurb: 'A short line about what this project was and the role you played in it.',
      tags: ['Design', 'Development'],
      href: '#',
      tone: 'caramel',
    },
    {
      title: 'Project Two',
      category: 'Web App',
      year: '2025',
      blurb: 'Interface design and front-end build for a product launch.',
      tags: ['UI/UX', 'React'],
      href: '#',
      tone: 'silver',
    },
    {
      title: 'Project Three',
      category: 'Art Direction',
      year: '2025',
      blurb: 'Campaign concept, visual system and motion direction.',
      tags: ['Creative Direction', 'Motion'],
      href: '#',
      tone: 'green',
    },
    {
      title: 'Project Four',
      category: 'Identity',
      year: '2024',
      blurb: 'Naming, logo system and launch site for a small studio.',
      tags: ['Branding', 'Web'],
      href: '#',
      tone: 'caramel',
    },
  ],

  email: 'hello@example.com', // TODO
  resumeUrl: '/resume.pdf', // TODO — drop resume.pdf into /public
  socials: [
    // TODO — replace hrefs
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
}
