import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import ThemeContext from './context/theme/ThemeContext';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const themeContext = useContext(ThemeContext);
  const { getTheme } = themeContext;
  const theme = getTheme();
  theme === 'light' ? document.body.style.backgroundColor = 'rgb(255, 255, 255)' : document.body.style.backgroundColor = 'rgb(32, 33, 36)';

  return (
    <>
      <ToastContainer theme={theme} position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false}
        closeOnClick={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} transition={Flip}
      />
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
