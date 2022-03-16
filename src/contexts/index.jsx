import { createContext } from 'react';

const authContext = createContext({
  userName: null,
  loggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export default authContext;
