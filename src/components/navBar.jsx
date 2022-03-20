// @ts-check
import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

const NavBar = () => {
  const auth = useAuth();
  const handeleLogOut = () => {
    auth.logOut();
  };

  return (
    <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white justify-content-between px-2">
      <Nav.Item as="li">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
      </Nav.Item>
      {!auth.loggedIn ? null
        : (
          <Nav.Item>
            <Button className="primary" onClick={handeleLogOut}>Выйти</Button>
          </Nav.Item>
        )}
    </Nav>
  );
};
export default NavBar;
