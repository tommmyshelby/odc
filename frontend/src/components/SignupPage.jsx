import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const SignupPage = () => {
   
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  
    const handleSubmit = async (e) => {
        const [error, setError]= useState("");
        e.preventDefault();
        // Handle login logic here
        try{
          const response = await axios.post(`${server}/auth/register`,formData);
  
          if (response.data.token){
              
              Navigate('/login');
          }
        }catch(err){
          setError('Invalid email or password',error)
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
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-yellow-100">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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