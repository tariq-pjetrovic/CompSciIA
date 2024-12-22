import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Link as ScrollLink, Element, scroller } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userData.userName);
    localStorage.setItem('role', userData.role);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
  };

  useEffect(() => {
    AOS.init({ duration: 500 });
    const token = localStorage.getItem('token');
    if (token) {
      const userName = localStorage.getItem('userName');
      const role = localStorage.getItem('role');
      setUser({ userName, role });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <h1 className="brand">Jerry's Shop</h1>
            <NavLinks />
            <div className="auth-links">
              {user ? (
                <>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Element name="home" className="section home">
                  <h1>Welcome to My Site</h1>
                  <p>Your one-stop solution for web design.</p>
                </Element>
                <Element name="about" className="section about" data-aos="fade-down">
                  <h2>About Us</h2>
                  <p>About us (lmao)</p>
                </Element>
                <Element name="services" className="section services" data-aos="fade-down">
                  <h2>Our Services</h2>
                  <ul>
                    <li>Demo, for now</li>
                  </ul>
                </Element>
                <Element name="portfolio" className="section portfolio" data-aos="fade-down">
                  <h2>Our Portfolio</h2>
                  <p>Check out some of our recent work!</p>
                </Element>
                <Element name="contact" className="section contact" data-aos="fade-down">
                  <h2>Contact</h2>
                  <p>Maybe remove this later on</p>
                </Element>
              </>
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <p>Please log in to view this page.</p>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

function NavLinks() {
  const navigate = useNavigate();

  const navigateAndScroll = (target) => {
    navigate('/'); // Navigate to home
    setTimeout(() => {
      scroller.scrollTo(target, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }, 100); // Delay to ensure navigation completes first
  };

  return (
    <div className="nav-links">
      <span className="nav-link" onClick={() => navigateAndScroll('home')}>
        Home
      </span>
      <span className="nav-link" onClick={() => navigateAndScroll('about')}>
        About
      </span>
      <span className="nav-link" onClick={() => navigateAndScroll('services')}>
        Services
      </span>
      <span className="nav-link" onClick={() => navigateAndScroll('portfolio')}>
        Portfolio
      </span>
      <span className="nav-link" onClick={() => navigateAndScroll('contact')}>
        Contact
      </span>
    </div>
  );
}

export default App;




