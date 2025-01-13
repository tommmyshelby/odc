import axios from "axios";
// Replace with your own OMDb API Key
const API_KEY = '113068a9'; // Get this from http://www.omdbapi.com/
const MOVIE_TITLE = 'Yeh Jawaani Hai Deewani'; // Example movie, you can replace it with any title

const checkMovieInfo = async (movieTitle) => {
  try {
    // Construct the URL for the OMDb API
    const url = `http://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`;

    // Send GET request to OMDb API
    const response = await axios.get(url);

    // Check if the response is successful and contains movie data
    if (response.data.Response === 'True') {
      console.log('Movies found:');
      response.data.Search.forEach((movie) => {
        console.log(`Title: ${movie.Title}`);
        console.log(`Year: ${movie.Year}`);
        console.log(`Type: ${movie.Type}`);
        console.log(`Poster URL: ${movie.Poster}`);
        console.log('-------------------------');
      });
    } else {
      console.log('Error:', response.data.Error);
    }
  } catch (error) {
    console.error('Error fetching movie information:', error.message);
  }
};

// Call the function to check movie info
checkMovieInfo(MOVIE_TITLE);
