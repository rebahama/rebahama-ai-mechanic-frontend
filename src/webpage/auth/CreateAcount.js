import axios from "axios";
import styles from "../../styles/LogInPage.module.css"
import React, { useState } from "react";
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
            await axios.post("api/auth/registration/", signUp);
            setMessage("Account created")
        } catch (err) {
            console.log(err);
            setError(err.response?.data);
        }
    };
    return (
        <div>
            <Container className={styles.CenterForm}>
                <Row md={12}>
                    <Col md={12}>
                        <Form onSubmit={submitForm}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    name="username"
                                    className={styles.InputLogIn}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            {error.username?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

                            <Form.Group className="mb-3" controlId="password1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password1}
                                    name="password1"
                                    onChange={handleChange}
                                    className={styles.InputLogIn}
                                />
                            </Form.Group>
                            {error.password1?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

                            <Form.Group className="mb-3" controlId="password2">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    value={password2}
                                    name="password2"
                                    onChange={handleChange}
                                    className={styles.InputLogIn}
                                />
                            </Form.Group>

                            {error.password2?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

                            <Button type="submit" className={styles.LoginBtn}> Create </Button>

                            <Alert variant="warning">
                                {message}
                            </Alert>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CreateAccount;