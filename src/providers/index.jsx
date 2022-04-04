import React, { useState } from 'react';
import authContext from '../contexts/authContext.jsx';

const AuthProvider = ({ children }) => {
  const defaultLog = !!localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(defaultLog);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{
      loggedIn, logIn, logOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
