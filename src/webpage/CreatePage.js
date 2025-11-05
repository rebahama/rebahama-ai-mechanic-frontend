import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
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
  const fileInput = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess("");

    try {
      const response = await axiosReq.post("/diagnose/", formData);
      setSuccess("Diagnosis request created successfully!");
      setFormData({
        car_make: "",
        car_model: "",
        car_year: "",
        problem_description: "",
      });
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data || { non_field_errors: ["Something went wrong."] });
    }
  };

  return (
    <Container className={styles.CreateContainer}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-4 mt-5">
            <h3 className="text-center mb-4">Create Diagnosis Request</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Car Make</Form.Label>
                <Form.Control
                  name="car_make"
                  value={formData.car_make}
                  onChange={handleChange}
                  placeholder="e.g. BMW"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Car Model</Form.Label>
                <Form.Control
                  name="car_model"
                  value={formData.car_model}
                  onChange={handleChange}
                  placeholder="e.g. 325Ci"
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
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Problem Description</Form.Label>
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
                <Alert key={idx} variant="danger">{msg}</Alert>
              ))}

              {success && <Alert variant="success">{success}</Alert>}

              <div className="text-center">
                <Button type="submit" className="btn-primary w-100">
                  Submit Request
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
