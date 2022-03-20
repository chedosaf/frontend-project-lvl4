// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './components/app.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const AppFinal = () => (
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);

ReactDOM.render(
  <AppFinal />, document.querySelector('#chat'),
);

console.log('it works now!');
