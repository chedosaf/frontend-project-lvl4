// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import ReactDOM from 'react-dom';

const React = require('react');

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

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
const App = () => (<div>Hellooooouuu</div>);
const vdom = (<App />);

ReactDOM.render(
  vdom, document.getElementById('react-root'),
);

console.log('it works 1111111!');
