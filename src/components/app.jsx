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

const App = () => {
  const { t } = useTranslation();
  const notify = {
    addChannellSuccess: () => toast.success(t('notify.addChannellSuccess'), {
      position: toast.POSITION.TOP_RIGHT,
    }),
    renameChannellSuccess: () => toast.success('notify.renameChannellSuccess', {
      position: toast.POSITION.TOP_RIGHT,
    }),
    removeChannellSuccess: () => toast.success('notify.deleteChannellSuccess', {
      position: toast.POSITION.TOP_RIGHT,
    }),
    showChannellFailer: () => toast.warn('notify.updateChannellFailer', {
      position: toast.POSITION.TOP_RIGHT,
    }),
    fetchDataFailer: () => toast.warn('notify.fetchDataFailer', {
      position: toast.POSITION.TOP_RIGHT,
    }),
  };

  return (
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
  );
};

export default App;
