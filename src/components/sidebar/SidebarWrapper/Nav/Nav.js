import React from 'react';
import './Nav.css';
import NavItem from './NavItem/NavItem';

import routes from '../../../../config/routes';

class Nav extends React.Component {
    state = {
        menus : routes
    }

    collapseMenu = (event, menuName) => {
        event.preventDefault();
        let thisMenu = [ ...this.state.menus ];
        const index = thisMenu.findIndex(o => o.name === menuName);
        thisMenu[index]['isCollapse'] = !thisMenu[index]['isCollapse'];
        this.setState({menus: thisMenu});
    }

    render() {
        return(
            <ul className="nav">
                { this.state.menus.map((menu, i) => <NavItem key={i} 
                                                             name={menu.name} 
                                                             link={menu.link} 
                                                             label={menu.label} 
                                                             child={menu.child ? menu.child : []} 
                                                             isCollapse={menu.isCollapse ? menu.isCollapse : false} 
                                                             icon={menu.icon}
                                                             handleClickedHasSub={this.collapseMenu}/> 
                )}
            </ul>
        );
    }
}

export default Nav;