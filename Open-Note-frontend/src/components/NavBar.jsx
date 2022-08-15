import React, { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeContext from '../context/theme/ThemeContext';

export default function NavBar() {
  const themeContext = useContext(ThemeContext);
  const { getTheme, setTheme } = themeContext;
  const theme = getTheme();
  const altTheme = theme === 'light' ? 'dark' : 'light';
  theme === 'light' ? document.body.style.backgroundColor = 'rgb(255, 255, 255)' : document.body.style.backgroundColor = 'rgb(32, 33, 36)';

  const path = useLocation().pathname;
  const [log, setLog] = useState(localStorage.getItem('auth-token'))
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('auth-token');
    setLog(null);
    navigate(0);
  }
  
  const navigateProfile = () => {
    navigate('/profile');
  }

  const toggleTheme = () => {
    getTheme() === 'dark' ? setTheme('light') : setTheme('dark');
  }
  return (
    <>
      <nav className={`navbar navbar-dropShadow-${altTheme} navbar-expand-lg bg-${theme} sticky-top`}>
        <div className="container-fluid">
          <div className={`logo-brand d-flex justify-content-center align-items-center`}>
            <img className='' src="logo192.png" alt="logo-open-note" height="40" />
            <Link className={`navbar-brand fw-bold ms-1 me-3 text-${altTheme}`} to="/">Open Note</Link>
          </div>
          <button className="navbar-toggler text-muted" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className={`text-${altTheme}`}><i className="bi bi-list"></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              {log && <li className="nav-item text-center m-1">
                <Link className={`nav-link text-${altTheme} hover-${theme} ${path === '/' ? `active-${theme}` : ''}`} to="/">Home</Link>
              </li>}
              <li className={`nav-item text-center m-1`}>
                <Link className={`nav-link text-${altTheme} hover-${theme} ${path === '/about' ? `active-${theme}` : ''}`} to="/about">About</Link>
              </li>
            </ul>
            <div className="ms-auto d-lg-flex justify-content-center align-items-center">
              <ul className="navbar-nav me-auto">
                {!log && <li className={`nav-item text-center m-1`}>
                  <Link className={`nav-link text-${altTheme} hover-${theme}`} to="/signup">SignUp</Link>
                </li>}
                {!log && <li className={`nav-item text-center m-1`}>
                  <Link className={`nav-link text-${altTheme} hover-${theme}`} to="/login">LogIn</Link>
                </li>}
                {log && <li onClick={handleLogOut} className={`nav-item text-center m-1`}>
                  <Link className={`nav-link text-${altTheme} hover-${theme}`} to="/">Logout</Link>
                </li>}
              </ul>
              <div className='d-flex justify-content-center align-items-center my-1'>
                {log && <div onClick={navigateProfile} className={`icons hover-${theme} my-auto mx-lg-2 d-flex justify-content-center align-items-center`}>
                  <i className={`bi bi-person-circle fs-5 text-${altTheme}`}></i>
                </div>}
                <div onClick={toggleTheme} className={`icons hover-${theme} my-auto mx-lg-2 d-flex justify-content-center align-items-center`}>
                  <i className={`bi bi-${theme === 'light' ? 'moon' : 'sun'}-fill fs-5 text-${altTheme}`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
