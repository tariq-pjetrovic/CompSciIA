import React from 'react';
import './Main.scss';
import './Profile.scss';

function Profile({ user }) {
  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className='page-container'>
      <h1 className='title'>Profile Page</h1>
      <p className='profile-card'>
        <strong>Username:</strong> {user.userName}
      </p>
      <p className='profile-card'>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}

export default Profile;