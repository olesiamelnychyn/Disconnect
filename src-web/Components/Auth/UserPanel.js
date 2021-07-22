import React, { useEffect, useState } from 'react';
import UserPanelItem from './UserPanelItem';

const UserPanel = (props) => {
    const [users, setUsers] = useState({})
    useEffect(() => {
        fetch(`http://localhost:8081/users`)
            .then(response => { return response.json(); })
            .then(data => {
                console.log(data)
                setUsers(data);
            });
    }, []);
    return (
        <div>
            {
                Object.keys(users).map((username) => {
                    return (
                        <div key={username}>
                            <UserPanelItem firstName={users[username].firstName} lastName={users[username].lastName} active={false} />
                        </div>)
                })
            }
        </div>
    )
}

export default UserPanel;

