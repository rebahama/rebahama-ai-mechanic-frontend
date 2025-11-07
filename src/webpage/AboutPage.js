import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/AboutPage.module.css';
import Robot from '../assets/Robot.gif';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  
  return (
    <div className={styles.aboutSection}>
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={6} className="d-flex justify-content-center mb-4 mb-md-0">
            <div className={styles.imageWrapper}>
              <img
                src={Robot}
                alt="AI assistant robot talking to user"
                className={styles.robotImage}
              />
            </div>
          </Col>

          <Col md={6}>
            <h1 className={styles.title}>
              <wa-icon name="robot" class="me-2"></wa-icon> About Mechanic AI
            </h1>
            <p className={styles.text}>
              Mechanic AI is your intelligent car repair companion. Using
              advanced <strong>AI-driven diagnostics</strong>, it helps you
              understand complex automotive problems and offers easy-to-follow
              repair guides tailored to your specific car model.
            </p>
            <p className={styles.text}>
              Whether you’re a <strong>DIY enthusiast</strong> or just want to
              save time and money, Mechanic AI provides expert-level guidance
              directly from your browser — no mechanic visit needed.
            </p>

            <div className="mt-4">
              <Link to="/learn" className={styles.learnMoreBtn}>
                <wa-icon name="info-circle" className="me-2"></wa-icon>
                Learn More
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
