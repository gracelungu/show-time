import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  watchlist: {
    type: Array,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updatedDate: {
    type: Date,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('User', userSchema);
