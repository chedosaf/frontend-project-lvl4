import { createContext } from 'react';

const authContext = createContext({
  loggedIn: false,
  logIn: () => {},
  logOut: () => {},
  getAuthHeader: () => {},
});

export default authContext;
