import React, { useEffect, useState, useRef } from 'react';
import MovieSlider from './MovieSlider';
import TopMovies from './TopMovies';
import axios from 'axios';

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const howItWorksRef = useRef(null);
  const server = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(`${server}/movies/top-movies`);
        setTopMovies(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies');
        setTopMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-2xl font-semibold text-yellow-300">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-2xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container px-4 mx-auto">
        {/* Hero Section */}
        <section className="py-32 text-center">
          <h1 className="mb-4 text-4xl font-bold text-yellow-200">
            Shape the Future of Cinema!
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Vote for your favorite movies for a re-release in theaters near you.
          </p>
          <button 
            onClick={scrollToHowItWorks}
            className="px-6 py-3 text-lg font-semibold text-gray-100 transition-colors duration-300 bg-gray-800 rounded-full hover:bg-gray-700"
          >
            Know how!!
          </button>
        </section>

        {/* Featured Movies Slider */}
        <section className="py-12">
          <h2 className="mb-6 text-2xl font-bold text-center text-yellow-100">
            Featured Movies
          </h2>
          {topMovies.length > 0 && <MovieSlider movies={topMovies.slice(0, 5)} />}
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="py-16 bg-gray-800 rounded-lg">
          <div className="max-w-4xl px-6 mx-auto">
            <h2 className="mb-8 text-3xl font-bold text-center text-yellow-200">
              About ODC (Odyssey): On-Demand Cinema
            </h2>
            
            <div className="space-y-8">
              <div className="p-6 bg-gray-700 rounded-lg">
                <h3 className="mb-4 text-xl font-semibold text-yellow-100">
                  What is ODC?
                </h3>
                <p className="text-gray-300">
                  Odyssey: On-Demand Cinema (ODC) is a revolutionary platform that puts the power of movie screenings in your hands. We enable movie enthusiasts to influence which films are shown in theaters through a democratic voting system. Whether you're nostalgic for classics or eager to suggest new releases, ODC creates a direct connection between audiences and theaters.
                </p>
              </div>

              <div className="p-6 bg-gray-700 rounded-lg">
                <h3 className="mb-4 text-xl font-semibold text-yellow-100">
                  Why ODC?
                </h3>
                <p className="text-gray-300">
                  Traditional movie scheduling often overlooks audience preferences, leaving many feeling disconnected from the programming decisions. ODC bridges this gap by creating a platform where your voice matters. Through our voting system, we ensure that theater schedules reflect what audiences truly want to see.
                </p>
              </div>

              <div className="p-6 bg-gray-700 rounded-lg">
                <h3 className="mb-4 text-xl font-semibold text-yellow-100">
                  How to Vote
                </h3>
                <div className="space-y-4 text-gray-300">
                  <p>Voting on ODC is simple and impactful:</p>
                  <ol className="ml-6 space-y-2 list-decimal">
                    <li>Create an account or sign in to your existing profile</li>
                    <li>Browse through our  Top-List of available movies</li>
                    <li>Click on your preferred movie to view details</li>
                    <li>Use your vote to support your favorite films</li>
                    <li>Can't find your favorite movie? Start the vote by searching it in Search movies option</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;