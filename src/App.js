import React, { useEffect } from 'react';
import { Link, Element } from "react-scroll";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

function App() {
  useEffect(() => {
    AOS.init({ duration: 500 }); // Animation duration is 1000ms
  }, []);  
  
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to="home" smooth={true} duration={200} className="nav-link">Home</Link>
          <Link to="about" smooth={true} duration={200} className="nav-link">About</Link>
          <Link to="services" smooth={true} duration={200} className="nav-link">Services</Link>
          <Link to="portfolio" smooth={true} duration={200} className="nav-link">Portfolio</Link>
          <Link to="contact" smooth={true} duration={200} className="nav-link">Contact</Link>
        </nav>
      </header>
      <Element name="home" className="section home">
        <h1>Welcome to My Site</h1>
        <p>Your one-stop solution for web design.</p>
      </Element>
      <Element name="about" className="section about" data-aos="fade-down">
        <h2>About Us</h2>
        <p>We specialize in creating sleek and modern websites tailored to your needs.</p>
      </Element>
      <Element name="services" className="section services" data-aos="fade-down">
        <h2>Our Services</h2>
        <ul>
          <li>Web Development</li>
          <li>UI/UX Design</li>
          <li>SEO Optimization</li>
        </ul>
      </Element>
      <Element name="portfolio" className="section portfolio" data-aos="fade-down">
        <h2>Our Portfolio</h2>
        <p>Check out some of our recent work!</p>
        {/* Add images or links to projects here */}
      </Element>
      <Element name="contact" className="section contact" data-aos="fade-down">
        <h2>Contact</h2>
        <p>Reach out to us via email or phone!</p>
      </Element>
    </div>
  );
}

export default App;

