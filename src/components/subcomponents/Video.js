import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Frame5 from '../../assets/Frame5.png';

const Video = () => {
  return (
        <Container fluid className="products-section" style={{ padding: '100px 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '150px', color: '#1A5319', fontWeight: '700', fontSize: '45px' }}>How to use ?</h2>
      <Row style={{ justifyContent: 'center', background: `url(${Frame5})`, backgroundPositionY: 'center', backgroundSize: 'contain', backgroundRepeat: 'none', position: 'relative', zIndex: 1 }}>
        
        <Col md={3} style={{ position: 'relative', zIndex: 2 }}>
        <Card >
        <Card.Body style={{ position: 'relative', paddingBottom: '56.25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>    
                  <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    title="How to use video"
                    style={{ position: 'absolute', top: '-50%', left: '-50%', translateX: '-150%', width: '190%', height: '190%' }}
                  ></iframe>
    
                </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

export default Video