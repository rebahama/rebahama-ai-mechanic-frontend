import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar expand="lg" className={`${styles.NavBar} shadow-sm`} fixed="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <wa-icon name="tools" class="me-2"></wa-icon>
          Mechanic AI
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto align-items-center ${styles.navLinks}`}>
            <Nav.Link as={Link} to="/" className={styles.navItem}>
              <wa-icon name="house" class="me-1"></wa-icon>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className={styles.navItem}>
              <wa-icon name="info-circle" class="me-1"></wa-icon>
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/signup" className={styles.navItem}>
              <wa-icon name="user-plus" class="me-1"></wa-icon>
              Sign Up
            </Nav.Link>

            <Nav.Link as={Link} to="/showall" className={styles.navItem}>
              <wa-icon name="list" class="me-1"></wa-icon>
              Show All
            </Nav.Link>

            <NavDropdown
              title={
                <>
                  <wa-icon name="chevron-down" class="me-1"></wa-icon>
                  More
                </>
              }
              id="basic-nav-dropdown"
              className={styles.dropdown}
            >
              <NavDropdown.Item className={styles.dropdownItem}>
                <wa-icon name="wrench" class="me-2"></wa-icon>
                Action
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.dropdownItem}>
                <wa-icon name="gear" class="me-2"></wa-icon>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.dropdownItem}>
                <wa-icon name="clipboard-list" class="me-2"></wa-icon>
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className={styles.dropdownItem}>
                <wa-icon name="dash" class="me-2"></wa-icon>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="ms-auto d-flex align-items-center">
            <wa-avatar label="User avatar"></wa-avatar>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
