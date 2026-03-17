import React from 'react';
import { MapPin, Phone } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <img src="/Clinic_logo.png" alt="Clinic Logo" style={{width:"170px", height:"45px"}} />

      <div className="header-right">
        <div className="location-badge">
          <MapPin size={16} color="#157367" />
          Velachery, Chennai
        </div>
        <button className="book-btn-small">
          <Phone size={14} />
          Book: +91 98765 43210
        </button>
      </div>
    </header>
  );
};

export default Header;
