import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Account() {
  const [userData] = useState({
    name: "Mert",
    email: "kullanici@mail.com",
    phone: "+90 555 555 55 55",
    listings: [], // İlanlar için boş array
    favorites: [] // Favoriler için boş array
  });

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

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
            {favorites.map((car) => (
              <Link to={`/arac/${car.id}`} key={car.id} className="favorite-card">
                <img src={car.image} alt={`${car.brand} ${car.model}`} />
                <div className="favorite-info">
                  <h3>{car.brand} {car.model}</h3>
                  <p>{car.year} • {car.km}km</p>
                  <p className="price">{car.price} TL</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;