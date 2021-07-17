import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Components/MainPage'
import { Router } from "react-router-dom"
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Routes />
  </Router>,
  document.getElementById('root')
);


