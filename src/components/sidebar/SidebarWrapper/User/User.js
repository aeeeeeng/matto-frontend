import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Aux from '../../../../hoc/Aux';

import './User.css';

const User = (props) => {
    const isCollapse = props.isCollapse;

    const collapsedClass = (isCollapse) ? 'collapsed' : '' ;

    return(
        

        <Aux>
            <div className="user">
                <div className="photo" onClick={props.handleCollapse}>
                    <img src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/faces/avatar.jpg" alt=""/>
                </div>
                <div className="user-info" onClick={props.handleCollapse}>
                    <a href="/" className={`username ${collapsedClass}`} >
                        <span>
                            Syahril Ardi
                            <div className="icon">
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        </span>
                    </a>
                </div>
                {props.children}
            </div>
        </Aux>
    )
}

export default User;