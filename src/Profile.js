import React from 'react';

function Profile({ user }) {
  if (!user) {
    return <p>Loading user data...</p>; // Fallback in case user is null
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>
        <strong>Username:</strong> {user.userName}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}

export default Profile;