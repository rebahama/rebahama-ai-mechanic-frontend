import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link} from "react-router-dom";
import axios from "axios";
import styles from "../styles/NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar expand="lg" className={`${styles.NavBar} shadow-sm`} fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <wa-icon name="tools" className="me-2"></wa-icon>
          Mechanic AI
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto align-items-center ${styles.navLinks}`}>
            <Nav.Link as={Link} to="/" className={styles.navItem}>
              <wa-icon name="house" className="me-1"></wa-icon>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className={styles.navItem}>
              <wa-icon name="info-circle" className="me-1"></wa-icon>
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/showall" className={styles.navItem}>
              <wa-icon name="list" className="me-1"></wa-icon>
              Show All
            </Nav.Link>

            {currentUser ? (
              <>
                <span className="me-2">Logged in as {currentUser.username}</span>
                <button onClick={handleLogOut} className={styles.logoutBtn}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup" className={styles.navItem}>
                  <wa-icon name="user-plus" className="me-1"></wa-icon>
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className={styles.navItem}>
                  <wa-icon name="sign-in" className="me-1"></wa-icon>
                  Sign In
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
