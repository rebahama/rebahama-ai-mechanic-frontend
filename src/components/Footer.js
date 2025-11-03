import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="text-center text-md-start align-items-center">
          {/* Brand / About */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className={styles.brand}>
              <wa-icon name="tools" class="me-2"></wa-icon>
              Mechanic AI
            </h5>
            <p className={styles.desc}>
              Empowering car owners with AI-driven diagnostics and repair insights.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3 mb-md-0">
            <h6 className={styles.linkTitle}>Quick Links</h6>
            <ul className={styles.linkList}>
              <li>
                <Link to="/">
                  <wa-icon name="house" class="me-1"></wa-icon> Home
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <wa-icon name="info-circle" class="me-1"></wa-icon> About
                </Link>
              </li>
              <li>
                <Link to="/showall">
                  <wa-icon name="list" class="me-1"></wa-icon> Show All
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <wa-icon name="user-plus" class="me-1"></wa-icon> Sign Up
                </Link>
              </li>
            </ul>
          </Col>

          {/* Social Icons (no invalid hrefs) */}
          <Col md={4} className="text-md-end">
            <h6 className={styles.linkTitle}>Connect With Us</h6>
            <div className={styles.socialIcons}>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Website"
              >
                <wa-icon name="globe"></wa-icon>
              </button>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Community"
              >
                <wa-icon name="users"></wa-icon>
              </button>
            </div>
            <p className={styles.copy}>
              © {new Date().getFullYear()} Mechanic AI. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
