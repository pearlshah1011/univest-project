import React from 'react'

export default function MeetingList({ meetings }) {
  if (!meetings || meetings.length === 0) return <div className="card">No meetings yet — create one above.</div>

  return (
    <div className="meetings-grid">
      {meetings.map(m => (
        <article key={m.id} className="meeting-card">
          <div className="meeting-meta">
            <div>
              <div className="meeting-title">{m.title}</div>
              <div className="meeting-summary">{m.summary}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:12,color:'#9aa4b2'}}>{new Date(m.created_at).toLocaleString()}</div>
            </div>
          </div>

          <div>
            <h4 style={{margin:'6px 0'}}>Action items</h4>
            <ul className="action-list">
              {m.action_items && m.action_items.length ? m.action_items.map((a, idx) => (
                <li key={idx} className="action-item">
                  <div className="action-desc">{a.description}</div>
                  <div className="action-meta">Due: {a.deadline} • Assigned: {a.person && a.person.length ? a.person.join(', ') : '—'}</div>
                </li>
              )) : <li style={{color:'#9aa4b2'}}>No action items detected.</li>}
            </ul>
          </div>
        </article>
      ))}
    </div>
  )
}
