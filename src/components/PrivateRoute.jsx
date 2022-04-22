// @ts-check
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuthContext.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children
      : <Navigate to="/login" />
  );
};

export default PrivateRoute;
