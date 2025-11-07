import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "../styles/LearnPage.module.css";
import learnGif from "../assets/Learn.gif";
import { ReDirectPage } from "../utilis/helperFuncs";


const LearnPage = () => {
  ReDirectPage()

  return (
    <div className={styles.learnWrapper}>
      <Container className="py-5">
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h1 className={styles.title}>Welcome to Mechanic AI</h1>
            <p className={styles.subtitle}>
              Mechanic AI is your intelligent assistant for diagnosing car problems and finding repair solutions quickly.
              Simply describe the issue with your vehicle, and our AI will provide a detailed answer along with helpful tips.
            </p>
            <img src={learnGif} alt="AI learning mechanic" className={styles.heroGif} />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={10}>
            <h2 className={`${styles.sectionTitle} mb-4`}>How It Works</h2>
            <Row xs={1} md={2} className="g-4">
              <Col>
                <Card className={styles.cardCustom}>
                  <Card.Body>
                    <Card.Title>1. Describe Your Problem</Card.Title>
                    <Card.Text>
                      Enter your car make, model, year, and describe the issue you're experiencing. The more details, the better the diagnosis.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className={styles.cardCustom}>
                  <Card.Body>
                    <Card.Title>2. AI Diagnosis</Card.Title>
                    <Card.Text>
                      Our AI analyzes your description and generates a step-by-step diagnosis with potential causes and solutions.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className={styles.cardCustom}>
                  <Card.Body>
                    <Card.Title>3. Receive Your Results</Card.Title>
                    <Card.Text>
                      You will see a detailed AI-generated response. You can save it, view previous prompts, or share it with your mechanic.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className={styles.cardCustom}>
                  <Card.Body>
                    <Card.Title>4. Learn & Take Action</Card.Title>
                    <Card.Text>
                      Use the AI guidance to troubleshoot, fix, or discuss with your mechanic. Learn more about your car in the process!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="text-center mt-5">
              <Button href="/signup" className={styles.btnStart}>Get Started</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LearnPage;