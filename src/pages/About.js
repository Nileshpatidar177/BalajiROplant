import React from 'react';
import Footer from '../components/Footer';
import './About.css';

const About = () => {
  const timeline = [
    { year: '2021', title: 'Shuruaat', desc: 'Chhoti si factory se shuruat ki, pehle 50 customers the.' },
    { year: '2022', title: 'Vistar', desc: 'RO water delivery start ki, 200+ customers tak pahunche.' },
    { year: '2023', title: 'Pragati', desc: 'Ice cream line shuru ki, delivery trucks badhaaye.' },
    { year: '2024', title: 'Aaj', desc: '500+ customers, poore Indore mein delivery available.' },
  ];

  const team = [
    { name: 'Suresh Patidar', role: 'Owner & Founder', emoji: '👨‍💼' },
    { name: 'Factory Staff', role: 'Production Team', emoji: '👷' },
    { name: 'Delivery Boys', role: 'Delivery Team', emoji: '🚚' },
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <div className="hero-badge">🏆 4 Saal ka Safar</div>
          <h1 className="about-title">Hamare Baare Mein</h1>
          <p className="about-tagline">
            "Shudh paani aur taza barf - yahi hamari pehchaan, yahi hamara wada"
          </p>
        </div>
      </div>

      <div className="about-body">
        {/* STORY */}
        <section className="story-section">
          <div className="story-grid">
            <div className="story-text">
              <h2 className="section-heading">Hamari Kahani</h2>
              <p>
                Patidar Ice & RO Services ki shuruaat 2021 mein Indore mein hui thi.
                Founder Suresh Patidar ne dekha ki local log quality barf aur safe paani ke liye
                pareshaan rahte the - tabse unhone decide kiya ki ek bharosemand seva shuru ki jaaye.
              </p>
              <p>
                Aaj hum 500 se zyada customers ko serve karte hain, jinmein ghar, dukaan,
                hotels, aur shaadi ke venues shaamil hain. Hamare paas modern manufacturing unit
                aur advanced RO plant hai jo ISO standards par kaam karta hai.
              </p>
              <p>
                Hamare liye customer satisfaction sabse badi cheez hai. Isliye hum same-day
                delivery, quality guarantee, aur 24/7 WhatsApp support dete hain.
              </p>
            </div>
            <div className="story-facts">
              <div className="fact-card">
                <div className="fact-num">4+</div>
                <div className="fact-text">Saal se seva mein</div>
              </div>
              <div className="fact-card">
                <div className="fact-num">500+</div>
                <div className="fact-text">Khush grahak</div>
              </div>
              <div className="fact-card">
                <div className="fact-num">3</div>
                <div className="fact-text">Products categories</div>
              </div>
              <div className="fact-card">
                <div className="fact-num">100%</div>
                <div className="fact-text">Pure & Hygienic</div>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="timeline-section">
          <h2 className="section-heading center">Hamar Safar</h2>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-year">{t.year}</div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="team-section">
          <h2 className="section-heading center">Hamari Team</h2>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-emoji">{m.emoji}</div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2>Abhi Order Karein!</h2>
          <p>WhatsApp ya call karein - hum turant jawab denge</p>
          <div className="cta-buttons">
            <a href="tel:+919999999999" className="cta-btn call">📞 Call Karein</a>
            <a
              href="https://wa.me/919999999999?text=Hello!%20Mujhe%20order%20karna%20hai."
              target="_blank" rel="noopener noreferrer"
              className="cta-btn wa"
            >
              💬 WhatsApp Karein
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
