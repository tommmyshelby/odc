import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  voteHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

export default mongoose.model('User', UserSchema);
