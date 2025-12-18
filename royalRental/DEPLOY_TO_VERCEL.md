# Push to GitHub & Deploy to Vercel

## Step 1: Initialize Git & Push to GitHub

```bash
cd c:\Users\PC\Documents\royalRental

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Royal Rental web app with agent & admin portals"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/royal-rental.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Easiest - No CLI needed)

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In" (use GitHub account)
3. Click "Add New Project"
4. Select your `royal-rental` repository
5. Click "Deploy"
6. Wait 1-2 minutes...
7. Done! Your app is live!

### Option B: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd c:\Users\PC\Documents\royalRental
vercel
```

Follow the prompts and your app will be deployed!

## Step 3: Configure Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add:
   ```
   JWT_SECRET = (generate a random string - use https://generate-random.org/)
   ```
4. Redeploy by pushing to GitHub or clicking "Redeploy" in Vercel

## Your Live App

After deployment, you'll get a URL like:
```
https://your-project-name.vercel.app
```

Share these links:
- **Public Browse**: https://your-project-name.vercel.app
- **Admin Portal**: https://your-project-name.vercel.app/admin.html
- **Agent Portal**: https://your-project-name.vercel.app/agent.html

## Testing the Deployed App

1. Open the public browse page - should be empty (no approved listings yet)
2. Go to Agent Portal → Register a new agent
3. Login and submit a property
4. Go to Admin Portal → Login (admin@royalrental.com / admin123)
5. Approve the listing
6. Back to public page → Listing now visible ✅

## Important Notes

⚠️ **Data Reset on Deploy**: SQLite database resets when you deploy to Vercel. This is development behavior.

For **production**, you should:
- Use Supabase (PostgreSQL)
- Or use MongoDB Atlas
- See `DEPLOYMENT.md` for details

## Auto-Deploy on Push

Once connected to GitHub, every `git push` to `main` will automatically redeploy on Vercel!

```bash
# Make changes locally
git add .
git commit -m "Update: Add new features"
git push origin main

# Vercel automatically deploys!
```

## Troubleshooting

**Vercel deployment failed?**
- Check logs in Vercel dashboard
- Ensure `vercel.json` is in root directory
- Run `npm install` locally and check for errors

**App not accessible?**
- Wait a few minutes for DNS propagation
- Clear browser cache (Ctrl+Shift+Delete)
- Check Vercel dashboard for deployment status

---

🎉 **Congratulations!** Your rental property management app is now live!
