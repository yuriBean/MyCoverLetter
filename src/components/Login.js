import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useUser } from '../context/UserContext';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { login } = useUser();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: {
          email: loginEmail,
          password: loginPassword
        }
      });
      const user = response.data.find(user => user.email === loginEmail && user.password === loginPassword);
      if (user) {
        setMessage('Login successful!');
        login(user);
        setLoginEmail('');
        setLoginPassword('');
        const redirectPath = location.state?.from || '/'; // Get the redirect path or default to home
        navigate(redirectPath); // Redirect to the intended page
      } else {
        setMessage('Invalid email or password.');
      }
    } catch (error) {
      setMessage('Error logging in.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    if (!validatePassword(registerPassword)) {
      setMessage('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/users', {
        firstName: registerFirstName,
        lastName: registerLastName,
        email: registerEmail,
        password: registerPassword
      });
      setMessage('Registration successful!');
      // Clear registration fields
      setRegisterFirstName('');
      setRegisterLastName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
    } catch (error) {
      setMessage('Error registering.');
    }
  };

  return (
    <Container style={{ marginTop: '90px'}}>
      <Row className="d-flex align-items-start justify-content-between " style={{ color: '#1A5319'}}>
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleLogin} style={{ padding: '60px 100px', textAlign: 'left', color: '#1A5319'}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Email</Form.Label>
              <Form.Control type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={{ border: '1px solid #1A5319'}} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{ marginTop: '20px'}}>
              <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Password</Form.Label>
              <Form.Control type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={{ border: '1px solid #1A5319'}} />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className='d-flex' style={{ marginTop: '20px', justifyContent: 'space-between'}}>
              <Form.Check type="checkbox" label="Remember me" className="custom-checkbox" />
              <a href="#" style={{ color: '#1A5319', fontWeight: 500 }}>Forgot Password?</a>
            </Form.Group>

            <Form.Group>
            <Button className='align-self-end' variant="primary" type="submit" style={{ marginTop: '155px', width: '100%', backgroundColor: '#1A5319', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '20px'}}>
              Login
            </Button></Form.Group>
          </Form>
        </Col>
        <Col md={6} style={{ borderLeft: '2px solid #1A5319'}}>
          <h2>Register</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleRegister} style={{ padding: '60px 100px', textAlign: 'left'}}>
            <Form.Group controlId="formName" className="d-flex">
              <div style={{ flex: 1, marginRight: '10px' }}>
                <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>First Name</Form.Label>
                <Form.Control type="text" value={registerFirstName} onChange={(e) => setRegisterFirstName(e.target.value)} style={{ border: '1px solid #1A5319'}} />
              </div>
              <div style={{ flex: 1 }}>
                <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>SurName</Form.Label>
                <Form.Control type="text" value={registerLastName} onChange={(e) => setRegisterLastName(e.target.value)} style={{ border: '1px solid #1A5319'}} />
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" style={{ marginTop: '20px'}}>
              <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Email*</Form.Label>
              <Form.Control type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} style={{ border: '1px solid #1A5319'}} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{ marginTop: '20px'}}>
              <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Password*</Form.Label>
              <Form.Control type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} style={{ border: '1px solid #1A5319'}} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" style={{ marginTop: '20px'}}>
              <Form.Label style={{ fontWeight: 500, fontSize: '16px'}}>Confirm Password*</Form.Label>
              <Form.Control type="password" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} style={{ border: '1px solid #1A5319'}} />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: '20px', width: '100%', backgroundColor: '#1A5319', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '20px'}}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;