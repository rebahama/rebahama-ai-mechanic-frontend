import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefault";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import homeWrench from '../assets/Wrench.gif';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/result/");
        setResults(data.results);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };
    handleMount();
  }, []);

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
            <Button
              as={Link}
              to="/signup"
              variant="primary"
              size="lg"
              className={styles.btnStart}
            >
              <wa-icon name="robot" class="me-2"></wa-icon>
              Get Started
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="mt-5 d-flex justify-content-center">
            <Spinner animation="border" role="status" variant="warning">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          results.length > 0 && (
            <div className="mt-5">
              <h2 className="mb-3 text-warning">Example Prompts</h2>
              <Carousel interval={5000} pause="hover">
                {results.slice(0, 4).map((item) => (
                  <Carousel.Item key={item.id}>
                    <div className={styles.carouselCard}>
                      <h5 className={styles.cardTitle}>Prompt:</h5>
                      <p className={styles.cardText}>
                        {item.original_prompt.length > 100
                          ? item.original_prompt.slice(0, 100) + "..."
                          : item.original_prompt}
                      </p>
                      <h6 className={styles.cardTitle}>Answer:</h6>
                      <p className={styles.cardText}>
                        {item.result.length > 120
                          ? item.result.slice(0, 120) + "..."
                          : item.result}
                      </p>

                      <Button variant="outline-warning" size="sm" className="mt-2">
                        View More
                      </Button>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          )
        )}
      </Container>
    </div>
  );
};

export default HomePage;
