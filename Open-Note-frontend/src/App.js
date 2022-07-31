import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import Profile from './components/Profile';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (success, message) => {
    setAlert({success, message});
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/profile' element={<Profile />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
