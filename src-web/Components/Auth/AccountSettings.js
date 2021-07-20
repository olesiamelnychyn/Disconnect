import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@material-ui/core';
import { createUrl } from '../../utils/queryParam';
import { Link } from "react-router-dom"

const deleteAccount = (userHasAuthenticated, history) => {
    const credentials = {
        username: Cookies.get("user")
    };
    fetch(createUrl("http://localhost:8081/delete", credentials))
        .then(function (response) {
            if (response.ok) {
                return response;
            } else {
                return false;
            }
        }).then((result) => {
            if (result) {
                userHasAuthenticated(false);
                Cookies.remove("user");
                history.push("/login")
            }
        })
}

const AccountSettings = ({ userHasAuthenticated, history }) => {

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => deleteAccount(userHasAuthenticated, history)}>Delete Account</Button>
            <br />
            <br />
            <Link to={"/home"} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" >Back to Home</Button>
            </Link>
        </div>
    )
}

export default AccountSettings;