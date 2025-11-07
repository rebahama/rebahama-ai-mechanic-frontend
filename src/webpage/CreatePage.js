import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefault";
import Robot from '../assets/askrobot.gif';
import styles from "../styles/CreatePage.module.css";

function CreatePage() {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const MAX_CHAR = 600;

  const [formData, setFormData] = useState({
    car_make: "",
    car_model: "",
    car_year: "",
    problem_description: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "problem_description" && e.target.value.length > MAX_CHAR) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess("");
    setLoading(true);

    try {
      const { data } = await axiosReq.post("/diagnose/", formData, { requiresAuth: true });
      navigate(`/detail/${data.id}`);
      setSuccess("Diagnosis request created successfully!");
      setFormData({
        car_make: "",
        car_model: "",
        car_year: "",
        problem_description: "",
      });
    } catch (err) {
      setError(err.response?.data || { non_field_errors: ["Something went wrong."] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Container>

        <div className={styles.heroSection}>
          <img src={Robot} alt="Ask Robot" className={styles.robotImg} />

          <h2 className={styles.heroTitle}>
            <span>AskRobot</span> Smart Car Diagnosis
          </h2>

          <p className={styles.heroText}>
            Describe your car problem and let AI analyze symptoms, patterns, and real repair history.
            You'll get clear guidance, common causes, and recommended next steps.
          </p>
        </div>

        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card className={`p-4 ${styles.cardCustom}`}>
              <h3>Create Diagnosis Request</h3>
              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Label>Car Make</Form.Label>
                  <Form.Control
                    name="car_make"
                    value={formData.car_make}
                    onChange={handleChange}
                    placeholder="e.g. BMW"
                    className={styles.input}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Car Model</Form.Label>
                  <Form.Control
                    name="car_model"
                    value={formData.car_model}
                    onChange={handleChange}
                    placeholder="e.g. 325Ci"
                    className={styles.input}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Car Year</Form.Label>
                  <Form.Control
                    name="car_year"
                    type="number"
                    value={formData.car_year}
                    onChange={handleChange}
                    placeholder="e.g. 2003"
                    className={styles.input}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Problem Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="problem_description"
                    value={formData.problem_description}
                    onChange={handleChange}
                    placeholder="Describe the issue..."
                    className={styles.textarea}
                    maxLength={MAX_CHAR}
                  />
                  <small className="text-muted">
                    {formData.problem_description.length}/{MAX_CHAR} characters
                  </small>
                </Form.Group>

                {error.non_field_errors?.map((msg, idx) => (
                  <Alert key={idx} variant="danger" className="py-2">{msg}</Alert>
                ))}

                {success && <Alert variant="success" className="py-2">{success}</Alert>}

                <div className="d-grid mt-3">
                  <Button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Please wait, the smart mechanic is analyzing...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>

              </Form>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default CreatePage;
