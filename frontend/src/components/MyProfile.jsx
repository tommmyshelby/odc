import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { toast } from 'sonner';
import { User, History, Lock } from 'lucide-react';
import { useAuth } from '../AuthContext';

const MyProfile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [votingHistory, setVotingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profileResponse, historyResponse] = await Promise.all([
          axios.get('http://localhost:5000/profile', {
            headers: { Authorization: token }
          }),
          axios.get('http://localhost:5000/profile/history', {
            headers: { Authorization: token }
          })
        ]);

        setUser(profileResponse.data);
        setVotingHistory(historyResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await axios.put(
        'http://localhost:5000/profile/change-password',
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: { Authorization: token }
        }
      );

      toast.success('Password changed successfully');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to change password');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-yellow-200">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-900">
      <div className="container px-4 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-yellow-200">My Profile</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* User Info Section */}
          <div className="p-6 bg-gray-800 rounded-lg">
            <div className="flex items-center mb-6">
              <User className="mr-2 text-yellow-200" size={24} />
              <h2 className="text-xl font-semibold text-yellow-200">User Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-400">Username</label>
                <p className="text-white">{user?.username}</p>
              </div>
              <div>
                <label className="block mb-1 text-gray-400">Email</label>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <label className="block mb-1 text-gray-400">Member Since</label>
                <p className="text-white">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="p-6 bg-gray-800 rounded-lg">
            <div className="flex items-center mb-6">
              <Lock className="mr-2 text-yellow-200" size={24} />
              <h2 className="text-xl font-semibold text-yellow-200">Change Password</h2>
            </div>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-400">Current Password</label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value
                  })}
                  className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded focus:border-yellow-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-400">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })}
                  className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded focus:border-yellow-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-400">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value
                  })}
                  className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded focus:border-yellow-200 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-gray-900 transition-colors bg-yellow-200 rounded hover:bg-yellow-300"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Voting History Section */}
          <div className="p-6 bg-gray-800 rounded-lg md:col-span-2">
            <div className="flex items-center mb-6">
              <History className="mr-2 text-yellow-200" size={24} />
              <h2 className="text-xl font-semibold text-yellow-200">Recent Voting History</h2>
            </div>
            {votingHistory.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {votingHistory.map((movie) => (
                  <div key={movie._id} className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="mb-2 font-semibold text-white">{movie.title}</h3>
                    <p className="text-sm text-gray-400">
                      Voted on: {new Date(movie.votedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No voting history available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;