import React from 'react';
import {Link, useLocation} from 'react-router-dom';
// import { NavItem } from 'react-bootstrap';

const NavItemSub = props => {
    
    let match = useLocation({
        pathname: props.link
    })

    const {pathname} = match;

    return (
        <li className="nav-item">
            <Link to={props.link} className={`nav-link ${pathname === props.link ? 'active' : ''}`}>
                <span className="sidebar-mini"> - </span>
                <span className="sidebar-normal">
                    {props.label}
                </span>
            </Link>
        </li>
    );
}

export default NavItemSub;