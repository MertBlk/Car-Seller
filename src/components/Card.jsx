import { useState } from 'react';
import { FiStar, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

function ProductCard({ car }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Tüm resimleri bir dizide topla ve boş olanları filtrele
  const images = [car.image, car.image2, car.image3].filter(Boolean);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Araç verilerini URL'e encode edelim
  const carData = {
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    km: car.km,
    fuel: car.fuel,
    transmission: car.transmission || 'Otomatik', // Varsayılan değer
    color: car.color || 'Belirtilmemiş', // Varsayılan değer
    price: car.price,
    damage: car.damage || 'Belirtilmemiş', // Varsayılan değer
    images: images, // Filtrelenmiş resim dizisi
    description: car.description, // Varsayılan açıklama
    listingDate: car.listingDate,
  };

  const handleCardClick = () => {
    const completeData = {
      ...car,
      series: car.series,
      lastMaintenance: car.lastMaintenance,
      ownerCount: car.ownerCount,
      engineSize: car.engineSize,
      enginePower: car.enginePower,
      bodyType: car.bodyType,
      traction: car.traction,
      condition: car.condition,
      features: car.features || [],
      images: [car.image, car.image2, car.image3].filter(Boolean)
    };
    
    navigate(`/arac/${car.id}?data=${encodeURIComponent(JSON.stringify(completeData))}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Card click event'ini engelle
    setIsFavorite(!isFavorite);
    // Favori işlemleri buraya eklenecek
  };

  return (
    <div 
      className="Car" 
      onClick={handleCardClick} // Card'a tıklanınca yönlendirme
    >
      <div className="image-container">
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          <FiStar 
            size={20} 
            className={isFavorite ? 'filled' : ''}
          />
        </button>

        {images.length > 1 && (
          <button className="slider-btn left" onClick={prevImage}>
            <FiChevronLeft />
          </button>
        )}
        
        <img 
          src={images[currentImage]} 
          alt={`${car.brand} ${car.model}`} 
          className="car-image"
        />
        
        {images.length > 1 && (
          <button className="slider-btn right" onClick={nextImage}>
            <FiChevronRight />
          </button>
        )}
      </div>

      <div className="car-info">
        <h3 className="car-title">{car.brand} {car.model}</h3>
        <div className="car-price">{car.price} TL</div>
        <div className="car-specs">
          <span>{car.year}</span>
          <span>-</span>
          <span>{car.fuel}</span>
          <span>-</span>
          <span>{car.km} KM</span>
        </div>
        
      </div>
    </div>
  );
}

export default ProductCard;
