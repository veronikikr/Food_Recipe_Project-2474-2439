import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.json({ message: "User registered" });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({
      userId: user._id,
      username: user.username,
      email: user.email,
      favorites: user.favorites || [],
      points: user.points || 0
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
