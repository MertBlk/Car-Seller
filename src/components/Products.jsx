import React, { useState, useEffect } from 'react';
import ProductCard from './Card';
import Filters from './Filters';
import carsData from '../data/cars.json';

function Products() {
  const [allCars] = useState(carsData.cars);
  const [filteredCars, setFilteredCars] = useState(carsData.cars);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });

  const applyFilters = () => {
    let result = [...allCars];

    // Marka filtresi
    if (selectedBrands.length > 0) {
      result = result.filter(car => 
        selectedBrands.includes(car.brand.toLowerCase())
      );
    }

    // Yakıt filtresi
    if (selectedFuels.length > 0) {
      result = result.filter(car => 
        selectedFuels.includes(car.fuel.toLowerCase())
      );
    }

    // Fiyat aralığı
    if (priceRange.min) {
      result = result.filter(car => car.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(car => car.price <= Number(priceRange.max));
    }

    // Yıl aralığı
    if (yearRange.min) {
      result = result.filter(car => car.year >= Number(yearRange.min));
    }
    if (yearRange.max) {
      result = result.filter(car => car.year <= Number(yearRange.max));
    }

    setFilteredCars(result);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedBrands, selectedFuels, priceRange, yearRange]);

  return (
    <div className="products-container">
      <div className="d-flex">
        <div className="filters-wrapper">
          <Filters 
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedFuels={selectedFuels}
            setSelectedFuels={setSelectedFuels}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            yearRange={yearRange}
            setYearRange={setYearRange}
            applyFilters={applyFilters} // Yeni prop
          />
        </div>
        <div className="cards-wrapper">
          <div className="cards-grid">
            {filteredCars.map((car) => (
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