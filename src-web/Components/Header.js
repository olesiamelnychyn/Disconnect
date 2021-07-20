import React, { useState } from 'react';
import logo from '../../public/assets/small_logo_disconnect_white.svg';
import Cookies from 'js-cookie';
import './Header.css';
import { Link } from "react-router-dom"



const logout = (userHasAuthenticated) => {
    Cookies.remove("user");
    userHasAuthenticated(false)
}

const Header = (props) => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (!darkThemeMq.matches) {

        document.getElementById("favi").href = "./assets/logo_disconnect.ico"
    } else {
        document.getElementById("favi").href = "./assets/logo_disconnect-black.ico"
    }
    return (
        <div className="header">

            <img src={logo} alt='logo_disconnect' />
            {props.isAuthenticated &&
                <div style={{ display: "flex" }}>
                    <Link to={"/accountSettings"} className="logoutButton" style={{ textDecoration: 'none', marginRight: "-10px" }}>
                        SETTINGS
                    </Link>
                    <a className="logoutButton" onClick={() => { logout(props.userHasAuthenticated) }}>LOG OUT</a>
                </div>
            }
        </div>
    )
}

export default Header;