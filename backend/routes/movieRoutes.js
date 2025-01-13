import express from 'express';
import Movie from '../models/movie.js';
import axios from 'axios';
import  authenticate  from '../middlewares/authMiddleware.js';

import User from '../models/user.js';

const router = express.Router();


router.get('/top-movies', async (req, res) => {
    try {
        const topMovies = await Movie.find()
            .sort({ votes: -1 })  // Sort by votes in descending order
            .limit(10);          // Limit to top 10 movies

        res.json(topMovies);
    } catch (err) {
        console.error('Error fetching top movies:', err);
        res.status(500).json({ 
            error: 'Failed to fetch top movies', 
            details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
        });
    }
});



router.post("/search", authenticate, async (req, res) => {
  const { title, year } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "A valid title is required" });
  }

  try {
    // Search in the database first
    const query = { title: { $regex: new RegExp(title, "i") } };
    if (year) query.year = year;

    const movies = await Movie.find(query).limit(10);

    if (movies.length > 0) {
      return res.json({ movies, source: "database" });
    }

    // Construct the OMDb API URL with the necessary parameters
    const omdbSearchUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year || ""}&apikey=${process.env.OMDB_API}&plot=short`;

    const { data: searchResponse } = await axios.get(omdbSearchUrl);

    if (searchResponse.Response === "True") {
      const detailedMovie = {
        title: searchResponse.Title,
        year: searchResponse.Year,
        poster: searchResponse.Poster,
        description: searchResponse.Plot || "Description not available.",
      };

      // Check if movie already exists
      let movieInstance = await Movie.findOne({
        title: detailedMovie.title,
        year: detailedMovie.year,
      });

      // If movie doesn't exist, save it and get the saved instance
      if (!movieInstance) {
        movieInstance = await new Movie(detailedMovie).save();
      }

      // Return the database instance instead of the API response
      return res.json({ movies: [movieInstance], source: "api" });
    }

    // No movies found
    return res.status(404).json({ error: "No movies found." });
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



  
  


// Voting endpoint remains the same
router.post('/:id/vote', authenticate, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });

        const user = await User.findById(req.userId);
        if (user.voteHistory.includes(movie._id)) {
            return res.status(400).json({ error: 'You have already voted for this movie' });
        }

        movie.votes++;
        await movie.save();

        user.voteHistory.push(movie._id);
        await user.save();

        res.json({ message: 'Vote added successfully', movie });
    } catch (err) {
        res.status(500).json({ error: 'Voting failed', details: err });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the movie by ID in the database
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movie);
    } catch (err) {
        console.error('Error fetching movie by ID:', err);

        res.status(500).json({
            error: 'Failed to fetch movie details',
            details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
        });
    }
});

router.get('/:id/check-vote', authenticate, async (req, res) => {
    try {
        const movieId = req.params.id;
        const userId = req.userId; // From auth middleware

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hasVoted = user.voteHistory.includes(movieId);
        res.json({ hasVoted });
    } catch (err) {
        console.error('Error checking vote status:', err);
        res.status(500).json({
            error: 'Failed to check vote status',
            details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
        });
    }
});



export default router;