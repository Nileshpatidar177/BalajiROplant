import React, { useState, useEffect } from 'react';
import API from '../services/api';
import './Orders.css';

const STATUS_OPTIONS = ['pending', 'confirmed', 'delivered', 'cancelled'];
const STATUS_COLOR = { pending: '#ffd700', confirmed: '#00d4ff', delivered: '#25D366', cancelled: '#ff4757' };
const STATUS_LABEL = { pending: '⏳ Pending', confirmed: '✅ Confirmed', delivered: '🚚 Delivered', cancelled: '❌ Cancelled' };

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const q = filterStatus ? `?status=${filterStatus}&limit=100` : '?limit=100';
      const res = await API.get(`/orders${q}`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [filterStatus]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await API.patch(`/orders/${id}`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) {
      alert('Update nahi ho saka. Try again.');
    }
    setUpdating(null);
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Ye order delete karein?')) return;
    try {
      await API.delete(`/orders/${id}`);
      setOrders(prev => prev.filter(o => o._id !== id));
    } catch (err) {
      alert('Delete nahi ho saka.');
    }
  };

  const callCustomer = (phone) => window.open(`tel:${phone}`);
  const waCustomer = (order) => {
    const msg = encodeURIComponent(
      `Hello ${order.name}! Aapka order (${order.product} - ${order.quantity}) confirm ho gaya hai. Delivery jald ki jayegi. - Patidar Ice & RO Services`
    );
    window.open(`https://wa.me/91${order.phone}?text=${msg}`, '_blank');
  };

  const filtered = orders.filter(o =>
    o.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.phone?.includes(search) ||
    o.product?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="orders-page">
      <h1 className="page-title">📦 Orders Management</h1>
      <p className="page-sub">Saare orders dekho, status update karo, customers se contact karo</p>

      {/* Filters */}
      <div className="filters-bar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Naam, phone ya product se search karein..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="status-filters">
          <button
            className={`filter-btn ${filterStatus === '' ? 'active' : ''}`}
            onClick={() => setFilterStatus('')}
          >All</button>
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              className={`filter-btn ${filterStatus === s ? 'active' : ''}`}
              style={filterStatus === s ? { borderColor: STATUS_COLOR[s], color: STATUS_COLOR[s] } : {}}
              onClick={() => setFilterStatus(s)}
            >
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      {loading ? (
        <div className="loading">Orders load ho rahe hain...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
          <p>Koi order nahi mila.</p>
        </div>
      ) : (
        <div className="orders-list">
          {filtered.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-top">
                <div className="order-info">
                  <h3 className="order-name">{order.name}</h3>
                  <div className="order-meta">
                    <span>📞 {order.phone}</span>
                    <span>🛒 {order.product}</span>
                    <span>📦 {order.quantity}</span>
                  </div>
                  <div className="order-address">📍 {order.address}</div>
                  <div className="order-time">
                    🕐 {new Date(order.createdAt).toLocaleString('hi-IN')}
                  </div>
                </div>
                <div className="order-status-wrap">
                  <span
                    className="status-badge"
                    style={{ background: STATUS_COLOR[order.status] + '22', color: STATUS_COLOR[order.status] }}
                  >
                    {STATUS_LABEL[order.status] || order.status}
                  </span>
                </div>
              </div>

              <div className="order-actions">
                <div className="status-update">
                  <label>Status Change:</label>
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order._id, e.target.value)}
                    disabled={updating === order._id}
                    className="status-select"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                    ))}
                  </select>
                </div>
                <div className="action-btns">
                  <button className="act-btn call" onClick={() => callCustomer(order.phone)}>📞 Call</button>
                  <button className="act-btn wa" onClick={() => waCustomer(order)}>💬 WhatsApp</button>
                  <button className="act-btn del" onClick={() => deleteOrder(order._id)}>🗑️ Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
