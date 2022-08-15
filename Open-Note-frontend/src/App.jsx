import React, { useContext } from 'react';
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
  const toastStyle = {
    backgroundColor: `${theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(32, 33, 36)'}`,
    border: `1px solid ${theme === 'light' ? 'rgb(254, 239, 195)' : 'rgb(129, 106, 70)'}`
  }
  return (
    <>
      <ToastContainer theme={theme} position="top-center" autoClose={1500} hideProgressBar={true} newestOnTop={false}
        closeOnClick={false} pauseOnFocusLoss={false} draggable={true} pauseOnHover={false} transition={Flip} closeButton={false}
        toastStyle={toastStyle}
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
