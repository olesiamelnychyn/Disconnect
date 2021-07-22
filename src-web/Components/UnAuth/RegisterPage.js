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
import { useTranslation } from 'react-i18next';
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
    const { t, i18n } = useTranslation();

    return (
        <div>
            <h2 className="topTitle" id="topTitle">{!sucessfulRegistration ? t('UnAuth.signUp.tip') : t('UnAuth.signUp.verification')}</h2>

            {!sucessfulRegistration &&
                <div>
                    <div className="regiterPageWrapper" id="regiterPageWrapper">
                        <TextField
                            error={checks.username(registerCredentials.username) || usedEmail !== ""}
                            id="username"
                            name="username"
                            label={t('UnAuth.common.email')}
                            style={{ width: "100%" }}
                            onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }); setUsedEmail("") }}
                            helperText={usedEmail}
                        />
                        <br />
                        <TextField
                            error={checks.firstName(registerCredentials.firstName)}
                            id="firstName"
                            name="firstName"
                            label={t('UnAuth.signUp.firstName')}
                            style={{ marginTop: "8px", width: "100%" }}
                            onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }} />
                        <br />
                        <TextField
                            error={checks.lastName(registerCredentials.lastName)}
                            id="lastName"
                            name="lastName"
                            label={t('UnAuth.signUp.lastName')}
                            style={{ marginTop: "8px", width: "100%" }}
                            onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }}
                        />
                        <br />
                        <br />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t('UnAuth.signUp.gender.gender')}</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" value={registerCredentials.gender} onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }}>
                                <FormControlLabel name="gender" value="male" control={<Radio />} label={t('UnAuth.signUp.gender.male')} />
                                <FormControlLabel name="gender" value="female" control={<Radio />} label={t('UnAuth.signUp.gender.female')} />
                                <FormControlLabel name="gender" value="other" control={<Radio />} label={t('UnAuth.signUp.gender.other')} />
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <br />
                        <TextField
                            error={checks.password(registerCredentials.password)}
                            id="password"
                            name="password"
                            label={t('UnAuth.common.password')}
                            type="password"
                            helperText={t('UnAuth.signUp.passwordMessage')}
                            autoComplete="current-password"
                            onChange={(event) => { setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value }) }}
                        />
                        <br />
                        <br />
                        <div className="buttons">
                            <Button variant="contained" color="primary" onClick={() => { signup(registerCredentials, history, setUsedEmail, setSucessfulRegistration) }}> {t('UnAuth.common.signUp')} </Button>
                            <Link to={"/login"} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" style={{ marginTop: "8px" }}> {t('UnAuth.signUp.back')} </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default RegisterPage;