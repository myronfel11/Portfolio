import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import ArrowIcon from './ArrowIcon.jsx'
import { content } from '../data/content.js'

const configured = () => {
  const { serviceId, templateId, publicKey } = content.emailjs
  return Boolean(serviceId && templateId && publicKey)
}

export default function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const firstField = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setStatus('idle')
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => firstField.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      clearTimeout(t)
    }
  }, [open, onClose])

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.website.value) return // honeypot filled by a bot
    setStatus('sending')
    try {
      const { serviceId, templateId, publicKey } = content.emailjs
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          message: form.message.value.trim(),
          time: new Date().toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' }),
        },
        { publicKey },
      )
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {status === 'sent' ? (
          <div className="modal-sent">
            <p className="eyebrow">Sent</p>
            <h3 id="contact-modal-title" className="modal-title">
              Got it. <em>Thank you.</em>
            </h3>
            <p className="modal-sub">
              A confirmation is on its way to your inbox. I'll get back to you within two business days.
            </p>
            <button type="button" className="btn ghost" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Say hello</p>
            <h3 id="contact-modal-title" className="modal-title">
              Tell me about <em>your project.</em>
            </h3>

            {!configured() && (
              <p className="modal-note">
                The form isn't connected yet — use the direct email link below for now.
              </p>
            )}

            <form ref={formRef} className="modal-form" onSubmit={submit}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
              <label>
                <span>Name</span>
                <input ref={firstField} type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" required autoComplete="email" />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={5} required />
              </label>

              {status === 'error' && (
                <p className="modal-error">Something went wrong sending that. Try again, or email me directly.</p>
              )}

              <div className="modal-actions">
                <button type="submit" className="btn" disabled={status === 'sending' || !configured()}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <a href={`mailto:${content.email}`} className="modal-direct">
                  or email me directly <ArrowIcon />
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
