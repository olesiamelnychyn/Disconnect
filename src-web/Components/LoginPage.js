import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import './Login.css';
import { Button } from '@material-ui/core';
import { createUrl } from '../utils/queryParam';
import { Link } from "react-router-dom";


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
    return (
        <div className="loginform">
            <TextField
                error={invalidInput}
                id="username"
                name="username"
                label="Username"
                onChange={(event) => setLoginCredentials({ ...loginCredentials, [event.target.name]: event.target.value })}
                helperText="Username is your email"
            />
            <br />
            <TextField
                error={invalidInput}
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(event) => setLoginCredentials({ ...loginCredentials, [event.target.name]: event.target.value })}
            />
            <br />
            <Button variant="contained" color="primary" onClick={() => login(loginCredentials, setinvalidInput, history, userHasAuthenticated)}>Log In</Button>
            <br />
            <Link to={"/signup"} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" >Sign up</Button>
            </Link>
        </div >
    )
}

export default LoginPage
