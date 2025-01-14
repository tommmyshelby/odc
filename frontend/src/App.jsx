import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import MyProfile from "./components/MyProfile";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "sonner"; 
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
              background: '#18202D', 
              color: '#fff',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
            success: {
              duration: 3000,
              icon: '🎉',
              style: {
                background: '#28a745',
                borderRadius: '8px',
                color: '#fff',
                padding: '12px 20px',
              },
            },
            error: {
              duration: 4000,
              icon: '❌',
              style: {
                background: '#dc3545',
                borderRadius: '8px',
                color: '#fff',
                padding: '12px 20px',
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
            <Route path="/movies/:id" element={<MovieDescription />} />
            <Route path="/top-movies" element={<TopMovies />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
