import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, Element } from 'react-scroll'; 
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from '../my-backend/routes/ForgotPassword';
import ResetPassword from '../my-backend/routes/ResetPassword';

function App() {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <Router>
      <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <h1 className="brand">Jerry's Shop</h1>
          <div className="nav-links">
            <Link to="home" className="nav-link" smooth duration={200}>Home</Link>
            <Link to="about" className="nav-link" smooth duration={200}>About</Link>
            <Link to="services" className="nav-link" smooth duration={200}>Services</Link>
            <Link to="portfolio" className="nav-link" smooth duration={200}>Portfolio</Link>
            <Link to="contact" className="nav-link" smooth duration={200}>Contact</Link>
          </div>
            <div className="auth-links">
              <RouterLink to="/login" className="nav-link">Login</RouterLink>
              <RouterLink to="/signup" className="nav-link">Signup</RouterLink>
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
                  <p>about us(lmao)</p>
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
                  <p>maybe remove this later on</p>
                </Element>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



