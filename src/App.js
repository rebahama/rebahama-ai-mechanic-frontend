import './App.css';
import styles from './App.module.css'
import NavBar from './components/NavBar';
import AboutPage from './webpage/AboutPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './api/axiosDefault';
import CreateAccount from './webpage/auth/CreateAcount';
import ShowAll from './webpage/ShowAll';
import HomePage from './webpage/HomePage';
import Footer from './components/Footer';
import LogIn from './webpage/auth/LogIn';

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
          <Route path="/login" element={<LogIn />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
