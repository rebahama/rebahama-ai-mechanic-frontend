import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefault";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import styles from "../styles/ShowAllPage.module.css";

const ShowAll = () => {
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
    <div className={styles.background}>
      <Container className="py-5">
        <h2 className={`text-center mb-5 ${styles.title}`}>AI Repair Results</h2>

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
                      {item.request_info}
                    </Card.Title>
                    <Card.Subtitle className={styles.prompt}>
                      {item.original_prompt}
                    </Card.Subtitle>
                    <hr />
                    <div
                      className={styles.cardText}
                      dangerouslySetInnerHTML={{
                        __html: item.result.replace(/\n/g, "<br/>"),
                      }}
                    />
                  </Card.Body>
                  <Card.Footer className={styles.footer}>
                    {item.created_at}
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
