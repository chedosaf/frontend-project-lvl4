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
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import NavBar from './navBar.jsx';
import AuthProvider from '../providers/index.jsx';
import LoginPage from './loginPage.jsx';
import NotFoundPage from './notFoundPage.jsx';
import Chat from './chatPage.jsx';
import store from '../slices/index.js';
import Listener from './listenerContainer.jsx';
import PrivateRoute from './privateRoute.jsx';
import SignPage from './signPage.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: '83b8de395eb445ca84c7ce8cfdbaf296',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

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
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <Provider store={store}>
            <Listener>
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
            </Listener>
          </Provider>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
