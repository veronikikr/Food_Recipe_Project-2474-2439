import express from 'express';
import Favorite from '../models/Favorite.js';
import User from '../models/User.js';

const router = express.Router();

// Προαιρετική χρήση ξεχωριστού Favorite model (όπως έχεις ήδη)
router.post('/', async (req, res) => {
  const { userId, mealId, name, image } = req.body;
  const exists = await Favorite.findOne({ userId, mealId });
  if (exists) return res.status(400).json({ error: "Already in favorites" });

  const fav = new Favorite({ userId, mealId, name, image });
  await fav.save();
  res.json(fav);
});

router.get('/:userId', async (req, res) => {
  const favorites = await Favorite.find({ userId: req.params.userId });

  const formatted = favorites.map(fav => ({
    _id: fav._id, 
    idMeal: fav.mealId,
    strMeal: fav.name,
    strMealThumb: fav.image
  }));

  res.json(formatted);
});

router.delete('/:id', async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ✅ Ενημέρωση αγαπημένων στον χρήστη
router.put('/update', async (req, res) => {
  const { username, favorites } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.favorites = favorites;
    await user.save();
    res.json({ message: "Favorites updated" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Ενημέρωση πόντων χρήστη
router.put('/points', async (req, res) => {
  const { username, points } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.points = points;
    await user.save();
    res.json({ message: "Points updated" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
