import React, { useState } from 'react';
import LoginPage from './UnAuth/LoginPage';
import RegisterPage from './UnAuth/RegisterPage';
import UnauthenticatedRoute from './UnAuth/UnauthenticatedRoute';
import AuthenticatedRoute from './Auth/AuthenticatedRoute';
import AccountSettings from './Auth/AccountSettings';
import Header from './Header';
import { withTranslation } from 'react-i18next'

import './MainPage.css';
import Cookies from 'js-cookie'

import HomePage from './Auth/HomePage';
import {
  Switch,
  Redirect,
} from "react-router-dom"

const authenticationCookie = () => {
  const user = Cookies.get("user")
  console.log(user)
  if (user != undefined) {
    return true
  }
  return false;
}

const Routes = (props) => {
  const [isAuthenticated, userHasAuthenticated] = useState(authenticationCookie());
  const { history } = props

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} userHasAuthenticated={userHasAuthenticated} />
      <Switch>
        <UnauthenticatedRoute path='/login' component={LoginPage} appProps={{ isAuthenticated, userHasAuthenticated }} history={history} />
        <UnauthenticatedRoute path='/signup' component={RegisterPage} appProps={{ isAuthenticated }} />
        <AuthenticatedRoute path='/home' component={HomePage} appProps={{ isAuthenticated }} history={history} />
        <AuthenticatedRoute path='/accountSettings' component={AccountSettings} appProps={{ isAuthenticated, userHasAuthenticated }} history={history} />
        <Redirect from='/' to='/login' />
      </Switch>
    </div>
  )
}

export default withTranslation()(Routes);