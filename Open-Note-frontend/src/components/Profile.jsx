import React, { useState, useEffect } from 'react';
import config from '../config/config';

export default function Profile() {

  const hostname = config.backendHostname;
  const port = config.backendPort;
  const URL = `http://${hostname}:${port}`;
  const profileEndPoint = `${URL}/api/user/profile`;

  const [read, setRead] = useState(true);
  const [user, setUser] = useState({firstName: '', lastName: '', email: ''});

  useEffect(() => {
    fetchUer()
    // eslint-disable-next-line
  }, [])
  

  const handleRead = () => {
    if (read === true) {
      setRead(false);
    } else {
      setRead(true);
    }
  }

  const fetchUer = async (e) => {
    const response = await fetch(profileEndPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    })
    const result = await response.json();
    setUser({
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
    })
  }
  return (
    <div className='container my-3'>
      <h1 className='display-4 mb-3 text-center'>Profile</h1>
      <form>
        <div className='mb-3'>
          <label htmlFor="signup-firstName" className="form-label">First Name</label>
          <input type="text" className={`form-control input-text-light`}
            name='firstName' value={user.firstName} id="signup-firstName" placeholder='enter your first name' disabled={read} />
        </div>
        <div className='mb-3'>
          <label htmlFor="signup-lastName" className="form-label">Last Name</label>
          <input type="text" className={`form-control input-text-light`}
            name='lastName' value={user.lastName} id="signup-lastName" placeholder='enter your last name' disabled={read} />
        </div>
        <div className='mb-3'>
          <label htmlFor="signup-email" className="form-label">Email address</label>
          <input type="email" className={`form-control input-text-light`}
            name='email' value={user.email} id="signup-email" placeholder='enter your email' disabled />
        </div>
        <button onClick={handleRead} type="button" className="btn btn-light me-2">Edit</button>
        <button type="button" className="btn btn-light me-2">Save</button>
      </form>
    </div>
  )
}
