import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Change Navigate to useNavigate
import { toast } from 'sonner'; // Assuming you're using sonner for notifications

const SignupPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState(""); // Move error state outside handleSubmit
  const server = import.meta.env.VITE_SERVER_URL; // Add server URL

  const [formData, setFormData] = useState({
    username: '', // Changed from name to username to match backend
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate all fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${server}/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate('/login'); // Use navigate instead of Navigate
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Registration failed";
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-yellow-100">
            Join the Community
          </h2>
          <p className="mt-2 text-gray-300">
            Create an account to start voting for your favorite movies
          </p>
        </div>
        
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-yellow-100">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-yellow-100">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="text-yellow-100">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-yellow-100">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-medium text-gray-900 bg-yellow-300 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-300 hover:text-yellow-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;