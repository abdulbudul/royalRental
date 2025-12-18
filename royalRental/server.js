const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');
const { db, initDB } = require('./db');
const { registerAgent, loginUser, authMiddleware, adminMiddleware } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============= AUTH ROUTES =============
// Register agent
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
    const user = await registerAgent(email, password);
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// ============= LISTING ROUTES =============
// Get approved listings (public)
app.get('/api/listings', (req, res) => {
  db.all(
    `SELECT * FROM listings WHERE status = 'approved' ORDER BY createdAt DESC`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Get all listings with status (admin only)
app.get('/api/listings/admin/all', authMiddleware, adminMiddleware, (req, res) => {
  db.all(
    `SELECT * FROM listings ORDER BY createdAt DESC`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Get agent's own listings
app.get('/api/listings/agent/my', authMiddleware, (req, res) => {
  db.all(
    `SELECT * FROM listings WHERE uploadedBy = ? ORDER BY createdAt DESC`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Create listing (agent)
app.post('/api/listings', authMiddleware, (req, res) => {
  const {
    title, location, islandOrMainland, houseType,
    bedrooms, bathrooms, toilets, yearlyPrice, description, amenities
  } = req.body;

  if (!title || !location) return res.status(400).json({ error: 'Missing required fields' });

  const listingId = uuid();
  db.run(
    `INSERT INTO listings (id, title, location, islandOrMainland, houseType, bedrooms, bathrooms, toilets, yearlyPrice, description, amenities, uploadedBy, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      listingId, title, location, islandOrMainland, houseType,
      bedrooms, bathrooms, toilets, yearlyPrice, description, JSON.stringify(amenities || []),
      req.user.id, 'pending'
    ],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: listingId, status: 'pending', message: 'Listing submitted for approval' });
    }
  );
});

// Approve listing (admin)
app.patch('/api/listings/:id/approve', authMiddleware, adminMiddleware, (req, res) => {
  db.run(
    `UPDATE listings SET status = 'approved', updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    [req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Listing not found' });
      res.json({ message: 'Listing approved' });
    }
  );
});

// Reject listing (admin)
app.patch('/api/listings/:id/reject', authMiddleware, adminMiddleware, (req, res) => {
  db.run(
    `UPDATE listings SET status = 'rejected', updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    [req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Listing not found' });
      res.json({ message: 'Listing rejected' });
    }
  );
});

// Delete listing (admin or owner agent)
app.delete('/api/listings/:id', authMiddleware, (req, res) => {
  db.get(
    `SELECT uploadedBy FROM listings WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Listing not found' });
      if (row.uploadedBy !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Cannot delete other agent\'s listing' });
      }
      db.run(
        `DELETE FROM listings WHERE id = ?`,
        [req.params.id],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Listing deleted' });
        }
      );
    }
  );
});

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Init DB and start
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
