import React, { useState, useContext } from 'react'
import config from '../config/config';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../context/theme/ThemeContext';
import { toast } from 'react-toastify';

export default function Signup(props) {
  const themeContext = useContext(ThemeContext);
  const { getTheme } = themeContext;
  const theme = getTheme();
  const altTheme = theme === 'light' ? 'dark' : 'light';

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
      navigate(0);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className='container my-3'>
      <h1 className={`display-4 mb-3 text-center text-${altTheme}`}>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="signup-firstName" className={`form-label text-${altTheme}`}>First Name</label>
          <input onChange={handleSignupCredentials} type="text" className={`form-control bg-${theme} text-${altTheme} input-text-${theme}`}
            name='firstName' value={signupCredentials.firstName} id="signup-firstName" placeholder='enter your first name' />
        </div>
        <div className='mb-3'>
          <label htmlFor="signup-lastName" className={`form-label text-${altTheme}`}>Last Name</label>
          <input onChange={handleSignupCredentials} type="text" className={`form-control bg-${theme} text-${altTheme} input-text-${theme}`}
            name='lastName' value={signupCredentials.lastName} id="signup-lastName" placeholder='enter your last name' />
        </div>
        <div className='mb-3'>
          <label htmlFor="signup-email" className={`form-label text-${altTheme}`}>Email address</label>
          <input onChange={handleSignupCredentials} type="email" className={`form-control bg-${theme} text-${altTheme} input-text-${theme}`}
            name='email' value={signupCredentials.email} id="signup-email" placeholder='enter your email' />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-pasword" className={`form-label text-${altTheme}`}>Password</label>
          <input onChange={handleSignupCredentials} type="password" className={`form-control bg-${theme} text-${altTheme} input-text-${theme}`}
            name='password' value={signupCredentials.password} id="signup-pasword" placeholder='enter your password' />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-confirmPassword" className={`form-label text-${altTheme}`}>Confirm Password</label>
          <input onChange={handleSignupCredentials} type="password" className={`form-control bg-${theme} text-${altTheme} input-text-${theme}`}
            name='confirmPassword' value={signupCredentials.confirmPassword} id="signup-confirmPassword" placeholder='re-enter your password' />
        </div>
        <button type="submit" className={`btn btn-${theme}`}>Submit</button>
      </form>
    </div>
  )
}
