const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use in-memory DB on Vercel, file-based locally
const dbPath = process.env.VERCEL ? ':memory:' : path.join(__dirname, 'royal_rental.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('DB error:', err);
  else console.log('Connected to SQLite at', dbPath || 'in-memory');
});

function initDB() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table (admin & agents)
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT DEFAULT 'agent',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        (err) => err && console.error('Users table error:', err)
      );

      // Listings table
      db.run(
        `CREATE TABLE IF NOT EXISTS listings (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          location TEXT NOT NULL,
          islandOrMainland TEXT NOT NULL,
          houseType TEXT NOT NULL,
          bedrooms INTEGER NOT NULL,
          bathrooms INTEGER NOT NULL,
          toilets INTEGER NOT NULL,
          yearlyPrice TEXT NOT NULL,
          description TEXT NOT NULL,
          amenities TEXT NOT NULL,
          uploadedBy TEXT NOT NULL,
          status TEXT DEFAULT 'pending',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (uploadedBy) REFERENCES users(id)
        )`,
        (err) => err && console.error('Listings table error:', err)
      );

      // Create admin user if not exists
      const adminEmail = 'admin@royalrental.com';
      const adminPassword = require('bcrypt').hashSync('admin123', 10);
      db.run(
        `INSERT OR IGNORE INTO users (id, email, password, role) VALUES (?, ?, ?, ?)`,
        ['admin-001', adminEmail, adminPassword, 'admin'],
        (err) => {
          if (err) console.error('Admin insert error:', err);
          else console.log('Admin user ready (email: admin@royalrental.com, password: admin123)');
          resolve();
        }
      );
    });
  });
}

module.exports = { db, initDB };
