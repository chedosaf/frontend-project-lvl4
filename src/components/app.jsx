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

import NavBar from './navBar.jsx';
import LoginPage from './loginPage.jsx';
import NotFoundPage from './notFoundPage.jsx';
import Chat from './chatPage.jsx';

import PrivateRoute from './privateRoute.jsx';
import SignPage from './signPage.jsx';

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

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat notify={notify} />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/not-found-404" element={<NotFoundPage />} />
          <Route path="/signup" element={<SignPage />} />
          <Route path="*" element={<Navigate to="/not-found-404" />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
