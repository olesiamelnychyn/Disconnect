import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from "react-router-dom"
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import { createUrl } from '../../utils/queryParam';
import './RegisterPage.css'

const checks = {
    username: (value) => !/\S+@\S+\.\S+/.test(value),
    firstName: (value) => !/^[A-Za-z]{3,}$/i.test(value),
    lastName: (value) => !/^[A-Za-z]{2,}$/i.test(value),
    password: (value) => !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
}


const signup = (registerCredentials, history, setUsedEmail, setSucessfulRegistration) => {
    for (const [key, value] of Object.entries(registerCredentials)) {
        if (key != "gender" && checks[key](value)) {
            alert("wrong input");
            return
        }
    }
    fetch(createUrl("http://localhost:8081/signup", registerCredentials))
        .then(function (response) {
            if (response.ok) {
                setSucessfulRegistration(true);
                return response;
            } else {
                setUsedEmail("E-mail is alredy used")
                console.log(response.body)
                return false;
            }
        }).then((result) => {
            if (result) {
                setTimeout(() => {
                    history.push('/');
                }, 5000);
            }
        })
}

const RegisterPage = (props) => {
    const [registerCredentials, setRegisterCredentials] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        gender: "male",
    })

    const [usedEmail, setUsedEmail] = useState("")
    const [sucessfulRegistration, setSucessfulRegistration] = useState(false)
    const { history } = props
    return (
        <div>
            <h2 className="topTitle" id="topTitle">{!sucessfulRegistration ? "Fill in the information to register" : "Your verification email was sent. You will now be redirected to login page."}</h2>

            {!sucessfulRegistration &&
                <div>
                    <div className="regiterPageWrapper" id="regiterPageWrapper">
                        <TextField
                            error={checks.username(registerCredentials.username) || usedEmail !== ""}
                            id="username"
                            name="username"
                            label="E-mail"
                            style={{ width: "100%" }}
                            onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }); setUsedEmail("") }}
                            helperText={usedEmail}
                        />
                        <br />
                        <TextField
                            error={checks.firstName(registerCredentials.firstName)}
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            style={{ marginTop: "8px", width: "100%" }}
                            onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }} />
                        <br />
                        <TextField
                            error={checks.lastName(registerCredentials.lastName)}
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            style={{ marginTop: "8px", width: "100%" }}
                            onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }}
                        />
                        <br />
                        <br />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" value={registerCredentials.gender} onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }}>
                                <FormControlLabel name="gender" value="male" control={<Radio />} label="Male" />
                                <FormControlLabel name="gender" value="female" control={<Radio />} label="Female" />
                                <FormControlLabel name="gender" value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <br />
                        <TextField
                            error={checks.password(registerCredentials.password)}
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            helperText="Password should consist of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                            autoComplete="current-password"
                            onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }}
                        />
                        <br />
                        <br />
                        <div className="buttons">
                            <Button variant="contained" color="primary" onClick={() => { signup(registerCredentials, history, setUsedEmail, setSucessfulRegistration) }}> Sign up </Button>
                            <Link to={"/login"} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" style={{ marginTop: "8px" }}> Back to Log In </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default RegisterPage;