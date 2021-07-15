import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

const MainPage = (props) => {
  const { history } = props
  return (
    <div>
      <Switch>
        <Route history={history} path='/login' component={LoginPage} />
        <Route history={history} path='/signup' component={RegisterPage} />
        <Redirect from='/' to='/login' />
      </Switch>
    </div>
  )
}

export default MainPage;