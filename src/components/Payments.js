import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const Payments = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const getButtonStyle = (buttonId) => {
    return selectedButton === buttonId
      ? { backgroundColor: 'white', color: '#1A5319', border: '2px solid #1A5319', fontSize: '24px', fontWeight: 700, padding: '15px 25px', borderRadius: '12px', width: '45%' }
      : { backgroundColor: '#1A5319', color: 'white', border: 'none', fontSize: '24px', fontWeight: 700, padding: '15px 25px', borderRadius: '12px', width: '45%' };
  };

  const getDivStyle = (buttonId) => {
    return selectedButton === buttonId
      ? { backgroundColor: '#1A5319', color: 'white', border: '2px solid #1A5319', borderRadius: '25px', padding: '30px 10px', margin: '10px 90px' }
      : { backgroundColor: 'white', color: '#1A5319', border: '2px solid #1A5319', borderRadius: '25px', padding: '30px 10px', margin: '10px 90px' };
  };

  const getTextStyle = (buttonId) => {
    return selectedButton === buttonId
      ? { marginLeft: '15px', color: 'white', fontSize: '24px' }
      : { marginLeft: '15px', color: '#1A5319', fontSize: '24px' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('User not logged in.');
      return;
    }
    try {
      const plan = {
        1: { name: 'Basic', draftsLeft: 3 },
        2: { name: 'Advanced', draftsLeft: 10 },
        3: { name: 'Professional', draftsLeft: 30 }
      }[selectedButton];
  
      const response = await axios.get(`http://localhost:5000/plans?userId=${user.id}`);
      if (response.data.length > 0) {
        // Plan exists, update it
        await axios.put(`http://localhost:5000/plans/${response.data[0].id}`, { userId: user.id, ...plan });
      } else {
        // Plan does not exist, create a new one
        await axios.post(`http://localhost:5000/plans`, { userId: user.id, ...plan });
      }
      alert('Plan updated successfully!');
      navigate('/basket');
    } catch (error) {
      alert('Error updating plan.');
    }
  };
  
  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center" style={{ marginTop: '90px', color: '#1A5319', fontWeight: 700 }}>
        <Col md={6}>
          <div className="d-flex flex-column" >
            {[
              { id: 1, name: 'Basic', price: '4.99 EUR' },
              { id: 2, name: 'Advanced', price: '9.99 EUR' },
              { id: 3, name: 'Professional', price: '19.99 EUR' }
            ].map((plan) => (
              <div
                key={plan.id}
                className="d-flex align-items-center justify-content-start"
                style={getDivStyle(plan.id)}
              >
                <Form.Check 
                  type="checkbox" 
                  className="payments-checkbox" 
                  style={{ marginRight: '10px', padding: '0 20px' }} 
                  checked={selectedButton === plan.id} 
                  onChange={() => handleButtonClick(plan.id)} 
                />
                <Button
                  variant="primary"
                  style={getButtonStyle(plan.id)}
                  onClick={() => handleButtonClick(plan.id)}
                >
                  {plan.name}
                </Button>
                <span style={getTextStyle(plan.id)}>{plan.price}</span>
              </div>
            ))}
          </div>
          <Form.Group controlId="formVoucherCode" style={{ margin: '10px 90px', textAlign: 'left' }}>
            <Form.Label style={{ fontWeight: 600, fontSize: '18px' }}>Voucher Code</Form.Label>
            <Form.Control type="text" style={{ border: '1px solid #1A5319', width: '50%' }} />
          </Form.Group>
        </Col>
        <Col md={6} style={{ borderLeft: '2px solid #1A5319' }}>
          <Form style={{ padding: '60px 100px', textAlign: 'left' }} onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="d-flex">
              <div style={{ flex: 1, marginRight: '10px' }}>
                <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>First Name*</Form.Label>
                <Form.Control type="text" style={{ border: '1px solid #1A5319' }} required />
              </div>
              <div style={{ flex: 1 }}>
                <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>SurName*</Form.Label>
                <Form.Control type="text" style={{ border: '1px solid #1A5319' }} required />
              </div>
            </Form.Group>
            <Form.Group controlId="formName" className="d-flex" style={{ marginTop: '20px' }}>
              <div style={{ flex: 1, marginRight: '10px' }}>
                <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Street*</Form.Label>
                <Form.Control type="text" style={{ border: '1px solid #1A5319' }} required />
              </div>
              <div style={{ flex: 1 }}>
                <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>House Number*</Form.Label>
                <Form.Control type="text" style={{ border: '1px solid #1A5319' }} required />
              </div>
            </Form.Group>
            <Form.Group controlId="formName" className="d-flex" style={{ marginTop: '20px' }}>
              <div style={{ flex: 1, marginRight: '10px' }}>
                <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Postal Code*</Form.Label>
                <Form.Control type="text" style={{ border: '1px solid #1A5319' }} required />
              </div>
              <div style={{ flex: 1 }}>
                <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>City*</Form.Label>
                <Form.Control type="text" style={{ border: '1px solid #1A5319' }} required />
              </div>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{
                marginTop: '20px',
                width: '100%',
                backgroundColor: '#1A5319',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '20px',
              }}
            >
              Pay With PayPal
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Payments;