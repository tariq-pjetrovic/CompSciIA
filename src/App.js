import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom';
import {Element, scroller } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.scss';
import './Main.scss';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Profile from './Profile';
import Products from './Products';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Payment from './Payment';
import Admin from './AdminPanel';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error);
      return [];
    }
  }); 
  const [wishlist, setWishlist] = useState(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error('Error parsing wishlist data from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const [cartResponse, wishlistResponse] = await Promise.all([
          fetch('http://localhost:5000/api/cart', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('http://localhost:5000/api/wishlist', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
  
        if (cartResponse.ok) {
          const cartData = await cartResponse.json();
          setCart(cartData);
        } else {
          console.error('Error fetching cart data:', await cartResponse.text());
        }
  
        if (wishlistResponse.ok) {
          const wishlistData = await wishlistResponse.json();
          setWishlist(wishlistData);
        } else {
          console.error('Error fetching wishlist data:', await wishlistResponse.text());
        }
      } catch (error) {
        console.error('Error fetching user data from backend:', error);
      }
    };
  
    loadUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!wishlist || wishlist.length === 0) {
        console.log('Wishlist is empty or undefined.');
        return;
      }
  
      const productIds = wishlist.map((item) => item.productId || item._id || item);
  
      try {
        const response = await fetch('http://localhost:5000/api/products/details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds }),
        });
  
        if (response.ok) {
          const productDetails = await response.json();
          console.log('Fetched product details:', productDetails);
  
          if (JSON.stringify(wishlist) !== JSON.stringify(productDetails)) {
            setWishlist(productDetails);
          }
        } else {
          console.error('Failed to fetch product details. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    fetchProductDetails();
  }, [JSON.stringify(wishlist)]);  

  useEffect(() => {
    console.log('Stored cart:', localStorage.getItem('cart'));
    console.log('Stored wishlist:', localStorage.getItem('wishlist'));
  }, []);  
  
  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userData.userName);
    localStorage.setItem('role', userData.role);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('wishlist', JSON.stringify([]));
    alert('Logged out successfully!');
    window.location.reload();
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

  function RefreshPage(){
    window.locate.reload();
  }

  return (
    <Router>
      <div className="app">
        <header className="App-header">
          <nav className="navbar">
            <h1 className="brand">Jerry's Shop</h1>
            <NavLinks />
            <div className="auth-links">
              {user?.role === 'admin' && (
                <Link to='/Admin' className='nav-link'>AdminPage</Link>
              )}
              <Link to='/wishlist' className='nav-link' onClick={RefreshPage}>Wishlist</Link>
              <Link to='/cart' className='nav-link'>Cart</Link>
              {user ? (
                <>
                  <Link to="/profile" className="nav-link">Profile</Link>
                  <button className="nav-link" onClick={handleLogout}>Logout</button>
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
                </Element>
                <Element name="about" className="section about">
                  <h2>About Us</h2>
                  <p>We Are a small business based in Bosnia and Herzegovina.</p>
                  <p>We currently have two employees running the site and we are hoping for future expansion</p>
                </Element>
                <Element name="services" className="section services">
                  <h2>Our Services</h2>
                  <ul>
                    <li>Selling products worldwide</li>
                    <li>Cheap internatial shipping</li>
                    <li>2-3 week delivery time</li>
                  </ul>
                </Element>
                <Element name="contact" className="section contact">
                  <h2>Contact</h2>
                  <p>Contact us at jerrysshopsup@gmail.com for support</p>
                </Element>
              </>
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <p>Please log in to view this page.</p>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
          <Route path="/payment" element={<Payment />}/>
          <Route path="/Admin" element={<Admin />}/>
        </Routes>
      </div>
    </Router>
  );
}

function NavLinks() {
  const navigate = useNavigate();

  const navigateAndScroll = (target) => {
    navigate('/');
    setTimeout(() => {
      scroller.scrollTo(target, {
        duration: 350,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }, 100);
  };

  return (
    <div className="auth-links">
      <span className="nav-link" onClick={() => navigateAndScroll('home')}>Home</span>
      <span className="nav-link" onClick={() => navigateAndScroll('about')}>About</span>
      <span className="nav-link" onClick={() => navigateAndScroll('services')}>Services</span>
      <span className="nav-link" onClick={() => navigate('/Products')}>Products</span>
      <span className="nav-link" onClick={() => navigateAndScroll('contact')}>Contact</span>
    </div>
  );
}

export default App;