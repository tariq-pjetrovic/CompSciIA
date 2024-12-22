import './Register.css';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password }); // Adjust URL as needed
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
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
