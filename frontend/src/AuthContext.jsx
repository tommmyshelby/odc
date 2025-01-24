import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const savedToken = localStorage.getItem('Authorization');
      if (savedToken) {
        setIsAuthenticated(true);
        setToken(savedToken);
        console.log("token is :"+token);
      }
      setIsLoading(false); // Mark initialization as complete
    };

    initializeAuth();
  }, []);

  const login = (newToken) => {
    localStorage.setItem('Authorization', newToken);
    setIsAuthenticated(true);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('Authorization');
    setIsAuthenticated(false);
    setToken(null);
    toast.success('Successfully logged Out!');
    Navigate("/")
  };

  // If still loading, you can return a loading indicator or null
  if (isLoading) {
    return null; // Or return a loading spinner component
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      token, 
      login, 
      logout,
      isLoading // Expose loading state to consumers
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Enhanced useAuth hook with error handling
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('UseAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };