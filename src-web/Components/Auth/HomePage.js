import React, { useState } from 'react';
import './HomePage.css';
import UserPanel from './UserPanel';

const HomePage = (props) => {
    return (
        <div>
            <div className="homePageWrapper">
                <div className="users">
                    <UserPanel />
                </div>
                <div className="main-content">b</div>
                <div className="other">c</div>
            </div>

        </div>
    )
}

export default HomePage;