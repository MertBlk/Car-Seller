import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

function Filters({ onFilterChange }) {
  // States
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [searchBrand, setSearchBrand] = useState('');

  const brands = [
    { name: 'Alfa Romeo', count: 145, models: ['Giulia (85)', 'Stelvio (60)'] },
    { name: 'BMW', count: 1234, models: ['3 Serisi (420)', '5 Serisi (380)'] },
    { name: 'Mercedes-Benz', count: 2156, models: ['C Serisi (645)', 'E Serisi (534)'] }
  ];

  const fuels = [
    { name: 'Benzin', count: 3245 },
    { name: 'Dizel', count: 2876 },
    { name: 'Hybrid', count: 534 },
    { name: 'Elektrik', count: 234 }
  ];

  // Filtreleri uygula
  useEffect(() => {
    onFilterChange({
      brand: selectedBrand,
      model: selectedModel,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      fuel: selectedFuel
    });
  }, [selectedBrand, selectedModel, minPrice, maxPrice, minYear, maxYear, selectedFuel]);

  // Marka arama filtreleme
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchBrand.toLowerCase())
  );

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
          <Form.Control
            size="sm"
            type="text"
            placeholder="Marka ara..."
            className="search-input mb-2"
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
          />
          {filteredBrands.map((brand, index) => (
            <div key={index} className="brand-item">
              <div 
                className={`filter-item ${selectedBrand === brand.name ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand.name)}
              >
                <span className="category-name">{brand.name}</span>
                <span className="count">({brand.count})</span>
              </div>
              {selectedBrand === brand.name && (
                <div className="model-list">
                  {brand.models.map((model, idx) => (
                    <div 
                      key={idx} 
                      className={`filter-item sub-model ${selectedModel === model ? 'active' : ''}`}
                      onClick={() => setSelectedModel(model)}
                    >
                      <span className="category-name">{model}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fiyat Aralığı */}
      <div className="filter-section">
        <div className="filter-header">Fiyat Aralığı</div>
        <div className="filter-content">
          <div className="d-flex gap-2 mb-2">
            <Form.Control 
              size="sm" 
              type="number" 
              placeholder="min TL"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Form.Control 
              size="sm" 
              type="number" 
              placeholder="max TL"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Yıl */}
      <div className="filter-section">
        <div className="filter-header">Yıl</div>
        <div className="filter-content">
          <div className="d-flex gap-2">
            <Form.Control 
              size="sm" 
              type="number" 
              placeholder="min"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
            />
            <Form.Control 
              size="sm" 
              type="number" 
              placeholder="max"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Yakıt */}
      <div className="filter-section">
        <div className="filter-header">Yakıt</div>
        <div className="filter-content">
          {fuels.map((fuel, index) => (
            <div 
              key={index}
              className={`filter-item ${selectedFuel === fuel.name ? 'active' : ''}`}
              onClick={() => setSelectedFuel(fuel.name)}
            >
              {fuel.name} <span className="count">({fuel.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;