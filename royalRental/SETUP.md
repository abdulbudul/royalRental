# Royal Rental Setup & Run Guide

## Installation

1. Open PowerShell or Command Prompt
2. Navigate to the project folder:
   ```
   cd c:\Users\PC\Documents\royalRental
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the App

### Option 1: Using Start Script (Windows)
Simply double-click `start.bat` or run:
```
start.bat
```

### Option 2: Using Start Script (Mac/Linux)
```
chmod +x start.sh
./start.sh
```

### Option 3: Manual Start
```
npm run dev
```

## Accessing the App

Once the server is running, open your browser and go to:

- **Public Listings**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/admin.html
- **Agent Portal**: http://localhost:3000/agent.html

## Default Credentials

### Admin Login
- **Email**: admin@royalrental.com
- **Password**: admin123

(Change these credentials in production!)

## Workflow

### 1. Browsing Properties (Public)
- Visit http://localhost:3000
- Filter by Island/Mainland or Location
- Search for properties
- Only **approved** listings are visible

### 2. Agents Uploading Properties
- Go to http://localhost:3000/agent.html
- Click "Register" to create an agent account
- Login with your credentials
- Fill out the "Submit New Property" form
- Click "Submit Property"
- Your listing status will be **pending** until admin approval

### 3. Admin Managing Listings
- Go to http://localhost:3000/admin.html
- Login with admin credentials (admin@royalrental.com / admin123)
- View all listings (pending, approved, rejected)
- Click "Approve" to make a listing visible to the public
- Click "Reject" to reject a submission
- Click "Delete" to remove any listing

## Database

The app uses **SQLite** which stores data in `royal_rental.db` (created automatically on first run).

Tables:
- `users` — Admin and agent accounts
- `listings` — Property listings with approval status

To reset the database, simply delete `royal_rental.db` and restart the server.

## Stopping the Server

Press **Ctrl+C** in the terminal where the server is running.

## Testing Checklist

✅ Public browsing works  
✅ Agent registration and login  
✅ Agent property submission  
✅ Admin approval workflow  
✅ Approved listings show publicly  
✅ Agents can delete their own listings  
✅ Admin can delete any listing  

## Troubleshooting

**Port already in use**: The default port is 3000. To use a different port:
```
set PORT=3001
npm run dev
```

**Database errors**: Delete `royal_rental.db` and restart.

**Module not found**: Run `npm install` again.

---

Enjoy! 🎉
