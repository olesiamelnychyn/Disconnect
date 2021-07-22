import React from 'react';
import logo from '../../public/assets/small_logo_disconnect_white.svg';
import Cookies from 'js-cookie';
import './Header.css';
import { Link } from "react-router-dom"
import { withTranslation, useTranslation, Trans } from 'react-i18next'


const changeLang = (lang, i18n) => {
    i18n.changeLanguage(lang)
}

const logout = (userHasAuthenticated) => {
    Cookies.remove("user");
    userHasAuthenticated(false)
}

const Header = (props) => {
    const { t, i18n } = useTranslation();
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    if (!darkThemeMq.matches) {

        document.getElementById("favi").href = "./assets/logo_disconnect.ico"
    } else {
        document.getElementById("favi").href = "./assets/logo_disconnect-black.ico"
    }
    return (
        <div className="header">

            <a href="/home" ><img src={logo} alt='logo_disconnect' style={{ height: "-webkit-fill-available" }} /></a>
            <div style={{ display: "flex" }}>
                {props.isAuthenticated &&
                    <div style={{ display: "flex" }}>
                        <Link to={"/accountSettings"} className="logoutButton" style={{ textDecoration: 'none', marginRight: "-10px" }}>{t('Auth.home.header.settings')}</Link>
                        <a className="logoutButton" style={{ marginRight: "-10px" }} onClick={() => { logout(props.userHasAuthenticated) }}>{t('Auth.home.header.logOut')}</a>
                    </div>
                }
                <Link className="logoutButton" style={{ textDecoration: 'none' }} onClick={() => changeLang(t('common.language'), i18n)}>{t('common.language')}</Link>
            </div>
        </div>
    )
}

export default withTranslation()(Header);