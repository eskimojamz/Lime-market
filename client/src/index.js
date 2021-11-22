import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
