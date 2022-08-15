import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [auth, setauth] = useState(localStorage.getItem('auth-token') ? true : false);

  const setAuth = (auth) => {
    setauth(auth);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;