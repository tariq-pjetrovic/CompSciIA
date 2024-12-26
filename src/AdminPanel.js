import React, { useState } from 'react';

const AdminPanel = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product added successfully!');
        setProductData({ name: '', description: '', price: '', image: '' });
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={productData.image}
          onChange={(e) => setProductData({ ...productData, image: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminPanel;