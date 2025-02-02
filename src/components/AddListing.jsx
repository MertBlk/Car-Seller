import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import carsData from '../data/cars.json';

function AddListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    fuel: '',
    km: '',
    price: '',
    color: '',
    transmission: '',
    damage: '',
    description: '',
    images: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // İstek 3001 portuna gönderilmeli (backend)
      const response = await fetch('http://localhost:3001/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Sunucu hatası');
      }

      const result = await response.json();
      
      if (result.success) {
        alert('Araç başarıyla eklendi!');
        setFormData({
          brand: '',
          model: '',
          year: '',
          fuel: '',
          km: '',
          price: '',
          color: '',
          transmission: '',
          damage: '',
          description: '',
          images: []
        });
      }
      
    } catch (error) {
      console.error('Hata:', error);
      alert('Araç eklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="add-listing-container">
      <h1>İlan Ver</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Marka</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Yıl</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Yakıt</label>
            <select
              value={formData.fuel}
              onChange={(e) => setFormData({...formData, fuel: e.target.value})}
            >
              <option value="">Seçiniz</option>
              <option value="Benzin">Benzin</option>
              <option value="Dizel">Dizel</option>
              <option value="Benzin&LPG">Benzin & LPG</option>
            </select>
          </div>

          <div className="form-group">
            <label>KM</label>
            <input
              type="number"
              value={formData.km}
              onChange={(e) => setFormData({...formData, km: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Fiyat</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Açıklama</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="form-group full-width">
          <label>Fotoğraflar</label>
          <div className="image-upload">
            <FiUpload size={24} />
            <span>Fotoğraf Yükle</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFormData({...formData, images: e.target.files})}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">İlanı Yayınla</button>
      </form>
    </div>
  );
}

export default AddListing;
