
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import './Products.css';

const defaultProducts = [
  {
    _id: '1',
    name: 'Barf Block (Badi)',
    category: 'ice',
    retailPrice: 80,
    wholesalePrice: 65,
    unit: 'per block',
    description: 'Badi barf ki silli - shaadi, hotel, restaurant ke liye. Weight approx 40kg.',
    emoji: '🧊',
    available: true,
  },
  {
    _id: '2',
    name: 'Barf Block (Choti)',
    category: 'ice',
    retailPrice: 45,
    wholesalePrice: 35,
    unit: 'per block',
    description: 'Choti barf ki silli - ghar aur dukaan ke liye. Weight approx 20kg.',
    emoji: '🧊',
    available: true,
  },
  {
    _id: '3',
    name: 'RO Water Tank (20L)',
    category: 'water',
    retailPrice: 25,
    wholesalePrice: 20,
    unit: 'per can',
    description: 'Saaf filtered RO paani - ghar aur office ke liye. 20 liter can.',
    emoji: '💧',
    available: true,
  },
  {
    _id: '4',
    name: 'RO Water Tank (200L)',
    category: 'water',
    retailPrice: 200,
    wholesalePrice: 160,
    unit: 'per tank',
    description: 'Bade tank ki delivery - building, factory aur bulk order ke liye.',
    emoji: '🚰',
    available: true,
  },
  {
    _id: '5',
    name: 'Ice Cream Box',
    category: 'icecream',
    retailPrice: 150,
    wholesalePrice: 120,
    unit: 'per box',
    description: 'Taza swadisht ice cream - ghar par party ke liye perfect.',
    emoji: '🍦',
    available: true,
  },
];

const Products = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [filter, setFilter] = useState('all');
  const [showWholesale, setShowWholesale] = useState(false);

useEffect(() => {
  axios.get('/api/products')
    .then((res) => {
      console.log(res.data);

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  const categories = [
    { id: 'all', label: '🌟 Sab Products' },
    { id: 'ice', label: '🧊 Barf' },
    { id: 'water', label: '💧 RO Paani' },
    { id: 'icecream', label: '🍦 Ice Cream' },
  ];

  const filtered =
  filter === 'all'
    ? (Array.isArray(products) ? products : [])
    : (Array.isArray(products)
        ? products.filter(p => p.category === filter)
        : []);

  const orderProduct = (p) => {
    const phone = '919999999999';
    const price = showWholesale ? p.wholesalePrice : p.retailPrice;
    const msg = encodeURIComponent(
      `🛒 *ORDER REQUEST*\n\nProduct: ${p.name}\nPrice: ₹${price} ${p.unit}\n\nMujhe ye product chahiye. Please confirm karein.\n\n_Patidar Ice & RO Services_`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="products-header-inner">
          <h1 className="products-title">Hamare Products</h1>
          <p className="products-sub">Fresh quality - direct factory se aapke paas</p>

          <div className="price-toggle">
            <span className={!showWholesale ? 'active' : ''} onClick={() => setShowWholesale(false)}>
              👤 Retail Price
            </span>
            <div
              className={`toggle-switch ${showWholesale ? 'on' : ''}`}
              onClick={() => setShowWholesale(!showWholesale)}
            >
              <div className="toggle-knob"></div>
            </div>
            <span className={showWholesale ? 'active' : ''} onClick={() => setShowWholesale(true)}>
              🏪 Wholesale Price
            </span>
          </div>
        </div>
      </div>

      <div className="products-body">
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-tab ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map(p => (
            <div key={p._id} className={`product-card ${!p.available ? 'unavailable' : ''}`}>
              <div className="product-emoji">{p.emoji}</div>
              <h3 className="product-name">{p.name}</h3>
              <p className="product-desc">{p.description}</p>
              <div className="product-price">
                <span className="price-amount">
                  ₹{showWholesale ? p.wholesalePrice : p.retailPrice}
                </span>
                <span className="price-unit">{p.unit}</span>
              </div>
              {p.available ? (
                <button className="order-product-btn" onClick={() => orderProduct(p)}>
                  💬 WhatsApp Order
                </button>
              ) : (
                <div className="unavailable-tag">Abhi Available Nahi</div>
              )}
            </div>
          ))}
        </div>

        {showWholesale && (
          <div className="wholesale-note">
            ⚠️ Wholesale price sirf dealers aur bulk orders ke liye hai. Minimum order quantity laagoo hoti hai.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
