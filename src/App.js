import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
