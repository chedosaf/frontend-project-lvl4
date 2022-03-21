// @ts-check
import ReactDOM from 'react-dom';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './components/app.jsx';

const AppFinal = () => (
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);

ReactDOM.render(
  <AppFinal />, document.querySelector('#chat'),
);

export default AppFinal;
