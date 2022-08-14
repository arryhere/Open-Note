import React, { useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';

export default function LandingPage() {
  const themeContext = useContext(ThemeContext);
  const { getTheme } = themeContext;
  const theme = getTheme();
  const altTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <>
      <div className='container my-5 text-center'>
        <h1 className={`display-4 text-${theme === 'light' ? 'dark' : 'light'} mb-4`}>Welcome to Open Note</h1>
        <hr className={`text-${altTheme}`}/>
        <div className={`fs-5 text-muted mt-4`}>Start your Note taking journey today !</div>
        <div className='fs-5 text-muted'>Log In or Sign Up Now</div>
      </div>
    </>
  )
}
