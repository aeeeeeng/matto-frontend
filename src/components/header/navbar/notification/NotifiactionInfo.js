import React from 'react';

import {Collapse} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import './NotifiactionInfo.css';

const NotificationInfo = props => {

    const haveNotif = props.haveNotif.map((customer, i) => (
        <li key={i} className="notification-item">
            <a href="/">
                <span className="notification-icon">
                    <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
                </span>
                <span className="notification-label">
                    Pesanan atas nama <b>{customer.customerName}</b> belum di hantar <br/> 
                    dengan nomor meja <b>{customer.customerTable}</b>
                </span>
            </a>
        </li>
    ));

    return(
        <Collapse in={props.isCollapse}>
            <div className="notification-info">
                <ul className="notification-list">
                    {haveNotif}
                </ul>
            </div>
        </Collapse>
    )
}

export default NotificationInfo;