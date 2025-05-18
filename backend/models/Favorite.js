import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mealId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true }
});

export default mongoose.model('Favorite', favoriteSchema);
