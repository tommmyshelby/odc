import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String },
  poster: { type: String },
  description: { type: String },
  votes: { type: Number, default: 0 },
});

export default mongoose.model('Movie', MovieSchema);
