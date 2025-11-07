import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";
import styles from "../styles/ShowAllPage.module.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefault";
import { ReDirectPageNotUser } from "../utilis/helperFuncs";
import { Link } from "react-router-dom";

const MyPage = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    ReDirectPageNotUser();

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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this prompt?");
        if (!confirmDelete) return;

        try {
            await axiosReq.delete(`/result/${id}/`, { requiresAuth: true });
            setResults((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error deleting prompt:", err);
            setError("Failed to delete this prompt.");
        }
    };

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

                                    <Card.Footer className="d-flex justify-content-between align-items-center">
                                        {item.is_owner ? (
                                            <>
                                                <Button
                                                    onClick={() => handleDelete(item.id)}
                                                    className={`${styles.deleteBtn} px-3`}
                                                >
                                                    Delete
                                                </Button>

                                                <Link to={`/detail/${item.id}`}>
                                                    <Button
                                                        variant="primary"
                                                        style={{ fontWeight: 600 }}
                                                        className="px-3"
                                                    >
                                                        View More
                                                    </Button>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Alert variant="warning" className="p-1 m-0 text-center">
                                                    You do not own this prompt
                                                </Alert>

                                                <Link to="/login">
                                                    <Button
                                                        variant="outline-light"
                                                        className="px-3"
                                                        style={{ fontWeight: 600 }}
                                                    >
                                                        Log in to access
                                                    </Button>
                                                </Link>
                                            </>
                                        )}

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
