import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

import MyProfile from "./components/MyProfile";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "sonner"; // Correct import for sonner
import MovieDescription from "./components/MovieDescription";

import TopMovies from "./components/TopMovies";
import SearchPage from "./components/SearchPage";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#18202D',  // Dark background for the toast
              color: '#fff',  // White text
              padding: '16px',  // Add some padding for a more spacious look
              borderRadius: '8px',  // Rounded corners for the toast box
              fontSize: '16px',  // Adjust font size
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Add subtle shadow to elevate the toast
            },
            success: {
              duration: 3000,
              icon: '🎉',
              style: {
                background: '#28a745',  // Green background for success
                borderRadius: '8px',  // Keep rounded corners consistent
                color: '#fff',  // White text for success
                padding: '12px 20px',  // Padding for success toast
              },
            },
            error: {
              duration: 4000,
              icon: '❌',
              style: {
                background: '#dc3545',  // Red background for error
                borderRadius: '8px',  // Rounded corners for error
                color: '#fff',  // White text for error
                padding: '12px 20px',  // Padding for error toast
              },
            },
          }}
          
        />
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/search-movies" element={<SearchPage />} />
            
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/movies/:id" element={<MovieDescription/>}/>
            <Route path="/top-movies" element={<TopMovies/>}/>
            
          </Routes>
        </div>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
