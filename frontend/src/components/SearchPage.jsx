import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import MovieCard from "./MovieCard.jsx";

const SearchPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const server = import.meta.env.VITE_SERVER_URL;
  
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleSearch = useCallback(async () => {
    if (!title.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("Authorization");

      const { data } = await axios.post(
        `${server}/movies/search`,
        { title, year },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.movies && data.movies.length > 0) {
        setSearchResults(data.movies);
      } else {
        setSearchResults([]);
        setError("No movies found.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while fetching movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [title, year]);

  return (
    <div className="min-h-screen px-4 py-10 text-white bg-gray-900">
      <h1 className="mb-8 text-3xl font-bold text-center">Search Movies</h1>
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 text-black rounded-lg shadow-md"
          placeholder="Enter movie title (Use exact names)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="w-full px-4 py-2 mb-4 text-black rounded-lg shadow-md"
          placeholder="Enter release year (optional)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          onClick={handleSearch}
          disabled={!title.trim()}
          className="w-full px-4 py-2 font-semibold text-white rounded-lg shadow-md bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div className="text-center text-red-500">{error}</div>}

      {searchResults.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Search Results</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {console.log(searchResults)}
            {searchResults.map((movie) => {
              console.log(`Inside moviesearch page : ${movie._id}`);
              return <MovieCard key={movie._id} movie={movie} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
