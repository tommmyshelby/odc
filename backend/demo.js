// server.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to fetch movie data
app.get('/api/movie', async (req, res) => {
  const movieName = req.query.name;
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual TMDb API key
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}&language=en-US&page=1`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
