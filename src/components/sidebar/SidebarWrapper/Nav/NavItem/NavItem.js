import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {Collapse} from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";

import './NavItem.css';
import NavItemSub from './NavItemSub/NavItemSub';

const NavItem = props => {
    let match = useLocation({
        pathname: props.link
    })

    const {pathname} = match;

    let isCollapseHandle = false;

    let iconIsChild = null;
    let subMenu = null;
    let subMenuCollapse = null;
    let linkMenu = (
        <Link to={props.link} className={`nav-link ${pathname === props.link ? 'active' : ''}`} >
            <div className="icon">
                <FontAwesomeIcon icon={props.icon} />
            </div>
            <p> 
                {props.label}
            </p>
        </Link>
    );
    
    
    if(props.child.length > 0) {
        iconIsChild =  (<span className="icon-child">
                            <FontAwesomeIcon icon={faCaretDown} /> 
                        </span>);
        subMenu = props.child.map((menu, i) => {
            if(pathname === menu.link) {
                isCollapseHandle = true;
            }
           return ( <NavItemSub key={i} name={menu.name} link={menu.link} label={menu.label} /> )
        });
        linkMenu = (
            <a href="/" className="nav-link" onClick={(e) => props.handleClickedHasSub(e, props.name)} aria-controls="example-collapse-text" aria-expanded={props.isCollapse}>
                <div className="icon">
                    <FontAwesomeIcon icon={props.icon} />
                </div>
                <p> 
                    {props.label}
                    {iconIsChild}
                </p>
            </a>
        ) 
        subMenuCollapse = (
            <Collapse in={isCollapseHandle ? isCollapseHandle : props.isCollapse}>
                <ul className="nav">
                    {subMenu}
                </ul>
            </Collapse>
        );

    }

    return (
        
            <li className="nav-item">
                {linkMenu}
                {subMenuCollapse}
            </li>
        
    )
}

export default NavItem;