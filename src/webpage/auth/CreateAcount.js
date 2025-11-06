import styles from "../../styles/CreateAccountPage.module.css"
import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefault";
import { Alert, Button, Container, Form, Col, Row } from "react-bootstrap";

const CreateAccount = () => {
    const [message, setMessage] = useState("")
    const [signUp, setSignup] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const [error, setError] = useState({});
    const { username, password1, password2 } = signUp;

    const handleChange = (event) => {
        setSignup({
            ...signUp,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            await axiosReq.post("/dj-rest-auth/registration/", signUp);
            setMessage("Account created successfully!");
            setError({});
        } catch (err) {
            console.log(err);
            setError(err.response?.data || {});
            setMessage("");
        }
    };

    return (
        <div className={styles.CenterForm}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2 className={styles.FormTitle}>
                            <wa-icon name="user-plus" class="me-2"></wa-icon>
                            Create Account
                        </h2>
                        <Form onSubmit={submitForm}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label className={styles.FormLabel}>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    name="username"
                                    className={styles.InputLogIn}
                                    onChange={handleChange}
                                />
                                {error.username?.map((msg, idx) => (
                                    <Alert key={idx} className={styles.Alert}>{msg}</Alert>
                                ))}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password1">
                                <Form.Label className={styles.FormLabel}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password1}
                                    name="password1"
                                    className={styles.InputLogIn}
                                    onChange={handleChange}
                                />
                                {error.password1?.map((msg, idx) => (
                                    <Alert key={idx} className={styles.Alert}>{msg}</Alert>
                                ))}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password2">
                                <Form.Label className={styles.FormLabel}>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={password2}
                                    name="password2"
                                    className={styles.InputLogIn}
                                    onChange={handleChange}
                                />
                                {error.password2?.map((msg, idx) => (
                                    <Alert key={idx} className={styles.Alert}>{msg}</Alert>
                                ))}
                            </Form.Group>

                            <Button type="submit" className={styles.LoginBtn}>Create Account</Button>

                            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CreateAccount;
