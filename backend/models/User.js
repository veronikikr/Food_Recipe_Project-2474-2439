import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favorites: { type: Array, default: [] },
  points: { type: Number, default: 0 }
});

export default mongoose.model('User', userSchema);
