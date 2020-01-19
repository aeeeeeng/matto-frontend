import React from 'react';
import Aux from '../../hoc/Aux';

import './Sidebar.css';
import Logo from './Logo/Logo';
import SidebarWrapper from './SidebarWrapper/SidebarWrapper';

class Sidebar extends React.Component {
    render() {
        return (
            <Aux>
                <div className="sidebar">
                    <Logo />
                    <SidebarWrapper />
                </div>
            </Aux>
        )
    }
}

export default Sidebar;