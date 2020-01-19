import React from 'react';
import './UserInfo.css';

import { Collapse } from "react-bootstrap";

const UserInfo = props => {
    const isCollapse = props.isCollapse;
    return(
        <Collapse in={isCollapse}>
            <div className={''}>
                <ul className="nav">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            <span className="sidebar-mini">MP</span>
                            <span className="sidebar-normal">My Profil</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            <span className="sidebar-mini">EP</span>
                            <span className="sidebar-normal">Edit Profil</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            <span className="sidebar-mini">ST</span>
                            <span className="sidebar-normal">Setting</span>
                        </a>
                    </li>
                </ul>
            </div>
        </Collapse>
    )
}

export default UserInfo;