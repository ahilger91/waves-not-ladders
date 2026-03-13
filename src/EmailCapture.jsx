import { useState } from 'react'
import './EmailCapture.css'

export default function EmailCapture({ archetype, onSkip }) {
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
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: apiKey,
            first_name: name,
            email,
            tags: [archetype],
          }),
        }
      )

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Subscription failed')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="email-capture email-capture--success">
        <p className="email-capture__success-msg">
          You're in. Check your inbox for what comes next.
        </p>
      </div>
    )
  }

  return (
    <div className="email-capture">
      <h3 className="email-capture__heading">Want to go deeper?</h3>
      <p className="email-capture__subtext">
        Get resources and ideas tailored to your archetype — delivered to your inbox.
      </p>

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
          {status === 'submitting' ? 'Subscribing…' : 'Send me resources'}
        </button>
      </form>

      <button className="email-capture__skip" onClick={onSkip} type="button">
        Skip
      </button>
    </div>
  )
}
