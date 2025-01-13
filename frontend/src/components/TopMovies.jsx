import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

const TopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/movies/top-movies');
        setMovies(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching top movies:', err);
        setError('Failed to fetch top movies.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-xl font-medium text-yellow-300 sm:text-2xl">
          Loading Top Movies...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-xl font-medium text-red-500 sm:text-2xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container p-4 mx-auto">
        <section className="py-8">
          <h2 className="mb-8 text-2xl font-bold text-center text-yellow-100 sm:text-3xl">
            Top {movies.length} Most Voted Movies
          </h2>
          
          {movies.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {movies.map((movie) => (
                <div 
                  key={movie._id || movie.id} 
                  className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-20px)]"
                >
                  <MovieCard 
                    movie={{
                      ...movie,
                      title: `${movie.title} (${movie.votes || 0} votes)`
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-center text-gray-300">
              No top movies available at the moment.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default TopMovies;