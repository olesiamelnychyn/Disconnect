import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@material-ui/core';
import { createUrl } from '../../utils/queryParam';
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation()
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => deleteAccount(userHasAuthenticated, history)}>{t('Auth.home.settings.delete')}</Button>
            <br />
            <br />
            <Link to={"/home"} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" >{t('Auth.home.settings.back')}</Button>
            </Link>
        </div>
    )
}

export default AccountSettings;