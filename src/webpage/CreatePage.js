import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Card, Spinner } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefault";
import styles from "../styles/CreatePage.module.css";

function CreatePage() {
  const [formData, setFormData] = useState({
    car_make: "",
    car_model: "",
    car_year: "",
    problem_description: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess("");
    setLoading(true);

    try {
      await axiosReq.post("/diagnose/", formData, { requiresAuth: true });
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
    <Container className={`py-5 ${styles.CreateContainer}`}>
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className={`shadow-lg p-4 ${styles.cardCustom}`}>
            <h3 className="text-center mb-4 fw-bold">Create Diagnosis Request</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Car Make</Form.Label>
                <Form.Control
                  name="car_make"
                  value={formData.car_make}
                  onChange={handleChange}
                  placeholder="e.g. BMW"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Car Model</Form.Label>
                <Form.Control
                  name="car_model"
                  value={formData.car_model}
                  onChange={handleChange}
                  placeholder="e.g. 325Ci"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Car Year</Form.Label>
                <Form.Control
                  name="car_year"
                  type="number"
                  value={formData.car_year}
                  onChange={handleChange}
                  placeholder="e.g. 2003"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Problem Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="problem_description"
                  value={formData.problem_description}
                  onChange={handleChange}
                  placeholder="Describe the issue..."
                />
              </Form.Group>

              {error.non_field_errors?.map((msg, idx) => (
                <Alert key={idx} variant="danger" className="py-2">{msg}</Alert>
              ))}

              {success && <Alert variant="success" className="py-2">{success}</Alert>}

              <div className="d-grid mt-3">
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
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
                      Please wait the smart mechanic is thinking...
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
  );
}

export default CreatePage;
