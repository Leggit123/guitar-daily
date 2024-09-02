import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import logo from '../assets/images/logo.png';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center w-full h-[60px] bg-[#1c1e20] backdrop-blur-[4px] border-b border-[rgba(255,255,255,0.085)] px-6 fixed top-0 left-0 z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 cursor-pointer" onClick={() => navigate("/dashboard")} />
      </div>
      <div className="flex space-x-3">
        {location.pathname === '/dashboard' || location.pathname === '/metronome' || location.pathname === '/scales' ||location.pathname === '/chords' ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
