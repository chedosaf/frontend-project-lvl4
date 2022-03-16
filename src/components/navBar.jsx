import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const NavBar = () => {
  const auth = useAuth();
  const handeleLogOut = () => {
    auth.logOut();
  };

  return (
    <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white justify-content-between px-2">
      <Nav.Item as="li">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
      </Nav.Item>
      <Nav.Item>
        <Button className="primary" onClick={handeleLogOut}>Выйти</Button>
      </Nav.Item>
    </Nav>
  );
};
export default NavBar;
