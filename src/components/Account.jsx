import React from 'react';
import { FaUser } from 'react-icons/fa';


function Account() {
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
              <p>Kullanıcı Adı</p>
            </div>
            <div className="info-item">
              <label>E-posta</label>
              <p>kullanici@mail.com</p>
            </div>
            <div className="info-item">
              <label>Telefon</label>
              <p>+90 555 555 55 55</p>
            </div>
          </div>
        </div>

        <div className="account-section">
          <h2>İlanlarım</h2>
          <div className="listings-grid">
            {/* İlanlar buraya gelecek */}
          </div>
        </div>

        <div className="account-section">
          <h2>Favorilerim</h2>
          <div className="favorites-grid">
            {/* Favoriler buraya gelecek */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;