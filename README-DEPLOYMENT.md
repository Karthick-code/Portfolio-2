# Portfolio deployment split

This project is split into two independent applications:

- `frontend/` — React + Vite static site, deploy to Netlify.
- `backend/` — Express REST API + MySQL, deploy to Render.

## Frontend — Netlify

1. Create a new Netlify site from the repository, or upload the `frontend` folder.
2. Set the **Base directory** to `frontend` if deploying from a repository root.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Add environment variable `VITE_API_URL` with the Render service URL, e.g. `https://your-api.onrender.com` (do not add `/api`).
6. Redeploy after changing environment variables.

The `_redirects` file supports SPA routes. During local development, Vite proxies `/api` requests to `http://localhost:3000`.

## Backend — Render

1. Create a **Web Service** from the repository.
2. Set the **Root Directory** to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add `FRONTEND_URL` with the exact Netlify site URL (no trailing slash). For a Netlify deploy preview or custom domain, add its origin comma-separated as well.
6. Add MySQL connection variables: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, or use `MYSQL_URL`.
7. Deploy and check `https://your-api.onrender.com/api/health`.

## Important data behavior

- Automatic demo-data seeding has been removed from backend startup. The server creates the required database tables but does not insert placeholder profile details, sample skills, projects, education, or experience.
- The public portfolio already waits for its API requests to finish before rendering the content. It displays a loading screen instead of showing a temporary name while data is being fetched.
- Existing records in your MySQL database are **not deleted**. If your database already contains a profile with `[YOUR NAME]` or sample data, update/delete those records in the database or through the admin interface.
- A newly empty database will show no portfolio content until you add records. Existing admin accounts remain in the database; no default admin account is created.
- Configure a persistent external MySQL database. The backend has an in-memory fallback for local/development use when MySQL is unavailable; data written to that fallback will not persist across restarts.

## Local development

Terminal 1:
```bash
cd backend
npm install
npm run dev
```

Terminal 2:
```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` blank or omit it locally so Vite's `/api` proxy is used. The backend requires valid MySQL environment variables for persistent data.
