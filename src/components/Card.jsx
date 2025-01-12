import { useState } from 'react';
import { FiHeart, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function ProductCard({ car }) {
  const [currentImage, setCurrentImage] = useState(0);
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
    images: images, // Filtrelenmiş resim dizisi
    description: car.description || `${car.brand} ${car.model} ${car.year} model, ${car.fuel} yakıt tipli, ${car.km.toLocaleString('tr-TR')} KM'de.`, // Varsayılan açıklama
    listingDate: car.listingDate
  };

  return (
    <div className="Car">
      <div className="image-container">
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
        <div className="car-price">{car.price.toLocaleString('tr-TR')} TL</div>
        <div className="car-specs">
          <span>{car.year}</span>
          <span>•</span>
          <span>{car.fuel}</span>
          <span>•</span>
          <span>{car.km.toLocaleString('tr-TR')} KM</span>
        </div>
        <Link 
          to={`/arac/${car.id}?data=${encodeURIComponent(JSON.stringify(carData))}`} 
          className="incele-btn"
        >
          İncele
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
