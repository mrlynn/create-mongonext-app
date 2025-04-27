import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  preferences: {
    genres: [String],
    notifications: {
      email: Boolean,
      push: Boolean,
    },
  },
}, {
  timestamps: true,
});

// Create index on email for faster lookups
// UserSchema.index({ email: 1 });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to check if user is admin
UserSchema.methods.isAdmin = function () {
  return this.role === 'admin';
};

export default mongoose.models.User || mongoose.model('User', UserSchema); 