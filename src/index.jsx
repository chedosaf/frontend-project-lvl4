// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import { React, ReactDOM } from 'react';
import NotFoundPage from './notFoundpage.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const vdom = NotFoundPage;

ReactDOM.render(
  vdom,
  document.getElementById('warning-container'),
);
