// ResetPassword.js
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token'); // from URL query: ?token=XYZ

  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Password reset successful!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
