import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import HomePage from './HomePage';
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

const MainPage = (props) => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const { history } = props
  return (
    <div>
      <Switch>
        <UnauthenticatedRoute path='/login' component={LoginPage} appProps={{ userHasAuthenticated }} history={history} />
        <Route path='/signup' component={RegisterPage} appProps={{ isAuthenticated }} />
        <AuthenticatedRoute path='/home' component={HomePage} appProps={{ isAuthenticated }} history={history} />
        <Redirect from='/' to='/login' />
      </Switch>
    </div>
  )
}

export default MainPage;