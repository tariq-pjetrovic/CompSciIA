import React from 'react';

function Profile({ user }) {
    if (!user) {
      return <p>You need to log in to view your profile.</p>;
    }
  
    return (
      <div className="profile-page">
        <h1>Profile</h1>
        <p>Username: {user.userName}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  }
  
  export default Profile;
