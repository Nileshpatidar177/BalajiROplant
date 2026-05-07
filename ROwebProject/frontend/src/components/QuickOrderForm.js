import React, { useState } from 'react';
import axios from 'axios';
import './QuickOrderForm.css';

// ⚠️ OWNER KA WHATSAPP NUMBER YAHAN UPDATE KAREIN
const OWNER_WA = '919999999999';

const QuickOrderForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    product: 'Ice Block',
    quantity: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const products = [
    'Ice Block (Badi)',
    'Ice Block (Choti)',
    'Ice Cream (Box)',
    'RO Water Tank (Small - 20L)',
    'RO Water Tank (Large - 200L)',
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.quantity || !form.address) {
      alert('Kripya saari details bharein!');
      return;
    }

    setLoading(true);

    // WhatsApp par order bhejna
    const waText = encodeURIComponent(
      `🧊 *NAYA ORDER - Patidar Ice & RO Services*\n\n` +
      `👤 *Naam:* ${form.name}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `🛒 *Product:* ${form.product}\n` +
      `📦 *Quantity:* ${form.quantity}\n` +
      `📍 *Address:* ${form.address}\n\n` +
      `_Please confirm the order._`
    );

    // Backend mein save karna (order history ke liye)
    try {
      await axios.post('/api/orders', form);
    } catch (err) {
      console.log('Backend save failed, but WhatsApp will work');
    }

    setLoading(false);
    setSuccess(true);

    // WhatsApp open karein
    window.open(`https://wa.me/${OWNER_WA}?text=${waText}`, '_blank');

    // Form reset
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: '', phone: '', product: 'Ice Block (Badi)', quantity: '', address: '' });
    }, 4000);
  };

  return (
    <section className="order-section">
      <div className="order-container">
        <div className="order-header">
          <h2 className="order-title">⚡ Quick Order Karein</h2>
          <p className="order-subtitle">2 minute mein apna order place karein - directly WhatsApp par jayega!</p>
        </div>

        {success ? (
          <div className="success-msg">
            <div className="success-icon">✅</div>
            <h3>Order Bhej Diya!</h3>
            <p>WhatsApp khul raha hai. Owner se confirm kar lijiye.</p>
          </div>
        ) : (
          <form className="order-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Aapka Naam *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jaise: Ramesh Patidar"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10 digit mobile number"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Product Chuniye *</label>
                <select name="product" value={form.product} onChange={handleChange}>
                  {products.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="text"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Jaise: 5 blocks / 2 tanks"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Delivery Address *</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Poora address likhein - gali, mohalla, landmark"
                rows={3}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '⏳ Bhej Rahe Hain...' : '💬 WhatsApp Par Order Bhejen'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default QuickOrderForm;
