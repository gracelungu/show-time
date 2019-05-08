import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
  },
  picture: {
    type: String,
  },
  watchlist: {
    type: Array,
    default: null,
  },
  password: {
    type: String,
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
