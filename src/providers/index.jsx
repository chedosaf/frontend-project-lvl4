import React, { useState } from 'react';
import authContext from '../contexts/authContext.jsx';

const AuthProvider = (props) => {
  const { children, userInfo } = props;
  const [loggedIn, setLoggedIn] = useState(() => !!userInfo);

  const logIn = (res) => {
    localStorage.setItem('userId', JSON.stringify(res.data));

    setLoggedIn(true);
  };

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

  const getUserName = () => JSON.parse(localStorage.getItem('userId')).username;

  return (
    <authContext.Provider value={{
      loggedIn, logIn, logOut, getAuthHeader, getUserName,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
