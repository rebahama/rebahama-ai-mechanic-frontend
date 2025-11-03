import './App.css';
import styles from './App.module.css'
import Button from 'react-bootstrap/Button';
import NavBar from './components/NavBar';
import ReactDOM from "react-dom/client";
import AboutPage from './webpage/AboutPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './api/axiosDefault';
import CreateAccount from './webpage/auth/CreateAcount';
import ShowAll from './webpage/ShowAll';
import HomePage from './webpage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/showall" element={<ShowAll />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
