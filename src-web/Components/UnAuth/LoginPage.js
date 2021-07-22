import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import './LoginPage.css';
import { Button } from '@material-ui/core';
import { createUrl } from '../../utils/queryParam';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie';

function login(loginCredentials, setinvalidInput, history, userHasAuthenticated) {
    fetch(createUrl("http://localhost:8081/login", loginCredentials))
        .then(function (response) {
            if (response.ok) {
                return response;
            } else {
                setinvalidInput(true);
                return false;
            }
        }).then((result) => {
            if (result) {
                userHasAuthenticated(true)
                Cookies.set("user", loginCredentials.username);
                history.push("/home")
            }
        })
}

function LoginPage(props) {
    const [invalidInput, setinvalidInput] = useState(false)
    const [loginCredentials, setLoginCredentials] = useState({
        username: "",
        password: ""
    })
    console.log(props)
    const { userHasAuthenticated, history } = props

    const { t, i18n } = useTranslation();
    return (
        <div>
            <h2>{t('UnAuth.logIn.motive')}<br /></h2>
            <div className="loginInputWrapper">
                <div className="loginform">
                    <TextField
                        error={invalidInput}
                        id="username"
                        name="username"
                        label={t('UnAuth.common.email')}
                        onChange={(event) => setLoginCredentials({ ...loginCredentials, [event.target.name]: event.target.value })}
                        helperText={t('UnAuth.logIn.usernameMessage')}
                    />
                    <br />
                    <TextField
                        error={invalidInput}
                        id="password"
                        name="password"
                        label={t('UnAuth.common.password')}
                        type="password"
                        autoComplete="current-password"
                        onChange={(event) => setLoginCredentials({ ...loginCredentials, [event.target.name]: event.target.value })}
                    />
                    <div className="buttons">
                        <Button variant="contained" color="primary" style={{ minWidth: "120px" }} onClick={() => login(loginCredentials, setinvalidInput, history, userHasAuthenticated)}>{t('UnAuth.common.logIn')}</Button>
                        <p>{t('UnAuth.logIn.toSignUp')}</p>
                        <Link to={"/signup"} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary" >{t('UnAuth.common.signUp')}</Button>
                        </Link>
                    </div>
                </div >
            </div>

        </div >

    )
}

export default LoginPage
