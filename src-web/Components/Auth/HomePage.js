import React, { useState } from 'react';
import UserPanelItem from './UserPanelItem'
import './HomePage.css';

const HomePage = (props) => {
    return (
        <div>
            <div className="homePageWrapper">
                <div className="users">a</div>
                <div className="main-content">b</div>
                <div className="other">c</div>
            </div>
            {/* <UserPanelItem firstName="Dominik" lastName="Sasko" active="true" /> */}
        </div>
    )
}

export default HomePage;