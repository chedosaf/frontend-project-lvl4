// @ts-check
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from 'react-router-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';

import { useTranslation } from 'react-i18next';

import NavBar from './NavBar.jsx';
import LoginPage from './LoginForm.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Chat from './ChatPage.jsx';

import PrivateRoute from './PrivateRoute.jsx';
import SignPage from './SignPage.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const App = () => {
  const { t } = useTranslation();
  const notify = {
    addChannellSuccess: () => toast.success(t('notify.addChannellSuccess'), {
      position: toast.POSITION.TOP_RIGHT,
    }),
    renameChannellSuccess: () => toast.success(t('notify.renameChannellSuccess'), {
      position: toast.POSITION.TOP_RIGHT,
    }),
    removeChannellSuccess: () => toast.success(t('notify.removeChannellSuccess'), {
      position: toast.POSITION.TOP_RIGHT,
    }),
    showChannellFailer: () => toast.warn(t('notify.updateChannellFailer'), {
      position: toast.POSITION.TOP_RIGHT,
    }),
    fetchDataFailer: () => toast.warn(t('notify.fetchDataFailer'), {
      position: toast.POSITION.TOP_RIGHT,
    }),
  };
  const routes = {
    main: '/',
    login: '/login',
    notFoundPage: '/not-found-404',
    signUp: 'signup',
    else: '*',
  };

  return (
    <>
      <Router>
        <NavBar routes={routes} />
        <Routes>
          <Route
            path={routes.main}
            element={(
              <PrivateRoute>
                <Chat notify={notify} />
              </PrivateRoute>
            )}
          />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.notFoundPage} element={<NotFoundPage />} />
          <Route path={routes.signUp} element={<SignPage />} />
          <Route path={routes.else} element={<Navigate to={routes.notFoundPage} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
