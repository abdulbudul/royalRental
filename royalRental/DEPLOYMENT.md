# Vercel Deployment Guide

## Prerequisites
- A GitHub account with this repo pushed
- A Vercel account (free at vercel.com)

## Deploy to Vercel

### Option 1: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Select the `royalRental` repository
5. Click **"Deploy"**

That's it! Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd c:\Users\PC\Documents\royalRental
vercel
```

## Important: Data Persistence

**Note**: The current setup uses SQLite which doesn't persist on Vercel's serverless platform. Each deployment creates a fresh database.

### For Production Use, Choose One:

#### Option A: Use Supabase (PostgreSQL) - Recommended
1. Sign up at [supabase.com](https://supabase.com) (free tier available)
2. Create a new project and get the connection string
3. Set environment variable `DATABASE_URL` in Vercel
4. Update `db.js` to use PostgreSQL instead of SQLite

#### Option B: Use MongoDB Atlas
1. Sign up at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Set as `MONGODB_URI` environment variable in Vercel

#### Option C: Keep Data Locally (Development Only)
- Deploy only the frontend to Vercel
- Run backend locally for testing

## Setting Environment Variables on Vercel

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add:
   - `JWT_SECRET`: Generate a strong random string
   - Any database URLs if using external DB

## Current Deployment Status

✅ Frontend hosted on Vercel  
⚠️ SQLite database resets on each deployment (development mode)

## Next: Add a Cloud Database

For a production-ready setup with persistent data, update the database layer to use PostgreSQL (Supabase) or MongoDB. I can help set that up if you'd like!

## Live URL

Once deployed, your app will be available at:
```
https://your-project-name.vercel.app
```

Admin Portal: `https://your-project-name.vercel.app/admin.html`  
Agent Portal: `https://your-project-name.vercel.app/agent.html`

---

**Default Admin Credentials** (can be changed after first login):
- Email: `admin@royalrental.com`
- Password: `admin123`
