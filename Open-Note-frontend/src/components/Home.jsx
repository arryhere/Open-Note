import React, { useContext } from 'react';
import LandingPage from './LandingPage';
import Notes from './Notes';
import AuthContext from '../context/auth/AuthContext';

export default function Home() {

  const authContext = useContext(AuthContext);
  const { auth } = authContext;

  return (
    <>
      <div className='container'>
        {auth === false
          ? <LandingPage />
          : <Notes />}
      </div>
    </>
  )
}