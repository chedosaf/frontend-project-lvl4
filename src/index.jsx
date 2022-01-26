// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import SignupForm from './loginForm.jsx';
import NotFoundPage from './notFoundpage.jsx';

const React = require('react');

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/notfoundpage">NotFoundPage</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/notfoundpage" element={<NotFoundPage />} />
      </Routes>
    </div>
  </Router>

);

ReactDOM.render(<App />, document.querySelector('#chat'));
/* const p = document.createElement('p');
p.classList.add('card-text');
p.textContent = 'It works!';

const h5 = document.createElement('h5');
h5.classList.add('card-title');
h5.textContent = 'Project frontend l4 boilerplate';

const cardBody = document.createElement('div');
cardBody.classList.add('card-body');
cardBody.append(h5, p);

const card = document.createElement('div');
card.classList.add('card', 'text-center');
card.append(cardBody);

const container = document.querySelector('#chat');
container.append(card); */

console.log('it works now!');
