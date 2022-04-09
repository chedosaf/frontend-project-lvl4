// @ts-check
import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const NavBar = () => {
  const auth = useAuth();
  const handeleLogOut = () => {
    auth.logOut();
  };
  const { t } = useTranslation();
  return (
    <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white justify-content-between px-2">
      <Nav.Item as="li">
        <Link className="navbar-brand" to={routes.main()}>Hexlet Chat</Link>
      </Nav.Item>
      {!auth.loggedIn ? null
        : (
          <Nav.Item>
            <Button className="primary" onClick={handeleLogOut}>{t('logOut')}</Button>
          </Nav.Item>
        )}
    </Nav>
  );
};
export default NavBar;
