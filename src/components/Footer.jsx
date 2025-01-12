import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white pt-5 pb-4">
      <div className="container">
        <div className="d-flex flex-row justify-content-between">
          {/* Hakkımızda */}
          <div className="p-2">
            <h5 className="text-uppercase mb-4 font-weight-bold">Hakkımızda</h5>
            <p>Biz, kaliteli hizmet sunmayı hedefleyen bir firmayız. Yılların tecrübesiyle sektörde lider konuma geldik.</p>
          </div>

          {/* Bağlantılar */}
          <div className="p-2">
            <h5 className="text-uppercase mb-4 font-weight-bold">Bağlantılar</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Ana Sayfa</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Hizmetler</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Ürünler</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>İletişim</a></li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="p-2">
            <h5 className="text-uppercase mb-4 font-weight-bold">İletişim</h5>
            <p><i className="fas fa-home mr-3"></i> İstanbul, Türkiye</p>
            <p><i className="fas fa-envelope mr-3"></i> info@firma.com</p>
            <p><i className="fas fa-phone mr-3"></i> +90 123 456 7890</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Copyright ve Sosyal Medya */}
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div>
            <p>© 2024 Tüm Hakları Saklıdır. <a href="#" className="text-white" style={{ textDecoration: 'none' }}><strong>Firma Adı</strong></a></p>
          </div>
          <div>
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ textDecoration: 'none' }}><i className="fab fa-facebook-f"></i></a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ textDecoration: 'none' }}><i className="fab fa-twitter"></i></a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ textDecoration: 'none' }}><i className="fab fa-instagram"></i></a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ textDecoration: 'none' }}><i className="fab fa-linkedin-in"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
