import React, { useState, useEffect } from 'react';
import API from '../services/api';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    ownerPhone: '919999999999',
    ownerName: 'Suresh Patidar',
    businessHours: 'Subah 6 baje - Raat 10 baje',
    address: 'Indore, Madhya Pradesh',
    welcomeMessage: 'Patidar Ice & RO Services mein aapka swagat hai!',
  });
  const [password, setPassword] = useState({ current: '', newPass: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  useEffect(() => {
    API.get('/settings')
      .then(res => {
        if (res.data && Object.keys(res.data).length) {
          setSettings(prev => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {});
  }, []);

  const saveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        await API.post('/settings', { key, value });
      }
      setMsg('✅ Settings save ho gayi!');
      setTimeout(() => setMsg(''), 3000);
    } catch {
      setMsg('❌ Save nahi ho saki. Try again.');
    }
    setSaving(false);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (password.newPass !== password.confirm) {
      setPwMsg('❌ Naye passwords match nahi karte!');
      return;
    }
    if (password.newPass.length < 6) {
      setPwMsg('❌ Password kam se kam 6 characters ka hona chahiye.');
      return;
    }
    setPwSaving(true);
    // Backend mein password change implement karna hoga - abhi sirf UI hai
    setTimeout(() => {
      setPwMsg('✅ Password change ho gaya! (Backend mein implement karein)');
      setPassword({ current: '', newPass: '', confirm: '' });
      setPwSaving(false);
      setTimeout(() => setPwMsg(''), 4000);
    }, 1000);
  };

  return (
    <div className="settings-page">
      <h1 className="page-title">⚙️ Settings</h1>
      <p className="page-sub">Business details aur admin password manage karein</p>

      <div className="settings-grid">
        {/* Business Settings */}
        <div className="settings-card">
          <h2 className="card-title">🏪 Business Settings</h2>
          {msg && <div className={`set-msg ${msg.startsWith('✅') ? 'success' : 'error'}`}>{msg}</div>}
          <form onSubmit={saveSettings}>
            {[
              { key: 'ownerName', label: 'Owner Ka Naam', placeholder: 'Suresh Patidar' },
              { key: 'ownerPhone', label: 'WhatsApp/Phone Number (Country code ke saath)', placeholder: '919999999999' },
              { key: 'businessHours', label: 'Business Hours', placeholder: 'Subah 6 baje - Raat 10 baje' },
              { key: 'address', label: 'Factory Address', placeholder: 'Indore, MP' },
              { key: 'welcomeMessage', label: 'Website Welcome Message', placeholder: 'Aapka swagat hai!' },
            ].map(field => (
              <div key={field.key} className="set-field">
                <label>{field.label}</label>
                <input
                  type="text"
                  value={settings[field.key] || ''}
                  onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? '⏳ Saving...' : '💾 Settings Save Karein'}
            </button>
          </form>
        </div>

        {/* Password Change */}
        <div className="settings-card">
          <h2 className="card-title">🔐 Password Change</h2>
          {pwMsg && <div className={`set-msg ${pwMsg.startsWith('✅') ? 'success' : 'error'}`}>{pwMsg}</div>}
          <form onSubmit={changePassword}>
            <div className="set-field">
              <label>Current Password</label>
              <input type="password" value={password.current} onChange={e => setPassword({ ...password, current: e.target.value })} placeholder="Purana password" required />
            </div>
            <div className="set-field">
              <label>Naya Password</label>
              <input type="password" value={password.newPass} onChange={e => setPassword({ ...password, newPass: e.target.value })} placeholder="Naya password (min 6 chars)" required />
            </div>
            <div className="set-field">
              <label>Naya Password Confirm Karein</label>
              <input type="password" value={password.confirm} onChange={e => setPassword({ ...password, confirm: e.target.value })} placeholder="Dobara likhein" required />
            </div>
            <button type="submit" className="save-btn" disabled={pwSaving}>
              {pwSaving ? '⏳ Changing...' : '🔑 Password Change Karein'}
            </button>
          </form>

          {/* Quick Info */}
          <div className="info-box">
            <h3>📌 Quick Info</h3>
            <p>• Backend <code>.env</code> file mein <code>ADMIN_PASSWORD</code> change karein</p>
            <p>• <code>JWT_SECRET</code> ko ek unique string se badlein</p>
            <p>• MongoDB URI apna database URL daalo</p>
            <p>• Phone number mein 91 prefix lagaao (India)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
