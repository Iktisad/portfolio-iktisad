# Portfolio

Personal portfolio site built with React, TypeScript, TailwindCSS 4, and Vite.

## Development

Install dependencies:

```bash
npm install
```

Start the frontend dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Admin Dashboard

The admin dashboard lets you edit all portfolio content (experiences, projects, skills, etc.) and save it back to `src/data/data.json` via a local API server.

### How to access

The dashboard is **only accessible from localhost**. Visiting `/dashboard` on the deployed site shows "Access restricted to localhost" — this is intentional and enforced client-side.

To open the dashboard locally:

**1. Start the API server** (in a separate terminal):

```bash
npm run api
```

This starts the Node.js API on port `3005`, which handles reading and writing `src/data/data.json`.

**2. Start the frontend dev server** (if not already running):

```bash
npm run dev
```

**3. Open the dashboard:**

```
http://localhost:5173/dashboard
```

### Making changes

- Use the sidebar to navigate between sections (Experiences, Education, Projects, Skills, etc.)
- Click **Add** to add a new item via the modal
- Click the **pencil icon** on any card to edit it
- Click the **trash icon** to delete an item
- Click **Save All** in the sidebar when done — this writes all changes to `src/data/data.json`

> The API server must be running when you click Save All, otherwise the save will fail with an error.

---

## Deployment

Build for production:

```bash
npm run build
```

The `/dashboard` route is safe to include in the build — it is blocked for any non-localhost hostname. The API server is a local-only tool and is never deployed.
