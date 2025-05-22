import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register (Εγγραφή)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Έλεγξε αν υπάρχει ήδη ο χρήστης
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login (Σύνδεση)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Έλεγχος hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({
      userId: user._id,
      username: user.username,
      email: user.email,
      favorites: user.favorites || [],
      points: user.points || 0
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
