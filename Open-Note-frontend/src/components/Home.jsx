import React from 'react';
import LandingPage from './LandingPage';
import Notes from './Notes';

export default function Home() {
  return (
    <>
      <div className='container'>
        {localStorage.getItem('auth-token') === null || localStorage.getItem('auth-token') === 'null' || localStorage.getItem('auth-token') === ''
          ? <LandingPage />
          : <Notes />}
      </div>
    </>
  )
}