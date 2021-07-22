import React, { useState } from 'react';
import './UserPanelItem.css'

const UserPanelItem = (props) => {
  const colorStatus = props.active ? "green" : "grey"
  return (
    <div className="userPanelWrapper">
      <div className="userIcon">
        {props.firstName[0]}{props.lastName[0]}
        <div className="userStatusIndicator" style={{ "backgroundColor": colorStatus }}>
        </div>
      </div>
      <div className="userName">
        {props.firstName} {props.lastName}
      </div>
    </div>

  )
}

export default UserPanelItem;

