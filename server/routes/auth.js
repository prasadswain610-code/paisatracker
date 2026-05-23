import { Router } from 'express';
import { db } from '../db.js';
import { nanoid } from 'nanoid';
const router = Router();

// Signup – simple email only (no password)
router.post('/signup', async (req, res) => {
  const { name, email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  let user = db.data.users.find(u => u.email === email);
  if (user) return res.status(400).json({ error: 'User already exists' });
  user = { id: nanoid(), name: name || 'Student', email, balance: 0, xp: 0, level: 1, streak: 0, badges: [] };
  db.data.users.push(user);
  await db.write();
  res.json({ userId: user.id, name: user.name, email: user.email });
});

// Login – returns user object
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const user = db.data.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

export default router;
