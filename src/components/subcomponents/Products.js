import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Products = (props) => {
  const { handleStart, userPlan, backgroundColor, name, padding } = props;

  const plans = [
    { name: 'Basic', description: '3 different cover letter', price: '4.99 EUR' },
    { name: 'Advanced', description: '10 different cover letter\n3 re-generations per cover letter', price: '9.99 EUR' },
    { name: 'Professional', description: '30 different cover letter\n3 re-generations per cover letter\nPost adjustments', price: '19.99 EUR' }
  ];

  const planOrder = {
    'Basic': 1,
    'Advanced': 2,
    'Professional': 3
  };

  const filteredPlans = plans.filter(plan => !userPlan || planOrder[plan.name] > planOrder[userPlan]);

  return (
    <Container fluid className="products-section" style={{ padding: padding, backgroundColor: backgroundColor }}>
      {name && <h2 id='products' style={{ textAlign: 'center', marginBottom: '50px', color: '#1A5319', fontWeight: '700', fontSize: '45px' }}>{name}</h2>}
      <Row style={{ justifyContent: 'center', gap: '80px', padding: '50px 0' }}>
        {filteredPlans.map((plan, index) => (
          <Col md={3} key={index}>
            <Card style={{ textAlign: 'center', padding: '20px', height: '400px', width: '280px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
              <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: '' }}>
                <Card.Title style={{ fontWeight: 600, fontSize: '32px', color: 'black', marginBottom: '30px' }}>{plan.name}</Card.Title>
                <Card.Text style={{ color: 'black', fontWeight: 400, fontSize: '18px', textAlign: 'left', lineHeight: '41.6px' }}>
                  {plan.description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  {plan.price}
                </Card.Text>
                <Button variant="primary" style={{ backgroundColor: '#1A5319', padding: '10px 60px', border: 'none', borderRadius: '10px' }} onClick={handleStart}>Start</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;