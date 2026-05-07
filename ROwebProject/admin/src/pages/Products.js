import React, { useState, useEffect } from 'react';
import API from '../services/api';
import './AdminProducts.css';

const EMPTY_FORM = { name: '', category: 'ice', retailPrice: '', wholesalePrice: '', unit: 'per block', description: '', emoji: '🧊', available: true };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products/all');
      setProducts(res.data);
    } catch {
      const res2 = await API.get('/products');
      setProducts(res2.data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); };
  const openEdit = (p) => {
    setForm({ name: p.name, category: p.category, retailPrice: p.retailPrice, wholesalePrice: p.wholesalePrice, unit: p.unit, description: p.description, emoji: p.emoji, available: p.available });
    setEditId(p._id);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        const res = await API.put(`/products/${editId}`, form);
        setProducts(prev => prev.map(p => p._id === editId ? res.data : p));
      } else {
        const res = await API.post('/products', form);
        setProducts(prev => [res.data, ...prev]);
      }
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      alert('Save nahi ho saka: ' + (err.response?.data?.message || err.message));
    }
    setSaving(false);
  };

  const toggleAvailability = async (p) => {
    try {
      const res = await API.put(`/products/${p._id}`, { ...p, available: !p.available });
      setProducts(prev => prev.map(x => x._id === p._id ? res.data : x));
    } catch { alert('Update failed.'); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Ye product delete karein?')) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch { alert('Delete failed.'); }
  };

  return (
    <div className="admin-products">
      <div className="ap-header">
        <div>
          <h1 className="page-title">🧊 Products Management</h1>
          <p className="page-sub">Products add karo, daam badlo, availability set karo</p>
        </div>
        <button className="add-btn" onClick={openAdd}>+ Naya Product</button>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? '✏️ Product Edit Karein' : '➕ Naya Product'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSave} className="product-form">
              <div className="pf-row">
                <div className="pf-group">
                  <label>Emoji</label>
                  <input type="text" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} placeholder="🧊" />
                </div>
                <div className="pf-group flex3">
                  <label>Product Naam *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Barf Block Badi" required />
                </div>
              </div>
              <div className="pf-row">
                <div className="pf-group">
                  <label>Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="ice">🧊 Barf</option>
                    <option value="water">💧 RO Paani</option>
                    <option value="icecream">🍦 Ice Cream</option>
                  </select>
                </div>
                <div className="pf-group">
                  <label>Unit</label>
                  <input type="text" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} placeholder="per block" />
                </div>
              </div>
              <div className="pf-row">
                <div className="pf-group">
                  <label>Retail Price (₹) *</label>
                  <input type="number" value={form.retailPrice} onChange={e => setForm({ ...form, retailPrice: e.target.value })} placeholder="80" required />
                </div>
                <div className="pf-group">
                  <label>Wholesale Price (₹) *</label>
                  <input type="number" value={form.wholesalePrice} onChange={e => setForm({ ...form, wholesalePrice: e.target.value })} placeholder="65" required />
                </div>
              </div>
              <div className="pf-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Product ki details..." rows={3} />
              </div>
              <div className="pf-check">
                <input type="checkbox" id="avail" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} />
                <label htmlFor="avail">Available hai (customers ko dikhao)</label>
              </div>
              <div className="pf-actions">
                <button type="button" className="pf-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="pf-save" disabled={saving}>{saving ? 'Saving...' : editId ? '💾 Update Karein' : '✅ Add Karein'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Products load ho rahe hain...</div>
      ) : (
        <div className="products-grid-admin">
          {products.map(p => (
            <div key={p._id} className={`product-card-admin ${!p.available ? 'inactive' : ''}`}>
              <div className="pca-top">
                <span className="pca-emoji">{p.emoji}</span>
                <div className="pca-info">
                  <h3>{p.name}</h3>
                  <span className="pca-cat">{p.category}</span>
                </div>
                <div className={`avail-dot ${p.available ? 'on' : 'off'}`}></div>
              </div>
              <div className="pca-prices">
                <div className="price-box">
                  <span className="price-lbl">Retail</span>
                  <span className="price-val">₹{p.retailPrice}</span>
                </div>
                <div className="price-box">
                  <span className="price-lbl">Wholesale</span>
                  <span className="price-val">₹{p.wholesalePrice}</span>
                </div>
              </div>
              {p.description && <p className="pca-desc">{p.description}</p>}
              <div className="pca-actions">
                <button className="pca-btn edit" onClick={() => openEdit(p)}>✏️ Edit</button>
                <button className="pca-btn toggle" onClick={() => toggleAvailability(p)}>
                  {p.available ? '🔴 Hide' : '🟢 Show'}
                </button>
                <button className="pca-btn del" onClick={() => deleteProduct(p._id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
