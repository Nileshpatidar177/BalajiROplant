import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', form);
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb o1"></div>
        <div className="login-orb o2"></div>
      </div>
      <div className="login-card">
        <div className="login-logo">❄️</div>
        <h1 className="login-title">Admin Login</h1>
        <p className="login-sub">Patidar Ice & RO Services</p>

        {error && <div className="login-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="admin"
              required
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '⏳ Login ho raha hai...' : '🔐 Login Karein'}
          </button>
        </form>

        <p className="login-hint">Default: admin / admin123<br/>(Backend .env mein change karein)</p>
      </div>
    </div>
  );
};

export default Login;
