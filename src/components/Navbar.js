import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import { useUser } from '../context/UserContext'; // Import useUser

const NavbarComponent = () => {
  const { user, logout } = useUser(); // Use user and logout from context

  return (
    <Navbar bg="black" expand="lg" fixed="top" style={{ fontFamily: 'Radio Canada', color: 'white', textTransform: 'uppercase' }}>
      <Container>
        <Navbar.Brand href="/" style={{ color: 'white' }}>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          MYCOVERLETTER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#about" style={{ color: 'white' }}>About</Nav.Link>
            <Nav.Link href="#products" style={{ color: 'white' }}>Products</Nav.Link>
            {user ? (
              <NavDropdown title={<span style={{ color: 'white', paddingBottom: 0 }}>Profile &#9660;</span>}>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login" style={{ color: 'white' }}>Login</Nav.Link>
            )}
            <NavDropdown title={<span style={{ color: 'white', paddingBottom: 0 }}>Language <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" width="25" height="25" style={{ borderRadius: '50%' }} alt="UK Flag" /> &#9660;</span>}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;