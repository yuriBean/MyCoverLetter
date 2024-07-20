import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const EmployerInfo = ({ nextStep, prevStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    company_street: '',
    company_postal_code: '',
    company_city: '',
    job_title: '',
    found_on: '',
    date: '',
    contact_person: '',
    reason_job_search: ''
  });

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

  return (
    <div style={{ margin: '40px 50px 0px 50px' }}>
      <div className="d-flex align-items-center justify-content-center">
        <Container fluid>
          <Row className="justify-content-center align-items-start w-100">
            <Col xs={7} className="d-flex flex-column justify-content-center">
              <Form style={{ backgroundColor: '#D6EFD8', borderRadius: '40px', padding: '70px ', textAlign: 'left', margin: "40px 0px 0px 150px" }}>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Company Name</Form.Label>
                  <Form.Control type="text" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                </Form.Group>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Street</Form.Label>
                  <Form.Control type="text" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="d-flex" style={{ marginTop: '20px' }}>
                  <div style={{ flex: 1, marginRight: '20px' }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Postal Code</Form.Label>
                    <Form.Control type="text" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>City</Form.Label>
                    <Form.Control type="text" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                  </div>
                  </Form.Group>
                  <Form.Group className="d-flex" style={{ marginTop: '20px' }}>
                  <div style={{ flex: 1, marginRight: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Job Title</Form.Label>
                  <Form.Control type="text" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Found On</Form.Label>
                    <Form.Control type="text" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                  </div>
                  </Form.Group>
                
                <Form.Group controlId="formName" className="d-flex" style={{ marginTop: '20px' }}>
                  <div style={{ flex: 1, marginRight: '20px' }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Date of Application</Form.Label>
                    <Form.Control type="date" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Contact Person</Form.Label>
                    <Form.Control type="text" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                  </div>
                </Form.Group>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Reason for Job Search</Form.Label>
                  <Form.Control type="text" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                </Form.Group>
                <div className="d-flex justify-content-between mt-5">
                  <Button variant="primary" onClick={prevStep} style={{ background: 'white', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: '1px #1A5319 solid', color: '#1A5319' }}>Back</Button>
                  <Button variant="primary" onClick={nextStep} style={{ background: '#1A5319', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: 'none' }}>Next</Button>
                </div>
              </Form>
            </Col>
            <Col xs={5} className="d-flex flex-column justify-content-start">
              <div style={{ margin: "30px 40px", fixed: 'top', top: '0', backgroundColor: '#fff', zIndex: 1, paddingTop: '20px' }}>
                <h2 style={{ fontWeight: 700, fontSize: '30px', color: '#1A5319', textAlign: 'left', marginBottom: '20px', cursor: 'pointer' }} onClick={toggleExpand}>
                  <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} /> Basic Employer Information
                </h2>
                {isExpanded && (
                  <ul style={{ color: '#1A5319', fontSize: '24px', lineHeight: '30px', fontWeight: 500, textAlign: 'left' }}>
                    <li>The basic information is mainly used in defining the header of the cover letter.</li>
                    <li>You can obtain this information from the job ad directly or from the company website.</li>
                  </ul>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default EmployerInfo;