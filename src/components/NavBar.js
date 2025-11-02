import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <div>
      <Navbar expand="lg" className={styles.NavBar}>
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-nav-navbar">
      <Nav className="me-auto">
        {/* Home link with icon */}
        <Nav.Link href="#home">
          <wa-icon slot="start" name="house"></wa-icon> Home
        </Nav.Link>

        <Nav.Link href="#link">Link</Nav.Link>

        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item>Action</NavDropdown.Item>
          <NavDropdown.Item>Another action</NavDropdown.Item>
          <NavDropdown.Item>Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>Separated link</NavDropdown.Item>
        </NavDropdown>

        <wa-avatar label="User avatar"></wa-avatar>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>



    </div>
  )
}

export default NavBar