import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Components/MainPage'
import { Router } from "react-router-dom"
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Router history={history}>
      <Routes />
    </Router>
  </I18nextProvider>,
  document.getElementById('root')
);


