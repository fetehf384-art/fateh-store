# Frontend

The original UI is preserved in the repository root (index.html) to avoid breaking behavior while we iterate on reorganizing files.

Planned next steps:
- Gradually extract inline JS/CSS into /frontend/assets and connect to the backend API at /api/*.
- For local testing, serve the frontend from a static server (e.g. `npx serve frontend` or `python -m http.server`).
