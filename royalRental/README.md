# Royal Rental — Lagos Listings

This is a web app for managing rental property listings in Lagos, Nigeria (Island & Mainland). Features include:
- **Public Browse**: View approved listings by area and location
- **Agent Portal**: Register and upload properties for admin approval
- **Admin Portal**: Review, approve, or reject agent submissions; manage all listings

Structure:
- `server.js` — Express server with API endpoints
- `db.js` — SQLite database setup
- `auth.js` — Authentication with JWT
- `data/listings.json` — Initial sample data (optional)
- `public/` — Static frontend files
  - `index.html` — Public listing browser
  - `agent.html` — Agent upload portal
  - `admin.html` — Admin management portal

Quick Start (requires Node.js 18+):

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Default Admin Credentials
---

Email: `admin@royalrental.com`  
Password: `admin123`

(Change in production!)

Workflow
--------

1. **Agent** registers at `/agent.html`, then uploads properties (status: pending)
2. **Admin** logs in at `/admin.html` to review and approve/reject submissions
3. **Approved** listings appear on the public browse page (`/`)
4. Admin can manage (approve/reject/delete) any listing

Deployment
----------

### Vercel (Recommended - Easiest)
See `DEPLOYMENT.md` for step-by-step guide.

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t royal-rental:latest .
docker run -p 3000:3000 --rm royal-rental:latest
```

### Heroku

Procfile is included. Push the repo and Heroku will run `web: node server.js`.

### GitHub Actions

A workflow at `.github/workflows/nodejs-docker.yml` builds and pushes the image to GHCR on `main` branch.

Environment Variables
---------------------

- `PORT` — Server port (default: 3000)
- `JWT_SECRET` — JWT secret (default: dev-secret-key-change-in-prod)
- `DATABASE_URL` — PostgreSQL connection string (for production)

For production, set `JWT_SECRET` to a strong random string!

Production Notes
----------------

The current SQLite setup works for local development. For **production on Vercel**, use:
- **Supabase** (PostgreSQL) — Free tier available
- **MongoDB Atlas** — Free tier available
- Any managed database service

See `DEPLOYMENT.md` for detailed instructions.
