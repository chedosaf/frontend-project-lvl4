import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import AppFinal from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  (React.createElement(AppFinal)), document.querySelector('#chat'),
);
