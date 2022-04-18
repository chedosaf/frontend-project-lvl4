import React, { useState } from 'react';
import authContext from '../contexts/authContext.jsx';

const AuthProvider = (props) => {
  const { children, id } = props;
  const defaultLog = id;
  const [loggedIn, setLoggedIn] = useState(defaultLog);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  return (
    <authContext.Provider value={{
      loggedIn, logIn, logOut, getAuthHeader,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
