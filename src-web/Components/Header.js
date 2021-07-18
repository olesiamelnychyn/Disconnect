import React, { useState } from 'react';
import logo from '../../public/assets/small_logo_disconnect_white.svg';
import Cookies from 'js-cookie';
import './Header.css';


const logout= (userHasAuthenticated) =>{
    Cookies.remove("user");
    userHasAuthenticated(false)
}

const Header = (props) => {
    return (
        <div className="header">

            <img src={logo} alt='logo_disconnect'/>
            { props.isAuthenticated && 
            <a className="logoutButton" onClick={()=>{logout(props.userHasAuthenticated)}}>LOG OUT</a>
            }
        </div>
    )
}

export default Header;