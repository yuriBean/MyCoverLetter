import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1A5319', color: 'white', padding: '10px 0', textAlign: 'center', marginTop: '100px'}}>
      <Container>
        <h2 style={{ marginTop: '100px', fontSize: '36px', fontWeight: 700 }}>MYCOVERLETTER</h2>
        <p style={{ marginBottom: '40px', padding: '50px 200px', fontWeight: 400, fontSize: '20px', lineHeight: '32px' }}>Lorem ipsum dolor sit amet consectetur. Mi nibh venenatis in suscipit turpis enim cursus vulputate amet. Lobortis mi platea aliquam senectus tempus mauris neque.
         <br></br>(434) 546-4356
         <br></br>Email Address
        </p>
        <hr style={{ marginBottom: '40px' }} />
        <Row>
          <Col md={4} style={{ textAlign: 'left' }}>
            <p>© 2024 All rights reserved</p>
          </Col>
          <Col md={4}>
            <p>
              <a href="#terms" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Terms</a>
              <a href="#privacy" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Privacy</a>
              <a href="#cookies" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Cookies</a>
            </p>
          </Col>
          <Col md={4} style={{ textAlign: 'right' }}>
            <FaFacebook style={{ margin: '0 10px', backgroundColor: 'white', color: 'black', borderRadius: '50%', padding: '10px', fontSize: '40px' }} />
            <FaTwitter style={{ margin: '0 10px', backgroundColor: 'white', color: 'black', borderRadius: '50%', padding: '10px', fontSize: '40px' }} />
            <FaInstagram style={{ margin: '0 10px', backgroundColor: 'white', color: 'black', borderRadius: '50%', padding: '10px', fontSize: '40px' }} />
            <FaYoutube style={{ margin: '0 10px', backgroundColor: 'white', color: 'black', borderRadius: '50%', padding: '10px', fontSize: '40px' }} />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
