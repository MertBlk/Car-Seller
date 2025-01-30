import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <Container className="h-100 d-flex align-items-center justify-content-center">
        <Row className="custom-width">
          
          <Col className="">
            <div>
              <h1 className="mainH ">İstediğiniz Araç</h1>
              <h1 className="mainH ">En Uygun Fiyat</h1>
              <h1 className="mainH ">Hemen Keşfedin!</h1>
              <p className="mainH2 ">İstediğiniz araçı en uygun fiyata bulun.</p>
              
              <Button 
                className="rounded-pill " style={{backgroundColor: '#376497', color: '#fff'}}
                onClick={() => navigate('/products')}
              >
                Araçlara Bak
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;