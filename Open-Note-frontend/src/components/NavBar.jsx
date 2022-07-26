import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const path = useLocation().pathname
  
  return (
    <>
      <nav className={`navbar navbar-dropShadow-dark navbar-expand-lg bg-light border-bottom border-muted sticky-top`}>
        <div className="container-fluid">
          <div className={`logo-brand d-flex justify-content-center align-items-center`}>
            <img className='' src="logo192.png" alt="logo-open-note" height="40" />
            <Link className={`navbar-brand fw-bold ms-1 me-3 text-dark`} to="/">Open Note</Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item text-center m-1">
                <Link className={`nav-link text-dark hover-light ${path === '/' ? `active-${'light'}` : ''}`} to="/">Home</Link>
              </li>
              <li className={`nav-item text-center m-1`}>
                <Link className={`nav-link text-dark hover-light ${path === '/about' ? `active-${'light'}` : ''}`} to="/about">About</Link>
              </li>
            </ul>
            <div className="ms-auto">
              <div className='d-flex justify-content-center align-items-center my-1'>
                <div className={`icons hover-light my-auto mx-lg-2 d-flex justify-content-center align-items-center`}>
                  <i className={`bi bi-sun-fill fs-5 text-dark`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
