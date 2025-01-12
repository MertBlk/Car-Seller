import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './Card';
import Filters from './Filters';

function Products() {
  const cars = [
    {
      id: 1,
      brand: "Alfa Romeo",
      model: "Giulia",
      year: 2023,
      fuel: "Benzin",
      km: 6100,
      price: 2450000,
      image: "https://i0.shbdn.com/photos/88/53/34/x5_1171885334mo5.jpg",
      image2: "https://i0.shbdn.com/photos/88/53/34/x5_11718853341ye.jpg",
      image3: "https://i0.shbdn.com/photos/88/53/34/x5_11718853341cc.jpg",
    },
    {
      id: 2,
      brand: "Volkswagen",
      model: "Golf",
      year: 2022,
      fuel: "Dizel",
      km: 15000,
      price: 3500000,
      image: "https://i0.shbdn.com/photos/29/12/63/x5_12182912634d1.jpg",
      image2: "https://i0.shbdn.com/photos/29/12/63/x5_12182912634xi.jpg",
      image3: "https://i0.shbdn.com/photos/29/12/63/x5_1218291263pvr.jpg",
    },
    {
      id: 3,
      brand: "Mercedes-Benz",
      model: "C200",
      year: 2016,
      fuel: "Dizel",
      km: 150000,
      price: 1525000,
      image: "https://i0.shbdn.com/photos/38/92/60/x5_1221389260o71.jpg",
      image2: "https://i0.shbdn.com/photos/38/92/60/x5_1221389260h2z.jpg",
      image3: "https://i0.shbdn.com/photos/38/92/60/x5_12213892607es.jpg",
      listingDate: "2024-01-16"
    },
    {
      id: 4,
      brand: "Mercedes-Benz",
      model: "C200",
      year: 2023,
      fuel: "Hybrid",
      km: 5000,
      price: 2750000,
      image: "/GIULIA_MCA_VELOCE_rossa.png",

      listingDate: "2024-01-16"
    },
    {
      id: 5,
      brand: "Mercedes-Benz",
      model: "C200",
      year: 2023,
      fuel: "Hybrid",
      km: 5000,
      price: 2750000,
      image: "/GIULIA_MCA_VELOCE_rossa.png",
      listingDate: "2024-01-16"
    },
    {
      id: 6,
      brand: "Mercedes-Benz",
      model: "C200",
      year: 2023,
      fuel: "Hybrid",
      km: 5000,
      price: 2750000,
      image: "/GIULIA_MCA_VELOCE_rossa.png",
      listingDate: "2024-01-16"
    },
    {
      id: 7,
      brand: "Mercedes-Benz",
      model: "C200",
      year: 2023,
      fuel: "Hybrid",
      km: 5000,
      price: 2750000,
      image: "/GIULIA_MCA_VELOCE_rossa.png",
      listingDate: "2024-01-16"
    },
    {
      id: 8,
      brand: "Mercedes-Benz",
      model: "C200",
      year: 2023,
      fuel: "Hybrid",
      km: 5000,
      price: 2750000,
      image: "/GIULIA_MCA_VELOCE_rossa.png",
      listingDate: "2024-01-16"
    },
  ];

  return (
    <div className="products-container">
      <div className="d-flex">
        <div className="filters-wrapper">
          <Filters />
        </div>

        <div className="cards-wrapper">
          <div className="cards-grid">
            {cars.map((car) => (
              <div key={car.id} className="card-item">
                <ProductCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products; 