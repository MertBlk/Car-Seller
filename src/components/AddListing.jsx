import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';

function AddListing() {
  const navigate = useNavigate();
  
  // State tanımlamaları
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    series: '',
    year: '',
    fuel: '',
    km: '',
    price: '',
    color: '',
    transmission: '',
    damage: '0',
    description: '',
    engineSize: '',
    enginePower: '',
    warranty: false,
    exchange: false,
    bodyType: '',
    traction: '',
    condition: 'used',
    features: [],
    lastMaintenance: '',
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [carOptions, setCarOptions] = useState({
    carFeatures: {
      safety: [],
      comfort: [],
      interior: [],
      multimedia: []
    },
    bodyTypes: [],
    tractionTypes: [],
    fuelTypes: [],
    transmissionTypes: [],
    colors: [],
    conditions: [],
    carSeries: {}
  });

  useEffect(() => {
    const loadCarOptions = async () => {
      try {
        const response = await import('../data/carOptions.json');
        setCarOptions(response.default);
      } catch (error) {
        console.error('Araç seçenekleri yüklenemedi:', error);
      }
    };

    loadCarOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formDataToSend = new FormData();
      const newCar = {
        ...formData,
        features: selectedFeatures,
        listingDate: new Date().toISOString().split('T')[0]
      };

      // Form verilerini ekle
      Object.keys(newCar).forEach(key => {
        if (key === 'features') {
          formDataToSend.append(key, JSON.stringify(selectedFeatures));
        } else if (key !== 'images') {
          formDataToSend.append(key, 
            typeof newCar[key] === 'object' 
              ? JSON.stringify(newCar[key]) 
              : newCar[key]
          );
        }
      });

      // Resimleri ekle
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image${index + 1}`, image);
      });

      const response = await fetch('http://localhost:3001/api/cars', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server yanıtı:', errorText);
        throw new Error('İlan eklenirken bir hata oluştu');
      }

      const responseData = await response.json();
      navigate('/products');
    } catch (error) {
      console.error('Hata:', error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Model ve seri seçimlerini sıfırla
      ...(name === 'brand' ? { model: '', series: '' } : {}),
      ...(name === 'model' ? { series: '' } : {})
    }));
    
    if (!value) {
      setErrors(prev => ({...prev, [name]: 'Bu alan boş bırakılamaz'}));
    } else {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const handleFeaturesChange = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  // Veriler yüklenene kadar loading göster
  if (!carOptions) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="add-listing-container">
      <h1>İlan Ver</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Marka</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            >
              <option value="">Seçiniz</option>
              {carOptions?.carSeries && Object.keys(carOptions.carSeries).map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Model</label>
            <select
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              disabled={!formData.brand}
            >
              <option value="">Seçiniz</option>
              {formData.brand && carOptions?.carSeries?.[formData.brand] &&
                Object.keys(carOptions.carSeries[formData.brand]).map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Seri</label>
            <select
              name="series"
              value={formData.series}
              onChange={handleChange}
              required
              disabled={!formData.model}
            >
              <option value="">Seçiniz</option>
              {formData.brand && formData.model && 
                carOptions.carSeries[formData.brand]?.[formData.model]?.map(series => (
                  <option key={series} value={series}>{series}</option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Yıl</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={errors.year ? 'error' : ''}
            />
            {errors.year && <div className="error-message">{errors.year}</div>}
          </div>
          <div className="form-group">
            <label>Vites</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className={errors.transmission ? 'error' : ''}
            > 
            <option value="">Seçiniz</option>
            <option value="Manuel">Manuel</option>
            <option value="Otomatik">Otomatik</option>
            <option value="Yarı Otomatik">Yarı Otomatik</option>
            </select>
            {errors.transmission && <div className="error-message">{errors.transmission}</div>}
            </div>

          <div className="form-group">
            <label>Yakıt</label>
            <select
              name="fuel"
              value={formData.fuel}
              onChange={handleChange}
              className={errors.fuel ? 'error' : ''}
            >
              <option value="">Seçiniz</option>
              {carOptions.fuelTypes.map(fuel => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>
            {errors.fuel && <div className="error-message">{errors.fuel}</div>}
          </div>
          

          <div className="form-group">
            <label>KM</label>
            <input
              type="number"
              name="km"
              value={formData.km}
              onChange={handleChange}
              className={errors.km ? 'error' : ''}
            />
            {errors.km && <div className="error-message">{errors.km}</div>}
          </div>

          <div className="form-group">
            <label>Fiyat</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
          </div>

          <div className="form-group">
            <label>Renk</label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={errors.color ? 'error' : ''}
            >
              <option value="">Seçiniz</option>
              <option value="Beyaz">Beyaz</option>
              <option value="Siyah">Siyah</option>
              <option value="Gri">Gri</option>
              <option value="Kırmızı">Kırmızı</option>
              <option value="Mavi">Mavi</option>
              <option value="Yeşil">Yeşil</option>
              <option value="Diğer">Diğer</option>
            </select>
            {errors.color && <div className="error-message">{errors.color}</div>}
          </div>

          <div className="form-group">
            <label>Hasar Kaydı</label>
            <select
              name="damage"
              value={formData.damage}
              onChange={handleChange}
              className={errors.damage ? 'error' : ''}
            >
              <option value="">Seçiniz</option>
              <option value="Var">Var</option>
              <option value="Yok">Yok</option>
              <option value="Değişen Parça">Değişen Parça</option>
              <option value="Boyalı">Boyalı</option>
            </select>
            {errors.damage && <div className="error-message">{errors.damage}</div>}
          </div>

          <div className="form-group">
            <label>Motor Hacmi (cc)</label>
            <input
              type="number"
              name="engineSize"
              value={formData.engineSize}
              onChange={handleChange}
              placeholder="Örn: 1598"
            />
          </div>

          <div className="form-group">
            <label>Motor Gücü (HP)</label>
            <input
              type="number"
              name="enginePower"
              value={formData.enginePower}
              onChange={handleChange}
              placeholder="Örn: 136"
            />
          </div>

          <div className="form-group">
            <label>Kasa Tipi</label>
            <select
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              required
            >
              <option value="">Seçiniz</option>
              {carOptions.bodyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Çekiş</label>
            <select
              name="traction"
              value={formData.traction}
              onChange={handleChange}
              required
            >
              <option value="">Seçiniz</option>
              {carOptions.tractionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Araç Durumu</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="new">Sıfır</option>
              <option value="used">İkinci El</option>
            </select>
          </div>

          <div className="form-group">
            <label>Takas</label>
            <select
              name="exchange"
              value={formData.exchange}
              onChange={handleChange}
              className={errors.exchange ? 'error' : ''}
            >
              <option value="">Seçiniz</option>
              <option value="Var">Var</option>
              <option value="Yok">Yok</option>
            </select>
            {errors.exchange && <div className="error-message">{errors.exchange}</div>}
          </div>

          <div className="form-group">
            <label>Son Bakım Tarihi</label>
            <input
              type="date"
              name="lastMaintenance"
              value={formData.lastMaintenance}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Araç Özellikleri</label>
          <div className="features-grid">
            {Object.entries(carOptions.carFeatures).map(([category, features]) => (
              <div key={category} className="feature-category">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                {features.map(feature => (
                  <div key={feature} className="feature-item">
                    <input
                      type="checkbox"
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeaturesChange(feature)}
                    />
                    <label htmlFor={feature}>{feature}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>


        <div className="form-group image-upload">
          <label>
            <FiUpload className="upload-icon" />
            Resim Ekle
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </label>
          
          <div className="image-preview">
            {Array.isArray(formData.images) && formData.images.map((image, index) => (
              <div key={index} className="preview-item">
                <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'İlanı Yayınla'}
        </button>

        {submitError && (
          <div className="error-message">
            {submitError}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddListing;