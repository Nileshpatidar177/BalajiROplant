import React from 'react';

// ⚠️ OWNER KA NUMBER YAHAN UPDATE KAREIN
const OWNER_PHONE = '919999999999';

const StickyButtons = () => {
  const waMessage = encodeURIComponent(
    'Hello Patidar Ice & RO Services! Mujhe order karna hai. Kripya mujhse contact karein.'
  );

  return (
    <div className="sticky-buttons">
      <a href={`tel:+${OWNER_PHONE}`} className="sticky-btn call-btn">
        📞 Call Now
      </a>
      <a
        href={`https://wa.me/${OWNER_PHONE}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-btn wa-btn"
      >
        💬 WhatsApp
      </a>
    </div>
  );
};

export default StickyButtons;
