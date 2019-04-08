import './style/indexStyle';

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import App from "./components/App.jsx";
import reducer from './reducers/index';


// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__({trace: true, traceLimit: 25}));

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));



ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);





