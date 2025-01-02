import React, { useState, useEffect } from 'react';
import './Wishlist.css';

const Wishlist = ({ wishlist, setWishlist }) => {
  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
      } else {
        console.error('Failed to remove item from wishlist');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className="wishlist-container">
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <div className="wishlist-card" key={item._id}>
            <img src={item.image} alt={item.name} />
            <div className="wishlist-card-content">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price ? item.price.toFixed(2) : 'N/A'}</p>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromWishlist(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-wishlist">Your wishlist is empty!</p>
      )}
    </div>
  );
};

export default Wishlist;