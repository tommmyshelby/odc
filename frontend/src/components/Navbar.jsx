import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="h-20 text-white shadow-xl bg-gradient-to-r from-gray-800 to-gray-950">
      <div className="flex items-center justify-between px-3 py-3 mx-3">
        <div className="flex flex-col items-center space-y-1">
          <div className="text-3xl font-semibold">ODC</div>
          <span className="text-sm text-gray-400">On Demand Cinema</span>
        </div>

        <div className="flex space-x-5 font-medium">
          <Link to="/" className="font-medium hover:text-gray-400">Home</Link>

          {isAuthenticated ? (
            <>
              <Link to="/top-movies" className="hover:text-gray-400">TopList</Link>
              <Link to="/search-movies" className="hover:text-gray-400">Search Movies</Link>
              <Link to="/my-profile" className="hover:text-gray-400">My Profile</Link>
              <button onClick={logout} className="hover:text-gray-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/signup" className="hover:text-gray-400">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
