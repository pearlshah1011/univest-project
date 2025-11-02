# Univest Frontend (UI Demo)

This is a Vite + React demo frontend for the Univest Meetings project. It uses a local mock API (no external AI calls) and provides an immersive UI for submitting transcripts and viewing AI-generated summaries & action items.

## Quickstart

From the `frontend/` folder:

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Notes
- The demo uses `src/api.js` which simulates AI processing deterministically — good for UI testing without keys.
- To integrate with your Python backend later, replace `src/api.js` functions to call your backend endpoints (e.g. `POST /meetings` and `GET /meetings`).

