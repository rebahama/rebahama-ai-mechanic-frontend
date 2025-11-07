import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefault";
import { Container, Row, Col, Card, Spinner, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/ShowAllPage.module.css";
import Robot from "../assets/ManRobot.gif"

const ShowAll = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("")

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/result/?search=${query}`);
        setResults(data.results || []);
      } catch (err) {
        console.error("Error fetching results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    handleMount();
  }, [query]);

  return (
    <div className={styles.background}>

      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Explore <span>Real Repair Solutions</span>
        </h1>
        <p className={styles.heroText}>
          View real diagnostic results solved by our AI assistant and community members.
          Learn how others identified issues, understood symptoms, and repaired their vehicles.
        </p>
        <p className={styles.heroText}>
          Soon you will be able to <span>search by car make, model, and year</span> to find cases similar to yours.
        </p>

        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Search ad"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>

        <div className={styles.robotWrapper}>
          <img
            src={Robot}
            alt="AI assistant robot talking to user"
            className={styles.robotImage}
          />
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
                <Card className={`${styles.card} shadow-lg`}>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>
                      {item.request_info || "No Request Info"}
                    </Card.Title>
                    <Card.Subtitle className={styles.prompt}>
                      {item.original_prompt || "No Prompt"}
                    </Card.Subtitle>
                    <hr />
                    <div
                      className={styles.cardText}
                      dangerouslySetInnerHTML={{
                        __html: (item.result || "").replace(/\n/g, "<br/>"),
                      }}
                    />
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                      Prompt Created by user: {item.owner || "Unknown"}
                      <hr />
                      {item.created_at || "Unknown date"}
                    </div>
                    <Link to={`/detail/${item.id}`}>
                      <Button
                        variant="primary"
                        style={{ fontWeight: 600 }}
                        className="px-3 py-1"
                      >
                        View More
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
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
