import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Apple from './Apple';
import apple from './stores/appleStore';

ReactDOM.render(
  <Provider apple={apple}><Apple /></Provider>,
  document.getElementById('root')
);

