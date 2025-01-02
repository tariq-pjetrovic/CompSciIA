import './Register.css';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', user.userName);
      localStorage.setItem('role', user.role);

      // Fetch user's cart and wishlist after login
      const cartResponse = await fetch('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const wishlistResponse = await fetch('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (cartResponse.ok) {
        const cart = await cartResponse.json();
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      if (wishlistResponse.ok) {
        const wishlist = await wishlistResponse.json();
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
      
      onLogin(response.data.user, response.data.token);
      setSuccess('Login was Successful!');
      setTimeout(() => {
        navigate('/profile');
      }, 500);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };
  
  return (
    <div className='login-page'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
        <label>
          Password:
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
        </div>
        <div>
        <button type="submit" className='loginFunctions'>Login</button>
        <RouterLink to="/forgot-password" className='loginFunctions'>ForgotPassword</RouterLink>
        <RouterLink to="/reset-password" className='loginFunctions'>ResetPassword</RouterLink>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default Login;
