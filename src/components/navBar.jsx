import React from 'react';
import { Button, Nav } from 'react-bootstrap';

const NavBar = () => (
  <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white justify-content-between">
    <Nav.Item as="li">
      <a className="navbar-brand" href="/">Hexlet Chat</a>
    </Nav.Item>
    <Nav.Item>
      <Button className="primary">Выйти</Button>
    </Nav.Item>
  </Nav>
);
export default NavBar;
