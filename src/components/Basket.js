import React, { useState, useEffect } from 'react';
import Products from './subcomponents/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Basket = () => {
  const [view, setView] = useState('view1');
  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    street: '',
    postalCode: '',
    city: '',
    workExperience: '',
    education: '',
    furtherSkills: ''
  });
  const [products, setProducts] = useState(false);
  const [plan, setPlan] = useState(null); // State to store user's plan
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Fetch user's plan and drafts left
      axios.get(`http://localhost:5000/plans?userId=${user.id}`)
        .then(response => {
          setPlan(response.data[0]); // Assuming the response is an array
        })
        .catch(error => {
          console.error('Error fetching user plan:', error);
        });
    }
  }, [user, navigate]);

  const buttonStyle = (isSelected) => ({
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    backgroundColor: isSelected ? 'white' : '#1A5319',
    color: isSelected ? '#1A5319' : 'white',
    padding: '80px 35px',
    fontSize: '24px',
    fontWeight: 700,
    border: 'none',
    borderRadius: '20px 0 0 20px'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('User not logged in.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/userInfo', { ...formData, userId: user.id });
      await axios.put(`http://localhost:5000/users/${user.id}`, formData); // Save form data to db.json
      alert('Information saved successfully!');
      setFormData({
        firstName: '',
        surName: '',
        street: '',
        postalCode: '',
        city: '',
        workExperience: '',
        education: '',
        furtherSkills: ''
      });
    } catch (error) {
      alert('Error saving information.');
    }
  };
  
  const handleStart = () => {
    if (user) {
      navigate('/payments');
    } else {
      navigate('/login');
    }
  };

  const handleUpgrade = () => {
    navigate('/payments');
  };

  return (
    <div style={{ marginTop: '50px'}}>
      <Container fluid>
        <Row>
          <Col xs={2} className="d-flex flex-column align-items-start" style={{ backgroundColor: '#f8f9fa', height: '100vh', paddingLeft: 0, display: 'flex', justifyContent: 'center' }}>
            <Button variant="primary" className="mb-2" onClick={() => setView('view1')} style={buttonStyle(view === 'view1')}>Profile</Button>
            <Button variant="secondary" onClick={() => setView('view2')} style={buttonStyle(view === 'view2')}>Your Cover Letter</Button>
          </Col>
          <Col xs={10}>
            {view === 'view1' ? (
              <div style={{marginRight: '10%'}}> {plan && (
                <Row className="align-items-center" style={{ backgroundColor: '#D6EFD8', padding: '20px 50px', margin: '30px 0px', borderRadius: '15px', justifyContent: 'space-evenly', gap: '05%' }}>
                  <Col className="text-right" style={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="primary" style={{ padding: '12px 50px', borderRadius: '10px', border: '2px solid #1A5319', fontSize: '20px', fontWeight: 700, color: 'black', background: '#508D4E', marginRight: '20px' }}>{plan?.name || 'None'}</Button>
                    <p style={{ color: '#1A5319', fontSize: '20px', fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>Drafts left {plan?.draftsLeft || '0'}</p>
                  </Col>
                  <Col className="text-right">
                  <Button variant="secondary" style={{ borderRadius: '10px', border: '1px solid #1A5319', color: '#1A5319', background: 'transparent', fontSize: '20px', fontWeight: 700, marginRight: '30px', display: plan.name === 'Professional' && 'none' }} onClick={() => navigate('/payments')}>Upgrade</Button>
                    <Button variant="success" style={{ backgroundColor: '#1A5319', fontSize: '20px', fontWeight: 700, borderRadius: '10px', border: '2px solid #1A5319' }} onClick={() => navigate('/cover')}>Start Generating</Button>
                  </Col>
                </Row>)}
                <Row className='align-items-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: plan ? '0' : '50px' }}>
                  <Button variant="secondary" style={{ height: '50px', width: '50px', borderRadius: '100%', backgroundColor: '#1A5319', fontSize: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setProducts(!products)}>{products ? '-' : '+'}</Button>
                </Row>
                {products && <Products handleStart={handleStart} userPlan={plan?.name} />}
              </div>
            ) : (
              <div>
                <Row>
                  <Col xs={6}>
                    <Form onSubmit={handleSubmit} style={{ backgroundColor: '#D6EFD8', borderRadius: '40px', padding: '20px 60px', textAlign: 'left', margin: "20px 0"}}>
                      <Form.Group controlId="formName" className="d-flex">
                        <div style={{ flex: 1, marginRight: '10px' }}>
                          <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>First Name</Form.Label>
                          <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>SurName</Form.Label>
                          <Form.Control type="text" name="surName" value={formData.surName} onChange={handleChange} />
                        </div>
                      </Form.Group>
                      <Form.Group style={{ marginTop: '20px'}}>
                        <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Street</Form.Label>
                        <Form.Control type="text" name="street" value={formData.street} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group className="d-flex" style={{ marginTop: '20px'}}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                          <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Postal Code</Form.Label>
                          <Form.Control type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>City</Form.Label>
                          <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} />
                        </div>
                      </Form.Group>
                      <Form.Group style={{ marginTop: '20px'}}>
                        <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Work Experience
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                Please provide details about your previous work experience.
                              </Tooltip>
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                          </OverlayTrigger>
                        </Form.Label>
                        <Form.Control as="textarea" rows={5} name="workExperience" value={formData.workExperience} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group style={{ marginTop: '20px'}}>
                        <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Education</Form.Label>
                        <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                Please provide details about your education.
                              </Tooltip>
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                          </OverlayTrigger>
                      <Form.Control as="textarea" rows={5} name="education" value={formData.education} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group style={{ marginTop: '20px'}}>
                        <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Further Skills</Form.Label>
                        <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                Please provide details about your skills.
                              </Tooltip>
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                          </OverlayTrigger>
                        <Form.Control as="textarea" rows={5} name="furtherSkills" value={formData.furtherSkills} onChange={handleChange} />
                      </Form.Group>
                      <Button variant="primary" type="submit" style={{ background: '#1A5319', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', marginTop: '50px', border: 'none' }}>Save</Button>
                    </Form>
                  </Col>
                  <Col xs={6}>
                  <p style={{ color: '#1A5319', fontSize: '24px', lineHeight: '30px', fontWeight: 500, margin: "100px 50px", textAlign: 'left'}}>Complete your application profile by adding information about you and your qualifications.</p>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Basket;