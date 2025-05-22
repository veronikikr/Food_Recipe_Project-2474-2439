import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Σχήμα χρήστη
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favorites: { type: Array, default: [] },
  points: { type: Number, default: 0 }
});

// Πριν αποθηκευτεί ο χρήστης, κάνε hash τον κωδικό του
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model('User', userSchema);
