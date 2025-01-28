import { useLocation } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

function AracDetay() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const carData = params.get('data') ? JSON.parse(decodeURIComponent(params.get('data'))) : null;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!carData) {
    return (
      <div className="white-background">
        <div className="arac-detay">
          <h2>Araç bilgileri yüklenemedi.</h2>
        </div>
      </div>
    );
  }

  const images = carData.images || [carData.image || '/default-car.jpg'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="white-background">
      <div className="arac-detay">
        <div className="image-gallery">
          <div className="main-image">
            {images.length > 1 && (
              <button className="gallery-btn prev" onClick={prevImage}>
                <FiChevronLeft />
              </button>
            )}
            <img 
              src={images[currentImageIndex]} 
              alt={`${carData.brand} ${carData.model}`} 
            />
            {images.length > 1 && (
              <button className="gallery-btn next" onClick={nextImage}>
                <FiChevronRight />
              </button>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="thumbnail-strip">
              {images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Thumbnail ${index + 1}`}
                  className={currentImageIndex === index ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="car-info">
          <h1>{carData.brand} {carData.model}</h1>
          <div className="price">{carData.price} TL</div>
          
          

          <div className="specs-container">
            <div className="spec-item">
              <span className="label">Yıl:</span>
              <span className="value">{carData.year}</span>
            </div>
            <div className="spec-item">
              <span className="label">Kilometre:</span>
              <span className="value">{carData.km}</span>
            </div>
            <div className="spec-item">
              <span className="label">Yakıt:</span>
              <span className="value">{carData.fuel}</span>
            </div>
            <div className="spec-item">
              <span className="label">Vites:</span>
              <span className="value">{carData.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="label">Renk:</span>
              <span className="value">{carData.color}</span>
            </div>
            <div className="spec-item">
              <span className="label">Hasar:</span>
              <span className="value">{carData.damage}</span>
            </div>
          </div>

          {carData.listingDate && (
            <div className="listing-date">
              <span className="label">İlan Tarihi:</span>
              <span className="value">
                {new Date(carData.listingDate).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}

          {carData.description && (
            <div className="description">
              <h2>Açıklama</h2>
              <p>{carData.description}</p>
            </div>
            
            
          )}

         
        </div>
      </div>
    </div>
  );
}

export default AracDetay;