import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const Qualifications = ({ nextStep, prevStep }) => {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    work_experience: '',
    education: '',
    further_skills: ''
  });

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

  return (
    <div style={{ margin: '40px 50px 0px 50px' }}>
      <div className="d-flex align-items-center justify-content-center">
        <Container fluid>
          <Row className="justify-content-center align-items-start w-100">
            <Col xs={7} className="d-flex flex-column justify-content-center">
              <Form style={{ backgroundColor: '#D6EFD8', borderRadius: '40px', padding: '70px ', textAlign: 'left', margin: "40px 0px 0px 150px" }}>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Work Experience</Form.Label>
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
                        <Form.Control as="textarea" rows={5} name="work_experience" value={formData.work_experience} onChange={handleChange} style={{ border: '1px solid #1A5319'}} />
                </Form.Group>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Education</Form.Label>
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
                              <Form.Control as="textarea" rows={5} name="education" value={formData.education} onChange={handleChange} style={{ border: '1px solid #1A5319'}} />
                </Form.Group>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Further Skills</Form.Label>
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
                          <Form.Control as="textarea" rows={5} name="further_skills" value={formData.further_skills} onChange={handleChange} style={{ border: '1px solid #1A5319'}} />
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
                <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} />  Your Qualifications 
                </h2>
                {isExpanded && (
                  <ul style={{ color: '#1A5319', fontSize: '24px', lineHeight: '30px', fontWeight: 500, textAlign: 'left' }}>
                    <li>Information related to your work experience, education and other relevant skills to the job ad are used to create the body of the cover letter.</li>
                    <li>You can copy this information from your CV.</li>
                    <li>Enrich information about your work experience or education with relevant details which are not listed in your CV, like specific university courses or work projects.</li>
                    <li>Make sure that to each occupation the start and end date is associated.</li>
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

export default Qualifications;