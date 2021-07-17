import React, { useState } from 'react';
import logo from '../../public/assets/small_logo_disconnect.png';
import Cookies from 'js-cookie';
import './Header.css';
import { Button } from '@material-ui/core';


const logout= (userHasAuthenticated) =>{
    Cookies.remove("user");
    userHasAuthenticated(false)
}

const Header = (props) => {
    return (
        <div className="header">
            <img src={logo} alt='logo_disconnect'/>
            { props.isAuthenticated && 
                <Button  variant="contained" style={{maxHeight:"25px", marginTop:"30px", marginRight:"10px"}} onClick={()=>{logout(props.userHasAuthenticated)}}>Log out</Button>
            }
        </div>
    )
}

export default Header;