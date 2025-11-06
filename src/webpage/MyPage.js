import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import styles from "../styles/ShowAllPage.module.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefault";

const MyPage = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserResults = async () => {
            if (!currentUser?.username) {
                setResults([]);
                setLoading(false);
                return;
            }

            try {
                const { data } = await axiosReq.get(
                    `/result/?request__user__username=${currentUser.username}`,
                    { requiresAuth: true }
                );
                setResults(data.results || []);
            } catch (err) {
                console.error("Error fetching user results:", err);
                setError("Failed to load your results.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserResults();
    }, [currentUser]);

    return (
        <div className={styles.background}>
            <Container className="py-5">
                <h2 className={`text-center mb-5 ${styles.title}`}>My AI Prompts</h2>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status" />
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">{error}</Alert>
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
                                    <Card.Footer className={styles.footer}>
                                        Prompt Created by you
                                        <hr />
                                        {item.created_at || "Unknown date"}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-center text-muted">You haven't created any prompts yet.</p>
                )}
            </Container>
        </div>
    );
};

export default MyPage;
