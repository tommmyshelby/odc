import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the mobile menu

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="h-20 text-white shadow-xl bg-gradient-to-r from-gray-800 to-gray-950">
      <div className="flex items-center justify-between px-3 py-3 mx-3">
        <div className="flex flex-col items-center space-y-1">
          <div className="text-3xl font-semibold">ODC</div>
          <span className="text-sm text-gray-400">On Demand Cinema</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden space-x-5 font-medium md:flex">
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

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-800 text-white p-4`}>
        <Link to="/" className="block py-2">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/top-movies" className="block py-2">TopList</Link>
            <Link to="/search-movies" className="block py-2">Search Movies</Link>
            <Link to="/my-profile" className="block py-2">My Profile</Link>
            <button onClick={logout} className="block py-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="block py-2">Login</Link>
            <Link to="/signup" className="block py-2">Signup</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
