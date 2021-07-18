import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import './LoginPage.css';
import { Button } from '@material-ui/core';
import { createUrl } from '../../utils/queryParam';
import { Link } from "react-router-dom";
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
                Cookies.set("user","loginTrue");
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
        <div>
            <h2>Wouldn't it be great to know everyone? <br /></h2>
            <div className="loginInputWrapper">
                <div className="loginform">
                    <TextField
                        error={invalidInput}
                        id="username"
                        name="username"
                        label="Email"
                        onChange={(event) => setLoginCredentials({ ...loginCredentials, [event.target.name]: event.target.value })}
                        helperText="Email is your username"
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
                    <div className="buttons">
                        <Button variant="contained" color="primary" style={{width:"120px"}} onClick={() => login(loginCredentials, setinvalidInput, history, userHasAuthenticated)}>Log In</Button>
                        <p>Don't have an account yet?</p>
                        <Link to={"/signup"} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary" >Sign up</Button>
                        </Link>
                    </div>
                </div >
            </div>
            
        </div>
        
    )
}

export default LoginPage
