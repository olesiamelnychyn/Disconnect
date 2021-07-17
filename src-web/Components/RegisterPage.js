import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from "react-router-dom"
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import { createUrl } from '../utils/queryParam';
import './RegisterPage.css'

const checks = {
    username: (value) => !/\S+@\S+\.\S+/.test(value),
    firstname: (value) => !/^[A-Za-z]{5,}$/i.test(value),
    familyname: (value) => !/^[A-Za-z]{2,}$/i.test(value),
    password: (value) => !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
}


const signup = (registerCredentials, history, setUsedEmail) => {
    for (const [key, value] of Object.entries(registerCredentials)) {
        if (key != "gender" && checks[key](value)) {
            alert("wrong input");
            return
        }
    }
    fetch(createUrl("http://localhost:8081/signup", registerCredentials))
        .then(function (response) {
            if (response.ok) {
                return response;
            } else {
                setUsedEmail("E-mail is alredy used")
                console.log(response.body)
                return false;
            }
        }).then((result) => {
            if (result) {
                history.push('/')
            }
        })
}
const RegisterPage = (props) => {
    const [registerCredentials, setRegisterCredentials] = useState({
        username: "",
        firstname: "",
        familyname: "",
        password: "",
        gender: "male",
    })

    const [usedEmail, setUsedEmail] = useState("")
    const { history } = props
    return (
        <div>
                <h2>Fill in the information to register</h2>
            <div className="regiterPageWrapper">
                <TextField
                    error={checks.username(registerCredentials.username) || usedEmail !== ""}
                    id="username"
                    name="username"
                    label="E-mail"
                    onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }); setUsedEmail("") }}
                    helperText={usedEmail}
                />
                <br />
                <TextField
                    error={checks.firstname(registerCredentials.firstname)}
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    style={{marginTop:"8px"}}
                    onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }} />
                <br />
                <TextField
                    error={checks.familyname(registerCredentials.familyname)}
                    id="familyname"
                    name="familyname"
                    label="Family Name"
                    style={{marginTop:"8px"}}
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
                    <Button variant="contained" color="primary" onClick={() => { signup(registerCredentials, history, setUsedEmail) }}> Sign up </Button>
                    <Link to={"/login"} style={{ textDecoration: 'none' }}>
                        <Button variant="contained"  style={{marginTop:"8px"}} > Back to Log In </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;