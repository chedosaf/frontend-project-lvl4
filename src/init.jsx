import React from 'react';
import ReactDOM from 'react-dom';
import AppFinal from './components/finalApp.jsx';

const init = () => {
  console.log(document.querySelector('#chat'));
  ReactDOM.render(
    <AppFinal />, document.querySelector('#chat'),
  );
};

export default init;
