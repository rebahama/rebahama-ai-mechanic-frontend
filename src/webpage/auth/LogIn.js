import React, { useContext, useState } from "react";
import { axiosReqq } from "../../api/axiosDefault";
import styles from "../../styles/LogInPage.module.css";
import { Alert, Button, Container, Form, Col, Row, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const LogIn = () => {
  const [signIn, setSignIn] = useState({ username: "", password: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setSignIn({ ...signIn, [event.target.name]: event.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setError({});
    setLoading(true);

    try {
      // 1️⃣ Login: sets JWT cookies automatically (HttpOnly)
      await axiosReqq.post("/dj-rest-auth/login/", signIn);

      // 2️⃣ Fetch current user info from the server
      const { data: user } = await axiosReqq.get("/dj-rest-auth/user/");
      setCurrentUser(user);

      // 3️⃣ Navigate to homepage
      navigate("/");
    } catch (err) {
      setError(err.response?.data || { non_field_errors: ["Login failed."] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.CenterForm}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className={styles.LoginCard}>
              <Card.Body>
                <Card.Title className={styles.FormTitle}>Sign In</Card.Title>
                <Form onSubmit={submitForm}>
                  <Form.Group controlId="username" className="mb-3">
                    <Form.Label className={styles.FormColor}>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={signIn.username}
                      name="username"
                      onChange={handleInput}
                      className={styles.InputLogIn}
                    />
                  </Form.Group>

                  {error.username?.map((msg, idx) => (
                    <Alert variant="warning" key={idx}>{msg}</Alert>
                  ))}

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label className={styles.FormColor}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={signIn.password}
                      name="password"
                      onChange={handleInput}
                      className={styles.InputLogIn}
                    />
                  </Form.Group>

                  {error.password?.map((msg, idx) => (
                    <Alert variant="warning" key={idx}>{msg}</Alert>
                  ))}

                  {error.non_field_errors?.map((msg, idx) => (
                    <Alert variant="warning" key={idx} className="mt-2">{msg}</Alert>
                  ))}

                  <Button type="submit" className={styles.LoginBtn} disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                        Logging in...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;
