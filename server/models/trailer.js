import mongoose from 'mongoose';

const trailerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  landScape: {
    type: String,
    required: true,
  },
  portrait: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('trailer', trailerSchema);
