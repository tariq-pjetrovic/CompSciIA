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

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h2>{item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
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
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
