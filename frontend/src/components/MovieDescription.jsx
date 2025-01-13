import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';
import axios from 'axios';

const MovieDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [hasVoted, setHasVoted] = React.useState(false);

  React.useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/movies/${id}`);
        setMovie(response.data);
        
        // If user is authenticated, check if they've voted
        if (isAuthenticated && token) {
          try {
            const voteCheckResponse = await axios.get(
              `http://localhost:5000/movies/${id}/check-vote`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setHasVoted(voteCheckResponse.data.hasVoted);
          } catch (err) {
            console.error('Error checking vote status:', err);
          }
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, isAuthenticated, token]);

  const handleVote = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to vote');
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/movies/${id}/vote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovie(prevMovie => ({
        ...prevMovie,
        votes: (prevMovie.votes || 0) + 1
      }));
      setHasVoted(true);
      toast.success('Vote added successfully!');
    } catch (error) {
      console.error("Error voting:", error);
      toast.error('Failed to vote. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 min-h-fit sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="px-3 overflow-hidden bg-gray-800 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Container */}
            <div className="relative h-full">
              <div className="aspect-[2/3] w-full">
                <img
                  className="object-contain w-full h-full"
                  src={movie.poster}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
                  }}
                />
              </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col justify-between p-6 text-white">
              <div>
                <h1 className="text-3xl font-bold">
                  {movie.title}
                </h1>
                <p className="mt-2 text-sm font-medium text-gray-500">
                  {movie.year}
                </p>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Plot</h2>
                  <p className="mt-2 line-clamp-6">
                    {movie.description}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-10">
                  <div>
                    <span className="text-2xl font-bold">
                      {movie.votes || 0}
                    </span>
                    <span className="ml-1 text-gray-200">votes</span>
                  </div>
                  {isAuthenticated ? (
                    hasVoted ? (
                      <span className="px-6 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-full">
                        Already Voted
                      </span>
                    ) : (
                      <button
                        onClick={handleVote}
                        className="px-6 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Vote
                      </button>
                    )
                  ) : (
                    <button
                      onClick={handleVote}
                      className="px-6 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Vote
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;