import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import homeWrench from '../assets/Wrench.gif';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homeWrapper}>
      <Container className="text-center py-5">
        <div className={styles.heroSection}>
          <h1 className={styles.title}>
            Welcome to <span>Mechanic AI</span>
          </h1>
          <p className={styles.subtitle}>
            Your intelligent assistant for diagnosing and repairing your car — fast, reliable, and AI-powered.
          </p>

          <div className={styles.gifContainer}>
            <img src={homeWrench} alt="Spinning wrench" className={styles.wrenchGif} />
          </div>

          <div className="mt-4">
            <Button variant="primary" size="lg" className={styles.btnStart}>
              <wa-icon name="robot" class="me-2"></wa-icon>
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage; 