import Vector from '../../assets/Vector.png';
import patternIllustration from '../../assets/pattern illustration.png';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from '../../context/UserContext';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGetStarted = () => {
    if (user) {
      navigate('/basket');
    } else {
      navigate('/login', { state: { from: '/basket' } }); // Pass the redirect path
    }
  };

  return (
    <header className="hero-section" style={{ backgroundImage: `url(${Vector})`, backgroundSize: 'cover', backgroundPosition: 'bottom', height: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '100px' }}>
      <Container fluid>
        <Row>
          <Col style={{ paddingLeft: '100px', marginTop: '10%', textAlign: 'left' }} md={6} className="align-left">
            <h1 style={{ color: '#1A5319', fontWeight: '700', fontSize: '45px', marginBottom: '30px' }}>Generate an authentic and individual cover letter in German</h1>
            <Button variant="primary" size="lg" bg="black" style={{ color: 'white', background: 'black', border: 'none', borderRadius: '10px' }} onClick={handleGetStarted}>Get Started</Button>
          </Col>
          <Col md={6} style={{ paddingRight: 0 }}>
            <img src={patternIllustration} alt="Pattern Illustration" style={{ width: '100%', marginRight: 0 }} />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;