import React, { useState, useEffect } from 'react';
import './ViewCart.css';

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart || [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);   

  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart); // Update state
        alert('Product removed from cart!');
      } else {
        const errorData = await response.json();
        console.error('Failed to remove product:', errorData.message);
        alert(`Failed to remove product: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error in handleRemoveFromCart:', error);
      alert('An error occurred while removing the product from the cart.');
    }
  };   

  const handleUpdateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handlePayNow = () => {
    window.location.href = '/payment';
  };  

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="pay-now-container">
            <button className="pay-now-btn" onClick={handlePayNow}>
              Pay Now
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );  
};

export default Cart;
