import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import React from 'react';
import { Provider } from 'react-redux';
import NavBar from './navBar.jsx';
import AuthProvider from '../providers/index.jsx';
import useAuth from '../hooks/index.jsx';
import LoginPage from './loginPage.jsx';
import NotFoundPage from './notFoundPage.jsx';
import Chat from './chatPage.jsx';
import store from '../slices/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? children
      : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <Provider store={store}>
      <Container fluid>
        <NavBar />
        <Router>
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
            <Route path="*" element={<Navigate to="/not-found-404" />} />
          </Routes>
        </Router>
      </Container>
    </Provider>
  </AuthProvider>
);

export default App;
