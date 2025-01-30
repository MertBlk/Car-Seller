import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

function Account() {
  const [userData] = useState({
    name: "Mert",
    email: "kullanici@mail.com",
    phone: "+90 555 555 55 55",
    listings: [], // İlanlar için boş array
    favorites: [] // Favoriler için boş array
  });

  return (
    <div className="account-container">
      <div className="account-header">
        <FaUser className="profile-icon" />
        <h1>Hesabım</h1>
      </div>

      <div className="account-content">
        <div className="account-section">
          <h2>Kişisel Bilgiler</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Ad Soyad</label>
              <p>{userData.name}</p>
            </div>
            <div className="info-item">
              <label>E-posta</label>
              <p>{userData.email}</p>
            </div>
            <div className="info-item">
              <label>Telefon</label>
              <p>{userData.phone}</p>
            </div>
          </div>
        </div>

        <div className="account-section">
          <h2>İlanlarım</h2>
          <div className="listings-grid">
            {userData.listings.map((listing, index) => (
              <div key={index}>
                {/* İlan detayları */}
              </div>
            ))}
          </div>
        </div>

        <div className="account-section">
          <h2>Favorilerim</h2>
          <div className="favorites-grid">
            {userData.favorites.map((favorite, index) => (
              <div key={index}>
                {/* Favori detayları */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;