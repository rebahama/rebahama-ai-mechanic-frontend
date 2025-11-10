import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefault";
import styles from "../styles/DetailPage.module.css";

const DetailPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const { data } = await axiosReq.get(`/result/${id}/`);
        setResult(data);
      } catch (err) {
        console.error("Error fetching detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.background}>
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status" />
        </Container>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.background}>
        <Container className="py-5 text-center">
          <h3>Result not found.</h3>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.background}>
      <Container className="py-5">
        <Card className={`${styles.card} shadow-lg p-4`}>
          <Card.Title className={styles.title}>{result.original_prompt}</Card.Title>
          <Card.Subtitle className={styles.subtitle}>
            {`Car: ${result.request_info}`}
          </Card.Subtitle>
          <hr />
          <Card.Body>
            <div
              className={styles.resultText}
              dangerouslySetInnerHTML={{
                __html: (result.result || "").replace(/\n/g, "<br />"),
              }}
            />
          </Card.Body>
          <Card.Footer className={styles.footer}>
            Created by: {result.owner || "Unknown"}
            <hr />
            {result.created_at || "Unknown date"}
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default DetailPage;
