import './Register.css';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); 
        // Possibly redirect to a dashboard or home
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
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
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
        <button type="submit" className='loginFunctions'>Login</button>
        <RouterLink to="/forgot-password" className='loginFunctions'>ForgotPassword</RouterLink>
        <RouterLink to="/reset-password" className='loginFunctions'>ResetPassword</RouterLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
