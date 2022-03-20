// @ts-check
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
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

const App = () => (

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
                  <Chat />
                </PrivateRoute>
            )}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/not-found-404" element={<NotFoundPage />} />
            <Route path="/signup" element={<SignPage />} />
            <Route path="*" element={<Navigate to="/not-found-404" />} />
          </Routes>
        </Router>
      </Listener>
    </Provider>
  </AuthProvider>
);

export default App;
