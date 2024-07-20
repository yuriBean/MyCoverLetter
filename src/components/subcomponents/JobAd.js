import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const JobAd = ({ prevStep, decrementDrafts, draftsLeft, formData, setFormData, nextStep, handleSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleGenerate = async () => {
    if (draftsLeft === 0) {
      console.log('Redirecting to the basket page');
      navigate('/basket');
    } else {
      decrementDrafts(); // Decrement drafts if not 0
  
      // Prepare data for the API request
      const requestData = {
        surname: formData.surname,
        first_name: formData.first_name,
        street: formData.street,
        postal_code: formData.postal_code,
        city: formData.city,
        company_name: formData.company_name,
        company_street: formData.company_street,
        company_postal_code: formData.company_postal_code,
        company_city: formData.company_city,
        date: formData.date,
        job_title: formData.job_title,
        contact_person: formData.contact_person,
        reason_job_search: formData.reason_job_search,
        found_on: formData.found_on,
        work_experience: formData.work_experience,
        education: formData.education,
        further_skills: formData.further_skills,
        tasks: formData.tasks,
        requirements: formData.requirements,
        business_objective_department: formData.business_objective_department,
        business_objective_company: formData.business_objective_company,
        userId: formData.userId
      };
  
      // Call handleSubmit to submit the data
      await handleSubmit(requestData); // Pass the requestData to handleSubmit
      nextStep({ coverLetter: '' }); // Placeholder until the cover letter is generated
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value // Directly update the flattened structure
    }));
  };

  return (
    <div style={{ margin: '40px 50px 0px 50px' }}>
      <div className="d-flex align-items-center justify-content-center">
        <Container fluid>
          <Row className="justify-content-center align-items-start w-100">
            <Col xs={7} className="d-flex flex-column justify-content-center">
              <Form style={{ backgroundColor: '#D6EFD8', borderRadius: '40px', padding: '70px ', textAlign: 'left', margin: "40px 0px 0px 150px" }}>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Task</Form.Label>
                  <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                Please provide details about your task.
                              </Tooltip>
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                          </OverlayTrigger>
                        <Form.Control as="textarea" rows={5} name="task" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                </Form.Group>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Requirement</Form.Label>
                  <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                Please provide details about your requirements.
                              </Tooltip>
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                          </OverlayTrigger>
                        <Form.Control as="textarea" rows={5} name="requirement"  style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                </Form.Group>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Business Objective of the Department</Form.Label>
                  <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                Please provide details about the business objective of the department.
                              </Tooltip>
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                          </OverlayTrigger>
                        <Form.Control as="textarea" rows={5} name="departmentObjective" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                </Form.Group>
                <Form.Group style={{ marginTop: '20px' }}>
                  <Form.Label style={{ fontWeight: 500, fontSize: '16px' }}>Business Objective of the Company</Form.Label>
                  <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                Please provide details about the business objective of the company.
                              </Tooltip>
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                          </OverlayTrigger>
                        <Form.Control as="textarea" rows={5} name="companyObjective" style={{ border: '1px solid #1A5319'}} onChange={handleChange} />
                </Form.Group>
                <div className="d-flex justify-content-between mt-5">
                  <Button variant="primary" onClick={prevStep} style={{ background: 'white', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: '1px #1A5319 solid', color: '#1A5319' }}>Back</Button>
                  <Button variant="primary" onClick={handleGenerate} style={{ background: '#1A5319', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: 'none' }}>Generate</Button>
                </div>
              </Form>
            </Col>
            <Col xs={5} className="d-flex flex-column justify-content-start">
              <div style={{ margin: "30px 40px", fixed: 'top', top: '0', backgroundColor: '#fff', zIndex: 1, paddingTop: '20px' }}>
                <h2 style={{ fontWeight: 700, fontSize: '30px', color: '#1A5319', textAlign: 'left', marginBottom: '20px', cursor: 'pointer' }} onClick={toggleExpand}>
                  <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} /> Job Ad Description
                </h2>
                {isExpanded && (
                  <p style={{ color: '#1A5319', fontSize: '24px', lineHeight: '30px', fontWeight: 500, textAlign: 'left' }}>
                    Provide details about the job ad, including tasks, requirements, and business objectives.
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

export default JobAd;