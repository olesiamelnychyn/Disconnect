import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './Components/MainPage'
import { Router } from "react-router-dom"
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <MainPage />
  </Router>,
  document.getElementById('root')
);


