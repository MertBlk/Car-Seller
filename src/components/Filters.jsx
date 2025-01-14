import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ProductCard from './Card';


function Filters({ 
  selectedBrands, 
  setSelectedBrands,
  selectedFuels,
  setSelectedFuels,
  priceRange,
  setPriceRange,
  yearRange,
  setYearRange,
  onFilterChange 
}) {
  // Sabit veriler
  const brands = [
    { name: 'Alfa Romeo', count: 145, models: ['Giulia (85)', 'Stelvio (60)'] },
    { name: 'BMW', count: 1234, models: ['3 Serisi (420)', '5 Serisi (380)'] },
    { name: 'Mercedes-Benz', count: 2156, models: ['C Serisi (645)', 'E Serisi (534)'] },
    { name: 'Volkswagen', count: 1890, models: ['Golf (320)', 'Passat (280)'] },
    { name: 'Audi', count: 1567, models: ['A3 (220)', 'A4 (180)'] },
    { name: 'Hyundai', count: 1567, models: ['I20N (220)'] }
  ];

  const fuels = [
    { name: 'Benzin', count: 3245 },
    { name: 'Dizel', count: 2876 },
    { name: 'Hybrid', count: 534 },
    { name: 'Elektrik', count: 234 },
    { name: 'Benzin&LPG', count: 456 }
  ];

  // Olay işleyicileri
  const handleBrandSelect = (brandName) => {
    const lowerBrandName = brandName.toLowerCase();
    if (selectedBrands.includes(lowerBrandName)) {
      setSelectedBrands(selectedBrands.filter(b => b !== lowerBrandName));
    } else {
      setSelectedBrands([...selectedBrands, lowerBrandName]);
    }
    onFilterChange();
  };

  const handleModelSelect = (modelName) => {
    if (selectedModels.includes(modelName)) {
      setSelectedModels(selectedModels.filter(m => m !== modelName));
    } else {
      setSelectedModels([...selectedModels, modelName]);
    }
    onFilterChange();
  };

  const handleFuelSelect = (fuelType) => {
    if (selectedFuels.includes(fuelType.toLowerCase())) {
      setSelectedFuels(selectedFuels.filter(f => f !== fuelType.toLowerCase()));
    } else {
      setSelectedFuels([...selectedFuels, fuelType.toLowerCase()]);
    }
    onFilterChange();
  };

  return (
    <div className="filters-menu">
      {/* Kategoriler */}
      <div className="filter-section">
        <div className="filter-header">Kategoriler</div>
        <div className="filter-content">
          <div className="filter-item main-category">
            <span className="category-name">Vasıta</span>
            <span className="count">(8.745)</span>
          </div>
          <div className="filter-item sub-category active">
            <span className="category-name">Otomobil</span>
            <span className="count">(6.234)</span>
          </div>
        </div>
      </div>

      {/* Marka/Model */}
      <div className="filter-section">
        <div className="filter-header">Marka</div>
        <div className="filter-content">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className={`filter-item ${selectedBrands.includes(brand.name.toLowerCase()) ? 'active' : ''}`}
              onClick={() => handleBrandSelect(brand.name)}
            >
              <span className="category-name">{brand.name}</span>
              <span className="count">({brand.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Yakıt */}
      <div className="filter-section">
        <div className="filter-header">Yakıt</div>
        <div className="filter-content">
          {fuels.map((fuel, index) => (
            <div 
              key={index}
              className={`filter-item ${selectedFuels.includes(fuel.name.toLowerCase()) ? 'active' : ''}`}
              onClick={() => handleFuelSelect(fuel.name)}
            >
              {fuel.name} <span className="count">({fuel.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Diğer filtreler benzer şekilde güncellenir */}
    </div>
  );
}

function Products() {
  const [allCars] = useState(cars); // orijinal araç listesi
  const [filteredCars, setFilteredCars] = useState(cars);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });

  useEffect(() => {
    applyFilters();
  }, [selectedBrands, selectedFuels, priceRange, yearRange]);

  const applyFilters = () => {
    let result = [...allCars];

    // Marka filtresi
    if (selectedBrands.length > 0) {
      result = result.filter(car => 
        selectedBrands.map(b => b.toLowerCase()).includes(car.brand.toLowerCase())
      );
    }

    // Yakıt filtresi
    if (selectedFuels.length > 0) {
      result = result.filter(car => 
        selectedFuels.map(f => f.toLowerCase()).includes(car.fuel.toLowerCase())
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

export default Filters;