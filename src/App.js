import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import GuitarImage from './components/GuitarImage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import Metronome from './pages/Metronome';
import ChordsPage from './pages/ChordsPage';
import ScalesPage from './pages/ScalesPage';
import FooterLogo from './components/FooterLogo'; // Import the FooterLogo component

function FooterConditional() {
  const location = useLocation(); // Hook to get the current route

  // Check if the current path matches the login, signup, or reset-password pages
  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/reset-password') {
    return <FooterLogo />; // Render FooterLogo on these pages
  }

  return null; // Render nothing on other pages
}

function App() {
  return (
    <div className="min-h-screen bg-[#212121] text-white relative">
      <Router>
        <Navbar />
        <div className="mt-16">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/metronome" element={<Metronome />} />
            <Route path="/chords" element={<ChordsPage />} />
            <Route path="/scales" element={<ScalesPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
        <FooterConditional /> {/* Conditionally render the FooterLogo */}
      </Router>
      <GuitarImage />
    </div>
  );
}

export default App;
