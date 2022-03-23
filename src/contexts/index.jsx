import { createContext } from 'react';

const authContext = createContext({
  loggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export default authContext;
