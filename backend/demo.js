// Replace 'YOUR_API_KEY' with your actual TMDb API key
const apiKey = '07df902d51b0891a03e92a81051e355e';
const movieName = 'Inception'; // Replace with the desired movie name
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}&language=en-US&page=1`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.results.length > 0) {
      const movie = data.results[0];
      console.log(`Title: ${movie.title}`);
      console.log(`Overview: ${movie.overview}`);
      console.log(`Release Date: ${movie.release_date}`);
      console.log(`Rating: ${movie.vote_average}`);
    } else {
      console.log('No movies found.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
