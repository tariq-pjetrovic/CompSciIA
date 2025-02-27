import React, { useState, useEffect } from 'react';
import './Wishlist.scss';
import './Main.scss';

const Wishlist = ({ wishlist, setWishlist }) => {

  const handleRemoveFromWishlist = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedWishlist = await response.json();
        setWishlist(updatedWishlist);
        window.location.reload();
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
              <button onClick={() => handleRemoveFromWishlist(item._id)}>Remove</button>
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