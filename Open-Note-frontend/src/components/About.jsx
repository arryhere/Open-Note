import React, { useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';

export default function About() {

  const themeContext = useContext(ThemeContext);
  const { getTheme } = themeContext;
  const theme = getTheme();
  const altTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <div>
      <div className={`container my-3 p-3 bg-${theme} text-muted`}>
        <h1 className={`text-center mb-4 text-${altTheme}`}>Open Note</h1>
        <p className='text-center'>Open Note - A clean modern note taking app, built with simplicity in mind</p>
        <p className='text-center'>Made using React, Hope you enjoy it</p>
        <p className='text-center'> Github - https://github.com/arryhere/Open-Note</p>
        <p className='text-center'>Special thanks to @CodeWithHarry for project inspiration</p>
        <p className='text-center'>❤️</p>
      </div>
    </div>
  )
}
