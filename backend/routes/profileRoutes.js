import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import  authenticate  from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get User Profile ("/")
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Do not return password
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user); // Return user profile
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Get Recent Voted Movies ("/history")
router.get('/history', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('voteHistory'); // Populate voteHistory to get movie details
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the recent 5 movies voted by the user (can adjust number if needed)
    const recentVotedMovies = user.voteHistory.slice(-5); // Get the last 5 movies in the vote history
    res.json(recentVotedMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch voting history' });
  }
});

// Change Password ("/change-password")
router.put('/change-password', authenticate, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Validate if oldPassword and newPassword are provided
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Please provide both old and new passwords' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare old password with the stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }

    // Hash new password and update it in the database
    
    const hashedPassword = await bcrypt.hash(newPassword,10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

export default router;
