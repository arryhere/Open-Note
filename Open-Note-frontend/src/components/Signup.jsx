import React, { useState } from 'react'
import config from '../config/config';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const hostname = config.backendHostname;
  const port = config.backendPort;
  const URL = `http://${hostname}:${port}`;
  const signupEndPoint = `${URL}/api/user/signup`;
  const navigate = useNavigate();

  const [signupCredentials, setSignupCredentials] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

  const handleSignupCredentials = (e) => {
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(signupEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          firstName: signupCredentials.firstName,
          lastName: signupCredentials.lastName,
          email: signupCredentials.email,
          password: signupCredentials.password,
          confirmPassword: signupCredentials.confirmPassword
        })
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
    <div className='container my-3'>
      <h1 className='display-4 mb-3 text-center'>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="signup-firstName" className="form-label">First Name</label>
          <input onChange={handleSignupCredentials} type="text" className="form-control input-text-light"
            name='firstName' value={signupCredentials.firstName} id="signup-firstName" placeholder='enter your first name' />
        </div>
        <div className='mb-3'>
          <label htmlFor="signup-lastName" className="form-label">Last Name</label>
          <input onChange={handleSignupCredentials} type="text" className="form-control input-text-light"
            name='lastName' value={signupCredentials.lastName} id="signup-lastName" placeholder='enter your last name' />
        </div>
        <div className='mb-3'>
          <label htmlFor="signup-email" className="form-label">Email address</label>
          <input onChange={handleSignupCredentials} type="email" className="form-control input-text-light"
            name='email' value={signupCredentials.email} id="signup-email" placeholder='enter your email' />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-pasword" className="form-label">Password</label>
          <input onChange={handleSignupCredentials} type="password" className="form-control input-text-light"
            name='password' value={signupCredentials.password} id="signup-pasword" placeholder='enter your password' />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-confirmPassword" className="form-label">Confirm Password</label>
          <input onChange={handleSignupCredentials} type="password" className="form-control input-text-light"
            name='confirmPassword' value={signupCredentials.confirmPassword} id="signup-confirmPassword" placeholder='re-enter your password' />
        </div>
        <button type="submit" className="btn btn-light">Submit</button>
      </form>
    </div>
  )
}
