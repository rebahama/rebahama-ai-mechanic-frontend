import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefault";
import { Container, Row, Col, Spinner, Form } from "react-bootstrap";
import styles from "../styles/ShowAllPage.module.css";
import Robot from "../assets/ManRobot.gif";
import ShowAllProp from "./ShowAllProp";

const ShowAll = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setLoading(true);

      try {
        const searchParam = query.trim() ? `?search=${query}` : "";
        const { data } = await axiosReq.get(`/result/${searchParam}`);
        setResults(data.results || []);
      } catch (err) {
        console.error("Error fetching results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className={styles.background}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Explore <span>Real Repair Solutions</span>
        </h1>
        <p className={styles.heroText}>
          View real diagnostic results solved by our AI assistant and community.
        </p>
        <p className={styles.heroText}>
          <span>Search by car make, model, and year</span> to find similar cases.
        </p>

        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z0-9\s-]*$/.test(value)) {
                setQuery(value);
              }
            }}
          />
        </Form>

        <div className={styles.robotWrapper}>
          <img src={Robot} alt="AI assistant robot talking to user" className={styles.robotImage} />
        </div>
      </div>

      <Container className="py-5">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : results.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {results.map((item) => (
              <Col key={item.id}>
                <ShowAllProp
                  id={item.id}
                  request_info={item.request_info}
                  original_prompt={item.original_prompt}
                  result={item.result}
                  owner={item.owner}
                  created_at={item.created_at}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center text-muted">No results found.</p>
        )}
      </Container>
    </div>
  );
};

export default ShowAll;
