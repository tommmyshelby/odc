import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log(movie._id)
    navigate(`/movies/${movie._id}`); // Navigate to the MovieDescription component
  };

  return (
    <div
      className="w-64 p-4 transition-transform bg-gray-900 rounded-lg shadow-md cursor-pointer h-96 hover:scale-105 hover:shadow-xl"
      onClick={handleCardClick} // Add click handler to navigate
    >
      {/* Image Container */}
      <div className="w-full mb-4 overflow-hidden rounded-md h-72">
        <img
          src={movie.poster}
          alt={movie.title}
          className="object-cover w-full h-full"
          
        />
      </div>

      {/* Text Content Container */}
      <div className="h-16 overflow-hidden">
        <h3 className="mb-1 overflow-hidden text-lg font-semibold leading-tight text-white text-ellipsis whitespace-nowrap">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-400">{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
