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
import '../css/extraStyles.scss';

import NavBar from './NavBar.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Chat from './ChatPage.jsx';

import PrivateRoute from './PrivateRoute.jsx';
import SignPage from './SignPage.jsx';
import routes from '../routes.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const App = () => {
  const { t } = useTranslation();
  const notify = {
    addChannellSuccess: () => toast.success(t('notify.addChannellSuccess')),
    renameChannellSuccess: () => toast.success(t('notify.renameChannellSuccess')),
    removeChannellSuccess: () => toast.success(t('notify.removeChannellSuccess')),
    showChannellFailer: () => toast.warn(t('notify.updateChannellFailer')),
    fetchDataFailer: () => toast.warn(t('notify.fetchDataFailer')),
  };

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path={routes.main()}
            element={(
              <PrivateRoute>
                <Chat notify={notify} />
              </PrivateRoute>
            )}
          />
          <Route path={routes.login()} element={<LoginPage />} />
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
          <Route path={routes.signUp()} element={<SignPage />} />
          <Route path={routes.else()} element={<Navigate to={routes.notFoundPage()} />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
};

export default App;
