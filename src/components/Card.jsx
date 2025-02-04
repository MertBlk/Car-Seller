import { useState } from "react";
import { FiStar, FiShare2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ProductCard({ car }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Tüm resimleri car.images ve car.image1, car.image2 gibi alanlardan topla
  const images = [...(car.images || []), car.image, car.image1, car.image2, car.image3].filter(Boolean);
  
  // Eğer hiç resim yoksa varsayılan bir resim ekle
  const defaultImage = "https://via.placeholder.com/300x200?text=No+Image";
  const [currentImage, setCurrentImage] = useState(images.length > 0 ? 0 : null);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleCardClick = () => {
    const completeData = {
      ...car,
      images,
    };
    navigate(`/arac/${car.id}?data=${encodeURIComponent(JSON.stringify(completeData))}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="Car" onClick={handleCardClick}>
      <div className="image-container">
        <button className={`favorite-btn ${isFavorite ? "active" : ""}`} onClick={handleFavoriteClick}>
          <FiStar size={20} className={isFavorite ? "filled" : ""} />
        </button>

        {images.length > 1 && (
          <button className="slider-btn left" onClick={prevImage}>
            <FiChevronLeft />
          </button>
        )}

        <img
          src={currentImage !== null ? images[currentImage] : defaultImage}
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
        <h3 className="car-title">
          {car.brand} {car.model}
        </h3>
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
