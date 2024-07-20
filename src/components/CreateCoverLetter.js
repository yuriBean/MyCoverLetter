import React, { useState, useEffect } from 'react';
import PersonalInfo from './subcomponents/PersonalInfo';
import Qualifications from './subcomponents/Qualifications';
import EmployerInfo from './subcomponents/EmployerInfo';
import JobAd from './subcomponents/JobAd';
import Display from './subcomponents/Display';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const CreateCoverLetter = () => {
  const [step, setStep] = useState(1);
  const [draftsLeft, setDraftsLeft] = useState(0);
  const [totalDrafts, setTotalDrafts] = useState(0);
  const { user } = useUser();
  const [formData, setFormData] = useState({
    surname: '',
    first_name: '',
    street: '',
    postal_code: '',
    city: '',
    company_name: '',
    company_street: '',
    company_postal_code: '',
    company_city: '',
    date: '',
    job_title: '',
    contact_person: '',
    reason_job_search: '',
    found_on: '',
    work_experience: '',
    education: '',
    further_skills: '',
    tasks: '',
    requirements: '',
    salutation: '',
    business_objective_department: '',
    business_objective_company: '',
    userId: user.id
  });

  const [coverLetter, setCoverLetter] = useState(''); // State for cover letter

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/plans?userId=${user.id}`)
        .then(response => {
          const plan = response.data[0]; // Assuming the response is an array
          setDraftsLeft(plan.draftsLeft);
          switch (plan.name) {
            case 'Basic':
              setTotalDrafts(3);
              break;
            case 'Advanced':
              setTotalDrafts(10);
              break;
            case 'Professional':
              setTotalDrafts(30);
              break;
            default:
              setTotalDrafts(0);
          }
        })
        .catch(error => {
          console.error('Error fetching user plan:', error);
        });
    }
  }, [user]);

  const nextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(prevStep => Math.min(prevStep + 1, 5));
  }

  const prevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const decrementDrafts = () => {
    if (user) {
      axios.get(`http://localhost:5000/plans?userId=${user.id}`)
        .then(response => {
          const plan = response.data[0];
          axios.put(`http://localhost:5000/plans/${plan.id}`, { ...plan, draftsLeft: plan.draftsLeft - 1 })
            .then(() => {
              setDraftsLeft(draftsLeft => draftsLeft - 1);
            })
            .catch(error => {
              console.error('Error updating drafts count:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching user plan:', error);
        });
    }
  };

  const handleSubmit = async (requestData) => {
    try {
      await axios.post('http://localhost:5000/userInfo', requestData);
      console.log('Data stored successfully:', requestData);
      await generateCoverLetter(requestData);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const generateCoverLetter = async (data) => {
    try {
      const response = await axios.post('http://localhost:5001/generate-cover-letter', data);
      const newCoverLetter = response.data.cover_letter_string; // Ensure this matches your backend response
      setCoverLetter(newCoverLetter); // Set the cover letter state
      nextStep({}); // Move to the next step without passing coverLetter in formData
    } catch (error) {
      console.error('Error generating cover letter:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo nextStep={nextStep} />;
      case 2:
        return <Qualifications nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <EmployerInfo nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <JobAd 
          prevStep={prevStep} 
          decrementDrafts={decrementDrafts} 
          draftsLeft={draftsLeft} 
          formData={formData} 
          setFormData={setFormData} 
          nextStep={nextStep} 
          handleSubmit={handleSubmit} // Pass handleSubmit to JobAd
        />;
      case 5:
        return <Display coverLetter={coverLetter} decrementDrafts={decrementDrafts} />; // Pass coverLetter as a separate prop
      default:
        return <PersonalInfo nextStep={nextStep} />;
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-between' style={{ margin: '80px 50px 0px 50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>
          Draft {isNaN(totalDrafts - draftsLeft + 1) ? 0 : totalDrafts - draftsLeft + 1}/{isNaN(totalDrafts) ? 0 : totalDrafts}
        </h2>
        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Cover Letter Creation</h2>
      </div>
      {renderStep()}
      <hr className='my-5 mx-auto' style={{ borderTop: '4px solid #1A5319', width: '80%', opacity: '100%', borderRadius: '10px' }} />

      <Container fluid className="d-flex justify-content-center mb-5">
        <Row>
          <Col>
            <div className="d-flex justify-content-center mb-4" style={{ position: 'relative', top: '20px' }}>
              {[1, 2, 3, 4, 5].map((circle, index) => (
                <div
                  key={index}
                  onClick={() => goToStep(circle)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: step === circle ? '#1A5319' : 'white',
                    border: step === circle ? '' : '6px solid #1A5319',
                    margin: '0 90px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step === circle ? 'white' : '#1A5319',
                    fontWeight: 'bold',
                    cursor: 'pointer' // Add cursor pointer to indicate clickable
                  }}
                >
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateCoverLetter;