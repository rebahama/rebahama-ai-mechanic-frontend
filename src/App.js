import './App.css';
import styles from './App.module.css'
import Button from 'react-bootstrap/Button';
import NavBar from './components/NavBar';
import ReactDOM from "react-dom/client";
import AboutPage from './webpage/AboutPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <NavBar />
        <Routes>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
