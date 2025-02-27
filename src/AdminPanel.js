import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [analytics, setAnalytics] = useState(null);

  // Fetch dummy analytics data from the backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/admin/admin-dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        } else {
          console.error('Failed to fetch analytics data');
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, []);

  // Handle new product submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
    <div style={{ padding: '2rem' }}>
      <h1>Admin Panel</h1>
      
      {/* Sales Analytics Section */}
      <section style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
        <h2>Sales Analytics</h2>
        {analytics ? (
          <div>
            {/* This is a placeholder. Replace with real metrics as you implement a payment gateway */}
            <p>{analytics.data}</p>
            {/* Example: 
              <p>Total Sales: $5000</p>
              <p>Orders Today: 10</p>
              <p>Top Selling Product: Widget A</p>
            */}
          </div>
        ) : (
          <p>Loading analytics...</p>
        )}
      </section>

      {/* Product Management Section */}
      <section style={{ border: '1px solid #ccc', padding: '1rem' }}>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <textarea
            placeholder="Description"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={productData.image}
            onChange={(e) =>
              setProductData({ ...productData, image: e.target.value })
            }
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <button type="submit">Add Product</button>
        </form>
      </section>
    </div>
  );
};

export default AdminPanel;