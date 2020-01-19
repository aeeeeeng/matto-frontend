import React from 'react';
import Aux from '../../../../hoc/Aux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import Badges from '../../../partials/badges/Badges';

import NotifiactionInfo from './NotifiactionInfo';

const Notification = props => {

    const haveNotif = [
        {orderNumber: 1, customerName: 'bayu', customerTable: '2'},
        {orderNumber: 2, customerName: 'bayu halem', customerTable: '1'},
        {orderNumber: 3, customerName: 'halem bayu', customerTable: '1'},
        {orderNumber: 4, customerName: 'rudy koplo', customerTable: '4'},
        {orderNumber: 5, customerName: 'aries', customerTable: '3'},
        {orderNumber: 6, customerName: 'tofan', customerTable: '7'},
    ]

    return(
        <Aux>
            <div className="dropdown-navbar">
                <a href="/" className="btn-icon"
                onClick={(e) => props.collapseCLick(e, 'notifCollapse')} 
                onBlur={(e) => props.collapseCLick(e, 'notifCollapse')}
                aria-controls="example-collapse-text"
                aria-expanded={props.isCollapse}
                >
                    <Badges message="5"/>
                    <span className="header-icon">
                        <FontAwesomeIcon icon={faBell} />
                    </span>
                </a>
                
                <NotifiactionInfo haveNotif={haveNotif} isCollapse={props.isCollapse}/>
            </div>
        </Aux>
    );
}

export default Notification;