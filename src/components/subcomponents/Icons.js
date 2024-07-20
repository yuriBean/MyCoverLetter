import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Benefit from '../../assets/Benefit.png';
import Benefit2 from '../../assets/Benefit2.png';
import Benefit1 from '../../assets/Benefit1.png';
import icon from '../../assets/icon.png';
import icon1 from '../../assets/icon1.png';

const Icons = () => {

    const images = [
        { src: icon, text: 'Follow a guided process' },
        { src: icon1, text: 'Developed by Experts' },
        { src: Benefit, text: 'Meet German standards' },
        { src: Benefit1, text: 'Tailored to the job ad' },
        { src: Benefit2, text: 'Tailored to the job ad' }
      ];

  return (
    <Container fluid className="image-grid">
    <Row style={{ gap: '30px', margin: '0px 50px'}}>
    {images.map((image, index) => (
      <Col key={index} className="text-center">
        <img src={image.src} alt={`Image ${index + 1}`} className="circular-image" />
        <p style={{ fontSize: '24px', fontWeight: '600', marginTop: '20px', color: 'black' }}>{image.text}</p>
      </Col>
    ))}
  </Row>
      </Container>
  )
}

export default Icons
