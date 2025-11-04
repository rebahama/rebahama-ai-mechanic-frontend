import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css';
import {
  useCurrentUser,
} from "../contexts/CurrentUserContext";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const currentUser = useCurrentUser(); // Get current user from context

  return (
    <Navbar expand="lg" className={`${styles.NavBar} shadow-sm`} fixed="top">
      <Container>
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

            { !currentUser && (
              <Nav.Link as={Link} to="/signup" className={styles.navItem}>
                <wa-icon name="user-plus" class="me-1"></wa-icon>
                Sign Up
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/showall" className={styles.navItem}>
              <wa-icon name="list" class="me-1"></wa-icon>
              Show All
            </Nav.Link>
          </Nav>

          <div className="ms-auto d-flex align-items-center">
            {currentUser ? (
              <wa-avatar label={currentUser.username}></wa-avatar>
            ) : (
              <Nav.Link as={Link} to="/login" className={styles.navItem}>
                <wa-icon name="sign-in" class="me-1"></wa-icon>
                Sign In
              </Nav.Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;