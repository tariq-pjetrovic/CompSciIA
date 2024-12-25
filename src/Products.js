import './Product.css';
import React, { useState, useEffect } from 'react';


const Products = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "High-quality, durable, and stylish for everyday use.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Product 2",
      description: "A versatile product perfect for any occasion.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Product 3",
      description: "Crafted with precision and care for your satisfaction.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      title: "Product 4",
      description: "Reliable, efficient, and designed to impress.",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="products-page">
      <header className="header">
        <h1>Our Products</h1>
        <p>Explore our wide range of premium products designed to meet your needs.</p>
      </header>
      <main className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <button className="buy-now">Buy Now</button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Products;