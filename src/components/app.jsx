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
import useAuth from '../hooks/index.jsx';
import LoginPage from './loginPage.jsx';
import NotFoundPage from './notFoundPage.jsx';
import Chat from './chatPage.jsx';
import store from '../slices/index.js';
import Listener from './soketContainer.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  console.log(auth.loggedIn);

  return (
    auth.loggedIn ? children
      : <Navigate to="/login" />
  );
};

const App = () => (

  <AuthProvider>
    <Provider store={store}>
      <Listener fluid style={{ height: '100vh' }}>
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
      </Listener>
    </Provider>
  </AuthProvider>
);

export default App;
