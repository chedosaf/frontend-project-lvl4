import React, { useState } from 'react';
import authContext from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const log = !!localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(log);
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
