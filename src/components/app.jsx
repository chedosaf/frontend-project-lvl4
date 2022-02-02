import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from 'react-router-dom';
import React from 'react';

import LoginPage from './loginPage.jsx';
import NotFoundPage from './notFoundPage.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/not-found-404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found-404" />} />
    </Routes>
  </Router>
);

const Home = () => (<div>Hello!</div>);

export default App;
