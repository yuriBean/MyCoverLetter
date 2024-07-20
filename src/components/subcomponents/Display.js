import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

const Display = ({ coverLetter }) => { // Receive regenerateCoverLetter as a prop
  const textAreaRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = coverLetter; // Set the cover letter in the text area
    }
  }, [coverLetter]);

  const createPDF = () => {
    const doc = new jsPDF();
    const text = textAreaRef.current.value;
    const margin = 20; // Padding on all sides
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 10;
    const bottomMargin = 20;
    
    // Add heading
    doc.setFontSize(18);
    doc.text('Cover Letter', pageWidth / 2, margin, { align: 'center' });

    // Add text content with margins
    doc.setFontSize(12);
    const textLines = doc.splitTextToSize(text, pageWidth - margin * 2);
    let cursorY = margin * 2;

    textLines.forEach(line => {
      if (cursorY + lineHeight > pageHeight - bottomMargin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    doc.save('my_cover_letter.pdf');
  };

  const handleNextCoverLetter = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    // Reset the cover letter generation process
    textAreaRef.current.value = '';
    // Add any additional reset logic here
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  
  const regenerateCoverLetter = () => {
    // Add your logic here to regenerate the cover letter
    // This can involve updating the text content based on certain criteria or randomizing parts of the content
    
    // For example, you can update the text area content with a new version
    const newCoverLetter = generateNewCoverLetter(); // Function to generate a new cover letter
    textAreaRef.current.value = newCoverLetter;
  };

  const generateNewCoverLetter = () => {
    // Implement your logic to generate a new cover letter here
    // This can involve combining different sections, adding variations, or any other customization
    
    return "New cover letter content"; // Return the new cover letter content
  };
  
  return (
    <div style={{ margin: '40px 50px 0px 50px' }}>
      <div className="d-flex  justify-content-start">
        <Container fluid>
          <Row className="justify-content-around align-content-baseline w-100">
            <Col xs={7} className="d-flex flex-column justify-content-center">
                <h2 style={{ fontWeight: 700, fontSize: '30px', color: '#1A5319', textAlign: 'left', marginBottom: '20px' }}>Body of the Cover Letter</h2>
              <Form style={{ backgroundColor: '#D6EFD8', borderRadius: '40px', padding: '70px ', textAlign: 'left', margin: "40px 0px 0px 150px" }}>
                <Form.Group style={{ marginTop: '20px' }}>
                <Form.Control as="textarea" rows={15} style={{ border: '2px solid #1A5319', resize: 'vertical', overflowY: 'auto', borderRadius: '30px', scrollbarWidth: 'thin', scrollbarColor: '#1A5319 #D6EFD8' }} ref={textAreaRef} />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={5} className="d-flex flex-column">
              <div style={{ margin: "30px 40px", fixed: 'top', top: '0', backgroundColor: '#fff', zIndex: 1, paddingTop: '20px' }}>
                <h2 style={{ fontWeight: 700, fontSize: '30px', color: '#1A5319', textAlign: 'left', marginBottom: '20px', cursor: 'pointer' }} onClick={toggleExpand}>
                  <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} /> The Cover 
                </h2>
                {isExpanded && (
                  <ul style={{ color: '#1A5319', fontSize: '24px', lineHeight: '30px', fontWeight: 500, textAlign: 'left' }}>
                  <li>This is the preview of the body of the cover letter.</li>
                  <li>Make manual adjustments.</li>
                  <li>Regenerate the cover letter to see a different version.</li>
                  <li>Create the PDF when you're happy with the final version.</li>
                </ul>
              )}</div>
              <div style={{ marginTop: 'auto'}}>
              <div style={{ backgroundColor: '#fff', zIndex: 1, padding: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%' }}>
              <Button variant="primary" onClick={regenerateCoverLetter} style={{ background: '#1A5319', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: 'none', width: '50%' }}>Regenerate</Button>
              <Button variant="primary"  style={{ background: '#1A5319', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: 'none', width: '50%' }} onClick={createPDF}>Create PDF</Button>
              </div>
              <div style={{ backgroundColor: '#fff', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Button variant="primary"  style={{ background: '#1A5319', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: 'none', width: '100%' }} onClick={handleNextCoverLetter}>Next Cover Letter</Button>
              </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal show={showModal} onHide={handleModalClose} centered style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)', }}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Have you saved the current cover letter?</Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center'}}>
          <Button variant="secondary" onClick={handleModalClose} style={{ background: 'white', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: '2px #1A5319 solid' , color: '#1A5319', width: '40%' }}>
            No
          </Button>
          <Button variant="primary" onClick={handleModalConfirm} style={{ background: '#1A5319', borderRadius: '10px', padding: '10px 30px', fontWeight: 700, fontSize: '20px', border: 'none', width: '40%'}} >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Display;