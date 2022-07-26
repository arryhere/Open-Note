import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white border-bottom sticky-top">
      <div className="container-fluid">
        <div className='logo-brand p-1 d-flex justify-content-center align-items-center'>
          <img src="logo192.png" alt="logo-open-note" height="40" />
          <Link className="navbar-brand fw-bold mx-2" to="/">Open Note</Link>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">About</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className='icons my-auto mx-lg-2 d-flex justify-content-center align-items-center'>
              <i className="bi bi-sun-fill fs-5 text-dark"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
