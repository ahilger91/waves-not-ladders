import { useState } from 'react'
import './EmailCapture.css'

export default function EmailCapture({
  archetype,
  heading = 'Want to go deeper?',
  subtext = 'Get resources and ideas tailored to your archetype — delivered to your inbox.',
  onComplete,
  onSkip,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const apiKey = import.meta.env.VITE_KIT_API_KEY
    const formId = import.meta.env.VITE_KIT_FORM_ID

    try {
      const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`
      const body = JSON.stringify({ api_key: apiKey, first_name: name, email, tags: [archetype] })

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.message || 'Subscription failed')
      }

      setStatus('success')
      setTimeout(() => onComplete?.(), 1500)
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  function handleSkip() {
    onSkip?.()
    onComplete?.()
  }

  if (status === 'success') {
    return (
      <div className="email-capture email-capture--success">
        <p className="email-capture__success-msg">
          Thanks. Check your email to confirm.
        </p>
      </div>
    )
  }

  return (
    <div className="email-capture">
      <h3 className="email-capture__heading">{heading}</h3>
      <p className="email-capture__subtext">{subtext}</p>

      <form className="email-capture__form" onSubmit={handleSubmit}>
        <input
          className="email-capture__input"
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="given-name"
        />
        <input
          className="email-capture__input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        {status === 'error' && (
          <p className="email-capture__error">{errorMsg}</p>
        )}

        <button
          className="email-capture__submit"
          type="submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit'}
        </button>
      </form>

      <button className="email-capture__skip" onClick={handleSkip} type="button">
        Skip
      </button>
    </div>
  )
}
