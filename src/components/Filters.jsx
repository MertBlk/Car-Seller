import React from 'react';
import { Form } from 'react-bootstrap';

function Filters() {
  const brands = [
    { name: 'Alfa Romeo', count: 145, models: ['Giulia (85)', 'Stelvio (60)'] },
    { name: 'BMW', count: 1234, models: ['3 Serisi (420)', '5 Serisi (380)'] },
    { name: 'Mercedes-Benz', count: 2156, models: ['C Serisi (645)', 'E Serisi (534)'] }
  ];

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
          />
          {brands.map((brand, index) => (
            <div key={index} className="brand-item">
              <div className="filter-item">
                <span className="category-name">{brand.name}</span>
                <span className="count">({brand.count})</span>
              </div>
              <div className="model-list">
                {brand.models.map((model, idx) => (
                  <div key={idx} className="filter-item sub-model">
                    <span className="category-name">{model}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fiyat Aralığı */}
      <div className="filter-section">
        <div className="filter-header">Fiyat Aralığı</div>
        <div className="filter-content">
          <div className="d-flex gap-2 mb-2">
            <Form.Control size="sm" type="text" placeholder="min TL" />
            <Form.Control size="sm" type="text" placeholder="max TL" />
          </div>
        </div>
      </div>

      {/* Yıl */}
      <div className="filter-section">
        <div className="filter-header">Yıl</div>
        <div className="filter-content">
          <div className="d-flex gap-2">
            <Form.Control size="sm" type="text" placeholder="min" />
            <Form.Control size="sm" type="text" placeholder="max" />
          </div>
        </div>
      </div>

      {/* Yakıt */}
      <div className="filter-section">
        <div className="filter-header">Yakıt</div>
        <div className="filter-content">
          <div className="filter-item">Benzin <span className="count">(3.245)</span></div>
          <div className="filter-item">Dizel <span className="count">(2.876)</span></div>
          <div className="filter-item">Hybrid <span className="count">(534)</span></div>
          <div className="filter-item">Elektrik <span className="count">(234)</span></div>
        </div>
      </div>
    </div>
  );
}

export default Filters; 
