import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const PersonalInfo = ({ nextStep }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    surname: '',
    first_name: '',
    street: '',
    postal_code: '',
    city: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/users/${user.id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNext = () => {
    nextStep({
      first_name: formData.first_name,
      surname: formData.surname,
      street: formData.street,
      postal_code: formData.postal_code,
      city: formData.city,
    });
  };

  return (
    <div style={{ margin: '40px 50px 0px 50px' }}>
      <div className="d-flex align-items-start justify-content-center my-5">
        <Container fluid>
          <Row className="justify-content-center align-items-start w-100">
            <Col xs={7}>
              <Form style={{ backgroundColor: '#D6EFD8', borderRadius: '40px', padding: '70px ', textAlign: 'left', margin: "0px 0px 0px 150px" }}>
                <Form.Group controlId="formName" className="d-flex">
                  <div style={{ flex: 1, marginRight: '10px' }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} style={{ border: '1px solid #1A5319'}} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>SurName</Form.Label>
                    <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} style={{ border: '1px solid #1A5319'}} />
                  </div>
                </Form.Group>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Street</Form.Label>
                  <Form.Control type="text" name="street" value={formData.street} onChange={handleChange} style={{ border: '1px solid #1A5319'}} />
                </Form.Group>
                <Form.Group className="d-flex" style={{ marginTop: '20px' }}>
                  <div style={{ flex: 1, marginRight: '10px' }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Postal Code</Form.Label>
                    <Form.Control type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} style={{ border: '1px solid #1A5319'}} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>City</Form.Label>
                    <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} style={{ border: '1px solid #1A5319'}} />
                  </div>
                </Form.Group>
                <Button variant="primary" onClick={handleNext} style={{ background: '#1A5319', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', marginTop: '50px', border: 'none' }}>Next</Button>
              </Form>
            </Col>
            <Col xs={5} className="d-flex flex-column justify-content-start">
              <div style={{ margin: "0px 40px", fixed: 'top', top: '0', backgroundColor: '#fff', zIndex: 1, paddingTop: '20px' }}>
                <h2 style={{ fontWeight: 700, fontSize: '30px', color: '#1A5319', textAlign: 'left', marginBottom: '20px', cursor: 'pointer' }} onClick={toggleExpand}>
                <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} /> Basic Personal Information 
                </h2>
                {isExpanded && (
                  <p style={{ color: '#1A5319', fontSize: '24px', lineHeight: '30px', fontWeight: 500, textAlign: 'left' }}>
                    Your basic personal information is used to complement the header of the cover letter.
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PersonalInfo;