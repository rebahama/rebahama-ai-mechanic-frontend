import './App.css';
import styles from './App.module.css'
import Button from 'react-bootstrap/Button';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <p> hello </p>
       <Button variant="primary">Primary</Button>
       

       <div>
    </div>

    </div>
  );
}

export default App;
