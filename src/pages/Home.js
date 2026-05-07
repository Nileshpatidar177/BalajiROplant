import React from 'react';
import { Link } from 'react-router-dom';
import QuickOrderForm from '../components/QuickOrderForm';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const features = [
    { icon: '🧊', title: 'Shudh Barf', desc: 'Saaf paani se bani barf - doodh-wale, hotel, shaadi sabke liye' },
    { icon: '💧', title: 'RO Water', desc: 'Filter shudh paani - ghar aur dukaan par delivery' },
    { icon: '🍦', title: 'Ice Cream', desc: 'Taza aur swadisht ice cream - bulk orders available' },
    { icon: '🚚', title: 'Door Delivery', desc: 'Aapke darwaze par delivery - same day possible' },
  ];

  const trustStats = [
    { number: '4+', label: 'Saal ka Experience' },
    { number: '500+', label: 'Khush Grahak' },
    { number: '24/7', label: 'Order Lene Ka Waqt' },
    { number: '100%', label: 'Shudh & Saaf' },
  ];

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb1"></div>
          <div className="hero-orb orb2"></div>
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}></div>
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">⭐ Indore ka Bharosemand Naam</div>
          <h1 className="hero-title">
            <span className="hero-title-main">Patidar Ice</span>
            <br />
            <span className="hero-title-amp">&</span>{' '}
            <span className="hero-title-ro">RO Services</span>
          </h1>
          <p className="hero-desc">
            Shudh barf, taza ice cream aur saaf RO paani - seedha aapke darwaze tak.<br />
            4 saal se Indore ke log hampar bharosa karte hain. 🏆
          </p>
          <div className="hero-actions">
            <a
              href="https://wa.me/919999999999?text=Hello%20Patidar%20Ice%20%26%20RO%2C%20mujhe%20order%20karna%20hai!"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn primary"
            >
              💬 Abhi Order Karein
            </a>
            <Link to="/products" className="hero-btn secondary">
              📋 Products Dekhein
            </Link>
          </div>
        </div>

        <div className="hero-image-wrap">
          <div className="hero-card-grid">
            <div className="hero-img-card card-ice">
              <div className="card-emoji">🧊</div>
              <div className="card-label">Barf Blocks</div>
            </div>
            <div className="hero-img-card card-water">
              <div className="card-emoji">💧</div>
              <div className="card-label">RO Paani</div>
            </div>
            <div className="hero-img-card card-icecream">
              <div className="card-emoji">🍦</div>
              <div className="card-label">Ice Cream</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="trust-section">
        <div className="trust-grid">
          {trustStats.map((stat, i) => (
            <div key={i} className="trust-item">
              <div className="trust-number">{stat.number}</div>
              <div className="trust-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Hamare Products & Seva</h2>
          <p className="section-sub">Sabse behtar quality, sabse sahi daam - yahi hamari pehchaan hai</p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ORDER FORM */}
      <QuickOrderForm />

      {/* ABOUT STRIP */}
      <section className="about-strip">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title" style={{textAlign:'left'}}>Hamare Baare Mein</h2>
              <p>
                Patidar Ice & RO Services Indore mein 4 saalse apni seva de raha hai.
                Hum pure shudh barf, RO filter paani aur swadisht ice cream provide karte hain.
                Hamare saare products hygienic conditions mein bante hain.
              </p>
              <p style={{marginTop: '16px'}}>
                Chahe shaadi ho, hotel ho, ya ghar ka zaroorat - hum har jagah delivery karte hain.
                Aaj hi call karein ya WhatsApp karein! 📲
              </p>
              <Link to="/about" className="hero-btn primary" style={{display:'inline-block', marginTop:'24px'}}>
                Aur Jaanein →
              </Link>
            </div>
            <div className="about-badges">
              <div className="about-badge">🏆 4 Saal ka Anubhav</div>
              <div className="about-badge">✅ ISO Certified Cleanliness</div>
              <div className="about-badge">🚚 Same Day Delivery</div>
              <div className="about-badge">💯 100% Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
