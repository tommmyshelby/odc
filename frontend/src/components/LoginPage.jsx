import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';
import { toast } from "sonner";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);

      if (response.data.token) {
        login(response.data.token, response.data.userId);
        toast.success('Successfully logged in!');
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-yellow-100">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-300">
            Sign in to continue your cinema journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-lg font-medium text-gray-900 bg-yellow-300 rounded-lg 
              hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-yellow-300 hover:text-yellow-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
