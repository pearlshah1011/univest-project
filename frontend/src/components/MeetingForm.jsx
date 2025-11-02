import React, { useState } from 'react'

export default function MeetingForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [transcript, setTranscript] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedTranscript = transcript.trim()
    
    if (!trimmedTitle || !trimmedTranscript) return
    
    setError('')
    setBusy(true)
    
    try {
      await onCreate({ title: trimmedTitle, transcript: trimmedTranscript })
      setTitle('')
      setTranscript('')
      // Show success feedback here if needed
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to process meeting. Please try again.')
      console.error('Error creating meeting:', err)
    } finally {
      setBusy(false)
    }
  }

  function pasteSample() {
    const sample = `We need to finalize speaker slides, confirm catering headcount, and fix AV setup in breakout room C. Assign follow-ups to David and Sophie.`
    setTranscript(sample)
  }
  
  function clearForm() {
    setTitle('')
    setTranscript('')
    setError('')
  }

  return (
    <div className="card meeting-form">
      <form onSubmit={submit}>
        <div className="form-fields">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Meeting title (e.g., Sprint Planning)"
            required
            className="form-input"
            disabled={busy}
          />
          <textarea
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            placeholder="Paste meeting transcript here..."
            required
            className="form-input"
            rows={6}
            disabled={busy}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError('')}
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={busy || !title.trim() || !transcript.trim()}
          >
            {busy ? (
              <span className="loading-text">
                <span className="loading-spinner"></span>
                Generating Summary...
              </span>
            ) : (
              'Generate Summary'
            )}
          </button>
          <button 
            type="button" 
            className="btn btn-ghost" 
            onClick={pasteSample}
            disabled={busy}
          >
            Try Sample
          </button>
          {(title || transcript) && !busy && (
            <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={clearForm}
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
