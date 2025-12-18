const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { db } = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-prod';

// Register a new agent
function registerAgent(email, password) {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = uuid();
    db.run(
      `INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)`,
      [userId, email, hashedPassword, 'agent'],
      function(err) {
        if (err) reject(err);
        else resolve({ id: userId, email, role: 'agent' });
      }
    );
  });
}

// Login user
function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (err, user) => {
        if (err) return reject(err);
        if (!user) return reject(new Error('User not found'));
        if (!bcrypt.compareSync(password, user.password)) {
          return reject(new Error('Invalid password'));
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
          expiresIn: '7d'
        });
        resolve({ token, user: { id: user.id, email: user.email, role: user.role } });
      }
    );
  });
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Middleware to check auth
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });
  req.user = user;
  next();
}

// Middleware to check admin role
function adminMiddleware(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
}

module.exports = {
  registerAgent,
  loginUser,
  verifyToken,
  authMiddleware,
  adminMiddleware
};
