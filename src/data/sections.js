// Order defines the section numbers shown bottom-right (01, 02, ...)
export const sections = [
  { id: 'top', label: 'Home', inNav: false },
  { id: 'work', label: 'Work', inNav: true },
  { id: 'about', label: 'About', inNav: true },
  { id: 'toolkit', label: 'Toolkit', inNav: true },
  { id: 'contact', label: 'Contact', inNav: true },
]

export const scrollTo = (e, id) => {
  e?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
