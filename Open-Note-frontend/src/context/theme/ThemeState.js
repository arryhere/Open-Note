import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeState = (props) => {

  const [theme, settheme] = useState(localStorage.getItem('theme'));

  function getTheme() {
    if (theme === 'light') {
      return 'light';
    } else if (theme === 'dark') {
      return 'dark';
    } else {
      return 'light';
    }
  }

  function setTheme(theme) {
    settheme(theme);
    localStorage.setItem('theme', theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, getTheme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeState;