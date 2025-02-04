import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ProductCard from './Card';
import carOptions from '../data/carOptions.json';

function Filters({ selectedBrands, setSelectedBrands, selectedFuels, setSelectedFuels, ...props }) {
  const [expandedBrand, setExpandedBrand] = useState(null);

  const brands = Object.keys(carOptions.carSeries).map(brand => ({
    name: brand,
    series: Object.keys(carOptions.carSeries[brand])
  }));

  const fuels = carOptions.fuelTypes.map(fuel => ({
    name: fuel,
    count: Math.floor(Math.random() * 1000) + 100 // Örnek sayı
  }));

  // Olay işleyicileri
  const handleBrandSelect = (brandName) => {
    if (expandedBrand === brandName) {
      setExpandedBrand(null);
    } else {
      setExpandedBrand(brandName);
    }
    
    if (selectedBrands.includes(brandName.toLowerCase())) {
      setSelectedBrands(selectedBrands.filter(b => b !== brandName.toLowerCase()));
    } else {
      setSelectedBrands([...selectedBrands, brandName.toLowerCase()]);
    }
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

      {/* Marka/Seri */}
      <div className="filter-section">
        <div className="filter-header">Marka/Seri</div>
        <div className="filter-content">
          {brands.map((brand) => (
            <div key={brand.name} className="brand-section">
              <div 
                className={`filter-item ${selectedBrands.includes(brand.name.toLowerCase()) ? 'active' : ''}`}
                onClick={() => handleBrandSelect(brand.name)}
              >
                <span>{brand.name}</span>
                <span className="expand-icon">
                  {expandedBrand === brand.name ? '' : ''}
                </span>
              </div>
              
              {expandedBrand === brand.name && (
                <div className="series-list">
                  {brand.series.map((series) => (
                    <div key={series} className="series-item">
                      {series}
                    </div>
                  ))}
                </div>
              )}
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
              onClick={() => setSelectedFuels(prev => 
                prev.includes(fuel.name.toLowerCase()) 
                  ? prev.filter(f => f !== fuel.name.toLowerCase())
                  : [...prev, fuel.name.toLowerCase()]
              )}
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