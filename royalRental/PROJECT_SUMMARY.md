# Royal Rental — Project Summary

## ✅ Complete Features

### Public Portal (`/`)
- Browse approved rental listings
- Filter by Island/Mainland or location
- Search by title/description
- Real-time property display

### Agent Portal (`/agent.html`)
- Register as a new agent
- Login with JWT authentication
- Submit property listings (status: pending)
- View own listings with approval status
- Delete own listings

### Admin Portal (`/admin.html`)
- Login with admin credentials
- View ALL listings (pending, approved, rejected)
- Approve pending submissions → Makes visible publicly
- Reject submissions
- Delete any listing
- Filter by status

## 📁 Project Structure

```
royalRental/
├── server.js              # Express API + routes
├── db.js                  # SQLite setup & schemas
├── auth.js                # JWT authentication
├── package.json           # Dependencies
├── Dockerfile             # Container config
├── Procfile              # Heroku config
├── vercel.json           # Vercel config
├── start.bat             # Windows startup script
├── start.sh              # Unix startup script
├── README.md             # Main documentation
├── SETUP.md              # Local setup guide
├── DEPLOYMENT.md         # Vercel deployment guide
├── data/
│   └── listings.json     # Initial sample data
└── public/
    ├── index.html        # Public browse page
    ├── agent.html        # Agent upload portal
    ├── admin.html        # Admin dashboard
    ├── app.js            # Public listing logic
    ├── agent.js          # Agent portal logic
    ├── admin.js          # Admin portal logic
    └── style.css         # Styling
```

## 🚀 Getting Started

### Local Development
```bash
cd c:\Users\PC\Documents\royalRental
npm install
npm run dev
# Open http://localhost:3000
```

### Deploy to Vercel
```bash
vercel
# Or use Vercel Dashboard at vercel.com
```

### Deploy with Docker
```bash
docker build -t royal-rental:latest .
docker run -p 3000:3000 royal-rental:latest
```

## 🔐 Default Credentials

**Admin:**
- Email: `admin@royalrental.com`
- Password: `admin123`

**Agent:** Register at `/agent.html`

## 📊 Database

**Local**: SQLite (`royal_rental.db`)  
**Vercel**: In-memory (resets on deploy)  
**Production**: Use Supabase or MongoDB

## 🔄 Approval Workflow

1. **Agent** submits property → Status: `pending`
2. **Admin** reviews → Clicks "Approve" → Status: `approved`
3. **Public** can now see the listing on browse page

## 📱 Pages

| URL | Purpose |
|-----|---------|
| `/` | Public listing browser |
| `/agent.html` | Agent registration & upload |
| `/admin.html` | Admin management dashboard |
| `/health` | API health check |
| `/api/listings` | Public listings API |
| `/api/auth/login` | Login endpoint |
| `/api/auth/register` | Register agent endpoint |

## ✨ Ready to Use

✅ Fully functional web app  
✅ Authentication & JWT  
✅ SQLite database  
✅ Approval workflow  
✅ Docker ready  
✅ Vercel ready  
✅ Heroku ready  
✅ GitHub Actions CI/CD  

---

**Next Step**: Deploy to Vercel! See `DEPLOYMENT.md`
