import React from 'react';
import Aux from '../../../../hoc/Aux';

import {Collapse} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './User.css';

const User = props => {
    return(
        <Aux>
            <a href="/" className="btn-icon" 
               onClick={(e) => props.collapseCLick(e, 'userCollapse')} 
               aria-controls="example-collapse-text"
               aria-expanded={props.isCollapse}
            >
                <span className="header-icon">
                    <FontAwesomeIcon icon={faUser} />
                </span>
            </a>
            <Collapse in={props.isCollapse}>
                <div className="user-collapse">
                    <a href="/" className="user-item">Profile</a>
                    <div className="dropdown-divider"></div>
                    <a href="/" onClick={(e) => props.logout(e)} className="user-item">Sign Out</a>
                </div>
            </Collapse>
        </Aux>
    );
}

export default User;