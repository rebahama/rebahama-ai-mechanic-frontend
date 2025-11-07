import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/ShowAllPage.module.css";

const ShowAllProp = ({ id, request_info, original_prompt, result, owner, created_at }) => {
    return (
        <Card className={`${styles.card} shadow-lg`}>
            <Card.Body>
                <Card.Title className={styles.cardTitle}>
                    {request_info || "No Request Info"}
                </Card.Title>
                <Card.Subtitle className={styles.prompt}>
                    {original_prompt || "No Prompt"}
                </Card.Subtitle>
                <hr />
                <div
                    className={styles.cardText}
                    dangerouslySetInnerHTML={{ __html: (result || "").replace(/\n/g, "<br/>") }}
                />
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between align-items-center">
                <div>
                    Created by user: {owner || "Unknown"}
                    <hr />
                    {created_at || "Unknown date"}
                </div>
                <Link to={`/detail/${id}`}>
                    <Button variant="primary" style={{ fontWeight: 600 }} className="px-3 py-1">
                        View More
                    </Button>
                </Link>
            </Card.Footer>
        </Card>
    );
};

export default ShowAllProp;
