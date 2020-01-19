import React from 'react';
import './Sidebarwrapper.css';
import './Navigation.css';

import User from './User/User';
import Nav from './Nav/Nav';
import UserInfo from './User/UserInfo/UserInfo';

class SidebarWrapper extends React.Component {

    state = {
        profileCollapse: false
    }

    collapseMenu = (event) => {
        event.preventDefault()
        
        this.setState({profileCollapse: !this.state.profileCollapse})
        
    }

    render() {
        return(
            <div className="sidebar-wrapper">
                <User handleCollapse={this.collapseMenu} isCollapse={this.state.profileCollapse}>
                    <UserInfo isCollapse={this.state.profileCollapse} />
                </User>
                <Nav />
            </div>
        )
    }

}

export default SidebarWrapper;