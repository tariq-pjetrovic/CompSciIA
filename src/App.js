import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, Element } from 'react-scroll'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Login from './Login';
import Signup from './Signup';

function App() {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <div className="nav-links">
              <Link to="home" smooth={true} duration={200} className="nav-link">Home</Link>
              <Link to="about" smooth={true} duration={200} className="nav-link">About</Link>
              <Link to="services" smooth={true} duration={200} className="nav-link">Services</Link>
              <Link to="portfolio" smooth={true} duration={200} className="nav-link">Portfolio</Link>
              <Link to="contact" smooth={true} duration={200} className="nav-link">Contact</Link>
            </div>
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;



