# GitHub Push Instructions

## Prerequisites

You need:
1. **Git** installed on your computer
2. **GitHub account** (free at github.com)
3. **GitHub Personal Access Token** (for authentication)

## Installation

### Install Git

**Windows:**
1. Download from https://git-scm.com/download/win
2. Run the installer and accept defaults
3. Restart PowerShell/Command Prompt

**Mac:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `royal-rental`
3. Add description: `Property rental management system for Lagos, Nigeria`
4. Choose **Public** (so others can see it)
5. Click **Create repository**
6. Copy the repository URL (should be: `https://github.com/YOUR_USERNAME/royal-rental.git`)

## Step 2: Push Your Code to GitHub

Open PowerShell and run these commands:

```powershell
cd c:\Users\PC\Documents\royalRental

# Initialize git (if not already done)
git init

# Configure git with your GitHub details
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Royal Rental web app with agent & admin portals"

# Add remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/royal-rental.git

# Push to GitHub
git branch -M main
git push -u origin main
```

When prompted for password, use your **GitHub Personal Access Token** (not your password).

## Step 3: Generate GitHub Personal Access Token

If you don't have a token:

1. Go to https://github.com/settings/tokens/new
2. Select scopes:
   - ✅ `repo` (full control of private repositories)
   - ✅ `workflow` (update GitHub Actions)
3. Click **Generate token**
4. Copy the token (you'll only see it once!)
5. Use this token as password when pushing

## Step 4: Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/royal-rental
2. You should see all your files there ✅

## Step 5: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select your `royal-rental` repository
5. Click **Deploy**

Your app will be live in 1-2 minutes!

## Troubleshooting

**"fatal: remote origin already exists"**
```powershell
git remote remove origin
# Then run the git remote add command again
```

**"Authentication failed"**
- Make sure you're using a Personal Access Token, not your password
- Regenerate the token at https://github.com/settings/tokens

**"Permission denied (publickey)"**
- Windows users should use HTTPS (not SSH)
- Make sure you copied the HTTPS URL correctly

---

Once you've pushed to GitHub and deployed to Vercel, share the Vercel URL with anyone!
