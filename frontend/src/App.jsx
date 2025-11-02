import React, { useEffect, useState } from 'react'
import MeetingForm from './components/MeetingForm'
import MeetingList from './components/MeetingList'
import AuthForm from './components/AuthForm'
import { fetchMeetings, createMeeting, logout } from './api'

export default function App() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    if (isAuthenticated) {
      loadMeetings()
    } else {
      setMeetings([])
      setLoading(false)
    }
  }, [isAuthenticated])

  async function loadMeetings() {
    try {
      setLoading(true)
      const data = await fetchMeetings()
      setMeetings(data)
      setError(null)
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout()
      } else {
        setError(err.message || 'Failed to fetch meetings')
        console.error('Error fetching meetings:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(meeting) {
    try {
      setLoading(true)
      const created = await createMeeting(meeting)
      setMeetings(prev => [created, ...prev])
      setError(null)
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout()
      } else {
        setError(err.message || 'Failed to create meeting')
        console.error('Error creating meeting:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    logout()
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="app-root auth-layout">
        <AuthForm onSuccess={() => setIsAuthenticated(true)} />
      </div>
    )
  }

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="brand">
          <h1>Univest</h1>
          <p className="tag">Meetings AI Dashboard</p>
        </div>
        <div className="sidebar-note">
          Submit meeting transcripts and explore AI-generated summaries & action items.
        </div>
        <button onClick={handleLogout} className="btn btn-ghost logout-btn">
          Sign Out
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <h2>Meetings</h2>
          <div className="status">{loading ? 'Loading…' : `${meetings.length} meeting(s)`}</div>
        </header>

        <section className="content">
          {error && <div className="error-banner">{error}</div>}
          
          <MeetingForm onCreate={handleCreate} />

          <hr className="divider" />

          <MeetingList meetings={meetings} />
        </section>
      </main>
    </div>
  )
}
