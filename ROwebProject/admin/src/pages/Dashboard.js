import React, { useState, useEffect } from 'react';
import API from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, delivered: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/orders?limit=5');
        const orders = res.data.orders || [];
        setRecentOrders(orders);
        const total = res.data.total || orders.length;
        const pending = orders.filter(o => o.status === 'pending').length;
        const confirmed = orders.filter(o => o.status === 'confirmed').length;
        const delivered = orders.filter(o => o.status === 'delivered').length;
        setStats({ total, pending, confirmed, delivered });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const statusColor = { pending: '#ffd700', confirmed: '#00d4ff', delivered: '#25D366', cancelled: '#ff4757' };
  const statusLabel = { pending: 'Pending', confirmed: 'Confirmed', delivered: 'Delivered', cancelled: 'Cancelled' };

  return (
    <div className="dashboard">
      <h1 className="page-title">📊 Dashboard</h1>
      <p className="page-sub">Aaj ka overview - Patidar Ice & RO Services</p>

      <div className="stats-grid">
        {[
          { label: 'Total Orders', value: stats.total, icon: '📦', color: 'var(--cyan)' },
          { label: 'Pending', value: stats.pending, icon: '⏳', color: '#ffd700' },
          { label: 'Confirmed', value: stats.confirmed, icon: '✅', color: '#00d4ff' },
          { label: 'Delivered', value: stats.delivered, icon: '🚚', color: 'var(--green)' },
        ].map((stat, i) => (
          <div key={i} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h2 className="section-h">📋 Recent Orders</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : recentOrders.length === 0 ? (
          <div className="empty-state">Abhi koi order nahi aaya hai.</div>
        ) : (
          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Naam</th>
                  <th>Phone</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order.name}</td>
                    <td>
                      <a href={`tel:${order.phone}`} style={{ color: 'var(--cyan)' }}>{order.phone}</a>
                    </td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <span className="status-badge" style={{ background: statusColor[order.status] + '22', color: statusColor[order.status] }}>
                        {statusLabel[order.status] || order.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--gray)', fontSize: '12px' }}>
                      {new Date(order.createdAt).toLocaleDateString('hi-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
