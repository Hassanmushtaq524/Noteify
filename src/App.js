import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/NoteState';
import AlertState from './context/AlertState';

// APP
const App = () => {

  return (
    <>
      <AlertState>
      <NoteState>
        <BrowserRouter>
          <Navbar title="Noteify" />
          <Alert/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
