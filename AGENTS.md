# Field Tracker — Coding Conventions & Architecture

## Coding Conventions

- **Language:** English for all code (variables, functions, fields). Spanish for UI text shown to the user.
- **Naming:** `camelCase` for variables/functions, `PascalCase` for components.
- **Exports:** Named exports for services (`export { getProjects }`), default exports for components (`export default function Projects`).
- **Modules:** Backend uses CommonJS (`require`/`module.exports`), frontend uses ESM (`import`/`export`).
- **REST routes:** Plural nouns, no verbs (`/api/projects`, not `/api/getProjects`).
- **Async:** `async/await` with `try/catch` for all async code.

## Project Structure

```
field-tracker/
├── backend/              # Express + Mongoose (CommonJS)
│   ├── server.js         # Entry point
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   └── routes/           # Express routers
├── frontend/             # React + Vite + Dexie (ESM)
│   └── src/
│       ├── main.jsx      # Entry point, online event sync
│       ├── App.jsx       # React Router setup
│       ├── db.js         # Dexie database definition
│       ├── components/   # Presentational components
│       ├── pages/        # Page-level components
│       ├── services/     # Offline-capable API services
│       ├── config.js     # API base URL (VITE_API_URL env var)
│       └── vercel.json   # SPA fallback rewrites
└── AGENTS.md
```

## Offline-First Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Service Layer                       │
│  (e.g. projectService.js)                            │
│                                                      │
│  1. Try fetch to MongoDB                             │
│  2. Online → save response to Dexie, return data     │
│  3. Offline →                                        │
│       a. Generate ObjectId via bson library          │
│       b. Save entity to Dexie with temp _id          │
│       c. Add operation to pendientes queue           │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│              Online Sync (main.jsx)                   │
│                                                      │
│  window.addEventListener("online", async () => {     │
│    Read all pendientes tasks                         │
│    Replay each operation against the server          │
│    On success: delete task, replace local record     │
│  });                                                 │
└─────────────────────────────────────────────────────┘
```

### Dexie Tables (db.js)

| Table | Key | Indexes | Purpose |
|-------|-----|---------|---------|
| `proyectos` | `_id` | `nombre` | Cached projects |
| `items` | `_id` | `projectId, nombre` | Cached items |
| `notas` | `_id` | `projectId, nombre` | Cached notes |
| `pendientes` | `++id` (auto) | `tabla, tipo` | Offline operation queue |

### Backend API Routes

| Method | Route | Action |
|--------|-------|--------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create a project |
| DELETE | `/api/projects/:id` | Delete a project |
| GET | `/api/projects/:id/items` | List items for a project |
| POST | `/api/projects/:id/items` | Create an item |
| DELETE | `/api/items/:id` | Delete an item |
| GET | `/api/projects/:id/notes` | List notes for a project |
| POST | `/api/projects/:id/notes` | Create a note |
| DELETE | `/api/notes/:id` | Delete a note |

### Frontend Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `<Projects />` | Project list |
| `/items/:id` | `<Items />` | Items for a project |
| `/notes/:id` | `<Notes />` | Notes for a project |

## Deployment

- **Frontend:** Vercel (set `VITE_API_URL` env var to Render backend URL)
- **Backend:** Render (set `DB_URL` env var to MongoDB Atlas connection string)
- **Database:** MongoDB Atlas
- **`config.js`** — Reads `VITE_API_URL`, empty string in dev (Vite proxy handles `/api`)
- **`vercel.json`** — Rewrites all routes to `index.html` for React Router SPA support
- **Service worker** — `controllerchange` event reloads the page on new SW activation

## Current Status

- **Projects:** Fully refactored (service layer, Dexie caching, offline queue, online sync).
- **Items:** Fully refactored (service layer, Dexie caching, offline queue, online sync).
- **Notes:** Fully refactored (service layer, Dexie caching, offline queue, online sync).
- **Online sync in `main.jsx`:** Handles `POST` and `DELETE` for all tables (`proyectos`, `items`, `notas`).
