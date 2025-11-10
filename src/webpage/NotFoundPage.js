import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/NotFoundPage.module.css";
import NotFoundGif from "../assets/NotFound.gif";

const NotFoundPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <Container className="text-center py-5">
                <img
                    src={NotFoundGif}
                    alt="Page not found"
                    className={styles.notFoundImage}
                />
                <h1 className={styles.title}>Oops! Page Not Found</h1>
                <p className={styles.text}>
                    The page you are looking for doesn’t exist or has been moved.
                    Go back to the homepage to explore Mechanic AI’s repair solutions.
                </p>
                <Link to="/">
                    <Button className={styles.homeBtn}>Go to Home</Button>
                </Link>
            </Container>
        </div>
    );
};

export default NotFoundPage;