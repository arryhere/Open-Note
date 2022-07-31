import React, { useState } from 'react'
import config from '../config/config';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

  const hostname = config.backendHostname;
  const port = config.backendPort;
  const URL = `http://${hostname}:${port}`;
  const loginEndPoint = `${URL}/api/user/login`;
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });

  const handleLoginCredentials = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(loginEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: loginCredentials.email, password: loginCredentials.password })
    })
    const result = await response.json();
    if (result.success === true) {
      localStorage.setItem('auth-token', result.data);
      navigate('/', { replace: true })
      window.location.reload(true);
    } else {
      props.showAlert(result.success, result.message);
    }
  }

  return (
    <>
      <div className='container my-3'>
        <h1 className='display-4 mb-3 text-center'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="login-email" className="form-label">Email address</label>
            <input onChange={handleLoginCredentials} type="email" className="form-control input-text-light"
              name='email' value={loginCredentials.email} id="login-email" placeholder='enter your email' />
          </div>
          <div className="mb-3">
            <label htmlFor="login-pasword" className="form-label">Password</label>
            <input onChange={handleLoginCredentials} type="password" className="form-control input-text-light"
              name='password' value={loginCredentials.password} id="login-pasword" placeholder='enter your password' />
          </div>
          <button type="submit" className="btn btn-light">Submit</button>
        </form>
      </div>
    </>
  )
} 
